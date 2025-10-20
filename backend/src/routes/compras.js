// routes/compras.js (ajustado: snapshot completo de detalles para restore)
import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET /api/compras - Listar detalles de compras con JOIN completo (filtra is_deleted=0 en ambas)
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        c.id_compra,
        c.fecha,
        c.total,
        c.observaciones,
        pr.nombre as proveedor,
        pr.telefono as proveedor_telefono,
        p.nombre as producto,
        dc.id_detalle as id_detalle_compra,
        dc.cantidad,
        dc.costo_unitario,
        dc.total as detalle_total,
        cat.nombre as categoria,
        u.nombre as unidad,
        u.abreviatura as unidad_abrev,
        usu.nombre as usuario
      FROM compras c
      INNER JOIN proveedores pr ON c.id_proveedor = pr.id_proveedor
      INNER JOIN detalle_compras dc ON c.id_compra = dc.id_compra AND dc.is_deleted = 0  -- Filtro en detalle
      INNER JOIN productos p ON dc.id_producto = p.id_producto
      INNER JOIN categorias cat ON p.id_categoria = cat.id_categoria
      LEFT JOIN unidades_medida u ON p.id_unidad = u.id_unidad
      INNER JOIN usuarios usu ON c.id_usuario = usu.id_usuario
      WHERE c.is_deleted = 0  -- Filtro en cabecera
      ORDER BY c.fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener compras:', error);
    res.status(500).json({ message: 'Error al obtener compras' });
  }
});

// POST /api/compras - Crear solo cabecera de compra (retorna id_compra)
router.post('/', async (req, res) => {
  const { id_proveedor, fecha, observaciones = null } = req.body;
  const id_usuario = req.user?.id || 1; // Asumir auth middleware
  if (!id_proveedor || !id_usuario) {
    return res.status(400).json({ message: 'Campos obligatorios faltantes (proveedor/usuario)' });
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [compraResult] = await connection.query(
      'INSERT INTO compras (id_proveedor, id_usuario, fecha, observaciones) VALUES (?, ?, ?, ?)',
      [id_proveedor, id_usuario, fecha || new Date(), observaciones]
    );
    const id_compra = compraResult.insertId;

    await connection.commit();
    res.status(201).json({ id_compra, message: 'Cabecera de compra creada' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al crear cabecera de compra:', error);
    res.status(500).json({ message: 'Error al crear cabecera de compra' });
  } finally {
    connection.release();
  }
});

// POST /api/compras/detalle - Agregar detalle a compra existente (actualiza stock y total de compra)
router.post('/detalle', async (req, res) => {
  const { id_compra, id_producto, cantidad, costo_unitario } = req.body;
  if (!id_compra || !id_producto || !cantidad || !costo_unitario) {
    return res.status(400).json({ message: 'Campos obligatorios faltantes' });
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Insertar detalle
    const [detalleResult] = await connection.query(
      'INSERT INTO detalle_compras (id_compra, id_producto, cantidad, costo_unitario) VALUES (?, ?, ?, ?)',
      [id_compra, id_producto, parseFloat(cantidad), parseFloat(costo_unitario)]
    );

    // Actualizar stock en producto
    await connection.query(
      'UPDATE productos SET stock_actual = stock_actual + ? WHERE id_producto = ?',
      [parseFloat(cantidad), id_producto]
    );

    // Actualizar total en compra (suma de detalles no eliminados)
    await connection.query(
      'UPDATE compras SET total = (SELECT COALESCE(SUM(cantidad * costo_unitario), 0) FROM detalle_compras WHERE id_compra = ? AND is_deleted = 0) WHERE id_compra = ?',
      [id_compra, id_compra]
    );

    await connection.commit();
    res.status(201).json({ id_detalle: detalleResult.insertId, message: 'Detalle agregado' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al agregar detalle:', error);
    res.status(500).json({ message: 'Error al agregar detalle' });
  } finally {
    connection.release();
  }
});

// DELETE /api/compras/detalle/:id - Soft delete detalle (sin papelera; solo cabecera si vacía)
router.delete('/detalle/:id', async (req, res) => {
  const { id } = req.params;  // id_detalle
  const deletedBy = req.user?.id || 1;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Obtener detalle para soft delete
    const [detalles] = await connection.query(`
      SELECT dc.* FROM detalle_compras dc
      WHERE dc.id_detalle = ? AND dc.is_deleted = 0
    `, [id]);
    if (detalles.length === 0) {
      return res.status(404).json({ message: 'Detalle no encontrado' });
    }
    const det = detalles[0];

    // Revertir stock
    await connection.query(
      'UPDATE productos SET stock_actual = stock_actual - ? WHERE id_producto = ?',
      [parseFloat(det.cantidad), det.id_producto]
    );

    // Soft delete detalle (sin insertar en papelera)
    await connection.query(
      'UPDATE detalle_compras SET is_deleted = 1, deleted_at = NOW(), deleted_by = ? WHERE id_detalle = ?',
      [deletedBy, id]
    );

    // Actualizar total en compra
    await connection.query(
      'UPDATE compras SET total = (SELECT COALESCE(SUM(cantidad * costo_unitario), 0) FROM detalle_compras WHERE id_compra = ? AND is_deleted = 0) WHERE id_compra = ?',
      [det.id_compra, det.id_compra]
    );

    // Si no quedan detalles activos, soft delete compra y mover SOLO cabecera a papelera (con snapshot detalles)
    const [remaining] = await connection.query(
      'SELECT COUNT(*) as count FROM detalle_compras WHERE id_compra = ? AND is_deleted = 0',
      [det.id_compra]
    );
    if (remaining[0].count === 0) {
      // Capturar snapshot de TODOS detalles (sin filtro is_deleted para incluir todos soft-deleted)
      const [detallesSnapshot] = await connection.query(`
        SELECT dc.*, p.nombre as nombre_producto, cat.nombre as categoria, u.abreviatura as unidad_abrev
        FROM detalle_compras dc
        INNER JOIN productos p ON dc.id_producto = p.id_producto
        INNER JOIN categorias cat ON p.id_categoria = cat.id_categoria
        LEFT JOIN unidades_medida u ON p.id_unidad = u.id_unidad
        WHERE dc.id_compra = ?
      `, [det.id_compra]);

      // Obtener datos de compra para papelera
      const [compraRows] = await connection.query(
        'SELECT c.*, pr.nombre as proveedor_nombre FROM compras c INNER JOIN proveedores pr ON c.id_proveedor = pr.id_proveedor WHERE c.id_compra = ?',
        [det.id_compra]
      );
      if (compraRows.length > 0) {
        const compra = compraRows[0];
        const contenidoCompra = JSON.stringify({
          id_proveedor: compra.id_proveedor,
          total: compra.total,
          observaciones: compra.observaciones,
          proveedor_nombre: compra.proveedor_nombre,
          detalles: detallesSnapshot  // Array completo con id_detalle para undelete
        });
        await connection.query(
          'INSERT INTO papelera (tabla, registro_id, contenido, fecha_eliminacion, id_usuario) VALUES (?, ?, ?, NOW(), ?)',
          ['compras', det.id_compra, contenidoCompra, deletedBy]
        );
      }
      // Soft delete compra
      await connection.query(
        'UPDATE compras SET is_deleted = 1, deleted_at = NOW(), deleted_by = ? WHERE id_compra = ?',
        [deletedBy, det.id_compra]
      );
    }

    await connection.commit();
    res.json({ message: 'Detalle eliminado (cabecera a papelera si vacía)' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al eliminar detalle:', error);
    res.status(500).json({ message: 'Error al eliminar detalle' });
  } finally {
    connection.release();
  }
});

// DELETE /api/compras/:id - Soft delete detalles (sin papelera) y cabecera (con snapshot a papelera)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deletedBy = req.user?.id || 1;
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // Obtener detalles activos para soft delete
    const [detalles] = await connection.query(`
      SELECT dc.* FROM detalle_compras dc
      WHERE dc.id_compra = ? AND dc.is_deleted = 0
    `, [id]);

    // Revertir stock y soft delete detalles (sin insertar en papelera)
    for (const det of detalles) {
      await connection.query(
        'UPDATE productos SET stock_actual = stock_actual - ? WHERE id_producto = ?',
        [parseFloat(det.cantidad), det.id_producto]
      );
      await connection.query(
        'UPDATE detalle_compras SET is_deleted = 1, deleted_at = NOW(), deleted_by = ? WHERE id_detalle = ?',
        [deletedBy, det.id_detalle]
      );
    }

    // Capturar snapshot de TODOS detalles (sin filtro is_deleted)
    const [detallesSnapshot] = await connection.query(`
      SELECT dc.*, p.nombre as nombre_producto, cat.nombre as categoria, u.abreviatura as unidad_abrev
      FROM detalle_compras dc
      INNER JOIN productos p ON dc.id_producto = p.id_producto
      INNER JOIN categorias cat ON p.id_categoria = cat.id_categoria
      LEFT JOIN unidades_medida u ON p.id_unidad = u.id_unidad
      WHERE dc.id_compra = ?
    `, [id]);

    // Soft delete compra y mover SOLO cabecera a papelera
    const [compraRows] = await connection.query(
      'SELECT c.*, pr.nombre as proveedor_nombre FROM compras c INNER JOIN proveedores pr ON c.id_proveedor = pr.id_proveedor WHERE c.id_compra = ?',
      [id]
    );
    if (compraRows.length > 0) {
      const compra = compraRows[0];
      const contenidoCompra = JSON.stringify({
        id_proveedor: compra.id_proveedor,
        total: compra.total,
        observaciones: compra.observaciones,
        proveedor_nombre: compra.proveedor_nombre,
        detalles: detallesSnapshot  // Array completo con id_detalle
      });
      await connection.query(
        'INSERT INTO papelera (tabla, registro_id, contenido, fecha_eliminacion, id_usuario) VALUES (?, ?, ?, NOW(), ?)',
        ['compras', id, contenidoCompra, deletedBy]
      );
    }
    await connection.query(
      'UPDATE compras SET is_deleted = 1, deleted_at = NOW(), deleted_by = ? WHERE id_compra = ?',
      [deletedBy, id]
    );

    await connection.commit();
    res.json({ message: 'Compra eliminada (cabecera a papelera)' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al eliminar compra:', error);
    res.status(500).json({ message: 'Error al eliminar compra' });
  } finally {
    connection.release();
  }
});

export default router;
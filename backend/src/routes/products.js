// products.js (actualizado con ruta para actualizar stocks)
import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Obtener todos los productos activos con categorías, unidades e impuesto
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id_producto, 
        p.nombre, 
        p.descripcion,
        p.precio_venta, 
        p.stock_actual, 
        p.stock_minimo, 
        p.stock_maximo,
        c.nombre as nombre_categoria,
        c.impuesto,
        u.nombre as unidad,
        u.abreviatura as unidad_abrev,
        p.estado
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN unidades_medida u ON p.id_unidad = u.id_unidad
      WHERE p.estado = 1 AND p.is_deleted = 0
      ORDER BY p.nombre ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).send('Error al obtener productos');
  }
});

// Obtener producto por ID
router.get('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT 
        p.*,
        c.nombre as nombre_categoria,
        c.impuesto,
        u.nombre as unidad,
        u.abreviatura as unidad_abrev
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
      LEFT JOIN unidades_medida u ON p.id_unidad = u.id_unidad
      WHERE p.id_producto = ? AND p.estado = 1 AND p.is_deleted = 0
    `, [id]);
    if (rows.length === 0) {
      return res.status(404).send('Producto no encontrado');
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).send('Error al obtener producto');
  }
});

// Actualizar stocks múltiples (usado después de una venta exitosa)
router.post('/update-stocks', async (req, res) => {
  const updates = req.body;
  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ message: 'Debe proporcionar un array de actualizaciones de stock' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    for (const update of updates) {
      const { id_producto, quantity } = update;
      if (!id_producto || typeof quantity !== 'number' || quantity <= 0) {
        throw new Error('Datos inválidos en actualizaciones de stock');
      }
      const [result] = await connection.query(
        'UPDATE productos SET stock_actual = stock_actual - ? WHERE id_producto = ? AND stock_actual >= ?',
        [quantity, id_producto, quantity]
      );
      if (result.affectedRows === 0) {
        throw new Error(`No se pudo actualizar stock para producto ${id_producto} (stock insuficiente)`);
      }
    }

    await connection.commit();
    res.json({ success: true, message: 'Stocks actualizados exitosamente' });
  } catch (error) {
    await connection.rollback();
    console.error('Error al actualizar stocks:', error);
    res.status(500).json({ message: 'Error al actualizar stocks', error: error.message });
  } finally {
    connection.release();
  }
});

export default router;
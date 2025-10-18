const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// POST /api/ventas - Crear nueva venta con sus detalles
router.post('/', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { 
            id_cliente, 
            id_usuario, 
            id_caja, 
            fecha, 
            subtotal, 
            impuesto, 
            total, 
            metodo_pago, 
            observaciones,
            items 
        } = req.body;

        // Validaciones básicas
        if (!id_usuario || !id_caja || !items || items.length === 0) {
            await connection.rollback();
            return res.status(400).send('Faltan datos requeridos: id_usuario, id_caja, items');
        }

        // 1. Insertar en tabla ventas
        const [ventaResult] = await pool.query(
            `INSERT INTO ventas 
            (id_cliente, id_usuario, id_caja, fecha, subtotal, impuesto, total, metodo_pago, observaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_cliente || null,
                id_usuario,
                id_caja,
                fecha || new Date().toISOString(),
                subtotal,
                impuesto,
                total,
                metodo_pago || 'efectivo',
                observaciones || ''
            ]
        );

        const id_venta = ventaResult.insertId;

        // 2. Insertar detalles de venta
        for (const item of items) {
            await pool.query(
                `INSERT INTO detalle_ventas 
                (id_venta, id_producto, cantidad, precio_unitario, descuento, total) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    id_venta,
                    item.id_producto,
                    item.cantidad,
                    item.precio_unitario,
                    item.descuento || 0,
                    item.total
                ]
            );

            // 3. Actualizar stock del producto
            await pool.query(
                `UPDATE productos 
                SET stock_actual = stock_actual - ? 
                WHERE id_producto = ?`,
                [item.cantidad, item.id_producto]
            );
        }

        // 4. Actualizar total_ventas en la caja
        await pool.query(
            `UPDATE caja 
            SET total_ventas = COALESCE(total_ventas, 0) + ? 
            WHERE id = ?`,
            [total, id_caja]
        );

        await pool.commit();

        res.status(201).json({
            success: true,
            id_venta,
            message: 'Venta registrada exitosamente'
        });

    } catch (error) {
        await pool.rollback();
        console.error('Error al registrar venta:', error);
        res.status(500).send('Error al registrar venta: ' + error.message);
    } finally {
        pool.release();
    }
});

// GET /api/ventas - Obtener todas las ventas
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                v.*,
                c.nombre as nombre_cliente,
                u.nombre as nombre_usuario,
                cj.id as numero_caja
            FROM ventas v
            LEFT JOIN clientes c ON v.id_cliente = c.id
            LEFT JOIN usuarios u ON v.id_usuario = u.id
            LEFT JOIN caja cj ON v.id_caja = cj.id
            ORDER BY v.fecha DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).send('Error al obtener ventas');
    }
});

// GET /api/ventas/:id - Obtener detalle de una venta
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Obtener datos de la venta
        const [ventas] = await pool.query(`
            SELECT 
                v.*,
                c.nombre as nombre_cliente,
                c.identificacion,
                u.nombre as nombre_usuario
            FROM ventas v
            LEFT JOIN clientes c ON v.id_cliente = c.id
            LEFT JOIN usuarios u ON v.id_usuario = u.id
            WHERE v.id = ?
        `, [id]);

        if (ventas.length === 0) {
            return res.status(404).send('Venta no encontrada');
        }

        // Obtener detalles de la venta
        const [detalles] = await pool.query(`
            SELECT 
                dv.*,
                p.nombre as nombre_producto
            FROM detalle_ventas dv
            LEFT JOIN productos p ON dv.id_producto = p.id_producto
            WHERE dv.id_venta = ?
        `, [id]);

        res.json({
            venta: ventas[0],
            detalles
        });
    } catch (error) {
        console.error('Error al obtener detalle de venta:', error);
        res.status(500).send('Error al obtener detalle de venta');
    }
});

export default router;
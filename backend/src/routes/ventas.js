import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// POST /api/ventas - Crear nueva venta con sus detalles y movimiento
router.post('/', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const { 
            id_cliente, 
            id_usuario, 
            id_caja, 
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

        // 1. Insertar en tabla ventas (sin fecha, usa DEFAULT CURRENT_TIMESTAMP)
        const [ventaResult] = await connection.query(
            `INSERT INTO ventas 
            (id_cliente, id_usuario, id_caja, subtotal, impuesto, total, metodo_pago, observaciones) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                id_cliente || null,
                id_usuario,
                id_caja,
                subtotal,
                impuesto,
                total,
                metodo_pago || 'efectivo',
                observaciones || ''
            ]
        );

        const id_venta = ventaResult.insertId;

        // 2. Insertar detalles de venta y actualizar stock
        for (const item of items) {
            // Verificar stock suficiente
            const [stockCheck] = await connection.query(
                `SELECT stock_actual FROM productos WHERE id_producto = ?`,
                [item.id_producto]
            );
            if (stockCheck.length === 0 || stockCheck[0].stock_actual < item.cantidad) {
                await connection.rollback();
                return res.status(400).send(`Stock insuficiente para producto ID ${item.id_producto}`);
            }

            await connection.query(
                `INSERT INTO detalle_ventas 
                (id_venta, id_producto, cantidad, precio_unitario, descuento) 
                VALUES (?, ?, ?, ?, ?)`,
                [
                    id_venta,
                    item.id_producto,
                    item.cantidad,
                    item.precio_unitario,
                    item.descuento || 0
                ]
            );

            // Actualizar stock del producto
            await connection.query(
                `UPDATE productos 
                SET stock_actual = stock_actual - ? 
                WHERE id_producto = ?`,
                [item.cantidad, item.id_producto]
            );
        }

        // 3. Actualizar total_ventas en la caja
        await connection.query(
            `UPDATE caja 
            SET total_ventas = COALESCE(total_ventas, 0) + ? 
            WHERE id_caja = ?`,
            [total, id_caja]
        );

        // 4. Registrar movimiento 'ingreso' por la venta
        await connection.query(
            `INSERT INTO movimientos_caja 
            (id_caja, tipo, descripcion, monto) 
            VALUES (?, 'ingreso', ?, ?)`,
            [
                id_caja,
                `Venta ID: ${id_venta}`,
                total
            ]
        );

        await connection.commit();

        res.status(201).json({
            success: true,
            id_venta,
            message: 'Venta y movimiento registrados exitosamente'
        });

    } catch (error) {
        await connection.rollback();
        console.error('Error al registrar venta:', error);
        res.status(500).send('Error al registrar venta: ' + error.message);
    } finally {
        connection.release();
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
                cj.id_caja as numero_caja
            FROM ventas v
            LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
            LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
            LEFT JOIN caja cj ON v.id_caja = cj.id_caja
            ORDER BY v.fecha DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener ventas:', error);
        res.status(500).send('Error al obtener ventas');
    }
});

// GET /api/ventas/:id_venta - Obtener detalle de una venta
router.get('/:id_venta', async (req, res) => {
    try {
        const { id_venta } = req.params;
        
        // Obtener datos de la venta
        const [ventas] = await pool.query(`
            SELECT 
                v.*,
                c.nombre as nombre_cliente,
                c.identificacion,
                u.nombre as nombre_usuario
            FROM ventas v
            LEFT JOIN clientes c ON v.id_cliente = c.id_cliente
            LEFT JOIN usuarios u ON v.id_usuario = u.id_usuario
            WHERE v.id_venta = ?
        `, [id_venta]);

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
        `, [id_venta]);

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
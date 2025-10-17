const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// POST /api/cajas - Abrir nueva caja
router.post('/', async (req, res) => {
    try {
        const { 
            id_usuario, 
            id_sucursal, 
            fecha_apertura, 
            monto_inicial, 
            estado 
        } = req.body;

        if (!id_usuario || !monto_inicial) {
            return res.status(400).send('Faltan datos requeridos: id_usuario, monto_inicial');
        }

        const [result] = await pool.query(
            `INSERT INTO caja 
            (id_usuario, id_sucursal, fecha_apertura, monto_inicial, estado, total_ventas) 
            VALUES (?, ?, ?, ?, ?, 0)`,
            [
                id_usuario, 
                id_sucursal || 1, 
                fecha_apertura || new Date().toISOString(), 
                monto_inicial, 
                estado || 'abierta'
            ]
        );

        const [rows] = await pool.query('SELECT * FROM caja WHERE id = ?', [result.insertId]);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error al abrir caja:', error);
        res.status(500).send('Error al abrir caja: ' + error.message);
    }
});

// PUT /api/cajas/:id/cerrar - Cerrar caja
router.put('/:id/cerrar', async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            fecha_cierre, 
            monto_final, 
            diferencia, 
            observaciones 
        } = req.body;

        // Obtener la caja actual
        const [cajas] = await pool.query('SELECT * FROM caja WHERE id = ?', [id]);
        
        if (cajas.length === 0) {
            return res.status(404).send('Caja no encontrada');
        }

        const caja = cajas[0];

        // Calcular diferencia si no viene
        const diferenciaCalculada = diferencia !== undefined 
            ? diferencia 
            : monto_final - caja.monto_inicial - (caja.total_ventas || 0);

        await pool.query(
            `UPDATE caja 
            SET fecha_cierre = ?, 
                monto_final = ?, 
                diferencia = ?, 
                estado = 'cerrada',
                observaciones = ?
            WHERE id = ?`,
            [
                fecha_cierre || new Date().toISOString(),
                monto_final,
                diferenciaCalculada,
                observaciones || '',
                id
            ]
        );

        const [updated] = await pool.query('SELECT * FROM caja WHERE id = ?', [id]);
        res.json(updated[0]);
    } catch (error) {
        console.error('Error al cerrar caja:', error);
        res.status(500).send('Error al cerrar caja: ' + error.message);
    }
});

// GET /api/cajas - Obtener todas las cajas
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                c.*,
                u.nombre as nombre_usuario,
                u.email as email_usuario
            FROM caja c
            LEFT JOIN usuarios u ON c.id_usuario = u.id
            ORDER BY c.fecha_apertura DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener cajas:', error);
        res.status(500).send('Error al obtener cajas');
    }
});

// GET /api/cajas/:id - Obtener detalle de una caja
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const [cajas] = await pool.query(`
            SELECT 
                c.*,
                u.nombre as nombre_usuario,
                u.email as email_usuario
            FROM caja c
            LEFT JOIN usuarios u ON c.id_usuario = u.id
            WHERE c.id = ?
        `, [id]);

        if (cajas.length === 0) {
            return res.status(404).send('Caja no encontrada');
        }

        // Obtener ventas asociadas a esta caja
        const [ventas] = await pool.query(`
            SELECT 
                v.*,
                c.nombre as nombre_cliente
            FROM ventas v
            LEFT JOIN clientes c ON v.id_cliente = c.id
            WHERE v.id_caja = ?
            ORDER BY v.fecha DESC
        `, [id]);

        res.json({
            caja: cajas[0],
            ventas
        });
    } catch (error) {
        console.error('Error al obtener detalle de caja:', error);
        res.status(500).send('Error al obtener detalle de caja');
    }
});

// GET /api/cajas/abierta/:id_usuario - Obtener caja abierta de un usuario
router.get('/abierta/:id_usuario', async (req, res) => {
    try {
        const { id_usuario } = req.params;
        
        const [cajas] = await pool.query(`
            SELECT * FROM caja 
            WHERE id_usuario = ? AND estado = 'abierta'
            ORDER BY fecha_apertura DESC
            LIMIT 1
        `, [id_usuario]);

        if (cajas.length === 0) {
            return res.status(404).json({ message: 'No hay caja abierta para este usuario' });
        }

        res.json(cajas[0]);
    } catch (error) {
        console.error('Error al buscar caja abierta:', error);
        res.status(500).send('Error al buscar caja abierta');
    }
});

export default router;
import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Función helper para validar sucursal
async function validarSucursal(id_sucursal) {
    const [sucursales] = await pool.query('SELECT id_sucursal FROM sucursales WHERE id_sucursal = ?', [id_sucursal]);
    if (sucursales.length === 0) {
        throw new Error(`Sucursal con ID ${id_sucursal} no existe. Verifica las sucursales en la DB.`);
    }
}

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

        // Validar sucursal si se proporciona, o usar 1 por defecto
        let idSucursalFinal = id_sucursal || 1;
        await validarSucursal(idSucursalFinal);

        const [result] = await pool.query(
            `INSERT INTO caja 
            (id_usuario, id_sucursal, fecha_apertura, monto_inicial, estado, total_ventas) 
            VALUES (?, ?, ?, ?, ?, 0)`,
            [
                id_usuario, 
                idSucursalFinal, 
                fecha_apertura || new Date().toISOString(), 
                monto_inicial, 
                estado || 'abierta'
            ]
        );

        const [rows] = await pool.query('SELECT * FROM caja WHERE id_caja = ?', [result.insertId]);
        console.log(`Caja abierta exitosamente: ID ${result.insertId} para sucursal ${idSucursalFinal}`);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error al abrir caja:', error);
        if (error.message.includes('Sucursal')) {
            return res.status(400).send(error.message);
        }
        res.status(500).send('Error al abrir caja: ' + error.message);
    }
});

// PUT /api/cajas/:id_caja/cerrar - Cerrar caja
router.put('/:id_caja/cerrar', async (req, res) => {
    try {
        const { id_caja } = req.params;
        const { 
            fecha_cierre, 
            monto_final, 
            diferencia, 
            observaciones 
        } = req.body;

        // Obtener la caja actual
        const [cajas] = await pool.query('SELECT * FROM caja WHERE id_caja = ?', [id_caja]);
        
        if (cajas.length === 0) {
            return res.status(404).send('Caja no encontrada');
        }

        const caja = cajas[0];

        // Calcular diferencia si no viene (chequeo nulo para total_ventas)
        const totalVentas = caja.total_ventas || 0;
        const diferenciaCalculada = diferencia !== undefined 
            ? diferencia 
            : monto_final - caja.monto_inicial - totalVentas;

        await pool.query(
            `UPDATE caja 
            SET fecha_cierre = ?, 
                monto_final = ?, 
                diferencia = ?, 
                estado = 'cerrada',
                observaciones = ?
            WHERE id_caja = ?`,
            [
                fecha_cierre || new Date().toISOString(),
                monto_final,
                diferenciaCalculada,
                observaciones || '',
                id_caja
            ]
        );

        const [updated] = await pool.query('SELECT * FROM caja WHERE id_caja = ?', [id_caja]);
        console.log(`Caja cerrada exitosamente: ID ${id_caja}, diferencia: ${diferenciaCalculada}`);
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
                u.email as email_usuario,
                s.nombre as nombre_sucursal
            FROM caja c
            LEFT JOIN usuarios u ON c.id_usuario = u.id
            LEFT JOIN sucursales s ON c.id_sucursal = s.id_sucursal
            ORDER BY c.fecha_apertura DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener cajas:', error);
        res.status(500).send('Error al obtener cajas');
    }
});

// GET /api/cajas/:id_caja - Obtener detalle de una caja
router.get('/:id_caja', async (req, res) => {
    try {
        const { id_caja } = req.params;
        
        const [cajas] = await pool.query(`
            SELECT 
                c.*,
                u.nombre as nombre_usuario,
                u.email as email_usuario,
                s.nombre as nombre_sucursal
            FROM caja c
            LEFT JOIN usuarios u ON c.id_usuario = u.id
            LEFT JOIN sucursales s ON c.id_sucursal = s.id_sucursal
            WHERE c.id_caja = ?
        `, [id_caja]);

        if (cajas.length === 0) {
            return res.status(404).send('Caja no encontrada');
        }

        // Obtener ventas asociadas a esta caja
        const [ventas] = await pool.query(`
            SELECT 
                v.*,
                cl.nombre as nombre_cliente
            FROM ventas v
            LEFT JOIN clientes cl ON v.id_cliente = cl.id
            WHERE v.id_caja = ?
            ORDER BY v.fecha DESC
        `, [id_caja]);

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
            SELECT 
                c.*,
                s.nombre as nombre_sucursal
            FROM caja c
            LEFT JOIN sucursales s ON c.id_sucursal = s.id_sucursal
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
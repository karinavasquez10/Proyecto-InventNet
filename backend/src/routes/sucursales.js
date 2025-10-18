import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// GET /api/sucursales - Obtener sucursales activas
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT id_sucursal, nombre, ciudad 
            FROM sucursales 
            WHERE estado = 'activa' 
            ORDER BY id_sucursal ASC
        `);
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener sucursales:', error);
        res.status(500).send('Error al obtener sucursales');
    }
});

export default router;
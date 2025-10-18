import express from "express";
import pool from "../config/database.js";

const router = express.Router();

// Obtener todos los productos activos con categorías
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id_producto, 
        p.nombre, 
        p.precio_venta, 
        p.stock_actual, 
        p.stock_minimo, 
        c.nombre as nombre_categoria,
        p.estado
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
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
        c.nombre as nombre_categoria
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
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

export default router;
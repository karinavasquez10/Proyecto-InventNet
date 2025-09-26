import { Router } from "express";
import pool from '../config/database.js';

const router = Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id_producto, p.nombre, p.precio_venta, p.stock_actual, c.id_categoria
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria = c.id_categoria
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

export default router;

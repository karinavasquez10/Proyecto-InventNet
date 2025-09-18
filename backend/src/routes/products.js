import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id_producto, p.nombre_producto, p.precio, p.stock, c.nombre_categoria
      FROM productos p
      INNER JOIN categorias c ON p.id_categoria_fk = c.id_categoria
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});

export default router;

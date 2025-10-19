// categorias.js (actualizado, asumiendo que se agregó la columna 'impuesto' DECIMAL(5,4) DEFAULT 0.0000 a la tabla categorias)
import { Router } from "express";
import pool from '../config/database.js';

const router = Router();

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_categoria, nombre, impuesto FROM categorias');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener categorías' });
  }
});

// Obtener ID de categoría por nombre
router.get('/id/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const [rows] = await pool.query('SELECT id_categoria, impuesto FROM categorias WHERE nombre = ?', [nombre]);
    if (rows.length > 0) {
      res.json(rows[0]); // Devuelve el primer resultado
    } else {
      res.status(404).json({ message: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener ID de categoría' });
  }
});

export default router;
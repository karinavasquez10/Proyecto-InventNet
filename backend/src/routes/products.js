import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE is_deleted = 0");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST nuevo producto
router.post("/", async (req, res) => {
  const { nombre, precio, stock, id_categoria } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, precio, stock, id_categoria) VALUES (?, ?, ?, ?)",
      [nombre, precio, stock, id_categoria]
    );
    res.json({ id: result.insertId, nombre, precio, stock, id_categoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// PUT actualizar producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, id_categoria } = req.body;
  try {
    await pool.query(
      "UPDATE productos SET nombre=?, precio=?, stock=?, id_categoria=? WHERE id=?",
      [nombre, precio, stock, id_categoria, id]
    );
    res.json({ id, nombre, precio, stock, id_categoria });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// DELETE enviar a papelera (soft delete)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "UPDATE productos SET is_deleted = 1, deleted_at = NOW(), deleted_by = ? WHERE id = ?",
      [1, id] // TODO: reemplazar "1" con id del usuario autenticado
    );
    res.json({ message: "Producto enviado a papelera" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;

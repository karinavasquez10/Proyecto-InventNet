import express from "express";
import pool from "../config/database.js";

const router = express.Router();

/* =========================================================
   GET /api/clientes - Obtener todos los clientes activos
========================================================= */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        id_cliente AS id,
        nombre,
        identificacion,
        direccion,
        telefono,
        correo,
        tipo,
        fecha_creacion
      FROM clientes
      WHERE is_deleted = 0
      ORDER BY id_cliente DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({ error: "Error al obtener clientes" });
  }
});

/* =========================================================
   POST /api/clientes - Crear un nuevo cliente
========================================================= */
router.post("/", async (req, res) => {
  try {
    const { nombre, identificacion, direccion, telefono, correo, tipo } = req.body;

    if (!nombre || !identificacion) {
      return res.status(400).json({ error: "Nombre e identificación son obligatorios" });
    }

    const [result] = await pool.query(
      `INSERT INTO clientes (nombre, identificacion, direccion, telefono, correo, tipo)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, identificacion, direccion, telefono, correo, tipo || "persona"]
    );

    const [rows] = await pool.query(
      `SELECT 
         id_cliente AS id,
         nombre,
         identificacion,
         direccion,
         telefono,
         correo,
         tipo,
         fecha_creacion
       FROM clientes
       WHERE id_cliente = ?`,
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ error: "Error al crear cliente" });
  }
});

export default router;

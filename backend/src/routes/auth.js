import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/database.js"; // conexión MySQL

const router = Router();

// Ruta: POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  try {
    // Buscar usuario en la base de datos
    const [rows] = await pool.query(
      "SELECT id_usuario, correo, contrasena, rol FROM usuarios WHERE correo = ? LIMIT 1",
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];

    // ⚠️ De momento simple comparación, luego puedes usar bcrypt
    if (password !== user.contrasena) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign(
      { id: user.id_usuario, email: user.correo },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user.id_usuario, email: user.correo, rol: user.rol},
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en servidor" });
  }
});

export default router;

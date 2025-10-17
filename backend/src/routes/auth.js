import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/database.js"; // conexión MySQL

const router = Router();

// Ruta: POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  try {
    // Buscar usuario y su detalle (para obtener cargo)
    const [rows] = await pool.query(
      `SELECT u.id_usuario, u.correo, u.contrasena, u.rol, u.nombre, d.cargo
       FROM usuarios u
       LEFT JOIN usuarios_detalle d ON d.id_usuario = u.id_usuario
       WHERE u.correo = ?
       LIMIT 1`,
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

    // Crear token JWT (preserva comportamiento previo)
    const secret = process.env.JWT_SECRET || "dev_secret";
    const token = jwt.sign(
      { id: user.id_usuario, email: user.correo },
      secret,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user.id_usuario,
        email: user.correo,
        rol: user.rol,
        nombre: user.nombre || null,
        cargo: user.cargo || null,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en servidor" });
  }
});

export default router;

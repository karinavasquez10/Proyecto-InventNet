// auth.js (versión corregida - mejor manejo de errores de conexión DB, logging detallado, validación adicional)
import { Router } from "express";
import jwt from "jsonwebtoken";
import pool from "../config/database.js"; // conexión MySQL

const router = Router();

// Ruta: POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validación básica de input
  if (!email || !password) {
    return res.status(400).json({ error: "Email y contraseña son obligatorios" });
  }

  let connection;
  try {
    // Intentar obtener conexión explícita para mejor manejo de errores
    connection = await pool.getConnection();
    
    // Buscar usuario y su detalle (para obtener cargo), con filtros para activo y no eliminado
    const [rows] = await connection.query(
      `SELECT u.id_usuario, u.correo, u.contrasena, u.rol, u.nombre, d.cargo
       FROM usuarios u
       LEFT JOIN usuarios_detalle d ON d.id_usuario = u.id_usuario
       WHERE u.correo = ? AND u.is_deleted = 0 AND u.estado = 1
       LIMIT 1`,
      [email.toLowerCase().trim()] // Normalizar email para comparación
    );

    if (rows.length === 0) {
      console.log(`Login fallido: Usuario no encontrado para email ${email}`);
      return res.status(401).json({ error: "Usuario no encontrado o inactivo" });
    }

    const user = rows[0];

    // Comparación de contraseña (simple por ahora; considera bcrypt en producción)
    if (password !== user.contrasena) {
      console.log(`Login fallido: Contraseña incorrecta para email ${email}`);
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const secret = process.env.JWT_SECRET || "dev_secret_fallback"; // Asegura secret por defecto
    const token = jwt.sign(
      { 
        id: user.id_usuario, 
        email: user.correo,
        rol: user.rol // Incluir rol en payload para verificación futura
      },
      secret,
      { expiresIn: "1h" }
    );

    console.log(`Login exitoso para usuario ${user.nombre} (${user.rol})`);

    res.json({
      token,
      user: {
        id: user.id_usuario,
        email: user.correo,
        rol: user.rol, // Retorna rol en lowercase como en DB
        nombre: user.nombre || null,
        cargo: user.cargo || null,
      },
    });
  } catch (error) {
    // Manejo específico de errores de conexión DB
    if (error.code === 'ECONNRESET' || error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error("Error de conexión DB (ECONNRESET): Verifica config/database.js y conexión MySQL");
      return res.status(500).json({ error: "Error de conexión al servidor. Intenta más tarde." });
    }
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en servidor" });
  } finally {
    if (connection) {
      connection.release(); // Liberar conexión siempre
    }
  }
});

export default router;
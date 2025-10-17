import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinaryConfig.js";
import pool from "../config/database.js";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "temp/" });

// ✅ Obtener datos del perfil (usuarios + usuarios_detalle)
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        u.id_usuario,
        u.nombre,
        u.correo,
        u.rol,
        d.documento_identidad,
        d.direccion,
        d.telefono,
        d.fecha_nacimiento,
        d.genero,
        d.cargo,
        d.foto_perfil
      FROM usuarios u
      LEFT JOIN usuarios_detalle d ON u.id_usuario = d.id_usuario
      WHERE u.id_usuario = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error al obtener perfil:", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// ✅ Actualizar perfil y subir imagen a Cloudinary
router.put("/:id", upload.single("foto"), async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    correo,
    direccion,
    telefono,
    cargo,
    documento_identidad,
    genero,
    fecha_nacimiento,
  } = req.body;

  let fotoPublicId = null;

  try {
    if (req.file) {
      // Subir imagen a Cloudinary en carpeta Home/Perfiles y guardar public_id relativo
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Perfiles",
        public_id: `usuario_${id}`,
        overwrite: true,
      });
      // Guardar ruta relativa (public_id) en BD, ej: Home/Perfiles/usuario_123
      fotoPublicId = result.public_id || null;
      fs.unlinkSync(req.file.path); // eliminar temporal
    }

    // Actualizar datos de usuarios
    await pool.query(
      `UPDATE usuarios 
       SET nombre = ?, correo = ? 
       WHERE id_usuario = ?`,
      [nombre, correo, id]
    );

    // Actualizar detalle
    const campos = [
      direccion,
      telefono,
      cargo,
      documento_identidad,
      genero,
      fecha_nacimiento,
      fotoPublicId,
      id,
    ];
    await pool.query(
      `UPDATE usuarios_detalle 
       SET direccion=?, telefono=?, cargo=?, documento_identidad=?, genero=?, fecha_nacimiento=?, 
           foto_perfil = COALESCE(?, foto_perfil)
       WHERE id_usuario=?`,
      campos
    );

    res.json({ message: "Perfil actualizado correctamente", foto: fotoPublicId });
  } catch (err) {
    console.error("Error al actualizar perfil:", err);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
});

export default router;

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productsRoutes from "./routes/products.js";
import categoriasRoutes from "./routes/categorias.js";
import perfilRoutes from "./routes/perfiles.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/categorias", categoriasRoutes);
app.use("/api/perfil", perfilRoutes);

// Añade un manejador de errores general
app.use((err, req, res, next) => {
  console.error('Error general:', err);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor backend en http://localhost:${PORT}`));

// src/pages/Catalogo.jsx
import React, { useState, useEffect } from "react";

const Catalogo = ({ onClose }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar categorías y productos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [categoryResponse, productResponse] = await Promise.all([
          fetch("http://localhost:5000/api/categorias"),
          fetch("http://localhost:5000/api/products/productos"),
        ]);

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Error al obtener datos");
        }

        const categoriesData = await categoryResponse.json();
        const productsData = await productResponse.json();

        // Formatear categorías
        const formattedCategories = categoriesData.map((cat) => ({
          id: cat.id_categoria,
          nombre: cat.nombre,
        }));
        setCategories(formattedCategories);

        // Formatear productos
        const formattedProducts = productsData.map((product) => ({
          id: product.id_producto,
          nombre: product.nombre,
          precio: product.precio_venta,
          categoria: product.id_categoria,
          stock: product.stock_actual,
          image: "🛍️",
        }));
        setProducts(formattedProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtrar productos por categoría activa
  const filteredProducts = activeCategory
    ? products.filter((product) => product.categoria === activeCategory.id)
    : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-950 text-white rounded-2xl shadow-lg w-[90%] max-w-6xl h-[85vh] flex overflow-hidden">
        {/* Categorías */}
        <div className="w-1/5 bg-gray-900 p-3 flex flex-col gap-2 overflow-y-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat)}
              className={`p-3 rounded-lg font-semibold ${
                activeCategory?.id === cat.id
                  ? "bg-orange-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="flex-1 bg-gray-800 p-5 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {loading && (
            <div className="col-span-full text-center text-gray-400 py-10 content-center">
              <div className="text-2xl animate-pulse">Cargando productos...</div>
            </div>
          )}
          {error && (
            <div className="col-span-full text-center text-red-500 py-10">
              <div className="text-lg">{error}</div>
            </div>
          )}
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-gray-700 rounded-full mb-3" />
              <h3 className="font-bold text-center">{prod.nombre}</h3>
              <span className="mt-2 bg-orange-600 px-2 py-1 rounded text-sm font-bold">
                ${prod.precio.toLocaleString()}
              </span>
            </div>
          ))}
          {filteredProducts.length === 0 && !loading && (
            <div className="col-span-full text-center text-gray-400 py-10 content-center">
              <div className="text-lg">No hay productos disponibles en esta categoría.</div>
            </div>
          )}
        </div>
      </div>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg font-bold"
      >
        X
      </button>
    </div>
  );
};

export default Catalogo;

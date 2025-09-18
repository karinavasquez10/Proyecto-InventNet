// src/pages/Catalogo.jsx
import React, { useState } from "react";

const categorias = [
  "Abarrotes",
  "Aseo",
  "Frutas",
  "Gaseosas",
  "Granos",
  "Lacteos",
  "Mecato",
  "Verduras",
];

// Simulación de productos por categoría
const productos = {
  Abarrotes: [
    { id: 1, nombre: "Aceite", precio: 7500 },
    { id: 2, nombre: "Arroz 500g", precio: 2100 },
    { id: 3, nombre: "Chocolate Roma", precio: 5500 },
  ],
  Frutas: [
    { id: 4, nombre: "Manzanas", precio: 3200 },
    { id: 5, nombre: "Bananas", precio: 2800 },
  ],
  Gaseosas: [
    { id: 6, nombre: "Coca-Cola 1.5L", precio: 5200 },
    { id: 7, nombre: "Pepsi 1.5L", precio: 4900 },
  ],
};

const Catalogo = ({ onClose }) => {
  const [categoriaActiva, setCategoriaActiva] = useState("Abarrotes");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-950 text-white rounded-2xl shadow-lg w-[90%] max-w-6xl h-[85vh] flex overflow-hidden">
        {/* Categorías */}
        <div className="w-1/5 bg-gray-900 p-3 flex flex-col gap-2 overflow-y-auto">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`p-3 rounded-lg font-semibold ${
                categoriaActiva === cat
                  ? "bg-orange-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="flex-1 bg-gray-800 p-5 overflow-y-auto grid grid-cols-3 gap-4">
          {productos[categoriaActiva]?.map((prod) => (
            <div
              key={prod.id}
              className="bg-gray-900 p-4 rounded-xl shadow hover:shadow-lg cursor-pointer flex flex-col items-center"
            >
              {/* Aquí iría la imagen */}
              <div className="w-20 h-20 bg-gray-700 rounded-full mb-3" />
              <h3 className="font-bold text-center">{prod.nombre}</h3>
              <span className="mt-2 bg-orange-600 px-2 py-1 rounded text-sm font-bold">
                ${prod.precio.toLocaleString()}
              </span>
            </div>
          ))}
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

import React, { useState } from "react";

export default function AgregarCategoria({ visible, onClose }) {
  const [nombre, setNombre] = useState("");
  const [posicion, setPosicion] = useState("");
  const [textoIndicativo, setTextoIndicativo] = useState("");
  const [visibleCategoria, setVisibleCategoria] = useState(true);
  const [icono, setIcono] = useState(null);
  const [banner, setBanner] = useState(null);

  if (!visible) return null;

  const handleGuardar = () => {
    const nuevaCategoria = {
      nombre,
      posicion,
      textoIndicativo,
      visibleCategoria,
      icono,
      banner,
    };
    console.log("✅ Categoría guardada:", nuevaCategoria);
    onClose();
  };

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    if (file) {
      if (tipo === "icono") setIcono(URL.createObjectURL(file));
      else setBanner(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-3">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative overflow-y-auto max-h-[90vh]">
        {/* ===== Cerrar ===== */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        {/* ===== Título ===== */}
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">
          Agregar nueva categoría
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Recuerde que las categorías son las mismas para todas las sedes.
        </p>

        {/* ===== Formulario ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-sky-200"
              placeholder="Ej: Verduras"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Posición</label>
            <input
              type="number"
              value={posicion}
              onChange={(e) => setPosicion(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-sky-200"
              placeholder="Ej: 1"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium mb-1">
              Texto indicativo
            </label>
            <input
              type="text"
              value={textoIndicativo}
              onChange={(e) => setTextoIndicativo(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-sky-200"
              placeholder="Ej: Productos frescos del campo"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={visibleCategoria}
              onChange={() => setVisibleCategoria(!visibleCategoria)}
              className="h-4 w-4"
            />
            <label className="text-sm">Visible</label>
          </div>
        </div>

        {/* ===== Icono y Banner ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Icono */}
          <div className="flex flex-col items-center border rounded-lg py-4 px-2 bg-slate-50">
            <p className="text-sm font-medium mb-2 text-slate-700">Ícono</p>
            <div className="w-28 h-28 flex items-center justify-center bg-yellow-100 border rounded-full mb-3 overflow-hidden">
              {icono ? (
                <img
                  src={icono}
                  alt="Ícono categoría"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-5xl text-yellow-500">?</span>
              )}
            </div>
            <label className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-sm cursor-pointer">
              + Seleccionar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "icono")}
              />
            </label>
          </div>

          {/* Banner */}
          <div className="flex flex-col items-center border rounded-lg py-4 px-2 bg-slate-50">
            <p className="text-sm font-medium mb-2 text-slate-700">
              Banner (600x400 recomendado)
            </p>
            <div className="w-48 h-28 flex items-center justify-center bg-yellow-100 border rounded mb-3 overflow-hidden">
              {banner ? (
                <img
                  src={banner}
                  alt="Banner categoría"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-5xl text-yellow-500">?</span>
              )}
            </div>
            <label className="bg-sky-600 hover:bg-sky-700 text-white px-3 py-1 rounded text-sm cursor-pointer">
              + Seleccionar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "banner")}
              />
            </label>
          </div>
        </div>

        {/* ===== Botones ===== */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
          >
            Guardar Categoría
          </button>
        </div>

        {/* ===== Media Queries ===== */}
        <style>
          {`
            @media (max-width: 640px) {
              .max-w-3xl {
                width: 95%;
              }
              .text-xl {
                font-size: 1.25rem;
              }
              .text-sm {
                font-size: 0.85rem;
              }
            }

            @media (min-width: 768px) {
              .max-w-3xl {
                width: 85%;
              }
            }

            @media (min-width: 1024px) {
              .max-w-3xl {
                width: 70%;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-3">
      <div className="relative w-full max-w-3xl bg-white/90 backdrop-blur-lg border border-orange-100 rounded-2xl shadow-xl p-8 overflow-y-auto max-h-[90vh] transition-all duration-300">
        {/* ===== Botón Cerrar ===== */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/70 hover:bg-rose-100 text-slate-600 hover:text-red-600 shadow-sm transition"
        >
          <X size={18} />
        </button>

        {/* ===== Título ===== */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent">
            Agregar nueva categoría
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Las categorías se aplican en todas las sedes activas del sistema.
          </p>
        </div>

        {/* ===== Formulario ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-orange-300 outline-none"
              placeholder="Ej: Verduras"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Posición
            </label>
            <input
              type="number"
              value={posicion}
              onChange={(e) => setPosicion(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-orange-300 outline-none"
              placeholder="Ej: 1"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Texto indicativo
            </label>
            <input
              type="text"
              value={textoIndicativo}
              onChange={(e) => setTextoIndicativo(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 focus:ring-2 focus:ring-orange-300 outline-none"
              placeholder="Ej: Productos frescos del campo"
            />
          </div>
          <div className="flex items-center gap-2 mt-2 sm:col-span-2">
            <input
              type="checkbox"
              checked={visibleCategoria}
              onChange={() => setVisibleCategoria(!visibleCategoria)}
              className="h-4 w-4 accent-orange-500"
            />
            <label className="text-sm text-slate-700">Visible</label>
          </div>
        </div>

        {/* ===== Icono y Banner ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Icono */}
          <div className="flex flex-col items-center border border-orange-100 rounded-xl bg-orange-50/40 py-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm font-medium mb-3 text-slate-700">Ícono</p>
            <div className="w-28 h-28 flex items-center justify-center bg-white border border-orange-200 rounded-full mb-3 overflow-hidden">
              {icono ? (
                <img
                  src={icono}
                  alt="Ícono categoría"
                  className="object-cover w-full h-full"
                />
              ) : (
                <ImageIcon size={36} className="text-orange-500" />
              )}
            </div>
            <label className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 text-white px-3 py-1.5 rounded-lg text-sm cursor-pointer transition">
              <Upload size={14} /> Seleccionar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, "icono")}
              />
            </label>
          </div>

          {/* Banner */}
          <div className="flex flex-col items-center border border-orange-100 rounded-xl bg-orange-50/40 py-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm font-medium mb-3 text-slate-700">
              Banner (600x400 recomendado)
            </p>
            <div className="w-48 h-28 flex items-center justify-center bg-white border border-orange-200 rounded-lg mb-3 overflow-hidden">
              {banner ? (
                <img
                  src={banner}
                  alt="Banner categoría"
                  className="object-cover w-full h-full"
                />
              ) : (
                <ImageIcon size={36} className="text-orange-500" />
              )}
            </div>
            <label className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 text-white px-3 py-1.5 rounded-lg text-sm cursor-pointer transition">
              <Upload size={14} /> Seleccionar
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
            className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm shadow-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            className="bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm font-medium shadow-sm"
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

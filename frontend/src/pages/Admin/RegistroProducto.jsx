// src/pages/RegistroProductos.jsx
import React from "react";

export default function RegistroProductos() {
  return (
    <div className="w-full px-4 sm:px-40 max-w-[calc(200%-16rem)]">
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 text-slate-700">
        Registro de Productos Sede
      </h1>

      {/* Contenedor principal con grid responsive */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Imagen */}
          <div className="flex flex-col items-center justify-center border rounded p-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-slate-100 flex items-center justify-center rounded-full">
              <span className="text-3xl sm:text-4xl md:text-5xl text-slate-400">?</span>
            </div>
            <button className="mt-3 bg-sky-600 hover:bg-sky-700 text-white px-2 sm:px-3 py-1 rounded text-xs sm:text-sm">
              + Seleccionar
            </button>
          </div>

          {/* Columna izquierda */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">
                Tipo de producto
              </label>
              <select className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                <option>Seleccione...</option>
                <option>Báscula</option>
                <option>Compra y Venta</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">Código</label>
              <input
                type="text"
                className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                placeholder="Ej: A001"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">Nombre</label>
              <input
                type="text"
                className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                placeholder="Ej: Cebolla blanca"
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">Precio de compra</label>
              <input
                type="number"
                className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                placeholder="$0,00"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">Precio de venta</label>
              <input
                type="number"
                className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm"
                placeholder="$0,00"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">Categoría</label>
              <select className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                <option>Seleccione...</option>
                <option>Verduras</option>
                <option>Frutas</option>
                <option>Abarrotes</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-slate-600 mb-1">Subcategoría</label>
              <select className="w-full border rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm">
                <option>Seleccione...</option>
                <option>Clase A</option>
                <option>Clase B</option>
                <option>Clase C</option>
              </select>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded text-sm shadow">
            Cancelar
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm shadow">
            Registrar Producto
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { X, Tag } from "lucide-react";

export default function EditarProducto({ producto, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...producto });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl w-[90%] max-w-md p-6 relative">
        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-rose-500"
        >
          <X size={20} />
        </button>

        {/* Encabezado */}
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Tag size={18} className="text-orange-500" />
          Editar Producto
        </h2>

        {/* Campos */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Precio Compra
              </label>
              <input
                type="number"
                value={formData.precioCompra}
                onChange={(e) =>
                  handleChange("precioCompra", parseFloat(e.target.value))
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Precio Venta
              </label>
              <input
                type="number"
                value={formData.precioVenta}
                onChange={(e) =>
                  handleChange("precioVenta", parseFloat(e.target.value))
                }
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleChange("categoria", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              >
                <option>Verduras</option>
                <option>Frutas</option>
                <option>Abarrotes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Tipo de Producto
              </label>
              <select
                value={formData.tipo}
                onChange={(e) => handleChange("tipo", e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              >
                <option>Báscula</option>
                <option>Compra y Venta</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={formData.activo}
              onChange={(e) => handleChange("activo", e.target.checked)}
              className="h-4 w-4 text-emerald-600"
            />
            <label className="text-sm text-slate-700">Producto activo</label>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-4 py-2 rounded-md text-sm"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

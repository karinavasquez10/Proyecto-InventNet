// src/components/Admin/EditarProducto.jsx - Form con campos reales, selects para cat/unidad
import React, { useState } from "react";
import { X, Tag, Package, Scale } from "lucide-react";

export default function EditarProducto({ producto, onClose, onSave, categorias = [] }) {
  const [formData, setFormData] = useState({ ...producto });

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // Validar campos requeridos
    if (!formData.nombre || !formData.id_categoria || !formData.precio_compra || !formData.precio_venta) {
      alert("Completa los campos obligatorios");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl w-[90%] max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Cerrar */}
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-500 hover:text-rose-500">
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
            <label className="block text-sm text-slate-600 mb-1">Nombre *</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => handleChange("nombre", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">Descripción</label>
            <textarea
              value={formData.descripcion || ""}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              rows={2}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Categoría *</label>
              <select
                value={formData.id_categoria}
                onChange={(e) => handleChange("id_categoria", parseInt(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              >
                <option value="">Selecciona...</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Unidad</label>
              <select
                value={formData.id_unidad || ""}
                onChange={(e) => handleChange("id_unidad", e.target.value ? parseInt(e.target.value) : null)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              >
                <option value="">Ninguna</option>
                {/* Asumir fetch de unidades en props o global; por ahora placeholder */}
                <option value={1}>Unidad (Ud)</option>
                <option value={2}>Kilo (Kg)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Precio Compra *</label>
              <input
                type="number"
                step="0.01"
                value={formData.precio_compra}
                onChange={(e) => handleChange("precio_compra", parseFloat(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Precio Venta *</label>
              <input
                type="number"
                step="0.01"
                value={formData.precio_venta}
                onChange={(e) => handleChange("precio_venta", parseFloat(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Stock Actual</label>
              <input
                type="number"
                step="0.01"
                value={formData.stock_actual}
                onChange={(e) => handleChange("stock_actual", parseFloat(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-1">Stock Mínimo</label>
              <input
                type="number"
                step="0.01"
                value={formData.stock_minimo}
                onChange={(e) => handleChange("stock_minimo", parseFloat(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-600 mb-1">Stock Máximo</label>
              <input
                type="number"
                step="0.01"
                value={formData.stock_maximo}
                onChange={(e) => handleChange("stock_maximo", parseFloat(e.target.value))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
              />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={formData.estado}
                onChange={(e) => handleChange("estado", e.target.checked)}
                className="h-4 w-4 text-emerald-600"
              />
              <label className="text-sm text-slate-700">Activo</label>
            </div>
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
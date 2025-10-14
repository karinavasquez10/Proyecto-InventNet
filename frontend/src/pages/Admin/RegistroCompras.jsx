// src/pages/Admin/RegistroCompras.jsx
import React, { useState } from "react";
import { Package, ShoppingBag, FileText, Trash2, DollarSign } from "lucide-react";

export default function RegistroCompras() {
  const [compras, setCompras] = useState([]);
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    proveedor: "",
    producto: "",
    cantidad: "",
    costo: "",
    categoria: "",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = () => {
    if (!form.producto || !form.cantidad || !form.costo) {
      alert("Completa los campos obligatorios");
      return;
    }
    setCompras([...compras, { ...form, id: Date.now() }]);
    setForm({
      ...form,
      producto: "",
      cantidad: "",
      costo: "",
    });
  };

  const handleDelete = (id) => setCompras(compras.filter((c) => c.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 px-6 sm:px-23 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2.5 rounded-lg shadow-md text-white">
          <ShoppingBag size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Registro de Compras
        </h1>
      </div>

      {/* ===== Formulario ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => handleChange("fecha", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Proveedor
            </label>
            <input
              type="text"
              value={form.proveedor}
              onChange={(e) => handleChange("proveedor", e.target.value)}
              placeholder="Nombre proveedor"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Categoría
            </label>
            <select
              value={form.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            >
              <option>Seleccione...</option>
              <option>Frutas</option>
              <option>Verduras</option>
              <option>Abarrotes</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Producto
            </label>
            <input
              type="text"
              value={form.producto}
              onChange={(e) => handleChange("producto", e.target.value)}
              placeholder="Ej: Arroz Roa 500g"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cantidad
            </label>
            <input
              type="number"
              value={form.cantidad}
              onChange={(e) => handleChange("cantidad", e.target.value)}
              placeholder="Ej: 10"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Costo Unitario
            </label>
            <input
              type="number"
              value={form.costo}
              onChange={(e) => handleChange("costo", e.target.value)}
              placeholder="$0.00"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm transition flex items-center gap-2"
          >
            <DollarSign size={16} /> Registrar Compra
          </button>
        </div>
      </div>

      {/* ===== Tabla de Compras ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">
          Compras Registradas ({compras.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-400/80 to-yellow-400/80 text-white">
              <tr>
                {[
                  "Fecha",
                  "Proveedor",
                  "Producto",
                  "Cantidad",
                  "Costo",
                  "Categoría",
                  "Total",
                  "Acciones",
                ].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-xs uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compras.length > 0 ? (
                compras.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-orange-50 transition">
                    <td className="px-4 py-2">{c.fecha}</td>
                    <td className="px-4 py-2">{c.proveedor}</td>
                    <td className="px-4 py-2">{c.producto}</td>
                    <td className="px-4 py-2">{c.cantidad}</td>
                    <td className="px-4 py-2">${c.costo}</td>
                    <td className="px-4 py-2">{c.categoria}</td>
                    <td className="px-4 py-2 font-semibold text-orange-600">
                      ${c.cantidad * c.costo}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-md text-xs shadow"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-slate-400">
                    No hay compras registradas aún...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

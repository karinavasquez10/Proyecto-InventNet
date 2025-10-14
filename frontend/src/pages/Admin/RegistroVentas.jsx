// src/pages/Admin/RegistroVentas.jsx
import React, { useState } from "react";
import { ShoppingCart, DollarSign, User, Trash2, FileText } from "lucide-react";

export default function RegistroVentas() {
  const [ventas, setVentas] = useState([]);
  const [form, setForm] = useState({
    fecha: new Date().toISOString().split("T")[0],
    cliente: "",
    producto: "",
    cantidad: "",
    precio: "",
    medioPago: "Efectivo",
  });

  const handleChange = (key, value) => setForm({ ...form, [key]: value });

  const handleSubmit = () => {
    if (!form.producto || !form.cantidad || !form.precio) {
      alert("Por favor completa los campos obligatorios");
      return;
    }
    setVentas([...ventas, { ...form, id: Date.now() }]);
    setForm({
      ...form,
      producto: "",
      cantidad: "",
      precio: "",
    });
  };

  const handleDelete = (id) => setVentas(ventas.filter((v) => v.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 px-6 sm:px-22 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-2.5 rounded-lg shadow-md text-white">
          <ShoppingCart size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Registro de Ventas
        </h1>
      </div>

      {/* ===== Formulario ===== */}
      <div className="bg-white/90 border border-emerald-100 rounded-2xl shadow-md p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={form.fecha}
              onChange={(e) => handleChange("fecha", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cliente
            </label>
            <input
              type="text"
              value={form.cliente}
              onChange={(e) => handleChange("cliente", e.target.value)}
              placeholder="Nombre del cliente"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Medio de Pago
            </label>
            <select
              value={form.medioPago}
              onChange={(e) => handleChange("medioPago", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            >
              <option>Efectivo</option>
              <option>Nequi</option>
              <option>Tarjeta</option>
              <option>Transferencia</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Producto
            </label>
            <input
              type="text"
              value={form.producto}
              onChange={(e) => handleChange("producto", e.target.value)}
              placeholder="Ej: Cebolla Blanca"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
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
              placeholder="Ej: 2"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Precio Unitario
            </label>
            <input
              type="number"
              value={form.precio}
              onChange={(e) => handleChange("precio", e.target.value)}
              placeholder="$0.00"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm transition flex items-center gap-2"
          >
            <DollarSign size={16} /> Registrar Venta
          </button>
        </div>
      </div>

      {/* ===== Tabla de Ventas ===== */}
      <div className="bg-white/90 border border-emerald-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">
          Ventas Registradas ({ventas.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-emerald-400/80 to-green-400/80 text-white">
              <tr>
                {[
                  "Fecha",
                  "Cliente",
                  "Producto",
                  "Cantidad",
                  "Precio",
                  "Medio de Pago",
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
              {ventas.length > 0 ? (
                ventas.map((v) => (
                  <tr key={v.id} className="border-b border-slate-100 hover:bg-emerald-50 transition">
                    <td className="px-4 py-2">{v.fecha}</td>
                    <td className="px-4 py-2">{v.cliente}</td>
                    <td className="px-4 py-2">{v.producto}</td>
                    <td className="px-4 py-2">{v.cantidad}</td>
                    <td className="px-4 py-2">${v.precio}</td>
                    <td className="px-4 py-2">{v.medioPago}</td>
                    <td className="px-4 py-2 font-semibold text-emerald-600">
                      ${v.cantidad * v.precio}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(v.id)}
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
                    No hay ventas registradas aún...
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

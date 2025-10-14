// src/pages/Admin/Auditoria.jsx
import React, { useState } from "react";
import { FileText, Search, Calendar, UserCircle, RefreshCcw } from "lucide-react";

export default function Auditoria() {
  const [filtro, setFiltro] = useState({
    usuario: "",
    modulo: "",
    fecha: "",
  });

  const [registros, setRegistros] = useState([
    {
      id: 1,
      usuario: "Karen Hoyos",
      modulo: "Ventas",
      accion: "Registró nueva venta POS-024",
      fecha: "2025-10-14 08:42 AM",
    },
    {
      id: 2,
      usuario: "Ana López",
      modulo: "Inventario",
      accion: "Actualizó precio del producto Cebolla blanca",
      fecha: "2025-10-14 09:01 AM",
    },
    {
      id: 3,
      usuario: "Luis Torres",
      modulo: "Configuración",
      accion: "Cambió tema a oscuro",
      fecha: "2025-10-14 09:30 AM",
    },
  ]);

  const handleFiltrar = () => {
    alert("Filtro simulado. En producción consultaría el backend.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 px-6 sm:px-22 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-2.5 rounded-lg shadow-md text-white">
          <FileText size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Auditoría del Sistema
        </h1>
      </div>

      {/* ===== Filtros ===== */}
      <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-md p-6 mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Search size={18} className="text-amber-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Filtros de búsqueda
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Usuario
            </label>
            <input
              type="text"
              value={filtro.usuario}
              onChange={(e) => setFiltro({ ...filtro, usuario: e.target.value })}
              placeholder="Ej: Karen Hoyos"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Módulo
            </label>
            <select
              value={filtro.modulo}
              onChange={(e) => setFiltro({ ...filtro, modulo: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200"
            >
              <option>Todos</option>
              <option>Ventas</option>
              <option>Compras</option>
              <option>Inventario</option>
              <option>Configuración</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={filtro.fecha}
              onChange={(e) => setFiltro({ ...filtro, fecha: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleFiltrar}
            className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2"
          >
            <Search size={16} /> Buscar
          </button>
          <button className="bg-slate-400 hover:bg-slate-500 text-white px-5 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2">
            <RefreshCcw size={16} /> Limpiar
          </button>
        </div>
      </div>

      {/* ===== Tabla de registros ===== */}
      <div className="bg-white/90 border border-amber-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-slate-700 flex items-center gap-2">
          <Calendar size={18} className="text-amber-500" />
          Registros recientes ({registros.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-amber-400/80 to-orange-400/80 text-white">
              <tr>
                {["Fecha", "Usuario", "Módulo", "Acción"].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-xs uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-slate-100 hover:bg-amber-50 transition"
                >
                  <td className="px-4 py-2">{r.fecha}</td>
                  <td className="px-4 py-2 flex items-center gap-2">
                    <UserCircle size={16} className="text-amber-500" />
                    {r.usuario}
                  </td>
                  <td className="px-4 py-2">{r.modulo}</td>
                  <td className="px-4 py-2 text-slate-700">{r.accion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

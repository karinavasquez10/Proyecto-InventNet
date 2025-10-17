import React, { useState } from "react";
import { Trash2, RotateCcw, XCircle, Search } from "lucide-react";

export default function GestionPapelera() {
  // 🔹 Datos simulados
  const [items, setItems] = useState([
    { id: 1, tipo: "Producto", nombre: "Tomate chonto", eliminadoPor: "Karen Hoyos", fecha: "2025-10-10" },
    { id: 2, tipo: "Cliente", nombre: "Restaurante La Ceiba", eliminadoPor: "Juliana Hoyos", fecha: "2025-10-09" },
    { id: 3, tipo: "Proveedor", nombre: "Frutas del Sur", eliminadoPor: "Ana Yuliana", fecha: "2025-10-05" },
  ]);

  const [busqueda, setBusqueda] = useState("");

  const handleRestaurar = (id) => {
    const item = items.find((i) => i.id === id);
    alert(`✅ "${item.nombre}" ha sido restaurado correctamente.`);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleEliminarDefinitivo = (id) => {
    const item = items.find((i) => i.id === id);
    if (window.confirm(`¿Eliminar definitivamente "${item.nombre}"? Esta acción no se puede deshacer.`)) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const filtrados = items.filter(
    (i) =>
      i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 sm:px-18 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2.5 rounded-lg shadow-md text-white">
          <Trash2 size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Gestión de la Papelera
        </h1>
      </div>

      {/* ===== Cuadro de búsqueda ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <Search size={18} className="text-orange-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Buscar elementos eliminados
          </h2>
        </div>
        <input
          type="text"
          placeholder="Buscar por nombre o tipo..."
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* ===== Tabla de elementos eliminados ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">
          Elementos eliminados ({items.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
              <tr>
                {["#", "Tipo", "Nombre", "Eliminado por", "Fecha", "Acciones"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left text-xs uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.length > 0 ? (
                filtrados.map((item, idx) => (
                  <tr
                    key={item.id}
                    className="border-b border-orange-100 hover:bg-orange-50 transition"
                  >
                    <td className="px-4 py-2 text-slate-600">{idx + 1}</td>
                    <td className="px-4 py-2 text-slate-800 font-medium">
                      {item.tipo}
                    </td>
                    <td className="px-4 py-2 text-slate-700">{item.nombre}</td>
                    <td className="px-4 py-2 text-slate-600">{item.eliminadoPor}</td>
                    <td className="px-4 py-2 text-slate-500">{item.fecha}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => handleRestaurar(item.id)}
                        className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                      >
                        <RotateCcw size={14} /> Restaurar
                      </button>
                      <button
                        onClick={() => handleEliminarDefinitivo(item.id)}
                        className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                      >
                        <XCircle size={14} /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-slate-400 text-sm"
                  >
                    🗑️ No hay elementos eliminados o no coinciden con la búsqueda.
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

// src/pages/CierresCaja.jsx
import React from "react";

export default function CierresCaja() {
  return (
    <div className="p-4 sm:p-1 w-full max-w-[calc(150%-16rem)]">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-slate-1000">
        Consultas de Cierres de Caja
      </h1>

      {/* ===== Parámetros de consulta ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Parámetros de consulta
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha Inicial</label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1.5 text-sm focus:ring focus:ring-sky-200"
              defaultValue="2025-09-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fecha Final</label>
            <input
              type="date"
              className="w-full border rounded px-2 py-1.5 text-sm focus:ring focus:ring-sky-200"
              defaultValue="2025-09-20"
            />
          </div>

          <div className="flex items-end">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm w-full sm:w-auto">
              Consultar
            </button>
          </div>
        </div>

        {/* Total descuadre */}
        <div className="mt-6 text-slate-700 font-medium text-sm sm:text-base">
          Total Descuadre:{" "}
          <span className="font-bold text-red-600">$ 0.0</span>
        </div>
      </div>

      {/* ===== Lista de cierres ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Lista de cierres (0)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border">
            <thead className="bg-slate-100 text-slate-600">
              <tr className="text-left">
                <th className="px-2 py-2 border">Fecha Comienzo</th>
                <th className="px-2 py-2 border">Hora Comienzo</th>
                <th className="px-2 py-2 border">Fecha Cierre</th>
                <th className="px-2 py-2 border">Hora Cierre</th>
                <th className="px-2 py-2 border">Num Cierre</th>
                <th className="px-2 py-2 border">Cajero</th>
                <th className="px-2 py-2 border">Cobros en efectivo</th>
                <th className="px-2 py-2 border">Base Caja</th>
                <th className="px-2 py-2 border">Efectivo Teórico</th>
                <th className="px-2 py-2 border">Efectivo Recogido</th>
                <th className="px-2 py-2 border">Descuadre</th>
                <th className="px-2 py-2 border">Turno Cerrado</th>
                <th className="px-2 py-2 border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="13" className="text-center text-slate-400 py-4">
                  No se encontraron registros.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

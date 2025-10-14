import React from "react";
import { CalendarRange, Search, Calculator } from "lucide-react";

export default function CierresCaja() {
  return (
    <div className="p-4 sm:p-1 w-full max-w-[calc(150%-16rem)]">
      {/* ===== Título ===== */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2.5 rounded-lg shadow-md text-white">
          <Calculator size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Consultas de Cierres de Caja
        </h1>
      </div>

      {/* ===== Parámetros de consulta ===== */}
      <div className="bg-white/95 rounded-xl shadow-md border border-orange-100 p-4 sm:p-6 mb-6 transition hover:shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <CalendarRange size={18} className="text-orange-500" />
          <h2 className="text-base sm:text-lg font-semibold text-slate-700">
            Parámetros de consulta
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Fecha Inicial */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha Inicial
            </label>
            <input
              type="date"
              className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none transition"
              defaultValue="2025-09-20"
            />
          </div>

          {/* Fecha Final */}
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha Final
            </label>
            <input
              type="date"
              className="w-full border border-slate-300 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none transition"
              defaultValue="2025-09-20"
            />
          </div>

          {/* Botón consultar */}
          <div className="flex items-end">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm shadow-md transition">
              <Search size={16} /> Consultar
            </button>
          </div>
        </div>

        {/* Total descuadre */}
        <div className="mt-6 text-slate-700 font-medium text-sm sm:text-base flex items-center gap-2">
          <Calculator size={16} className="text-red-500" />
          <p>
            Total Descuadre:{" "}
            <span className="font-bold text-red-600">$ 0.00</span>
          </p>
        </div>
      </div>

      {/* ===== Lista de cierres ===== */}
      <div className="bg-white/95 rounded-xl shadow-md border border-orange-100 p-4 sm:p-6 transition hover:shadow-lg">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
          Lista de Cierres <span className="text-slate-500 text-sm">(0)</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
              <tr className="text-left">
                {[
                  "Fecha Comienzo",
                  "Hora Comienzo",
                  "Fecha Cierre",
                  "Hora Cierre",
                  "Num Cierre",
                  "Cajero",
                  "Cobros Efectivo",
                  "Base Caja",
                  "Efectivo Teórico",
                  "Efectivo Recogido",
                  "Descuadre",
                  "Turno Cerrado",
                  "Acciones",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-2 py-2 border text-[11px] sm:text-xs font-semibold uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan="13"
                  className="text-center text-slate-400 py-4 text-sm"
                >
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

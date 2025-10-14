import React from "react";
import { Filter, ArrowUpCircle, ClipboardList } from "lucide-react";

export default function Salidas() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 sm:px-12 py-10 rounded-xl">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2.5 rounded-lg shadow-md text-white">
          <ArrowUpCircle size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Control de Salidas de Materias Primas
        </h1>
      </div>

      {/* ===== Filtros ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} className="text-orange-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Filtros de búsqueda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Buscar responsable..."
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
          />
          <input
            type="date"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
          />
          <input
            type="date"
            className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm shadow-md transition">
            Aplicar filtros
          </button>
          <button className="bg-gradient-to-r from-slate-300 to-slate-400 hover:brightness-105 text-slate-800 px-4 py-2.5 rounded-lg text-sm shadow-md transition">
            Limpiar
          </button>
        </div>
      </div>

      {/* ===== Registro de nueva salida ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <ArrowUpCircle size={18} className="text-green-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Registrar nueva salida
          </h2>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Producto
            </label>
            <input
              type="text"
              placeholder="Nombre del producto"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Cantidad retirada
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha
            </label>
            <input
              type="date"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Responsable
            </label>
            <input
              type="text"
              placeholder="Nombre del responsable"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Motivo de salida
            </label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none">
              <option>Producción</option>
              <option>Merma o daño</option>
              <option>Traslado de bodega</option>
              <option>Otro</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Observaciones
            </label>
            <textarea
              rows="2"
              placeholder="Notas adicionales..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            ></textarea>
          </div>

          <div className="md:col-span-3 flex justify-end gap-3 mt-2">
            <button
              type="reset"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:brightness-110 text-white px-5 py-2.5 rounded-lg text-sm shadow-md transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-5 py-2.5 rounded-lg text-sm shadow-md transition"
            >
              Registrar salida
            </button>
          </div>
        </form>
      </div>

      {/* ===== Historial de salidas ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">
          Historial de Salidas
        </h2>

        <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
            <tr>
              {[
                "Fecha",
                "Producto",
                "Cantidad",
                "Responsable",
                "Motivo",
                "Observaciones",
                "Acciones",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-2 text-left text-xs uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-orange-100 hover:bg-orange-50 transition">
              <td className="px-4 py-2">2025-10-12</td>
              <td className="px-4 py-2">Harina de trigo</td>
              <td className="px-4 py-2">20 kg</td>
              <td className="px-4 py-2">Karen Hoyos</td>
              <td className="px-4 py-2">Producción</td>
              <td className="px-4 py-2">Panadería principal</td>
              <td className="px-4 py-2">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs shadow">
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow">
                    Eliminar
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs shadow">
                    Ver
                  </button>
                </div>
              </td>
            </tr>

            <tr>
              <td
                colSpan="7"
                className="text-center py-4 text-slate-400 text-sm"
              >
                Más registros aparecerán aquí...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

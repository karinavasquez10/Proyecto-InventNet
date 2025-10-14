import React, { useState } from "react";
import { CalendarRange, FileText, DollarSign, Search } from "lucide-react";

export default function ConsultarVentas() {
  const [formato, setFormato] = useState("detallado");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 sm:px-12 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2.5 rounded-lg shadow-md text-white">
          <FileText size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Consultar Ventas
        </h1>
      </div>

      {/* ===== Filtros ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-6">
          <CalendarRange size={18} className="text-orange-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Filtros de búsqueda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha Inicial
            </label>
            <input
              type="date"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              defaultValue="2025-09-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha Final
            </label>
            <input
              type="date"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              defaultValue="2025-09-20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Usuario
            </label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none">
              <option>Todos los usuarios</option>
              <option>Ana Yuliana Hoyos</option>
              <option>Karen Hoyos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Formato
            </label>
            <div className="flex gap-4 mt-2 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="formato"
                  value="estandar"
                  checked={formato === "estandar"}
                  onChange={() => setFormato("estandar")}
                  className="text-orange-500"
                />
                Estándar
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="formato"
                  value="detallado"
                  checked={formato === "detallado"}
                  onChange={() => setFormato("detallado")}
                  className="text-orange-500"
                />
                Detallado
              </label>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="bg-gradient-to-r from-red-500 to-red-600 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition">
            Anuladas
          </button>
          <button className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition">
            Pendientes
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition flex items-center gap-2">
            <Search size={16} /> Consultar
          </button>
        </div>
      </div>

      {/* ===== Resumen general ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8">
        <div className="flex items-center gap-2 mb-5">
          <DollarSign size={18} className="text-green-500" />
          <h2 className="text-lg font-semibold text-slate-700">
            Resumen de Ventas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700">
          <div>
            <p><span className="font-semibold">Total Venta Bruta:</span> $534,518</p>
            <p><span className="font-semibold">Total Cobros por Domicilios:</span> $0</p>
            <p><span className="font-semibold">Total Descuentos:</span> $0</p>
            <p><span className="font-semibold">Venta Neta:</span> $534,518</p>
          </div>
          <div>
            <p><span className="font-semibold">Total Propinas:</span> $0</p>
            <p><span className="font-semibold">Total Costo:</span> $123,624</p>
            <p><span className="font-semibold">Ganancia Estimada:</span> $410,894</p>
            <p><span className="font-semibold">% de Ganancia:</span> 76.87%</p>
          </div>
          <div className="bg-orange-50/70 border border-orange-100 rounded-lg p-3">
            <p className="text-slate-600 text-sm">
              💡 <span className="font-medium text-orange-600">Sugerencia:</span> La ganancia se mantiene estable este mes.  
              Considera revisar descuentos y costos para maximizar el margen.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Medios de pago ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">Medios de Pago</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: "💵", metodo: "Contado", valor: "$492,629" },
            { icon: "📱", metodo: "Nequi", valor: "$41,889" },
            { icon: "💳", metodo: "Tarjeta", valor: "$0" },
          ].map((pago, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border border-slate-200 rounded-lg p-4 hover:bg-orange-50 transition"
            >
              <span className="text-2xl">{pago.icon}</span>
              <div>
                <p className="font-medium text-slate-800">{pago.metodo}</p>
                <p className="text-slate-600 text-sm">{pago.valor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Listado de facturas ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">
          Listado de Facturas (86)
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
              <tr>
                {["Factura", "Cliente", "Fecha", "Total", "Estado"].map((col) => (
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
              <tr className="border-b border-orange-100 hover:bg-orange-50 transition">
                <td className="px-4 py-2">001</td>
                <td className="px-4 py-2">Cliente Prueba</td>
                <td className="px-4 py-2">20/09/2025</td>
                <td className="px-4 py-2">$123,000</td>
                <td className="px-4 py-2 text-green-600 font-medium">Pagada</td>
              </tr>
              <tr className="border-b border-orange-100 hover:bg-orange-50 transition">
                <td className="px-4 py-2">002</td>
                <td className="px-4 py-2">Cliente Ejemplo</td>
                <td className="px-4 py-2">20/09/2025</td>
                <td className="px-4 py-2">$411,518</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">Pendiente</td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center py-4 text-slate-400 text-sm">
                  Más registros aparecerán aquí...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

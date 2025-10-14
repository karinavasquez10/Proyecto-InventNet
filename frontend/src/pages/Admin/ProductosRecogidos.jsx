import React, { useState } from "react";
import { PackageSearch, CalendarRange } from "lucide-react";

export default function ProductosRecogidos() {
  const [fechaInicial, setFechaInicial] = useState("2025-10-06");
  const [fechaFinal, setFechaFinal] = useState("2025-10-06");
  const [resultados, setResultados] = useState([]);

  const handleConsultar = () => {
    setResultados([
      {
        fecha: "2025-10-06",
        usuario: "Karen Hoyos",
        producto: "Cebolla Blanca Pelada",
        precioVenta: "$4.000",
        cantidadDisponible: "120",
        cantidadRecogida: "20",
        saldo: "100",
        observacion: "Producto parcialmente recogido",
      },
      {
        fecha: "2025-10-06",
        usuario: "Ana López",
        producto: "Aceite El Valle X500",
        precioVenta: "$3.600",
        cantidadDisponible: "50",
        cantidadRecogida: "50",
        saldo: "0",
        observacion: "Stock agotado",
      },
    ]);
  };

  return (
    <div className="p-4 sm:p-14 w-full max-w-[calc(150%-16rem)] mt-0">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2.5 rounded-lg text-white shadow-md">
          <PackageSearch size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Consulta de Productos Recogidos
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        MERKA FRUVER FLORENCIA
      </p>

      {/* ===== Filtros ===== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-slate-700 flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
          <CalendarRange size={18} className="text-orange-500" />
          Parámetros de consulta
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha inicial
            </label>
            <input
              type="date"
              value={fechaInicial}
              onChange={(e) => setFechaInicial(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha final
            </label>
            <input
              type="date"
              value={fechaFinal}
              onChange={(e) => setFechaFinal(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
            />
          </div>

          <div className="flex sm:justify-end">
            <button
              onClick={handleConsultar}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-5 py-2.5 rounded-md text-sm shadow-sm transition"
            >
              Consultar
            </button>
          </div>
        </div>
      </div>

      {/* ===== Resultados ===== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-700">
            Lista de productos ({resultados.length})
          </h2>
          <span className="text-xs text-slate-500">
            Resultados de búsqueda
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-3 py-2 text-left">Fecha</th>
                <th className="px-3 py-2 text-left">Usuario</th>
                <th className="px-3 py-2 text-left">Producto</th>
                <th className="px-3 py-2 text-left">Precio venta</th>
                <th className="px-3 py-2 text-left">Disponibles</th>
                <th className="px-3 py-2 text-left">Recogidas</th>
                <th className="px-3 py-2 text-center">Saldo</th>
                <th className="px-3 py-2 text-left">Observación</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {resultados.length > 0 ? (
                resultados.map((item, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 transition duration-150"
                  >
                    <td className="px-3 py-2">{item.fecha}</td>
                    <td className="px-3 py-2">{item.usuario}</td>
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {item.producto}
                    </td>
                    <td className="px-3 py-2">{item.precioVenta}</td>
                    <td className="px-3 py-2">{item.cantidadDisponible}</td>
                    <td className="px-3 py-2">{item.cantidadRecogida}</td>
                    <td className="px-3 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          item.saldo === "0"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.saldo}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-600">
                      {item.observacion}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-slate-400 py-6 text-sm"
                  >
                    No se encontraron registros para las fechas seleccionadas.
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

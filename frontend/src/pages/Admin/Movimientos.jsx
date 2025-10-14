import React, { useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, Wallet, FileSpreadsheet, Filter } from "lucide-react";

export default function Movimientos() {
  const [tipoFiltro, setTipoFiltro] = useState("todos");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  const movimientos = [
    {
      id: 1,
      fecha: "2025-10-10",
      tipo: "Ingreso",
      descripcion: "Venta factura #00125",
      monto: 420000,
      metodo: "Efectivo",
      usuario: "Karen Hoyos",
    },
    {
      id: 2,
      fecha: "2025-10-11",
      tipo: "Egreso",
      descripcion: "Compra de insumos (Harina y Aceite)",
      monto: 180000,
      metodo: "Transferencia",
      usuario: "Carlos Pérez",
    },
    {
      id: 3,
      fecha: "2025-10-12",
      tipo: "Ingreso",
      descripcion: "Abono de cliente",
      monto: 95000,
      metodo: "Nequi",
      usuario: "Karen Hoyos",
    },
  ];

  const ingresos = movimientos
    .filter((m) => m.tipo === "Ingreso")
    .reduce((sum, m) => sum + m.monto, 0);
  const egresos = movimientos
    .filter((m) => m.tipo === "Egreso")
    .reduce((sum, m) => sum + m.monto, 0);
  const saldo = ingresos - egresos;

  return (
    <div className="p-4 sm:p-14 w-full max-w-[calc(150%-16rem)] mt-1">
      {/* ===== TÍTULO ===== */}
      <div className="flex items-center gap-3 mb-2 -mt-2">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2.5 rounded-lg text-white shadow-md">
          <Wallet size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Movimientos Financieros y de Inventario
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-5 font-medium">
        MERKA FRUVER FLORENCIA
      </p>

      {/* ===== INDICADORES ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700 font-semibold">Total Ingresos</p>
            <p className="text-lg font-bold text-green-600">
              ${ingresos.toLocaleString()}
            </p>
          </div>
          <ArrowUpCircle size={26} className="text-green-500" />
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-rose-700 font-semibold">Total Egresos</p>
            <p className="text-lg font-bold text-rose-600">
              ${egresos.toLocaleString()}
            </p>
          </div>
          <ArrowDownCircle size={26} className="text-rose-500" />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-700 font-semibold">Saldo Neto</p>
            <p
              className={`text-lg font-bold ${
                saldo >= 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              ${saldo.toLocaleString()}
            </p>
          </div>
          <Wallet size={24} className="text-blue-500" />
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-700 font-semibold">Movimientos</p>
            <p className="text-lg font-bold text-amber-600">
              {movimientos.length}
            </p>
          </div>
          <FileSpreadsheet size={24} className="text-amber-500" />
        </div>
      </div>

      {/* ===== FILTROS ===== */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-3 text-slate-700 flex items-center gap-2">
          <Filter size={18} className="text-sky-500" />
          Filtros de búsqueda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <select
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
            className="border rounded px-3 py-2 text-sm shadow-sm"
          >
            <option value="todos">Todos los tipos</option>
            <option value="ingreso">Ingresos</option>
            <option value="egreso">Egresos</option>
          </select>

          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="border rounded px-3 py-2 text-sm shadow-sm"
          />
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="border rounded px-3 py-2 text-sm shadow-sm"
          />
          <input
            type="text"
            placeholder="Buscar por descripción o usuario..."
            className="border rounded px-3 py-2 text-sm shadow-sm"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm shadow">
            Aplicar filtros
          </button>
          <button className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm shadow">
            Limpiar
          </button>
        </div>
      </div>

      {/* ===== TABLA DE MOVIMIENTOS ===== */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm border-collapse">
          <thead className="bg-gradient-to-r from-orange-400/90 to-fuchsia-400/90 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Fecha</th>
              <th className="px-4 py-2 text-left">Tipo</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-right">Monto</th>
              <th className="px-4 py-2 text-left">Método</th>
              <th className="px-4 py-2 text-left">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {movimientos.map((m) => (
              <tr
                key={m.id}
                className="hover:bg-orange-50 transition border-b border-slate-100"
              >
                <td className="px-4 py-2">{m.fecha}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    m.tipo === "Ingreso" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {m.tipo}
                </td>
                <td className="px-4 py-2">{m.descripcion}</td>
                <td
                  className={`px-4 py-2 text-right font-semibold ${
                    m.tipo === "Ingreso" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${m.monto.toLocaleString()}
                </td>
                <td className="px-4 py-2">{m.metodo}</td>
                <td className="px-4 py-2">{m.usuario}</td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="6"
                className="text-center text-slate-400 py-4 italic"
              >
                Más registros aquí...
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ===== ACCIONES ===== */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm shadow">
          + Registrar Movimiento
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm shadow">
          Exportar Excel
        </button>
      </div>
    </div>
  );
}

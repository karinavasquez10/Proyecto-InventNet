// src/pages/ConsultarVentas.jsx
import React, { useState } from "react";

export default function ConsultarVentas() {
  const [formato, setFormato] = useState("detallado");

  return (
    <div className="w-full px-4 sm:px-20 lg:px-20 pb-16">
      <h1 className="text-lg sm:text-xl font-bold mb-6">Consultar Ventas</h1>

      {/* Filtros */}
      <div className="bg-white rounded shadow p-4 sm:p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
        <div>
          <label className="block text-xs sm:text-sm font-medium">Fecha Inicial</label>
          <input
            type="date"
            className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm"
            defaultValue="2025-09-20"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium">Fecha Final</label>
          <input
            type="date"
            className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm"
            defaultValue="2025-09-20"
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium">Usuario</label>
          <select className="w-full border rounded px-2 sm:px-3 py-2 text-xs sm:text-sm">
            <option>Todos los usuarios</option>
            <option>Ana Yuliana Hoyos</option>
            <option>Karen Hoyos</option>
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium">Formato</label>
          <div className="flex gap-3 mt-2 text-xs sm:text-sm">
            <label className="flex items-center gap-1 sm:gap-2">
              <input
                type="radio"
                name="formato"
                value="estandar"
                checked={formato === "estandar"}
                onChange={() => setFormato("estandar")}
              />
              Estandar
            </label>
            <label className="flex items-center gap-1 sm:gap-2">
              <input
                type="radio"
                name="formato"
                value="detallado"
                checked={formato === "detallado"}
                onChange={() => setFormato("detallado")}
              />
              Detallado
            </label>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm">
          Anuladas
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm">
          Pendientes
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm">
          Consultar
        </button>
      </div>

      {/* Resumen de ventas */}
      <div className="bg-white rounded shadow p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 text-xs sm:text-sm w-full">
        <div>
          <p><span className="font-semibold">Total Venta Bruta:</span> $534,518</p>
          <p><span className="font-semibold">Total Cobros por domicilios:</span> $0</p>
          <p><span className="font-semibold">Total Descuentos:</span> $0</p>
          <p><span className="font-semibold">Venta Neta:</span> $534,518</p>
        </div>
        <div>
          <p><span className="font-semibold">Total Propinas:</span> $0</p>
          <p><span className="font-semibold">Total Costo:</span> $123,624</p>
          <p><span className="font-semibold">Ganancias Estimadas:</span> $410,894</p>
          <p><span className="font-semibold">% de Ganancia:</span> 76.87%</p>
        </div>
      </div>

      {/* Medios de pago */}
      <div className="bg-white rounded shadow p-4 sm:p-6 mb-6 w-full">
        <h2 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Medios de Pagos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 border rounded p-3 w-full">
            <span className="text-lg sm:text-2xl">💵</span>
            <div>
              <p className="font-medium">Contado</p>
              <p className="text-slate-600 text-xs sm:text-sm">$492,629.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 border rounded p-3 w-full">
            <span className="text-lg sm:text-2xl">📱</span>
            <div>
              <p className="font-medium">Nequi</p>
              <p className="text-slate-600 text-xs sm:text-sm">$41,889.0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Listado de facturas */}
      <div className="bg-white rounded shadow p-4 sm:p-6 w-full">
        <h2 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Listado de Facturas (86)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-2 sm:px-4 py-2 text-left">Factura</th>
                <th className="px-2 sm:px-4 py-2 text-left">Cliente</th>
                <th className="px-2 sm:px-4 py-2 text-left">Fecha</th>
                <th className="px-2 sm:px-4 py-2 text-left">Total</th>
                <th className="px-2 sm:px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-2 sm:px-4 py-2">001</td>
                <td className="px-2 sm:px-4 py-2">Cliente Prueba</td>
                <td className="px-2 sm:px-4 py-2">20/09/2025</td>
                <td className="px-2 sm:px-4 py-2">$123,000</td>
                <td className="px-2 sm:px-4 py-2">Pagada</td>
              </tr>
              <tr>
                <td className="px-2 sm:px-4 py-2">002</td>
                <td className="px-2 sm:px-4 py-2">Cliente Ejemplo</td>
                <td className="px-2 sm:px-4 py-2">20/09/2025</td>
                <td className="px-2 sm:px-4 py-2">$411,518</td>
                <td className="px-2 sm:px-4 py-2">Pendiente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

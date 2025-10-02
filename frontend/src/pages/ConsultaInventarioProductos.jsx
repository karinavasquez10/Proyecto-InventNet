// src/pages/ConsultaAvaluoInventario.jsx
import React from "react";

export default function ConsultaAvaluoInventario() {
  return (
    <div className="p-6">
      {/* Encabezado */}
      <h1 className="text-xl font-bold mb-2">Consulta Inventario</h1>
      <p className="text-sm text-slate-600 mb-4">MERKA FRUVER FLORENCIA</p>

      {/* Porcentaje de productos calibrados */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded mb-4 text-sm">
        Porcentaje de productos calibrados: <b>0%</b>  
        <span className="ml-2 text-xs text-slate-500">
          Este porcentaje no debe ser menor al 80%.
        </span>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <select className="border rounded px-3 py-1 text-sm">
          <option>Todas las categorías</option>
          <option>Verduras</option>
          <option>Abarrotes</option>
          <option>Frutas</option>
        </select>

        <input
          type="text"
          placeholder="Buscar producto..."
          className="border rounded px-3 py-1 text-sm w-64"
        />

        {/* Botones */}
        <div className="flex flex-wrap gap-2 ml-auto">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm">
            Todos
          </button>
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm">
            Por Calibrar
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
            Clase A
          </button>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded text-sm">
            Inactivos
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
            Nuevo
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Precio compra</th>
              <th className="px-4 py-2 text-left">Precio venta</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Clasificación</th>
              <th className="px-4 py-2 text-left">Tipo producto</th>
              <th className="px-4 py-2 text-left">Categoría</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td className="px-4 py-2">A4</td>
              <td className="px-4 py-2">Cebolla Blanca Pelada</td>
              <td className="px-4 py-2">$3</td>
              <td className="px-4 py-2">$4</td>
              <td className="px-4 py-2 text-red-600">-773.620</td>
              <td className="px-4 py-2">A</td>
              <td className="px-4 py-2">Báscula</td>
              <td className="px-4 py-2">Verduras</td>
            </tr>
            <tr>
              <td className="px-4 py-2">CA10</td>
              <td className="px-4 py-2">25 G &lt;20%</td>
              <td className="px-4 py-2">$4.800</td>
              <td className="px-4 py-2">$5.300</td>
              <td className="px-4 py-2 text-red-600">-22</td>
              <td className="px-4 py-2">B</td>
              <td className="px-4 py-2">Compra y Venta</td>
              <td className="px-4 py-2">Abarrotes</td>
            </tr>
            <tr>
              <td colSpan="8" className="text-center py-4 text-slate-400">
                Más registros aquí...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

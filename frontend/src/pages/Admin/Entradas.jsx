import React from "react";

export default function Entradas() {
  return (
    <div className="px-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-slate-800">
        Control de Entradas de Materias Primas
      </h1>

      {/* ===== Filtros y búsqueda ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Filtros de búsqueda
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Buscar proveedor..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="date"
            className="w-full border rounded px-3 py-2 text-sm"
          />
          <input
            type="date"
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm">
            Aplicar filtros
          </button>
          <button className="bg-slate-300 hover:bg-slate-400 text-slate-800 px-4 py-2 rounded text-sm">
            Limpiar
          </button>
        </div>
      </div>

      {/* ===== Formulario de registro de entrada ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Registrar nueva entrada
        </h2>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium">Proveedor</label>
            <input
              type="text"
              placeholder="Nombre proveedor"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Producto</label>
            <input
              type="text"
              placeholder="Producto"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cantidad</label>
            <input
              type="number"
              placeholder="0"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Fecha</label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Precio Unitario</label>
            <input
              type="number"
              placeholder="$0.00"
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium">Observaciones</label>
            <textarea
              rows="2"
              placeholder="Notas adicionales..."
              className="w-full border rounded px-3 py-2 text-sm"
            ></textarea>
          </div>
          <div className="md:col-span-3 flex justify-end gap-3 mt-2">
            <button
              type="reset"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>

      {/* ===== Tabla de entradas ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Historial de Entradas
        </h2>

        <table className="min-w-full text-xs sm:text-sm border">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-3 py-2 border">Fecha</th>
              <th className="px-3 py-2 border">Proveedor</th>
              <th className="px-3 py-2 border">Producto</th>
              <th className="px-3 py-2 border">Cantidad</th>
              <th className="px-3 py-2 border">Precio Unitario</th>
              <th className="px-3 py-2 border">Total</th>
              <th className="px-3 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-3 py-2 border">2025-09-20</td>
              <td className="px-3 py-2 border">Proveedor Ejemplo</td>
              <td className="px-3 py-2 border">Papa Pastusa KL</td>
              <td className="px-3 py-2 border">100</td>
              <td className="px-3 py-2 border">$2.500</td>
              <td className="px-3 py-2 border">$250.000</td>
              <td className="px-3 py-2 border">
                <div className="flex gap-2">
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs">
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs">
                    Eliminar
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    Ver
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="7" className="text-center py-4 text-slate-400">
                Más registros aparecerán aquí...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

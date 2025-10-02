import React from "react";

export default function GestionClientes() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Gestión de Clientes</h1>

      {/* Barra de acciones */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
          Crear Cliente
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded text-sm">
          Creación Masiva
        </button>
        <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded text-sm">
          Actualizar Lista
        </button>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm">
          QR Auto Registro
        </button>
      </div>

      {/* Tabla de clientes */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">Número documento</th>
              <th className="px-4 py-2 text-left">Nombres</th>
              <th className="px-4 py-2 text-left">Apellidos</th>
              <th className="px-4 py-2 text-left">Número telefónico</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Dirección</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr>
              <td colSpan="6" className="text-center py-4 text-slate-400">
                No se encontraron registros.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

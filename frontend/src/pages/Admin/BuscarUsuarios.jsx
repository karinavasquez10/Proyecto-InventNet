// src/pages/BuscarUsuario.jsx
import React from "react";

export default function BuscarUsuario() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Usuarios</h1>
        <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded text-sm shadow">
          Actualizar
        </button>
      </div>

      {/* Tabla con filtros */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">Sede</th>
              <th className="px-4 py-2 text-left">Foto</th>
              <th className="px-4 py-2 text-left">Num documento</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Activo</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
            {/* Filtros */}
            <tr className="bg-white">
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Documento"
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border rounded px-2 py-1 text-xs"
                />
              </th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-slate-50">
              <td className="px-4 py-2">MERKA FRUVER FLORENCIA</td>
              <td className="px-4 py-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="foto usuario"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2">1006511909</td>
              <td className="px-4 py-2">Karen Hoyos</td>
              <td className="px-4 py-2">3214657756</td>
              <td className="px-4 py-2">yuliana.hoyos1224@gmail.com</td>
              <td className="px-4 py-2">Sí</td>
              <td className="px-4 py-2 text-center">
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-xs">
                  🔍
                </button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="px-4 py-2">MERKA FRUVER FLORENCIA</td>
              <td className="px-4 py-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="foto usuario"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="px-4 py-2">1117232430</td>
              <td className="px-4 py-2">Juliana Hoyos</td>
              <td className="px-4 py-2">3214657756</td>
              <td className="px-4 py-2">yuliana.hoyos1224@gmail.com</td>
              <td className="px-4 py-2">Sí</td>
              <td className="px-4 py-2 text-center">
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-xs">
                  🔍
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex justify-center items-center gap-2 text-xs text-slate-500">
        <button className="px-2 py-1 border rounded">&lt;&lt;</button>
        <button className="px-2 py-1 border rounded">&lt;</button>
        <span>1</span>
        <button className="px-2 py-1 border rounded">&gt;</button>
        <button className="px-2 py-1 border rounded">&gt;&gt;</button>
      </div>
    </div>
  );
}

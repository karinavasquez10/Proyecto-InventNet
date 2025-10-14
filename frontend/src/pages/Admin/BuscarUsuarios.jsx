import React from "react";
import { UserSearch, RotateCw, Search } from "lucide-react";

export default function BuscarUsuario() {
  return (
    <div className="p-6 w-full max-w-[calc(150%-16rem)]">
      {/* ======= ENCABEZADO ======= */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2.5 rounded-lg text-white shadow">
            <UserSearch size={20} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Gestión de Usuarios
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm shadow transition">
          <RotateCw size={16} />
          Actualizar
        </button>
      </div>

      {/* ======= CONTENEDOR TABLA ======= */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* CABECERA */}
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Sede</th>
              <th className="px-4 py-3 text-left">Foto</th>
              <th className="px-4 py-3 text-left">Documento</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Correo</th>
              <th className="px-4 py-3 text-center">Activo</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>

          {/* FILTROS */}
          <thead className="bg-white border-b">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Documento..."
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Nombre..."
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Teléfono..."
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  placeholder="Correo..."
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2 text-center">
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-xs flex items-center justify-center gap-1 mx-auto">
                  <Search size={14} />
                  Buscar
                </button>
              </th>
            </tr>
          </thead>

          {/* CUERPO */}
          <tbody className="divide-y">
            {[
              {
                id: 1,
                sede: "MERKA FRUVER FLORENCIA",
                nombre: "Karen Hoyos",
                documento: "1006511909",
                telefono: "3214657756",
                correo: "yuliana.hoyos1224@gmail.com",
                activo: "Sí",
                foto: "https://via.placeholder.com/40",
              },
              {
                id: 2,
                sede: "MERKA FRUVER FLORENCIA",
                nombre: "Juliana Hoyos",
                documento: "1117232430",
                telefono: "3214657756",
                correo: "yuliana.hoyos1224@gmail.com",
                activo: "Sí",
                foto: "https://via.placeholder.com/40",
              },
            ].map((usuario) => (
              <tr
                key={usuario.id}
                className="hover:bg-slate-50 transition duration-150"
              >
                <td className="px-4 py-3">{usuario.sede}</td>
                <td className="px-4 py-3">
                  <img
                    src={usuario.foto}
                    alt={usuario.nombre}
                    className="w-10 h-10 rounded-full border border-slate-200"
                  />
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">
                  {usuario.documento}
                </td>
                <td className="px-4 py-3">{usuario.nombre}</td>
                <td className="px-4 py-3">{usuario.telefono}</td>
                <td className="px-4 py-3">{usuario.correo}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      usuario.activo === "Sí"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    {usuario.activo}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded-md text-xs shadow">
                    Ver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ======= PAGINACIÓN ======= */}
      <div className="mt-6 flex justify-center items-center gap-2 text-xs text-slate-600">
        <button className="px-2.5 py-1 border rounded-md hover:bg-slate-100">
          «
        </button>
        <button className="px-2.5 py-1 border rounded-md hover:bg-slate-100">
          ‹
        </button>
        <span className="px-2 font-semibold text-slate-800">1</span>
        <button className="px-2.5 py-1 border rounded-md hover:bg-slate-100">
          ›
        </button>
        <button className="px-2.5 py-1 border rounded-md hover:bg-slate-100">
          »
        </button>
      </div>
    </div>
  );
}

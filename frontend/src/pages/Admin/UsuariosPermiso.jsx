// src/pages/Admin/UsuariosPermisos.jsx
import React, { useState } from "react";
import { Users, Shield, UserPlus, Lock, Edit2, Trash2 } from "lucide-react";

export default function UsuariosPermiso() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Karen Hoyos", rol: "Administrador", activo: true },
    { id: 2, nombre: "Ana López", rol: "Cajero", activo: true },
    { id: 3, nombre: "Luis Torres", rol: "Auxiliar", activo: false },
  ]);

  const [permisos, setPermisos] = useState({
    ventas: { admin: true, cajero: true, auxiliar: false },
    inventario: { admin: true, cajero: false, auxiliar: true },
    reportes: { admin: true, cajero: false, auxiliar: false },
    configuracion: { admin: true, cajero: false, auxiliar: false },
  });

  const togglePermiso = (modulo, rol) => {
    setPermisos((prev) => ({
      ...prev,
      [modulo]: {
        ...prev[modulo],
        [rol]: !prev[modulo][rol],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 px-6 sm:px-60 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-indigo-500 to-sky-500 p-2.5 rounded-lg shadow-md text-white">
          <Users size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Gestión de Usuarios y Permisos
        </h1>
      </div>

      {/* ===== Lista de usuarios ===== */}
      <div className="bg-white/90 border border-indigo-100 rounded-2xl shadow-md p-6 mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
            <UserPlus size={18} className="text-indigo-500" />
            Usuarios registrados ({usuarios.length})
          </h2>
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow-sm">
            + Nuevo Usuario
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-indigo-400/80 to-sky-400/80 text-white">
              <tr>
                {["Nombre", "Rol", "Activo", "Acciones"].map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-xs uppercase tracking-wide">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-slate-100 hover:bg-indigo-50 transition">
                  <td className="px-4 py-2 font-medium text-slate-800">{u.nombre}</td>
                  <td className="px-4 py-2">{u.rol}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        u.activo ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {u.activo ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button className="text-indigo-600 hover:text-indigo-800">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-rose-600 hover:text-rose-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Permisos por módulo ===== */}
      <div className="bg-white/90 border border-indigo-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-6 text-slate-700 flex items-center gap-2">
          <Shield size={18} className="text-indigo-500" />
          Permisos por módulo
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-sky-400/80 to-indigo-400/80 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Módulo</th>
                <th className="px-4 py-2 text-center">Administrador</th>
                <th className="px-4 py-2 text-center">Cajero</th>
                <th className="px-4 py-2 text-center">Auxiliar</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(permisos).map(([modulo, roles]) => (
                <tr key={modulo} className="border-b hover:bg-indigo-50 transition">
                  <td className="px-4 py-2 font-medium text-slate-800 capitalize">
                    {modulo}
                  </td>
                  {Object.entries(roles).map(([rol, acceso]) => (
                    <td key={rol} className="text-center px-4 py-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={acceso}
                          onChange={() => togglePermiso(modulo, rol)}
                          className="form-checkbox text-indigo-600 rounded"
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { UserPlus, Upload } from "lucide-react";

export default function CrearUsuario() {
  const [foto, setFoto] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-gradient-to-br from-orange-50 via-white to-pink-50 min-h-screen rounded-xl">
      {/* ===== Título ===== */}
      <div className="flex items-center gap-1 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2 rounded-lg shadow-md text-white">
          <UserPlus size={15} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Crear Usuario</h1>
      </div>

      {/* ===== Contenedor principal ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-lg p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* === Columna izquierda: Foto de perfil === */}
        <div className="flex flex-col items-center justify-center text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 border-2 border-orange-300 flex items-center justify-center overflow-hidden shadow-inner">
              {foto ? (
                <img
                  src={foto}
                  alt="Foto de usuario"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-5xl text-orange-400 font-semibold">?</span>
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-2 shadow cursor-pointer transition">
              <Upload size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Seleccione una imagen de perfil
          </p>
        </div>

        {/* === Columna central: Datos personales === */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Sede
            </label>
            <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none">
              <option>Seleccione...</option>
              <option>Florencia</option>
              <option>Otra sede</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Número de documento
            </label>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: 1032456789"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Nombre usuario
            </label>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: Karen Hoyos"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: 3124567890"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: ejemplo@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Sueldo Básico
            </label>
            <input
              type="number"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: 1200000"
            />
          </div>

          {/* Checks */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 text-orange-500" />
              Notificación por WhatsApp
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 text-orange-500" defaultChecked />
              Activo
            </label>
          </div>
        </div>

        {/* === Columna derecha: Roles === */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Roles de usuario
          </label>
          <div className="flex gap-2">
            <select
              multiple
              className="w-full border border-slate-200 rounded-lg px-2 py-2 text-sm h-44 focus:ring-2 focus:ring-orange-200 focus:outline-none"
            >
              <option>CAJERO</option>
              <option>PANADERO</option>
              <option>ADMINISTRADOR NEGOCIO</option>
              <option>SUPERVISOR NEGOCIO</option>
              <option>MESERO</option>
              <option>ASESOR COMERCIAL</option>
            </select>
            <div className="flex flex-col gap-2 justify-center">
              {["›", "»", "‹", "«"].map((b, i) => (
                <button
                  key={i}
                  className="bg-slate-100 hover:bg-orange-100 border border-slate-200 px-3 py-1 rounded-md text-slate-700 shadow-sm transition"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Botones finales ===== */}
      <div className="mt-8 flex justify-end gap-3">
        <button className="bg-gradient-to-r from-slate-400 to-slate-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition">
          Cancelar
        </button>
        <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition">
          Crear Usuario
        </button>
      </div>
    </div>
  );
}

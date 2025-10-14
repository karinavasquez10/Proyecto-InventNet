import React, { useState } from "react";
import { User, Edit2, Save, Shield, Lock, Camera } from "lucide-react";

export default function PerfilAdmin() {
  const [editing, setEditing] = useState(false);
  const [foto, setFoto] = useState("https://via.placeholder.com/120");
  const [admin, setAdmin] = useState({
    nombre: "Ana Yuliana Hoyos",
    cargo: "Administradora General",
    correo: "admin@inventnet.com",
    telefono: "3201234567",
    usuario: "admin123",
    contrasena: "********",
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  };

  const handleGuardar = () => {
    setEditing(false);
    alert("✅ Cambios guardados correctamente (simulación).");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 sm:px-22 py-10">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2.5 rounded-lg shadow-md text-white">
          <User size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Perfil del Administrador
        </h1>
      </div>

      {/* ===== Tarjeta principal ===== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Foto de perfil */}
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <img
                src={foto}
                alt="Foto de perfil"
                className="w-32 h-32 object-cover rounded-full border-4 border-orange-200 shadow-md"
              />
              {editing && (
                <label className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full shadow cursor-pointer hover:bg-orange-600 transition">
                  <Camera size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFoto}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              {admin.nombre}
            </h2>
            <p className="text-sm text-slate-500">{admin.cargo}</p>
          </div>

          {/* Información del administrador */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <Shield size={18} className="text-orange-500" />
                Datos personales
              </h2>

              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm shadow-md hover:brightness-110 transition"
                >
                  <Edit2 size={14} /> Editar
                </button>
              ) : (
                <button
                  onClick={handleGuardar}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-md text-sm shadow-md hover:brightness-110 transition"
                >
                  <Save size={14} /> Guardar
                </button>
              )}
            </div>

            {/* Formulario */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={admin.nombre}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Cargo
                </label>
                <input
                  type="text"
                  name="cargo"
                  value={admin.cargo}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="correo"
                  value={admin.correo}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={admin.telefono}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  value={admin.usuario}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Contraseña
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    name="contrasena"
                    value={admin.contrasena}
                    disabled={!editing}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 text-sm ${
                      editing
                        ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                        : "bg-slate-50 text-slate-600"
                    }`}
                  />
                  {editing && (
                    <button className="text-orange-500 hover:text-orange-600">
                      <Lock size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Preferencias */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2 mb-3">
                <Shield size={18} className="text-pink-500" />
                Preferencias del sistema
              </h2>
              <p className="text-sm text-slate-500">
                Próximamente podrás cambiar tu tema, idioma o notificaciones desde
                aquí.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

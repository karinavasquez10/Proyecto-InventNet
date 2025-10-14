import React, { useState } from "react";
import { User, Edit2, Save, Camera, Lock, Shield } from "lucide-react";

export default function PerfilCajera({ onClose }) {
  const [editing, setEditing] = useState(false);
  const [foto, setFoto] = useState("https://via.placeholder.com/120");
  const [cajera, setCajera] = useState({
    nombre: "Ana Yuliana Hoyos",
    cargo: "Cajera Principal",
    correo: "ana.hoyos@empresa.com",
    telefono: "3201234567",
    usuario: "cajera01",
    contrasena: "********",
  });

  const handleChange = (e) =>
    setCajera({ ...cajera, [e.target.name]: e.target.value });

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(URL.createObjectURL(file));
  };

  const handleGuardar = () => {
    setEditing(false);
    alert("✅ Cambios guardados correctamente (simulación).");
  };

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
      {/* ===== Tarjeta del modal ===== */}
      <div className="bg-white border border-orange-100 rounded-2xl shadow-lg w-full max-w-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white rounded-t-2xl">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <User size={18} /> Perfil de Cajera
          </h2>
          <button
            onClick={onClose}
            className="text-sm font-medium hover:text-orange-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* === Foto === */}
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={foto}
                  alt="Foto de perfil"
                  className="w-28 h-28 object-cover rounded-full border-4 border-orange-200 shadow-md"
                />
                {editing && (
                  <label className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full shadow cursor-pointer hover:bg-orange-600 transition">
                    <Camera size={14} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFoto}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <h2 className="mt-3 text-lg font-semibold text-slate-800">
                {cajera.nombre}
              </h2>
              <p className="text-sm text-slate-500">{cajera.cargo}</p>
            </div>

            {/* === Datos === */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                  <Shield size={16} className="text-orange-500" />
                  Datos personales
                </h2>

                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1.5 rounded-md text-xs shadow-md hover:brightness-110 transition"
                  >
                    <Edit2 size={13} /> Editar
                  </button>
                ) : (
                  <button
                    onClick={handleGuardar}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-md text-xs shadow-md hover:brightness-110 transition"
                  >
                    <Save size={13} /> Guardar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={cajera.correo}
                    disabled={!editing}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm ${
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
                    value={cajera.telefono}
                    disabled={!editing}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm ${
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
                    value={cajera.usuario}
                    disabled={!editing}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-1.5 text-sm ${
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
                      value={cajera.contrasena}
                      disabled={!editing}
                      onChange={handleChange}
                      className={`w-full border rounded-lg px-3 py-1.5 text-sm ${
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
            </div>
          </div>

          {/* ===== Footer ===== */}
          <div className="mt-6 text-center border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              💡 Próximamente podrás gestionar tus preferencias del sistema aquí.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2 rounded-md text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-50 transition"
            >
              Cerrar ventana
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

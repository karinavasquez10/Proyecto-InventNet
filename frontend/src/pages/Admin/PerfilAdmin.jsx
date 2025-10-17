import React, { useState, useEffect } from "react";
import { User, Edit2, Save, Shield, Lock, Camera } from "lucide-react";

export default function PerfilAdmin() {
  const [editing, setEditing] = useState(false);
  const [foto, setFoto] = useState("");
  const [datos, setDatos] = useState({
    nombre: "",
    cargo: "",
    correo: "",
    telefono: "",
    contrasena: "",
    direccion: "",
    genero: "",
  });
  // Obtener ID real desde localStorage (para admin: authUser)
  const userId = (() => {
    try { return JSON.parse(localStorage.getItem("authUser") || "null")?.id; } catch { return null; }
  })();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/perfil/${userId}`)
      .then(res => res.json())
      .then(data => {
        setDatos({
          ...data,
          contrasena: editing ? (data.contrasena || "") : "********", // Seguridad: no mostrar pass real
        });
        if (data.foto_perfil) {
          const cloud = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME || "");
          setFoto(`https://res.cloudinary.com/${cloud}/image/upload/${data.foto_perfil}`);
        }
      })
      .catch(() => console.error("Error al cargar perfil"));
  }, [userId, editing]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(file); // guardamos el archivo
  };

  const handleGuardar = async () => {
    const formData = new FormData();
    Object.keys(datos).forEach(k => formData.append(k, datos[k]));
    if (foto instanceof File) formData.append("foto", foto);

    const res = await fetch(`http://localhost:5000/api/perfil/${userId}`, {
      method: "PUT",
      body: formData,
    });

    const result = await res.json();
    if (result.message) {
      alert("✅ Perfil actualizado correctamente");
      setEditing(false);
      if (result.foto) {
        const cloud = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME || "");
        setFoto(`https://res.cloudinary.com/${cloud}/image/upload/${result.foto}`);
      }
    } else {
      alert("❌ Error al actualizar perfil");
    }
  };

  // Opciones de género
  const generoOptions = [
    "femenino",
    "masculino",
    "otro",
  ];

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
              {foto ? (
                <img
                  src={foto instanceof File ? URL.createObjectURL(foto) : foto}
                  alt="Foto de perfil"
                  className="w-32 h-32 object-cover rounded-full border-4 border-orange-200 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-orange-200">
                  {(datos?.nombre?.[0] || "A").toUpperCase()}
                </div>
              )}
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
              {datos.nombre}
            </h2>
            <p className="text-sm text-slate-500">{datos.cargo}</p>
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
                  value={datos.nombre}
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
                  value={datos.cargo}
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
                  value={datos.correo}
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
                  value={datos.telefono}
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
                    value={datos.contrasena}
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

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Dirección
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={datos.direccion}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Género
                </label>
                <select
                  name="genero"
                  value={datos.genero !== undefined && datos.genero !== null ? datos.genero : ""}
                  disabled={!editing}
                  onChange={handleChange}
                  className={`w-full border rounded-lg px-3 py-2 text-sm ${
                    editing
                      ? "focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                      : "bg-slate-50 text-slate-600"
                  }`}
                >
                  <option value="">Selecciona género</option>
                  {generoOptions.map(opt => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
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
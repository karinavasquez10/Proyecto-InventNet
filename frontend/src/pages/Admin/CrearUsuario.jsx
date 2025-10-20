import React, { useState } from "react";
import { UserPlus, Upload } from "lucide-react";

export default function CrearUsuario({ onClose }) {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    roles: [],
    documento_identidad: "",
    direccion: "",
    telefono: "",
    fecha_nacimiento: "",
    genero: "otro",
    cargo: "",
    estado: 1,
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter(r => r !== role)
        : [...prev.roles, role]
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(URL.createObjectURL(file));
    }
  };

  // La función onClose debe llamarse sólo cuando la creación fue exitosa, no al pulsar Cancelar.
  const handleGuardar = async () => {
    if (!formData.nombre || !formData.correo || !formData.contrasena) {
      setError("Nombre, correo y contraseña son obligatorios");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'roles' && formData.roles.length > 0) {
          formDataToSend.append(key, formData.roles.join(','));
        } else if (key !== 'roles') {
          formDataToSend.append(key, formData[key]);
        }
      });
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput && fileInput.files[0]) formDataToSend.append('foto', fileInput.files[0]);

      const res = await fetch("http://localhost:5000/api/perfil", {
        method: "POST",
        body: formDataToSend,
      });
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Error al crear usuario");
      }
      // Reset form on success
      setFormData({
        nombre: "",
        correo: "",
        contrasena: "",
        roles: [],
        documento_identidad: "",
        direccion: "",
        telefono: "",
        fecha_nacimiento: "",
        genero: "otro",
        cargo: "",
        estado: 1,
      });
      setFoto(null);
      setError(null);
      // Llamar a onClose SOLO aquí, después del éxito
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (err) {
      console.error("Error al crear usuario:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Nueva función para cancelar con seguridad (sin llamar a onClose si no existe)
  const handleCancel = () => {
    if (typeof onClose === 'function') {
      onClose();
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

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm">
          {error}
        </div>
      )}

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
              Número de documento
            </label>
            <input
              type="text"
              name="documento_identidad"
              value={formData.documento_identidad}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: 1032456789"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
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
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
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
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: ejemplo@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Dirección
            </label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: Calle 10 #45-23"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Cargo
            </label>
            <input
              type="text"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
              placeholder="Ej: Cajero"
            />
          </div>

          {/* Checks */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input 
                type="checkbox" 
                name="estado"
                checked={formData.estado === 1}
                onChange={(e) => setFormData({ ...formData, estado: e.target.checked ? 1 : 0 })}
                className="h-4 w-4 text-orange-500" 
              />
              Activo
            </label>
          </div>
        </div>

        {/* === Columna derecha: Roles (checkboxes) y otros === */}
        <div>
          <label className="block text-sm font-semibold text-slate-600 mb-2">
            Roles de usuario
          </label>
          <div className="space-y-2 mb-4">
            {['admin', 'cajero'].map(role => (
              <label key={role} className="flex items-center gap-2 text-sm text-slate-600">
                <input 
                  type="checkbox" 
                  checked={formData.roles.includes(role)}
                  onChange={() => handleRoleChange(role)}
                  className="h-4 w-4 text-orange-500" 
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Género
            </label>
            <select
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            >
              <option value="otro">Otro</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
            </select>

            <label className="block text-sm font-semibold text-slate-600 mb-1">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={formData.fecha_nacimiento}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* ===== Botones finales ===== */}
      <div className="mt-8 flex justify-end gap-3">
        <button onClick={handleCancel} disabled={loading} className="bg-gradient-to-r from-slate-400 to-slate-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition disabled:opacity-50">
          Cancelar
        </button>
        <button onClick={handleGuardar} disabled={loading} className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-5 py-2 rounded-lg text-sm shadow-md transition disabled:opacity-50">
          {loading ? "Creando..." : "Crear Usuario"}
        </button>
      </div>
    </div>
  );
}
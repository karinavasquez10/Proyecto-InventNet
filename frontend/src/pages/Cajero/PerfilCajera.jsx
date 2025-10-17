import React, { useState, useEffect } from "react";
import { User, Edit2, Save, Camera } from "lucide-react";

export default function PerfilCajera({ onClose }) {
  const [editing, setEditing] = useState(false);
  const [foto, setFoto] = useState("");
  const [datos, setDatos] = useState({});
  // Obtener ID real desde localStorage
  const userId = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null")?.id; } catch { return null; }
  })();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/perfil/${userId}`)
      .then(res => res.json())
      .then(data => {
        setDatos(data);
        if (data.foto_perfil) {
          const cloud = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "");
          setFoto(`https://res.cloudinary.com/${cloud}/image/upload/${data.foto_perfil}`);
        }
      });
  }, [userId]);

  const handleChange = e => setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleFoto = e => {
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
    }
  };

  // Opciones de género como corresponde a la base de datos, para mostrar seleccionada según 'genero'
  const generoOptions = [
    "femenino",
    "masculino",
    "otro",
  ];

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 p-3">
      <div className="bg-white border rounded-2xl shadow-lg w-full max-w-xl p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <User size={18} /> Perfil de Cajera
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* === FOTO === */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {foto ? (
                <img
                  src={foto instanceof File ? URL.createObjectURL(foto) : foto}
                  alt="Perfil"
                  className="w-28 h-28 rounded-full object-cover border-4 border-orange-200"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-orange-200">
                  {(datos?.nombre?.[0] || "U").toUpperCase()}
                </div>
              )}
              {editing && (
                <label className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full cursor-pointer">
                  <Camera size={14} />
                  <input type="file" className="hidden" onChange={handleFoto} />
                </label>
              )}
            </div>
          </div>

          {/* === DATOS === */}
          <div className="md:col-span-2 space-y-3">
            <input
              type="text"
              name="nombre"
              value={datos.nombre || ""}
              disabled={!editing}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full"
              placeholder="Nombre completo"
            />
            {/* Correo: no editable para cajero */}
            <input
              type="email"
              name="correo"
              value={datos.correo || ""}
              disabled
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full opacity-60"
              placeholder="Correo electrónico"
            />
            <input
              type="text"
              name="telefono"
              value={datos.telefono || ""}
              disabled={!editing}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full"
              placeholder="Teléfono"
            />
            <input
              type="text"
              name="direccion"
              value={datos.direccion || ""}
              disabled={!editing}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full"
              placeholder="Dirección"
            />
            {/* Cargo: no editable para cajero */}
            <input
              type="text"
              name="cargo"
              value={datos.cargo || ""}
              disabled
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full opacity-60"
              placeholder="Cargo"
            />

            {/* Género: combobox */}
            <select
              name="genero"
              value={datos.genero !== undefined && datos.genero !== null ? datos.genero : ""}
              disabled={!editing}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1.5 w-full"
            >
              <option value="">Selecciona género</option>
              {generoOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 text-right">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-md shadow"
            >
              Editar
            </button>
          ) : (
            <button
              onClick={handleGuardar}
              className="bg-green-600 text-white px-4 py-2 rounded-md shadow"
            >
              Guardar cambios
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

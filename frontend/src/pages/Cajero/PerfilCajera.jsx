import React, { useState, useEffect } from "react";
import { User, Edit2, Save, Camera, X } from "lucide-react";

/* ========= Hook de sincronización global ========= */
function useSystemTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

/* ========= Componente principal ========= */
export default function PerfilCajera({ onClose }) {
  const theme = useSystemTheme(); // 👈 Se sincroniza automáticamente
  const [editing, setEditing] = useState(false);
  const [foto, setFoto] = useState("");
  const [datos, setDatos] = useState({});

  const userId = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null")?.id;
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/perfil/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setDatos(data);
        if (data.foto_perfil) {
          const cloud = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
          setFoto(
            `https://res.cloudinary.com/${cloud}/image/upload/${data.foto_perfil}`
          );
        }
      });
  }, [userId]);

  const handleChange = (e) =>
    setDatos({ ...datos, [e.target.name]: e.target.value });

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (file) setFoto(file);
  };

  const handleGuardar = async () => {
    const formData = new FormData();
    Object.keys(datos).forEach((k) => formData.append(k, datos[k]));
    if (foto instanceof File) formData.append("foto", foto);

    const res = await fetch(`http://localhost:5000/api/perfil/${userId}`, {
      method: "PUT",
      body: formData,
    });
    const result = await res.json();
    if (result.message) {
      alert("✅ Perfil actualizado correctamente");
      setEditing(false);
    }
  };

  const generoOptions = ["femenino", "masculino", "otro"];

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50 p-3">
      <div
        className={`w-full max-w-xl rounded-2xl shadow-2xl border transition-all duration-300 overflow-hidden
          ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700 text-slate-100"
              : "bg-white border-orange-100 text-slate-800"
          }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center border-b px-6 py-3 ${
            theme === "dark"
              ? "border-slate-700 text-slate-200"
              : "border-orange-100 text-slate-700"
          }`}
        >
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <User size={18} /> Perfil de Cajera
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-rose-500 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Contenido */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FOTO */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {foto ? (
                <img
                  src={foto instanceof File ? URL.createObjectURL(foto) : foto}
                  alt="Perfil"
                  className="w-28 h-28 rounded-full object-cover border-4 border-orange-200 dark:border-slate-600"
                />
              ) : (
                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-orange-200 dark:border-slate-600">
                  {(datos?.nombre?.[0] || "U").toUpperCase()}
                </div>
              )}
              {editing && (
                <label className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:brightness-110">
                  <Camera size={14} />
                  <input type="file" className="hidden" onChange={handleFoto} />
                </label>
              )}
            </div>
          </div>

          {/* DATOS */}
          <div className="md:col-span-2 space-y-3">
            {["nombre", "correo", "telefono", "direccion", "cargo"].map(
              (campo) => (
                <input
                  key={campo}
                  type={campo === "correo" ? "email" : "text"}
                  name={campo}
                  value={datos[campo] || ""}
                  disabled={campo === "correo" || campo === "cargo" ? true : !editing}
                  onChange={handleChange}
                  placeholder={
                    campo.charAt(0).toUpperCase() + campo.slice(1)
                  }
                  className={`w-full px-3 py-2 rounded-lg border text-sm transition
                    ${
                      theme === "dark"
                        ? "bg-slate-800 border-slate-700 text-slate-100"
                        : "bg-white border-orange-200 text-slate-800"
                    }
                    ${editing && campo !== "correo" && campo !== "cargo"
                      ? "focus:ring-2 ring-orange-400 dark:ring-fuchsia-400"
                      : ""}`}
                />
              )
            )}

            <select
              name="genero"
              value={datos.genero || ""}
              disabled={!editing}
              onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border text-sm transition
                ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700 text-slate-100"
                    : "bg-white border-orange-200 text-slate-800"
                }`}
            >
              <option value="">Selecciona género</option>
              {generoOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`border-t p-4 text-right ${
            theme === "dark" ? "border-slate-700" : "border-orange-100"
          }`}
        >
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white font-semibold hover:brightness-110 transition"
            >
              Editar
            </button>
          ) : (
            <button
              onClick={handleGuardar}
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
            >
              Guardar cambios
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

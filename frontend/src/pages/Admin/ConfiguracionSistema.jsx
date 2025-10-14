// src/pages/Admin/ConfiguracionSistema.jsx
import React, { useState } from "react";
import {
  Settings,
  Palette,
  Users,
  ShieldCheck,
  Building2,
  Printer,
  Database,
  Sun,
  Moon,
  Save,
  RefreshCcw,
  ChevronDown,
} from "lucide-react";

export default function ConfiguracionSistema() {
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [colorPrimario, setColorPrimario] = useState("emerald");
  const [empresa, setEmpresa] = useState({
    nombre: "MERKA FRUVER FLORENCIA",
    nit: "900123456-7",
    direccion: "Cra 12 #7-45",
    telefono: "3214657756",
  });
  const [impresora, setImpresora] = useState("Predeterminada");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 px-6 sm:px-12 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2.5 rounded-lg shadow-md text-white">
          <Settings size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Configuración del Sistema
        </h1>
      </div>

      {/* ===== Secciones ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* === Apariencia y tema === */}
        <section className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="text-sky-500" size={20} />
            <h2 className="text-lg font-semibold text-slate-700">
              Apariencia y Tema
            </h2>
          </div>

          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-slate-600">Tema del sistema</p>
            <button
              onClick={() => setTemaOscuro(!temaOscuro)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm text-white transition
                ${
                  temaOscuro
                    ? "bg-slate-700 hover:bg-slate-800"
                    : "bg-amber-500 hover:bg-amber-600"
                }`}
            >
              {temaOscuro ? (
                <>
                  <Moon size={16} /> Modo Oscuro
                </>
              ) : (
                <>
                  <Sun size={16} /> Modo Claro
                </>
              )}
            </button>
          </div>

          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-2">Color primario</p>
            <div className="flex gap-3">
              {["emerald", "sky", "violet", "amber", "rose"].map((color) => (
                <button
                  key={color}
                  onClick={() => setColorPrimario(color)}
                  className={`w-8 h-8 rounded-full border-2 transition ${
                    colorPrimario === color ? "border-slate-800" : "border-transparent"
                  } bg-${color}-500`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        {/* === Datos de la empresa === */}
        <section className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="text-emerald-500" size={20} />
            <h2 className="text-lg font-semibold text-slate-700">
              Información de la Empresa
            </h2>
          </div>

          <div className="space-y-4 text-sm">
            {Object.entries(empresa).map(([key, value]) => (
              <div key={key}>
                <label className="block text-slate-600 mb-1 capitalize">
                  {key}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setEmpresa({ ...empresa, [key]: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            ))}
          </div>
        </section>

        {/* === Usuarios y roles === */}
        <section className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="text-indigo-500" size={20} />
            <h2 className="text-lg font-semibold text-slate-700">
              Usuarios y Roles
            </h2>
          </div>

          <div className="text-sm text-slate-600 space-y-3">
            <p>
              🔹 <span className="font-semibold">Administrador:</span> Acceso
              completo al sistema (Ventas, Productos, Configuración).
            </p>
            <p>
              🔹 <span className="font-semibold">Cajero:</span> Acceso al módulo
              de ventas y consulta de inventario.
            </p>
            <p>
              🔹 <span className="font-semibold">Auxiliar:</span> Solo lectura de
              reportes y carga de productos.
            </p>

            <button className="mt-3 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow-sm">
              Gestionar Permisos
            </button>
          </div>
        </section>

        {/* === Facturación y POS === */}
        <section className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <Printer className="text-amber-500" size={20} />
            <h2 className="text-lg font-semibold text-slate-700">
              Configuración de Facturación y POS
            </h2>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <label className="block text-slate-600 mb-1">Moneda</label>
              <select className="w-full border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-200">
                <option>COP - Peso Colombiano</option>
                <option>USD - Dólar Estadounidense</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 mb-1">Impresora</label>
              <input
                type="text"
                value={impresora}
                onChange={(e) => setImpresora(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200"
              />
            </div>

            <div>
              <label className="block text-slate-600 mb-1">
                Prefijo de Factura
              </label>
              <input
                type="text"
                placeholder="Ej: POS-001"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-200"
              />
            </div>
          </div>
        </section>

        {/* === Seguridad y respaldo === */}
        <section className="bg-white/90 border border-slate-200 rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="text-red-500" size={20} />
            <h2 className="text-lg font-semibold text-slate-700">
              Seguridad y Respaldo
            </h2>
          </div>

          <div className="text-sm text-slate-600 space-y-3">
            <p>🗝️ Control de acceso mediante roles y contraseñas seguras.</p>
            <p>📦 Copias automáticas de base de datos cada 24 horas.</p>
            <p>🔒 Bloqueo automático tras 5 minutos de inactividad.</p>

            <div className="flex gap-3 mt-4">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2">
                <Save size={16} /> Guardar cambios
              </button>
              <button className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm shadow-sm flex items-center gap-2">
                <RefreshCcw size={16} /> Restaurar valores
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

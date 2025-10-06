import React, { useState } from "react";

export default function SedePrincipal() {
  const [activeTab, setActiveTab] = useState("facturacion");

  return (
    <div className="px-40">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-slate-800">
        Configuración de Sede
      </h1>

      {/* ===== Información general ===== */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-base sm:text-lg font-semibold text-slate-600 mb-2">
          MERKA FRUVER FLORENCIA
        </h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Expiración: <span className="font-semibold text-orange-500">12 de abril de 2026</span>
        </p>
      </div>

      {/* ===== Pestañas de navegación ===== */}
      <div className="flex flex-wrap gap-2 border-b mb-6 text-sm font-medium">
        {[
          { id: "facturacion", label: "Parámetros de facturación" },
          { id: "domicilios", label: "Parámetros de domicilios" },
          { id: "exclusion", label: "Exclusión de módulos" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-md border-b-2 transition-all ${
              activeTab === tab.id
                ? "border-sky-600 text-sky-600 bg-sky-50"
                : "border-transparent text-slate-600 hover:text-sky-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== Contenido dinámico ===== */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === "facturacion" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
              Personalización de Factura
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">NIT</label>
                <input
                  type="text"
                  placeholder="1117232430"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Régimen</label>
                <select className="w-full border rounded px-3 py-2 text-sm">
                  <option>Simplificado</option>
                  <option>Común</option>
                  <option>Responsable de IVA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Leyenda Régimen</label>
                <input
                  type="text"
                  placeholder="Ej: Responsable de IVA"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm">
                Configurar Logo y Apariencia
              </button>
              <button className="w-full sm:w-auto bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm ml-0 sm:ml-3">
                Condiciones y Observaciones
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm">
                Modificar
              </button>
            </div>
          </div>
        )}

        {activeTab === "domicilios" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
              Parámetros de Domicilios
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Tarifa de domicilio</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Tiempo estimado (min)</label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full border rounded px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm">
                Guardar cambios
              </button>
            </div>
          </div>
        )}

        {activeTab === "exclusion" && (
          <div>
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
              Exclusión de módulos
            </h2>

            <p className="text-sm text-slate-500 mb-4">
              Selecciona los módulos que no deseas incluir en esta sede:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                "Productos",
                "Ventas",
                "Cocina",
                "Usuarios",
                "Clientes",
                "Bodegas",
                "Utensilios",
              ].map((mod) => (
                <label key={mod} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="h-4 w-4" />
                  {mod}
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm">
                Guardar configuración
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Building2, FileText, Truck, Ban } from "lucide-react";

export default function SedePrincipal() {
  const [activeTab, setActiveTab] = useState("facturacion");

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-pink-50 px-6 sm:px-35 py-5">
      {/* ====== Encabezado ====== */}
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2.5 rounded-lg shadow-md text-white">
          <Building2 size={22} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight ">
          Configuración de Sede
        </h1>
      </div>

      {/* ====== Tarjeta de información general ====== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-6 mb-8 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              INVENTNET
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Identificador de sede: <span className="font-medium text-slate-600">#0001</span>
            </p>
          </div>
          <div className="mt-3 sm:mt-0 text-sm bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 px-3 py-1.5 rounded-md shadow-sm">
            Expira el <span className="font-semibold text-orange-600">12 de abril de 2026</span>
          </div>
        </div>
      </div>

      {/* ====== Pestañas ====== */}
      <div className="flex flex-wrap gap-2 mb-6 text-sm font-semibold">
        {[
          { id: "facturacion", label: "Parámetros de facturación", icon: <FileText size={15} /> },
          { id: "domicilios", label: "Parámetros de domicilios", icon: <Truck size={15} /> },
          { id: "exclusion", label: "Exclusión de módulos", icon: <Ban size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg border-b-4 transition-all duration-200 ${
              activeTab === tab.id
                ? "border-orange-500 text-orange-600 bg-orange-50 shadow-sm"
                : "border-transparent text-slate-600 hover:text-orange-600 hover:bg-orange-50/50"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ====== Contenido dinámico ====== */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow-md p-8">
        {activeTab === "facturacion" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-5">
              Personalización de Factura
            </h2>

            {/* Campos principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">NIT</label>
                <input
                  type="text"
                  placeholder="1117232430"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Régimen</label>
                <select className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none">
                  <option>Simplificado</option>
                  <option>Común</option>
                  <option>Responsable de IVA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Leyenda Régimen
                </label>
                <input
                  type="text"
                  placeholder="Ej: Responsable de IVA"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
              </div>
            </div>

            {/* Botones secundarios */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="bg-gradient-to-r from-sky-500 to-sky-600 hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm shadow-md transition">
                Configurar Logo y Apariencia
              </button>
              <button className="bg-gradient-to-r from-slate-400 to-slate-500 hover:brightness-110 text-white px-4 py-2.5 rounded-lg text-sm shadow-md transition">
                Condiciones y Observaciones
              </button>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-6 py-2.5 rounded-lg text-sm shadow-md transition">
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

        {activeTab === "domicilios" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-5">
              Parámetros de Domicilios
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Tarifa de domicilio
                </label>
                <input
                  type="number"
                  placeholder="$0.00"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Tiempo estimado (min)
                </label>
                <input
                  type="number"
                  placeholder="30"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-6 py-2.5 rounded-lg text-sm shadow-md transition">
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

        {activeTab === "exclusion" && (
          <div>
            <h2 className="text-lg font-semibold text-slate-700 mb-5">
              Exclusión de módulos
            </h2>

            <p className="text-sm text-slate-500 mb-5">
              Selecciona los módulos que no deseas incluir en esta sede:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                "Productos",
                "Ventas",
                "Cocina",
                "Usuarios",
                "Clientes",
                "Bodegas",
                "Utensilios",
              ].map((mod) => (
                <label
                  key={mod}
                  className="flex items-center gap-2 text-sm bg-orange-50 border border-orange-100 rounded-md px-3 py-2 hover:bg-orange-100 transition"
                >
                  <input type="checkbox" className="h-4 w-4 text-orange-500" />
                  {mod}
                </label>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-6 py-2.5 rounded-lg text-sm shadow-md transition">
                Guardar Configuración
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

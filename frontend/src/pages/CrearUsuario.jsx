// src/pages/CrearUsuario.jsx
import React from "react";

export default function CrearUsuario() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-6">Crear Usuario</h1>

      <div className="bg-white rounded shadow p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Columna izquierda: Foto */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 flex items-center justify-center bg-yellow-100 border rounded-full mb-4">
            <span className="text-5xl">?</span>
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
            + Seleccionar
          </button>
        </div>

        {/* Columna central: Datos principales */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Sede</label>
            <select className="w-full border rounded px-3 py-2 text-sm">
              <option>Seleccione...</option>
              <option>Florencia</option>
              <option>Otra sede</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Número de documento</label>
            <input type="text" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Nombre usuario</label>
            <input type="text" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input type="password" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input type="text" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium">Sueldo Básico</label>
            <input type="number" className="w-full border rounded px-3 py-2 text-sm" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="whatsapp" className="h-4 w-4" />
            <label htmlFor="whatsapp" className="text-sm">Notificación por WhatsApp</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="activo" className="h-4 w-4" defaultChecked />
            <label htmlFor="activo" className="text-sm">Activo</label>
          </div>
        </div>


        {/* Columna derecha: Roles */}
        <div>
          <label className="block text-sm font-medium mb-2">Seleccione roles de usuario</label>
          <div className="flex gap-2">
            <select multiple className="w-full border rounded px-2 py-2 text-sm h-40">
              <option>CAJERO</option>
              <option>PANADERO</option>
              <option>ADMINISTRADOR NEGOCIO</option>
              <option>SUPERVISOR NEGOCIO</option>
              <option>MESERO</option>
              <option>ASESOR COMERCIAL</option>
            </select>
            <div className="flex flex-col gap-1">
              <button className="bg-slate-200 px-2 py-1 rounded">{">"}</button>
              <button className="bg-slate-200 px-2 py-1 rounded">{">>"}</button>
              <button className="bg-slate-200 px-2 py-1 rounded">{"<"}</button>
              <button className="bg-slate-200 px-2 py-1 rounded">{"<<"}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm">
          Cancelar
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
          Crear Usuario
        </button>
      </div>
    </div>
  );
}

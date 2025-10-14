import React, { useState } from "react";
import CrearCliente from "./CrearCliente";
import EditarCliente from "./EditarCliente";
import CreacionMasivaClientes from "./CreacionMasiva";
import { Search } from "lucide-react";

export default function GestionClientes() {
  const [clientes, setClientes] = useState([
    { id: 1, documento: "1032456789", tipo: "Cédula de ciudadanía", nombres: "Karen", apellidos: "Hoyos", telefono: "3124567890", email: "karen.hoyos@gmail.com", direccion: "Calle 12 #8-45" },
    { id: 2, documento: "987654321", tipo: "NIT", nombres: "Carlos", apellidos: "Pérez", telefono: "3109876543", email: "carlospz@hotmail.com", direccion: "Carrera 9 #10-23" },
  ]);

  const [showCrear, setShowCrear] = useState(false);
  const [showEditar, setShowEditar] = useState(false);
  const [showMasiva, setShowMasiva] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [filtro, setFiltro] = useState("");

  const handleEditar = (cliente) => {
    setClienteEditando(cliente);
    setShowEditar(true);
  };

  const handleGuardarEdicion = (clienteActualizado) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === clienteActualizado.id ? clienteActualizado : c))
    );
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro deseas eliminar este cliente?")) {
      setClientes(clientes.filter((c) => c.id !== id));
    }
  };

  const handleImportarClientes = (nuevos) => {
    const procesados = nuevos.map((n, i) => ({
      id: Date.now() + i,
      documento: n.documento || n.Documento || "",
      tipo: n.tipo || n.Tipo || "Cédula de ciudadanía",
      nombres: n.nombres || n.Nombres || "",
      apellidos: n.apellidos || n.Apellidos || "",
      telefono: n.telefono || n.Telefono || "",
      email: n.email || n.Email || "",
      direccion: n.direccion || n.Dirección || "",
    }));
    setClientes((prev) => [...prev, ...procesados]);
  };

  // 🔍 Filtro de búsqueda
  const clientesFiltrados = clientes.filter(
    (c) =>
      c.nombres.toLowerCase().includes(filtro.toLowerCase()) ||
      c.apellidos.toLowerCase().includes(filtro.toLowerCase()) ||
      c.documento.includes(filtro)
  );

  return (
    <div className="w-full px-6 sm:px-10 py-8 bg-gradient-to-br from-orange-50 via-white to-pink-50 min-h-screen">
      {/* ===== Encabezado principal ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 text-center sm:text-left">
          Gestión de Clientes
        </h1>
        <p className="text-sm text-slate-500 mt-2 sm:mt-0">
          Total de clientes: <span className="font-semibold text-orange-600">{clientes.length}</span>
        </p>
      </div>

      {/* ===== Barra de acciones ===== */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
        <button
          onClick={() => setShowCrear(true)}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
        >
          + Crear Cliente
        </button>
        <button
          onClick={() => setShowMasiva(true)}
          className="bg-gradient-to-r from-orange-500 to-pink-500 hover:brightness-110 text-white px-4 py-2 rounded-lg text-sm shadow-md transition"
        >
          📂 Creación Masiva
        </button>

        {/* Filtro de búsqueda */}
        <div className="flex items-center bg-white border border-orange-100 rounded-lg shadow-sm px-3 py-1.5 ml-auto sm:ml-6 w-full sm:w-64">
          <Search size={16} className="text-orange-400 mr-2" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full text-sm outline-none bg-transparent text-slate-700"
          />
        </div>
      </div>

      {/* ===== Tabla ===== */}
      <div className="bg-white/95 border border-orange-100 rounded-2xl shadow p-4 sm:p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">
          Lista de Clientes ({clientesFiltrados.length})
        </h2>
        <table className="min-w-full text-sm border border-orange-100 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-400/90 to-fuchsia-400/90 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Documento</th>
              <th className="px-4 py-2 text-left">Nombres</th>
              <th className="px-4 py-2 text-left">Apellidos</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Dirección</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-orange-100 hover:bg-orange-50/60 transition"
                >
                  <td className="px-4 py-2">{c.documento}</td>
                  <td className="px-4 py-2">{c.nombres}</td>
                  <td className="px-4 py-2">{c.apellidos}</td>
                  <td className="px-4 py-2">{c.telefono}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.direccion}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-2">
                    <button
                      onClick={() => handleEditar(c)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs shadow transition"
                    >
                      ✎ Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(c.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow transition"
                    >
                      🗑 Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-slate-400">
                  No se encontraron clientes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== Modales ===== */}
      {showCrear && <CrearCliente onClose={() => setShowCrear(false)} />}
      {showEditar && (
        <EditarCliente
          cliente={clienteEditando}
          onClose={() => setShowEditar(false)}
          onGuardar={handleGuardarEdicion}
        />
      )}
      {showMasiva && (
        <CreacionMasivaClientes
          onClose={() => setShowMasiva(false)}
          onGuardar={handleImportarClientes}
        />
      )}
    </div>
  );
}

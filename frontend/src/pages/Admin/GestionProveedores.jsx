import React, { useState } from "react";

export default function GestionProveedores() {
  // Estado inicial de proveedores
  const [proveedores, setProveedores] = useState([
    { id: 1, nombre: "Distribuidora ABC", telefono: "3214567890", email: "abc@gmail.com", direccion: "Calle 10 #45-23" },
    { id: 2, nombre: "Suministros XYZ", telefono: "3109876543", email: "xyz@hotmail.com", direccion: "Carrera 5 #12-34" },
  ]);

  const [filtro, setFiltro] = useState("");
  const [formData, setFormData] = useState({ id: null, nombre: "", telefono: "", email: "", direccion: "" });
  const [modoEdicion, setModoEdicion] = useState(false);

  // Filtrado de proveedores
  const proveedoresFiltrados = proveedores.filter((prov) =>
    prov.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Manejo de inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar nuevo proveedor
  const handleAgregar = () => {
    if (!formData.nombre || !formData.telefono) return alert("Nombre y Teléfono son obligatorios");
    setProveedores([
      ...proveedores,
      { ...formData, id: Date.now() },
    ]);
    resetForm();
  };

  // Editar proveedor
  const handleEditar = (prov) => {
    setModoEdicion(true);
    setFormData(prov);
  };

  // Guardar edición
  const handleGuardar = () => {
    setProveedores(
      proveedores.map((prov) =>
        prov.id === formData.id ? formData : prov
      )
    );
    resetForm();
  };

  // Eliminar proveedor
  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro deseas eliminar este proveedor?")) {
      setProveedores(proveedores.filter((prov) => prov.id !== id));
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setModoEdicion(false);
    setFormData({ id: null, nombre: "", telefono: "", email: "", direccion: "" });
  };

  return (
    <div className="px-34">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Gestión de Proveedores</h1>

      {/* Filtro */}
      <div className="mb-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <input
          type="text"
          placeholder="Buscar proveedor..."
          className="border rounded px-3 py-2 text-sm w-full sm:w-1/2"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      {/* Formulario CRUD */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {modoEdicion ? "Editar Proveedor" : "Agregar Proveedor"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="w-full border rounded px-3 py-2 text-sm"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="text"
              name="telefono"
              className="w-full border rounded px-3 py-2 text-sm"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border rounded px-3 py-2 text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="w-full border rounded px-3 py-2 text-sm"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {modoEdicion ? (
            <>
              <button
                onClick={handleGuardar}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
              >
                Guardar Cambios
              </button>
              <button
                onClick={resetForm}
                className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={handleAgregar}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
            >
              Agregar Proveedor
            </button>
          )}
        </div>
      </div>

      {/* Tabla de proveedores */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <h2 className="text-lg font-semibold mb-4">Lista de Proveedores</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-3 py-2 border">Nombre</th>
                <th className="px-3 py-2 border">Teléfono</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Dirección</th>
                <th className="px-3 py-2 border text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedoresFiltrados.length > 0 ? (
                proveedoresFiltrados.map((prov) => (
                  <tr key={prov.id} className="hover:bg-slate-50">
                    <td className="px-3 py-2 border">{prov.nombre}</td>
                    <td className="px-3 py-2 border">{prov.telefono}</td>
                    <td className="px-3 py-2 border">{prov.email}</td>
                    <td className="px-3 py-2 border">{prov.direccion}</td>
                    <td className="px-3 py-2 border text-center flex justify-center gap-2">
                      <button
                        onClick={() => handleEditar(prov)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleEliminar(prov.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-slate-400 py-4">
                    No se encontraron proveedores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

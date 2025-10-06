import React, { useState } from "react";
import ModalAgregarCategoria from "../Admin/AgregarCategoria"; 
import ModalEditarCategoria from "../Admin/EditarCategoria";

export default function GestionCategorias() {
  const [mostrarModalAgregar, setMostrarModalAgregar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const categorias = [
    {
      id: 1,
      nombre: "ABARROTES",
      posicion: "ABARROTES",
      icono: "/images/abarrotes.png",
      banner: "/images/banner_abarrotes.png",
      visible: true,
      destacada: false,
      inactivar: false,
    },
    {
      id: 2,
      nombre: "ASEO",
      posicion: "ASEO",
      icono: "/images/aseo.png",
      banner: "/images/banner_aseo.png",
      visible: true,
      destacada: false,
      inactivar: false,
    },
    {
      id: 3,
      nombre: "FRUTAS",
      posicion: "FRUTAS",
      icono: "/images/frutas.png",
      banner: "/images/banner_frutas.png",
      visible: true,
      destacada: false,
      inactivar: false,
    },
  ];

  return (
    <div className="p-6">
      {/* ===== Título ===== */}
      <h1 className="text-xl font-bold mb-4">Gestión de Categorías</h1>

      {/* ===== Barra de acciones ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <p className="text-sm text-slate-600">
          Recuerde que las categorías son las mismas para todas las sedes
        </p>

        {/* Botón Nueva Categoría */}
        <button
          onClick={() => setMostrarModalAgregar(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow text-sm font-medium transition-all duration-200 active:scale-95"
        >
          <span className="text-lg font-bold">＋</span> NUEVA CATEGORÍA
        </button>
      </div>

      {/* ===== Tabla responsive ===== */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left hidden sm:table-cell">
                Posición
              </th>
              <th className="px-4 py-2 text-left">Icono</th>
              <th className="px-4 py-2 text-left">Banner</th>
              <th className="px-4 py-2 text-center">Tienda Virtual</th>
              <th className="px-4 py-2 text-center hidden md:table-cell">
                Destacada
              </th>
              <th className="px-4 py-2 text-center hidden md:table-cell">
                Inactivar TPV
              </th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition">
                <td className="px-4 py-2">{cat.nombre}</td>
                <td className="px-4 py-2 hidden sm:table-cell">
                  {cat.posicion}
                </td>
                <td className="px-4 py-2">
                  <img
                    src={cat.icono}
                    alt={cat.nombre}
                    className="h-10 w-10 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2">
                  <img
                    src={cat.banner}
                    alt={`${cat.nombre} banner`}
                    className="h-10 w-20 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-center">
                  <input type="checkbox" defaultChecked={cat.visible} />
                </td>
                <td className="px-4 py-2 text-center hidden md:table-cell">
                  <input type="checkbox" defaultChecked={cat.destacada} />
                </td>
                <td className="px-4 py-2 text-center hidden md:table-cell">
                  <input type="checkbox" defaultChecked={cat.inactivar} />
                </td>
                <td className="px-4 py-2 flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setCategoriaSeleccionada(cat);
                      setMostrarModalEditar(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Modal de Agregar Categoría ===== */}
      <ModalAgregarCategoria
        visible={mostrarModalAgregar}
        onClose={() => setMostrarModalAgregar(false)}
      />

      {/* ===== Modal de Editar Categoría ===== */}
      <ModalEditarCategoria
        visible={mostrarModalEditar}
        onClose={() => setMostrarModalEditar(false)}
        categoria={categoriaSeleccionada}
      />
    </div>
  );
}

import React, { useState } from "react";
import { FolderTree, PlusCircle } from "lucide-react";
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
    <div className="p-4 sm:p-1 w-full max-w-[calc(150%-16rem)]">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-fuchsia-500 p-2.5 rounded-lg text-white shadow-md">
          <FolderTree size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Gestión de Categorías
        </h1>
      </div>

      {/* ===== Barra de acciones ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <p className="text-sm text-slate-600">
          Las categorías son compartidas en todas las sedes del sistema.
        </p>

        <button
          onClick={() => setMostrarModalAgregar(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:brightness-110 text-white px-4 py-2 rounded-md shadow-md text-sm font-medium transition active:scale-95"
        >
          <PlusCircle size={16} /> Nueva Categoría
        </button>
      </div>

      {/* ===== Tabla ===== */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-slate-200 transition hover:shadow-lg">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
            <tr>
              <th className="px-4 py-2 text-left font-medium">Nombre</th>
              <th className="px-4 py-2 text-left hidden sm:table-cell font-medium">
                Posición
              </th>
              <th className="px-4 py-2 text-left font-medium">Icono</th>
              <th className="px-4 py-2 text-left font-medium">Banner</th>
              <th className="px-4 py-2 text-center font-medium">Tienda Virtual</th>
              <th className="px-4 py-2 text-center hidden md:table-cell font-medium">
                Destacada
              </th>
              <th className="px-4 py-2 text-center hidden md:table-cell font-medium">
                Inactivar TPV
              </th>
              <th className="px-4 py-2 text-center font-medium">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {categorias.map((cat) => (
              <tr
                key={cat.id}
                className="hover:bg-orange-50/70 transition-all duration-150"
              >
                <td className="px-4 py-3 font-medium text-slate-700">
                  {cat.nombre}
                </td>
                <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">
                  {cat.posicion}
                </td>
                <td className="px-4 py-3">
                  <img
                    src={cat.icono}
                    alt={cat.nombre}
                    className="h-10 w-10 object-cover rounded-full border border-slate-200 shadow-sm"
                  />
                </td>
                <td className="px-4 py-3">
                  <img
                    src={cat.banner}
                    alt={`${cat.nombre} banner`}
                    className="h-10 w-24 object-cover rounded border border-slate-200 shadow-sm"
                  />
                </td>
                <td className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    defaultChecked={cat.visible}
                    className="accent-orange-500 h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell">
                  <input
                    type="checkbox"
                    defaultChecked={cat.destacada}
                    className="accent-fuchsia-500 h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell">
                  <input
                    type="checkbox"
                    defaultChecked={cat.inactivar}
                    className="accent-slate-500 h-4 w-4"
                  />
                </td>
                <td className="px-4 py-3 text-center flex justify-center gap-2">
                  <button
                    onClick={() => {
                      setCategoriaSeleccionada(cat);
                      setMostrarModalEditar(true);
                    }}
                    className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded text-xs shadow-sm transition"
                  >
                    Editar
                  </button>
                  <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow-sm transition">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Modal Agregar ===== */}
      <ModalAgregarCategoria
        visible={mostrarModalAgregar}
        onClose={() => setMostrarModalAgregar(false)}
      />

      {/* ===== Modal Editar ===== */}
      <ModalEditarCategoria
        visible={mostrarModalEditar}
        onClose={() => setMostrarModalEditar(false)}
        categoria={categoriaSeleccionada}
      />
    </div>
  );
}

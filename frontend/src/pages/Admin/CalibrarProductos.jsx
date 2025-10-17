import React, { useState } from "react";
import { Wrench, Edit3, Trash2, Search } from "lucide-react";
import ModalEditarProducto from "../Admin/EditarProducto";

export default function CalibrarProductos() {
  const [buscar, setBuscar] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [modalEditar, setModalEditar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const [productos, setProductos] = useState([
    {
      id: 1,
      codigo: "A001",
      nombre: "Cebolla Blanca Pelada",
      categoria: "Verduras",
      tipo: "Báscula",
      precioCompra: 3000,
      precioVenta: 4000,
      activo: true,
    },
    {
      id: 2,
      codigo: "A002",
      nombre: "Aceite El Valle X500",
      categoria: "Abarrotes",
      tipo: "Compra y Venta",
      precioCompra: 3600,
      precioVenta: 4600,
      activo: true,
    },
  ]);

  const productosFiltrados = productos.filter(
    (p) =>
      (categoria === "Todas" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  const handleEliminar = (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  const handleEditar = (producto) => {
    setProductoSeleccionado(producto);
    setModalEditar(true);
  };

  const handleGuardar = (productoEditado) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === productoEditado.id ? productoEditado : p))
    );
    setModalEditar(false);
  };

  return (
    <div className="p-4 sm:p-10 w-full max-w-[calc(150%-16rem)]">
      {/* ====== ENCABEZADO ====== */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2.5 rounded-lg text-white shadow-md">
          <Wrench size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Calibrar Productos
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        Ajuste y edición de precios – InventNet
      </p>

      {/* ====== FILTROS ====== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Search size={18} className="text-orange-500" />
          Buscar y filtrar productos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Categoría
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            >
              <option>Todas</option>
              <option>Verduras</option>
              <option>Frutas</option>
              <option>Abarrotes</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Buscar producto
            </label>
            <input
              type="text"
              value={buscar}
              onChange={(e) => setBuscar(e.target.value)}
              placeholder="Nombre o código..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200"
            />
          </div>
        </div>
      </div>

      {/* ====== TABLA ====== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <h2 className="text-base sm:text-lg font-semibold text-slate-700 mb-4">
          Productos calibrables ({productosFiltrados.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-3 py-2 text-left">Código</th>
                <th className="px-3 py-2 text-left">Nombre</th>
                <th className="px-3 py-2 text-left">Categoría</th>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-right">Compra</th>
                <th className="px-3 py-2 text-right">Venta</th>
                <th className="px-3 py-2 text-center">Activo</th>
                <th className="px-3 py-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {productosFiltrados.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="px-3 py-2">{p.codigo}</td>
                  <td className="px-3 py-2 font-medium text-slate-700">
                    {p.nombre}
                  </td>
                  <td className="px-3 py-2">{p.categoria}</td>
                  <td className="px-3 py-2">{p.tipo}</td>
                  <td className="px-3 py-2 text-right text-slate-600">
                    ${p.precioCompra.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-right font-semibold text-emerald-600">
                    ${p.precioVenta.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        p.activo
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {p.activo ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEditar(p)}
                        className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1 rounded-md text-xs shadow"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleEliminar(p.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-md text-xs shadow"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== MODAL EXTERNO ===== */}
      {modalEditar && (
        <ModalEditarProducto
          producto={productoSeleccionado}
          onClose={() => setModalEditar(false)}
          onSave={handleGuardar}
        />
      )}
    </div>
  );
}

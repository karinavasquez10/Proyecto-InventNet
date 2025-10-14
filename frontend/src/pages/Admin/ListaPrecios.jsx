import React, { useState } from "react";
import { Tag, FileSpreadsheet, Search } from "lucide-react";

export default function ListaPrecios() {
  const [categoria, setCategoria] = useState("Todas");
  const [buscar, setBuscar] = useState("");
  const [productos, setProductos] = useState([
    {
      codigo: "A001",
      nombre: "Cebolla Blanca Pelada",
      categoria: "Verduras",
      tipo: "Báscula",
      precioCompra: 3000,
      precioVenta: 4000,
      margen: "33%",
    },
    {
      codigo: "A002",
      nombre: "Aceite El Valle X500",
      categoria: "Abarrotes",
      tipo: "Compra y Venta",
      precioCompra: 3600,
      precioVenta: 4600,
      margen: "27%",
    },
  ]);

  const productosFiltrados = productos.filter(
    (p) =>
      (categoria === "Todas" || p.categoria === categoria) &&
      p.nombre.toLowerCase().includes(buscar.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-15 w-full max-w-[calc(150%-16rem)] mt-0">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-emerald-500 to-sky-500 p-2.5 rounded-lg text-white shadow-md">
          <Tag size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Lista de Precios
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-6 font-medium">
        MERKA FRUVER FLORENCIA
      </p>

      {/* ===== Controles de filtro ===== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 mb-8">
        <h2 className="text-base sm:text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
          <Search size={18} className="text-emerald-500" />
          Filtros de búsqueda
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Categoría
            </label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
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
              placeholder="Escribe el nombre o código..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200 focus:border-sky-300"
            />
          </div>
        </div>
      </div>

      {/* ===== Tabla de precios ===== */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base sm:text-lg font-semibold text-slate-700">
            Productos disponibles ({productosFiltrados.length})
          </h2>

          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm shadow transition">
            <FileSpreadsheet size={16} />
            Exportar Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
              <tr>
                <th className="px-3 py-2 text-left">Código</th>
                <th className="px-3 py-2 text-left">Producto</th>
                <th className="px-3 py-2 text-left">Categoría</th>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-right">Precio Compra</th>
                <th className="px-3 py-2 text-right">Precio Venta</th>
                <th className="px-3 py-2 text-center">Margen</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((p, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50 transition duration-150"
                  >
                    <td className="px-3 py-2">{p.codigo}</td>
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {p.nombre}
                    </td>
                    <td className="px-3 py-2">{p.categoria}</td>
                    <td className="px-3 py-2">{p.tipo}</td>
                    <td className="px-3 py-2 text-right text-slate-700">
                      {p.precioCompra.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-emerald-600">
                      {p.precioVenta.toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                      })}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-semibold">
                        {p.margen}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-slate-400 py-6 text-sm"
                  >
                    No se encontraron productos.
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

import React, { useState } from "react";
import { PackageSearch, Filter, AlertTriangle, Database } from "lucide-react";

export default function ConsultaAvaluoInventario() {
  const [categoria, setCategoria] = useState("Todas las categorías");
  const [busqueda, setBusqueda] = useState("");

  const productos = [
    {
      codigo: "A4",
      nombre: "Cebolla Blanca Pelada",
      compra: 3000,
      venta: 4000,
      stock: -773620,
      clasificacion: "A",
      tipo: "Báscula",
      categoria: "Verduras",
    },
    {
      codigo: "CA10",
      nombre: "25 G <20%",
      compra: 4800,
      venta: 5300,
      stock: -22,
      clasificacion: "B",
      tipo: "Compra y Venta",
      categoria: "Abarrotes",
    },
  ];

  return (
    <div className="p-4 sm:p-1 w-full max-w-[calc(150%-16rem)] mt-2">
      {/* ===== ENCABEZADO ===== */}
      <div className="flex items-center gap-3 mb-2 -mt-2">
        <div className="bg-gradient-to-r from-emerald-500 to-sky-500 p-2.5 rounded-lg text-white shadow-md">
          <PackageSearch size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Consulta de Inventario
        </h1>
      </div>
      <p className="text-sm text-slate-500 mb-5 font-medium">
        MERKA FRUVER FLORENCIA
      </p>

      {/* ===== INDICADORES ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-amber-700 font-semibold">
              Productos calibrados
            </p>
            <p className="text-lg font-bold text-amber-600">0%</p>
          </div>
          <AlertTriangle size={28} className="text-amber-500" />
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-emerald-700 font-semibold">
              Productos totales
            </p>
            <p className="text-lg font-bold text-emerald-600">245</p>
          </div>
          <Database size={26} className="text-emerald-500" />
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-rose-700 font-semibold">
              Stock negativo
            </p>
            <p className="text-lg font-bold text-rose-600">12</p>
          </div>
          <AlertTriangle size={26} className="text-rose-500" />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-700 font-semibold">Clases A</p>
            <p className="text-lg font-bold text-blue-600">86</p>
          </div>
          <Filter size={26} className="text-blue-500" />
        </div>
      </div>

      {/* ===== FILTROS ===== */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <select
            className="border rounded px-3 py-2 text-sm shadow-sm"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option>Todas las categorías</option>
            <option>Verduras</option>
            <option>Abarrotes</option>
            <option>Frutas</option>
          </select>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-64 shadow-sm"
          />

          <div className="flex flex-wrap gap-2 ml-auto">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm shadow">
              Todos
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded text-sm shadow">
              Por Calibrar
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm shadow">
              Clase A
            </button>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 py-2 rounded text-sm shadow">
              Inactivos
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm shadow">
              Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* ===== TABLA DE INVENTARIO ===== */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-x-auto">
        <table className="min-w-full text-xs sm:text-sm border-collapse">
          <thead className="bg-gradient-to-r from-orange-400/90 to-fuchsia-400/90 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Código</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-right">Precio compra</th>
              <th className="px-4 py-2 text-right">Precio venta</th>
              <th className="px-4 py-2 text-right">Stock</th>
              <th className="px-4 py-2 text-center">Clasificación</th>
              <th className="px-4 py-2 text-center">Tipo</th>
              <th className="px-4 py-2 text-center">Categoría</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p, i) => (
              <tr
                key={i}
                className="hover:bg-orange-50 transition border-b border-slate-100"
              >
                <td className="px-4 py-2">{p.codigo}</td>
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2 text-right">
                  ${p.compra.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-right">
                  ${p.venta.toLocaleString()}
                </td>
                <td
                  className={`px-4 py-2 text-right font-medium ${
                    p.stock < 0 ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {p.stock.toLocaleString()}
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.clasificacion === "A"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {p.clasificacion}
                  </span>
                </td>
                <td className="px-4 py-2 text-center text-slate-600">
                  {p.tipo}
                </td>
                <td className="px-4 py-2 text-center text-slate-600">
                  {p.categoria}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan="8"
                className="text-center text-slate-400 py-4 italic"
              >
                Más registros aquí...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

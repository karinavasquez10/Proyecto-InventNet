import React, { useState } from "react";
import { FileText, Search, Printer, User } from "lucide-react";

export default function Cotizaciones() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Manzanas", precio: 2500 },
    { id: 2, nombre: "Arroz 1Kg", precio: 3200 },
    { id: 3, nombre: "Aceite 1L", precio: 9500 },
  ]);

  const [filtro, setFiltro] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [cliente, setCliente] = useState("");

  const agregarProducto = (prod) => {
    if (!seleccionados.find((p) => p.id === prod.id)) {
      setSeleccionados([...seleccionados, { ...prod, cantidad: 1 }]);
    }
  };

  const eliminarProducto = (id) => {
    setSeleccionados(seleccionados.filter((p) => p.id !== id));
  };

  const cambiarCantidad = (id, cantidad) => {
    setSeleccionados(
      seleccionados.map((p) =>
        p.id === id ? { ...p, cantidad: Math.max(1, cantidad) } : p
      )
    );
  };

  const total = seleccionados.reduce(
    (sum, p) => sum + p.precio * p.cantidad,
    0
  );

  return (
    <div className="px-50">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2.5 rounded-lg text-white shadow-md">
          <FileText size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Cotizaciones de Productos
        </h1>
      </div>

      {/* ===== Información del cliente ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 border border-slate-200">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
          <User size={18} className="text-sky-500" />
          Información del Cliente
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200 focus:outline-none"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Fecha de cotización
            </label>
            <input
              type="date"
              className="w-full border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-sky-200 focus:outline-none"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </div>

      {/* ===== Buscador de productos ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 border border-slate-200">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
          <Search size={18} className="text-orange-500" />
          Buscar y agregar productos
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-orange-200 focus:outline-none"
          />
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:brightness-110 text-white px-4 py-2 rounded text-sm shadow-md transition">
            Buscar
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {productos
            .filter((p) =>
              p.nombre.toLowerCase().includes(filtro.toLowerCase())
            )
            .map((p) => (
              <div
                key={p.id}
                className="border border-slate-200 rounded-lg p-3 hover:shadow-md transition flex justify-between items-center bg-white"
              >
                <div>
                  <h3 className="font-semibold text-sm text-slate-800">
                    {p.nombre}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Precio: ${p.precio.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => agregarProducto(p)}
                  className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-3 py-1 rounded shadow-sm"
                >
                  Agregar
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* ===== Tabla de cotización ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6 border border-slate-200 overflow-x-auto">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Productos en cotización
        </h2>

        {seleccionados.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">
            No hay productos agregados.
          </p>
        ) : (
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Producto</th>
                <th className="px-3 py-2 text-right">Precio</th>
                <th className="px-3 py-2 text-center">Cantidad</th>
                <th className="px-3 py-2 text-right">Subtotal</th>
                <th className="px-3 py-2 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {seleccionados.map((p) => (
                <tr key={p.id}>
                  <td className="px-3 py-2">{p.nombre}</td>
                  <td className="px-3 py-2 text-right">
                    ${p.precio.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={p.cantidad}
                      onChange={(e) =>
                        cambiarCantidad(p.id, parseInt(e.target.value))
                      }
                      className="w-16 border border-slate-300 rounded text-center text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 text-right text-slate-700">
                    ${(p.precio * p.cantidad).toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <button
                      onClick={() => eliminarProducto(p.id)}
                      className="text-red-500 hover:text-red-600 text-xs"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ===== Total y acciones ===== */}
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border border-slate-200">
        <div className="text-lg font-semibold text-slate-700">
          Total:{" "}
          <span className="text-green-600">${total.toLocaleString()}</span>
        </div>

        <div className="flex gap-3">
          <button className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm shadow">
            Cancelar
          </button>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm shadow">
            Guardar
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm shadow flex items-center gap-1">
            <Printer size={16} /> Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}

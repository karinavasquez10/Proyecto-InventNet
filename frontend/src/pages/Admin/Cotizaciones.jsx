import React, { useState } from "react";

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
      {/* ===== Título ===== */}
      <h1 className="text-xl font-bold text-slate-800 mb-6">
        Cotizaciones de Productos
      </h1>

      {/* ===== Datos del cliente ===== */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Información del Cliente
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nombre del cliente
            </label>
            <input
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-orange-200"
              placeholder="Ej. Juan Pérez"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha de cotización
            </label>
            <input
              type="date"
              className="w-full border rounded px-3 py-2 text-sm focus:ring focus:ring-orange-200"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
      </div>

      {/* ===== Buscador de productos ===== */}
      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Buscar y agregar productos
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="flex-1 border rounded px-3 py-2 text-sm focus:ring focus:ring-orange-200"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition-all duration-150">
            Buscar
          </button>
        </div>

        {/* Resultados */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {productos
            .filter((p) =>
              p.nombre.toLowerCase().includes(filtro.toLowerCase())
            )
            .map((p) => (
              <div
                key={p.id}
                className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold text-sm">{p.nombre}</h3>
                  <p className="text-xs text-slate-500">
                    Precio: ${p.precio.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => agregarProducto(p)}
                  className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-3 py-1 rounded"
                >
                  Agregar
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* ===== Tabla de cotización ===== */}
      <div className="bg-white p-5 rounded-lg shadow mb-6 overflow-x-auto">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Productos en cotización
        </h2>

        {seleccionados.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-4">
            No hay productos agregados.
          </p>
        ) : (
          <table className="min-w-full text-sm border">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-3 py-2 text-left">Producto</th>
                <th className="px-3 py-2 text-right">Precio</th>
                <th className="px-3 py-2 text-center">Cantidad</th>
                <th className="px-3 py-2 text-right">Subtotal</th>
                <th className="px-3 py-2 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y">
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
                      className="w-16 border rounded text-center text-sm"
                    />
                  </td>
                  <td className="px-3 py-2 text-right">
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
      <div className="bg-white p-5 rounded-lg shadow flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-lg font-semibold text-slate-700">
          Total:{" "}
          <span className="text-green-600">
            ${total.toLocaleString()}
          </span>
        </div>

        <div className="flex gap-3">
          <button className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm">
            Cancelar
          </button>
          <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm">
            Guardar Cotización
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
            Imprimir
          </button>
        </div>
      </div>

      {/* ===== Media Queries ===== */}
      <style>
        {`
          @media (max-width: 640px) {
            .text-lg {
              font-size: 1rem;
            }
            table {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
    </div>
  );
}

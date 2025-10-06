import React, { useState } from "react";

export default function ProductosRecogidos() {
  const [fechaInicial, setFechaInicial] = useState("2025-10-06");
  const [fechaFinal, setFechaFinal] = useState("2025-10-06");
  const [resultados, setResultados] = useState([]);

  const handleConsultar = () => {
    // Simulación de resultados
    setResultados([
      {
        fecha: "2025-10-06",
        usuario: "Karen Hoyos",
        producto: "Cebolla Blanca Pelada",
        precioVenta: "$4.000",
        cantidadDisponible: "120",
        cantidadRecogida: "20",
        saldo: "100",
        observacion: "Producto parcialmente recogido",
      },
      {
        fecha: "2025-10-06",
        usuario: "Ana López",
        producto: "Aceite El Valle X500",
        precioVenta: "$3.600",
        cantidadDisponible: "50",
        cantidadRecogida: "50",
        saldo: "0",
        observacion: "Stock agotado",
      },
    ]);
  };

  return (
    <div className="p-4 sm:p-6 max-w-full">
      {/* ===== Título ===== */}
      <h1 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800">
        Consulta Productos Recogidos
      </h1>
      <div className="text-sm text-slate-600 mb-2">
        MERKA FRUVER FLORENCIA
      </div>

      {/* ===== Parámetros de consulta ===== */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Parámetros de consulta
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha inicial
            </label>
            <input
              type="date"
              value={fechaInicial}
              onChange={(e) => setFechaInicial(e.target.value)}
              className="w-full border rounded px-2 py-1.5 text-sm focus:ring focus:ring-orange-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Fecha final
            </label>
            <input
              type="date"
              value={fechaFinal}
              onChange={(e) => setFechaFinal(e.target.value)}
              className="w-full border rounded px-2 py-1.5 text-sm focus:ring focus:ring-orange-200"
            />
          </div>

          <div className="flex justify-start sm:justify-end">
            <button
              onClick={handleConsultar}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm w-full sm:w-auto"
            >
              Consultar
            </button>
          </div>
        </div>
      </div>

      {/* ===== Lista de productos ===== */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Lista de productos ({resultados.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border">
            <thead className="bg-slate-100 text-slate-600">
              <tr className="text-left">
                <th className="px-3 py-2 border">Fecha</th>
                <th className="px-3 py-2 border">Usuario</th>
                <th className="px-3 py-2 border">Producto</th>
                <th className="px-3 py-2 border">Precio venta</th>
                <th className="px-3 py-2 border">Cant. disponibles</th>
                <th className="px-3 py-2 border">Cant. recogidas</th>
                <th className="px-3 py-2 border">Saldo</th>
                <th className="px-3 py-2 border">Observación</th>
              </tr>
            </thead>
            <tbody>
              {resultados.length > 0 ? (
                resultados.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-3 py-2 border">{item.fecha}</td>
                    <td className="px-3 py-2 border">{item.usuario}</td>
                    <td className="px-3 py-2 border">{item.producto}</td>
                    <td className="px-3 py-2 border">{item.precioVenta}</td>
                    <td className="px-3 py-2 border">{item.cantidadDisponible}</td>
                    <td className="px-3 py-2 border">{item.cantidadRecogida}</td>
                    <td
                      className={`px-3 py-2 border font-medium ${
                        item.saldo === "0"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.saldo}
                    </td>
                    <td className="px-3 py-2 border text-slate-600">
                      {item.observacion}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-slate-400 py-4"
                  >
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Estilos Responsivos ===== */}
      <style>
        {`
          @media (max-width: 640px) {
            h1 {
              font-size: 1.25rem;
              text-align: center;
            }
            table {
              font-size: 0.75rem;
            }
            .p-5 {
              padding: 1rem;
            }
          }

          @media (min-width: 768px) {
            .max-w-full {
              padding-left: 1rem;
              padding-right: 1rem;
            }
          }

          @media (min-width: 1024px) {
            .max-w-full {
              padding-left: 2rem;
              padding-right: 2rem;
            }
          }
        `}
      </style>
    </div>
  );
}

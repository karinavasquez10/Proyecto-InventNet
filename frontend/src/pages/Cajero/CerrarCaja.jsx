// src/pages/CerrarCaja.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

const denominaciones = [
  { label: "$100.000", value: 100000 },
  { label: "$50.000", value: 50000 },
  { label: "$20.000", value: 20000 },
  { label: "$10.000", value: 10000 },
  { label: "$5.000", value: 5000 },
  { label: "$2.000", value: 2000 },
  { label: "$1.000", value: 1000 },
  { label: "$500", value: 500 },
  { label: "$200", value: 200 },
  { label: "$100", value: 100 }
];

const CerrarCaja = ({ ventas, onClose }) => {
 
  const [conteo, setConteo] = useState({});

  const handleChange = (value, cantidad) => {
    setConteo({
      ...conteo,
      [value]: cantidad ? parseInt(cantidad) : 0
    });
  };

  const totalContado = Object.entries(conteo).reduce(
    (acc, [den, cant]) => acc + den * cant,
    0
  );

  const totalEsperado =
    (ventas.efectivo || 0) + (ventas.tarjeta || 0) + (ventas.nequi || 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[800px] h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-1">
        <h2 className="text-xl font-bold text-gray-800">Cierre de Caja</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-full"
        >
          <X size={20} />
        </button>
      </div>

      {/* Resumen de ventas */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded-lg">
          <h3 className="text-sm font-medium">Efectivo</h3>
          <p className="text-lg font-bold text-green-700">
            ${(ventas.efectivo || 0).toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg">
          <h3 className="text-sm font-medium">Tarjeta</h3>
          <p className="text-lg font-bold text-blue-700">
            ${(ventas.tarjeta || 0).toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-purple-100 rounded-lg">
          <h3 className="text-sm font-medium">Nequi</h3>
          <p className="text-lg font-bold text-purple-700">
            ${(ventas.nequi || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Conteo de efectivo */}
      <div className="flex-1 overflow-y-auto pr-2">
        <h3 className="font-semibold text-gray-700 mb-3">
          Conteo de billetes y monedas
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {denominaciones.map((den) => (
            <div
              key={den.value}
              className="flex justify-between items-center border rounded-lg p-2"
            >
              <span className="font-medium">{den.label}</span>
              <input
                type="number"
                min="0"
                className="w-20 border rounded p-1 text-center"
                placeholder="0"
                onChange={(e) => handleChange(den.value, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Totales */}
      <div className="mt-4 border-t pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Total Contado:</span>
          <span className="font-bold text-lg text-gray-800">
            ${totalContado.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium">Total Esperado:</span>
          <span className="font-bold text-lg text-gray-800">
            ${totalEsperado.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`font-medium ${
              totalContado === totalEsperado
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            Diferencia:
          </span>
          <span
            className={`font-bold text-lg ${
              totalContado === totalEsperado
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ${(totalContado - totalEsperado).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CerrarCaja;

import React, { useState } from "react";

const Cobrar = ({ total, onClose }) => {
  const [efectivo, setEfectivo] = useState("");

  const handleNumberClick = (num) => {
    setEfectivo(efectivo + num);
  };

  const handleClear = () => setEfectivo("");
  const handleBackspace = () => setEfectivo(efectivo.slice(0, -1));

  const efectivoInt = parseInt(efectivo || 0);
  const cambio = efectivoInt - total;

  return (
    <div className="bg-gray-950 text-white rounded-2xl shadow-lg flex w-full max-w-5xl h-auto">
      {/* Panel izquierdo */}
      <div className="flex-1 flex flex-col p-4">
        <h2 className="text-lg font-bold text-orange-500 mb-2">TOTAL:</h2>
        <div className="text-2xl font-bold text-orange-400 mb-3">
          ${total.toLocaleString()}
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="font-semibold">Tipo de pago:</span>
            <span className="bg-gray-800 px-2 py-1 rounded">CONTADO</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Sub Total:</span>
            <span className="text-orange-400">${total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Descuento:</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Cliente:</span>
            <button className="bg-orange-500 px-2 py-1 rounded text-xs">
              Nuevo
            </button>
          </div>
        </div>
      </div>

      {/* Panel derecho */}
      <div className="w-[360px] bg-gray-800 p-1 flex flex-col text-sm">
        {/* Input efectivo */}
        <input
          type="number"
          placeholder="Digite el efectivo recibido"
          value={efectivo}
          onChange={(e) => setEfectivo(e.target.value)}
          className="mb-2 p-2 rounded text-red w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
        />

        {/* Efectivo */}
        <div className="bg-green-600 p-2 rounded font-bold mb-2 text-center text-sm">
          EFECTIVO: ${efectivo || 0}
        </div>
        <div className="bg-green-700 p-2 rounded font-semibold mb-3 text-center text-sm">
          CAMBIO: ${cambio > 0 ? cambio.toLocaleString() : 0}
        </div>

        {/* Teclado numérico */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberClick(n.toString())}
              className="bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold text-base"
            >
              {n}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold text-base"
          >
            ⬅
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold text-base"
          >
            0
          </button>
          <button
            onClick={handleClear}
            className="bg-red-600 hover:bg-red-700 py-2 rounded font-bold text-base"
          >
            CE
          </button>
        </div>

        {/* Botones rápidos */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {[1000, 2000, 5000, 10000, 20000].map((val) => (
            <button
              key={val}
              onClick={() => setEfectivo((efectivoInt + val).toString())}
              className="bg-green-600 hover:bg-green-700 py-1 rounded font-bold text-xs"
            >
              ${val.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Descuentos */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[10, 15, 20, 25, 50].map((d) => (
            <button
              key={d}
              className="bg-gray-700 hover:bg-gray-600 py-1 rounded text-xs"
            >
              {d}%
            </button>
          ))}
        </div>

        {/* Botones finales */}
        <div className="flex gap-2 mb-2">
          <button
            onClick={onClose}
            className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded font-bold text-xs"
          >
            Cancelar
          </button>
          <button className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded font-bold text-xs">
            Confirmar
          </button>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-bold text-xs">
          Confirmar e Imprimir
        </button>
      </div>
    </div>
  );
};

export default Cobrar;

import React, { useState } from "react";

export default function CargueMasivo() {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setProgress(30);
      setTimeout(() => setProgress(100), 1000);
      setResults([
        { line: 1, action: "Insertado", result: "OK" },
        { line: 2, action: "Error", result: "Precio inválido" },
      ]);
    }
  };

  return (
    <div className="px-20">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-slate-800">
        Registro masivo de productos
      </h1>

      <div className="text-sm text-slate-600 mb-2">
        MERKA FRUVER FLORENCIA
      </div>

      {/* ===== Sección de formato ===== */}
      <div className="bg-white rounded-lg shadow p-5 mb-6">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Formato del archivo
        </h2>

        <p className="text-sm mb-3 text-slate-500">
          <strong>Formato esperado:</strong> Código · Nombre · Categoría · Tipo producto · Precio compra · Precio venta · Cada cuánto se compra
        </p>

        {/* Selector de archivo */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <label className="w-full sm:w-auto">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm">
              + Seleccionar
            </button>
          </label>
          {fileName && (
            <span className="text-sm text-slate-600 break-all">
              Archivo seleccionado: <strong>{fileName}</strong>
            </span>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-sky-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Encabezado reconocido */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-600">
            Encabezado reconocido: {progress === 100 ? "Sí" : "No"}
          </span>
          <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm">
            Borrar
          </button>
        </div>
      </div>

      {/* ===== Resultados de carga ===== */}
      <div className="bg-white rounded-lg shadow p-5">
        <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-700">
          Resultados de la carga
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border">
            <thead className="bg-slate-100 text-slate-600">
              <tr className="text-left">
                <th className="px-3 py-2 border">Línea</th>
                <th className="px-3 py-2 border">Acción</th>
                <th className="px-3 py-2 border">Resultado</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 border">{r.line}</td>
                    <td className="px-3 py-2 border">{r.action}</td>
                    <td
                      className={`px-3 py-2 border ${
                        r.result === "OK"
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }`}
                    >
                      {r.result}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-slate-400 py-4">
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Botón inferior ===== */}
      <div className="mt-6 flex justify-end">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm">
          Inactivar masivo
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { UploadCloud, FileSpreadsheet, Trash2 } from "lucide-react";

export default function CargueMasivo() {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [results, setResults] = useState([]);

  // === Cargar archivo Excel o CSV ===
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setProgress(30);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsed = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Saltar encabezado y mapear filas
      const formatted = parsed.slice(1).map((row, i) => ({
        line: i + 1,
        codigo: row[0] || "",
        nombre: row[1] || "",
        categoria: row[2] || "",
        tipo: row[3] || "",
        compra: row[4] || "",
        venta: row[5] || "",
        frecuencia: row[6] || "",
        result: row[1] ? "OK" : "Error: Nombre vacío",
      }));

      setResults(formatted);
      setTimeout(() => setProgress(100), 800);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    setFileName("");
    setProgress(0);
    setResults([]);
  };

  return (
   <div className="p-4 sm:p-21 w-full max-w-[calc(200%-16rem)] -mt-15">

      {/* ===== Título ===== */}
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2.5 rounded-lg text-white shadow-md">
          <FileSpreadsheet size={20} />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
          Cargue masivo de productos
        </h1>
      </div>

      {/* ===== Info Sede ===== */}
      <div className="text-sm text-slate-600 mb-2 font-medium">
        InventNet
      </div>

      {/* ===== Formato del archivo ===== */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 mb-6 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
          <UploadCloud size={18} className="text-sky-600" />
          Formato del archivo
        </h2>

        <p className="text-sm mb-4 text-slate-500 leading-relaxed">
          <strong>Formato esperado:</strong> Código · Nombre · Categoría · Tipo
          producto · Precio compra · Precio venta · Frecuencia de compra
        </p>

        {/* === Selector de archivo === */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <label className="w-full sm:w-auto cursor-pointer">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <div className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded text-sm shadow transition active:scale-95">
              <UploadCloud size={16} />
              <span>Seleccionar archivo</span>
            </div>
          </label>

          {fileName && (
            <span className="text-sm text-slate-600 break-all">
              Archivo: <strong>{fileName}</strong>
            </span>
          )}
        </div>

        {/* === Barra de progreso === */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-3 overflow-hidden">
          <div
            className="bg-sky-600 h-3 rounded-full transition-all duration-700"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* === Estado de encabezado y botón limpiar === */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-slate-600">
            Encabezado reconocido:{" "}
            <span
              className={`font-semibold ${
                progress === 100 ? "text-green-600" : "text-red-500"
              }`}
            >
              {progress === 100 ? "Sí" : "No"}
            </span>
          </span>

          <button
            onClick={handleClear}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm transition"
          >
            <Trash2 size={14} /> Borrar
          </button>
        </div>
      </div>

      {/* ===== Resultados de carga ===== */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-5 transition hover:shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-slate-700">
          Resultados de la carga
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-xs sm:text-sm border border-slate-200 rounded-lg">
            <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
              <tr>
                <th className="px-3 py-2 text-left">Línea</th>
                <th className="px-3 py-2 text-left">Código</th>
                <th className="px-3 py-2 text-left">Nombre</th>
                <th className="px-3 py-2 text-left">Categoría</th>
                <th className="px-3 py-2 text-left">Tipo</th>
                <th className="px-3 py-2 text-right">Compra</th>
                <th className="px-3 py-2 text-right">Venta</th>
                <th className="px-3 py-2 text-center">Frecuencia</th>
                <th className="px-3 py-2 text-center">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.length > 0 ? (
                results.map((r, i) => (
                  <tr key={i} className="hover:bg-orange-50 transition">
                    <td className="px-3 py-2">{r.line}</td>
                    <td className="px-3 py-2">{r.codigo}</td>
                    <td className="px-3 py-2">{r.nombre}</td>
                    <td className="px-3 py-2">{r.categoria}</td>
                    <td className="px-3 py-2">{r.tipo}</td>
                    <td className="px-3 py-2 text-right">{r.compra}</td>
                    <td className="px-3 py-2 text-right">{r.venta}</td>
                    <td className="px-3 py-2 text-center">{r.frecuencia}</td>
                    <td
                      className={`px-3 py-2 text-center font-medium ${
                        r.result.includes("OK")
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {r.result}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="text-center text-slate-400 py-4 italic"
                  >
                    No se encontraron registros.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===== Botones inferiores ===== */}
      <div className="mt-6 flex justify-end gap-3">
        <button className="bg-slate-400 hover:bg-slate-500 text-white px-4 py-2 rounded text-sm shadow transition">
          Cancelar
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm shadow transition">
          Inactivar masivo
        </button>
      </div>
    </div>
  );
}

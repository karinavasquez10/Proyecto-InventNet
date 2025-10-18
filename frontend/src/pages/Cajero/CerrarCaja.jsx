import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

/* Hook: sincroniza con el modo oscuro global */
function useSystemTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}

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
  { label: "$100", value: 100 },
];

// URL de la API
const API_URL = "http://localhost:5000/api";

const CerrarCaja = ({ onClose }) => {
  const theme = useSystemTheme();
  const [conteoGastos, setConteoGastos] = useState({});  // Renombrado para claridad
  const [cajaData, setCajaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [observaciones, setObservaciones] = useState("");

  // Fetch datos de la caja abierta al montar
  useEffect(() => {
    const fetchCajaAbierta = async () => {
      try {
        const local = localStorage.getItem("caja_abierta");
        if (!local) {
          throw new Error("No se encontró caja abierta en localStorage.");
        }
        const cajaLocal = JSON.parse(local);
        console.log("Caja local desde storage:", cajaLocal);  // Debug
        if (!cajaLocal.id_caja) {
          throw new Error("ID de caja no válido en localStorage.");
        }

        // Fetch detalles completos de la caja desde backend
        const url = `${API_URL}/cajas/${cajaLocal.id_caja}`;
        console.log("Fetching caja from:", url);  // Debug URL
        const res = await fetch(url);
        console.log("Response status:", res.status);  // Debug status
        if (!res.ok) {
          const errorText = await res.text();
          console.error("Full error response:", errorText);  // Debug body
          throw new Error(`Error ${res.status}: ${errorText}`);
        }
        const data = await res.json();
        console.log("Caja data from backend:", data);  // Debug data
        const caja = data.caja || data;
        if (caja.estado !== 'abierta') {
          throw new Error("La caja ya está cerrada o no es válida.");
        }
        setCajaData(caja);
      } catch (err) {
        console.error("Error fetching caja:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCajaAbierta();
  }, []);

  const handleChangeGasto = (value, cantidad) => {
    setConteoGastos({
      ...conteoGastos,
      [value]: cantidad ? parseInt(cantidad) : 0,
    });
  };

  const totalGastos = Object.entries(conteoGastos).reduce(
    (acc, [denStr, cant]) => {
      const den = parseInt(denStr);  // Asegurar numérico
      return acc + (den * (cant || 0));
    },
    0
  );

  const montoInicial = cajaData?.monto_inicial || 0;
  const totalVentas = cajaData?.total_ventas || 0;
  const gananciasBrutas = totalVentas;  // Predicción simple: totalVentas como ganancia bruta
  const diferencia = gananciasBrutas - totalGastos;  // Ganancia neta: ganancias - gastos

  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const handleFinalizar = async () => {
    if (!cajaData?.id_caja) {
      alert("Error: No se encontró ID de caja.");
      return;
    }

    // Comentado: Ya NO es obligatorio tomar los gastos registrados
    // if (totalGastos <= 0) {
    //   alert("Ingrese el conteo de gastos.");
    //   return;
    // }

    try {
      setLoading(true);
      const payload = {
        fecha_cierre: new Date().toISOString(),
        monto_final: totalGastos,  // Total de gastos contados, puede ser 0 si no hay registro
        diferencia: diferencia,  // Ganancia neta
        observaciones: observaciones || "",
      };

      const url = `${API_URL}/cajas/${cajaData.id_caja}/cerrar`;
      console.log("Closing caja at:", url, "Payload:", payload);  // Debug
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Close error response:", errorText);  // Debug
        throw new Error(errorText || `Error ${res.status}: No se pudo cerrar la caja.`);
      }

      const data = await res.json();
      console.log("Caja cerrada:", data);  // Debug

      // Limpiar localStorage para desbloquear AbrirCaja
      localStorage.removeItem("caja_abierta");

      alert(`✅ Caja cerrada exitosamente. ID: ${cajaData.id_caja}, Ganancia Neta: ${money(diferencia)}`);
      onClose();
    } catch (err) {
      console.error("Error en handleFinalizar:", err);
      alert(`❌ Error al cerrar caja: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
        <div className={`p-8 rounded-2xl shadow-xl ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}>
          <p className="text-center">Cargando datos de caja...</p>
        </div>
      </div>
    );
  }

  if (error || !cajaData) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
        <div className={`p-8 rounded-2xl shadow-xl ${theme === "dark" ? "bg-slate-800" : "bg-white"}`}>
          <h2 className="text-lg font-bold mb-2 text-red-600">Error</h2>
          <p>{error || "No se encontraron datos de caja."}</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/50`}
    >
      <div
        className={`rounded-2xl shadow-xl w-[800px] h-[600px] flex flex-col overflow-hidden transition-colors duration-300 border
          ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800 text-slate-100"
              : "bg-gradient-to-br from-orange-50 via-white to-rose-50 border-slate-100 text-slate-800"
          }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-5 py-3 text-white transition-colors duration-300 ${
            theme === "dark"
              ? "bg-slate-800 border-b border-slate-700"
              : "bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400"
          }`}
        >
          <h2 className="text-lg font-semibold">Cierre de Caja</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/20 transition"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Resumen simplificado: Monto Inicial, Total Ventas, y Ganancias */}
        <div className="grid grid-cols-2 gap-4 p-5">
          <ResumenBox
            label="Monto Inicial"
            value={montoInicial}
            color="from-gray-400 to-gray-600"
            theme={theme}
          />
          <ResumenBox
            label="Total Ventas"
            value={totalVentas}
            color="from-green-400 to-emerald-500"
            theme={theme}
          />
        </div>

        {/* Conteo de gastos */}
        <div className="flex-1 overflow-y-auto px-5 pb-3">
          <h3
            className={`font-semibold mb-3 ${
              theme === "dark" ? "text-slate-200" : "text-slate-800"
            }`}
          >
            Conteo de Gastos (billetes y monedas)
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {denominaciones.map((den) => (
              <div
                key={den.value}
                className={`flex justify-between items-center rounded-lg px-3 py-2 border transition ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <span className="font-medium text-sm">{den.label}</span>
                <input
                  type="number"
                  min="0"
                  className={`w-20 rounded-lg text-center px-2 py-1 text-sm border outline-none focus:ring-2 focus:ring-orange-400 transition
                    ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-700 text-slate-100"
                        : "bg-white border-slate-300 text-slate-800"
                    }`}
                  placeholder="0"
                  onChange={(e) => handleChangeGasto(den.value, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Diferencia y Observaciones */}
        <div
          className={`mt-auto px-5 py-4 border-t transition-colors ${
            theme === "dark" ? "border-slate-700" : "border-slate-200"
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">Total Gastos:</span>
            <span className="font-semibold text-lg">
              {money(totalGastos)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span
              className={`font-medium ${
                diferencia >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-rose-400"
              }`}
            >
              Ganancia Neta:
            </span>
            <span
              className={`font-bold text-lg ${
                diferencia >= 0
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-red-600 dark:text-rose-400"
              }`}
            >
              {money(diferencia)}
            </span>
          </div>

          {/* Observaciones */}
          <div className="mb-3">
            <label className="block text-xs font-medium mb-1">Observaciones (opcional)</label>
            <textarea
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              rows={2}
              className={`w-full rounded-lg px-3 py-2 text-sm border ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300 text-slate-800"
              } focus:outline-none focus:ring-2 focus:ring-orange-400`}
              placeholder="Notas sobre el cierre y predicciones..."
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 py-2 rounded-lg font-medium transition ${
                theme === "dark"
                  ? "bg-slate-700 hover:bg-slate-600 text-white"
                  : "bg-gray-500 hover:bg-gray-600 text-white"
              }`}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleFinalizar}
              className={`flex-1 py-2 rounded-lg font-bold transition ${
                theme === "dark"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:brightness-110 text-white"
              }`}
              disabled={loading}
            >
              {loading ? "Cerrando..." : "Finalizar Caja"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================== Subcomponente para los box resumen ================== */
function ResumenBox({ label, value, color, theme }) {
  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  return (
    <div
      className={`rounded-xl p-4 text-center transition ${
        theme === "dark"
          ? "bg-slate-800 border border-slate-700 text-white"
          : `bg-gradient-to-r ${color} text-white shadow-sm`
      }`}
    >
      <h3 className="text-sm font-medium opacity-90">{label}</h3>
      <p className="text-lg font-bold mt-1">{money(value)}</p>
    </div>
  );
}

export default CerrarCaja;
import React, { useState } from "react";
import { X } from "lucide-react";

/* Hook: sincroniza con el modo oscuro global */
function useSystemTheme() {
  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  React.useEffect(() => {
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

const CerrarCaja = ({ ventas = {}, onClose }) => {
  const theme = useSystemTheme();
  const [conteo, setConteo] = useState({});

  const handleChange = (value, cantidad) => {
    setConteo({
      ...conteo,
      [value]: cantidad ? parseInt(cantidad) : 0,
    });
  };

  const totalContado = Object.entries(conteo).reduce(
    (acc, [den, cant]) => acc + den * cant,
    0
  );

  const totalEsperado =
    (ventas.efectivo || 0) + (ventas.tarjeta || 0) + (ventas.nequi || 0);

  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  return (
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

      {/* Resumen de ventas */}
      <div className="grid grid-cols-3 gap-4 p-5">
        <ResumenBox
          label="Efectivo"
          value={ventas.efectivo || 0}
          color="from-green-400 to-emerald-500"
          theme={theme}
        />
        <ResumenBox
          label="Tarjeta"
          value={ventas.tarjeta || 0}
          color="from-blue-400 to-sky-500"
          theme={theme}
        />
        <ResumenBox
          label="Nequi"
          value={ventas.nequi || 0}
          color="from-purple-400 to-fuchsia-500"
          theme={theme}
        />
      </div>

      {/* Conteo de efectivo */}
      <div className="flex-1 overflow-y-auto px-5 pb-3">
        <h3
          className={`font-semibold mb-3 ${
            theme === "dark" ? "text-slate-200" : "text-slate-800"
          }`}
        >
          Conteo de billetes y monedas
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
                onChange={(e) => handleChange(den.value, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Totales */}
      <div
        className={`mt-auto px-5 py-4 border-t transition-colors ${
          theme === "dark" ? "border-slate-700" : "border-slate-200"
        }`}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Total Contado:</span>
          <span className="font-semibold text-lg">
            {money(totalContado)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">Total Esperado:</span>
          <span className="font-semibold text-lg">{money(totalEsperado)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className={`font-medium ${
              totalContado === totalEsperado
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-rose-400"
            }`}
          >
            Diferencia:
          </span>
          <span
            className={`font-bold text-lg ${
              totalContado === totalEsperado
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-red-600 dark:text-rose-400"
            }`}
          >
            {money(totalContado - totalEsperado)}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ================== Subcomponente para los box resumen ================== */
function ResumenBox({ label, value, color, theme }) {
  return (
    <div
      className={`rounded-xl p-4 text-white shadow-sm transition ${
        theme === "dark"
          ? "bg-slate-800 border border-slate-700"
          : `bg-gradient-to-r ${color}`
      }`}
    >
      <h3 className="text-sm font-medium opacity-90">{label}</h3>
      <p className="text-lg font-bold mt-1">{value.toLocaleString("es-CO")}</p>
    </div>
  );
}

export default CerrarCaja;

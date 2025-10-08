import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

/* ======= Hook para sincronizar el modo de color global ======= */
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

/* ======= Componente principal ======= */
const Cobrar = ({ total = 0, onClose }) => {
  const theme = useSystemTheme();
  const [efectivo, setEfectivo] = useState("");

  const handleNumberClick = (num) => setEfectivo(efectivo + num);
  const handleClear = () => setEfectivo("");
  const handleBackspace = () => setEfectivo(efectivo.slice(0, -1));

  const efectivoInt = parseInt(efectivo || 0);
  const cambio = efectivoInt - total;

  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className={`relative w-[95vw] max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border transition-all duration-300 py-6 sm:py-8
          ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel izquierdo */}
        <div
          className={`flex-1 p-6 flex flex-col justify-between transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-slate-900 text-slate-100"
                : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-800"
            }
          `}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-orange-500 dark:text-orange-400">
                TOTAL
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-orange-100 dark:hover:bg-slate-800 transition"
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent mb-5">
              {money(total)}
            </div>

            <div className="space-y-3 text-sm">
              <InfoRow label="Tipo de pago" value="CONTADO" />
              <InfoRow label="Sub Total" value={money(total)} />
              <InfoRow label="Descuento" value="$0" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Cliente:</span>
                <button className="px-3 py-1.5 rounded-md bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white text-xs hover:brightness-110">
                  Nuevo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-center text-slate-500 dark:text-slate-400">
            Sistema de Facturación - InventNet © 2025
          </div>
        </div>

        {/* Panel derecho */}
        <div
          className={`w-full md:w-[380px] p-4 flex flex-col transition-colors duration-300 border-l
            ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-slate-100"
                : "bg-white border-slate-200 text-slate-800"
            }
          `}
        >
          {/* Campo de efectivo */}
          <input
            type="number"
            placeholder="Digite el efectivo recibido"
            value={efectivo}
            onChange={(e) => setEfectivo(e.target.value)}
            className={`mb-3 p-3 rounded-lg text-sm font-medium w-full text-center border transition
              ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-fuchsia-400"
                  : "bg-white border-slate-300 text-slate-800 focus:ring-2 focus:ring-orange-300"
              }`}
          />

          {/* Totales */}
          <div className="grid grid-cols-1 gap-2 mb-3 text-center text-sm font-semibold">
            <div
              className={`py-2 rounded-lg font-bold ${
                theme === "dark"
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-green-400 text-white"
              }`}
            >
              EFECTIVO: {money(efectivoInt)}
            </div>
            <div
              className={`py-2 rounded-lg ${
                cambio < 0
                  ? "bg-rose-600 text-white"
                  : theme === "dark"
                  ? "bg-green-700 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              CAMBIO: {money(cambio > 0 ? cambio : 0)}
            </div>
          </div>

          {/* Teclado numérico */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <NumButton
                key={n}
                label={n}
                onClick={() => handleNumberClick(n.toString())}
              />
            ))}
            <NumButton label="⬅" onClick={handleBackspace} />
            <NumButton label="0" onClick={() => handleNumberClick("0")} />
            <NumButton label="CE" variant="danger" onClick={handleClear} />
          </div>

          {/* Botones rápidos */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[1000, 2000, 5000, 10000, 20000].map((val) => (
              <QuickButton
                key={val}
                label={`+ ${money(val)}`}
                onClick={() => setEfectivo((efectivoInt + val).toString())}
              />
            ))}
          </div>

          {/* Descuentos */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[10, 15, 20, 25, 50].map((d) => (
              <button
                key={d}
                className={`py-1 rounded-md text-xs font-medium transition ${
                  theme === "dark"
                    ? "bg-slate-700 hover:bg-slate-600"
                    : "bg-slate-100 hover:bg-orange-100 text-slate-700"
                }`}
              >
                {d}%
              </button>
            ))}
          </div>

          {/* Botones finales */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={onClose}
              className={`flex-1 py-2 rounded-md font-bold text-xs transition ${
                theme === "dark"
                  ? "bg-rose-700 hover:bg-rose-800"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Cancelar
            </button>
            <button
              className={`flex-1 py-2 rounded-md font-bold text-xs transition ${
                theme === "dark"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Confirmar
            </button>
          </div>
          <button
            className={`w-full py-2 rounded-md font-bold text-xs transition ${
              theme === "dark"
                ? "bg-sky-700 hover:bg-sky-800"
                : "bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 text-white"
            }`}
          >
            Confirmar e Imprimir
          </button>
        </div>
      </div>
    </div>
  );
};

/* ======= Componentes auxiliares ======= */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function NumButton({ label, onClick, variant = "normal" }) {
  const base = "py-2 rounded-lg font-bold text-base transition";
  const color =
    variant === "danger"
      ? "bg-rose-600 hover:bg-rose-700 text-white"
      : "bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 text-white";
  return (
    <button onClick={onClick} className={`${base} ${color}`}>
      {label}
    </button>
  );
}

function QuickButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:brightness-110 transition"
    >
      {label}
    </button>
  );
}

export default Cobrar;

// src/pages/Admin/ConsultaFacturas.jsx
import React from "react";
import { createPortal } from "react-dom";
import { X, Printer } from "lucide-react";

/* =================== Hook: detectar tema del sistema =================== */
function useSystemTheme() {
  const [theme, setTheme] = React.useState(
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

/* =================== Modal principal =================== */
function ConsultaFacturas({ open, onClose }) {
  if (!open) return null;

  return createPortal(
    <ModalShell onClose={onClose}>
      <ConsultaFacturasBody onClose={onClose} />
    </ModalShell>,
    document.body
  );
}

/* =================== Shell =================== */
function ModalShell({ children, onClose }) {
  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[1200px] h-[88vh] rounded-2xl shadow-2xl overflow-hidden grid grid-rows-[auto,1fr]
        bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* =================== Datos de ejemplo =================== */
const INVOICES = [
  { id: 16791, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:41:49", estado: "SALDADA", total: 46000 },
  { id: 16790, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:27:05", estado: "SALDADA", total: 1750 },
  { id: 16789, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:23:46", estado: "SALDADA", total: 18650 },
  { id: 16788, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:18:17", estado: "SALDADA", total: 3000 },
];

const money = (n) =>
  (Number(n) || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

/* =================== Cuerpo del modal =================== */
function ConsultaFacturasBody({ onClose }) {
  const theme = useSystemTheme();

  const [fecha, setFecha] = React.useState("2025-09-20");
  const cajeros = ["TODOS", ...Array.from(new Set(INVOICES.map((i) => i.cajero)))];
  const medios = ["TODOS", ...Array.from(new Set(INVOICES.map((i) => i.medio)))];
  const estados = ["TODOS", ...Array.from(new Set(INVOICES.map((i) => i.estado)))];

  const [cajero, setCajero] = React.useState("TODOS");
  const [medio, setMedio] = React.useState("TODOS");
  const [estado, setEstado] = React.useState("TODOS");

  const filtered = INVOICES.filter(
    (i) =>
      (!fecha || i.fecha === fecha) &&
      (cajero === "TODOS" || i.cajero === cajero) &&
      (medio === "TODOS" || i.medio === medio) &&
      (estado === "TODOS" || i.estado === estado)
  );
  const total = filtered.reduce((s, i) => s + i.total, 0);

  return (
    <>
      {/* Header */}
      <div
        className={`h-14 px-5 flex items-center justify-between text-white transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-800 border-b border-slate-700"
            : "bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-400"
        }`}
      >
        <h2 className="text-base font-semibold">Consulta de Facturas</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-white/20 transition"
          title="Cerrar"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div
        className={`overflow-y-auto p-5 space-y-6 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
            : "bg-gradient-to-br from-orange-100 via-white to-rose-100 text-slate-700"
        }`}
      >
        {/* Filtros */}
        <section
          className={`rounded-xl p-5 shadow-md border transition ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <h3 className="font-semibold mb-3 inline-block px-3 py-1 rounded-md text-white shadow-md bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500">
            Filtros de búsqueda
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Field label="Fecha">
              <input
                type="date"
                className={`w-full rounded-lg border px-3 py-2 text-sm transition
                ${theme === "dark"
                  ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-fuchsia-400"
                  : "border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-orange-300"}`}
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </Field>

            <Select label="Cajero" options={cajeros} value={cajero} onChange={setCajero} theme={theme} />
            <Select label="Medio" options={medios} value={medio} onChange={setMedio} theme={theme} />
            <Select label="Estado" options={estados} value={estado} onChange={setEstado} theme={theme} />
          </div>
        </section>

        {/* Tabla */}
        <section
          className={`rounded-xl p-4 shadow-sm border transition ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-100"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold inline-block px-3 py-1 rounded-md text-white shadow-md bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500">
              Resultados
            </h3>
            <PrintButton onClick={() => window.print()} />
          </div>

          <div className="overflow-x-auto border border-orange-100 dark:border-slate-700 rounded-xl">
            <table className="min-w-full text-sm">
              <thead
                className={`${
                  theme === "dark"
                    ? "bg-slate-800 text-slate-200"
                    : "bg-orange-50 text-slate-800"
                }`}
              >
                <tr>
                  <Th># Factura</Th>
                  <Th>Fecha</Th>
                  <Th>Cajero</Th>
                  <Th>Medio</Th>
                  <Th>Hora</Th>
                  <Th>Estado</Th>
                  <Th className="text-right">Total</Th>
                  <Th className="text-center w-40">Acciones</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100 dark:divide-slate-700">
                {filtered.length ? (
                  filtered.map((r) => (
                    <tr
                      key={r.id}
                      className={`hover:transition ${
                        theme === "dark"
                          ? "hover:bg-slate-800/60"
                          : "hover:bg-orange-50"
                      }`}
                    >
                      <Td>{r.id}</Td>
                      <Td>{new Date(r.fecha).toLocaleDateString("es-CO")}</Td>
                      <Td>{r.cajero}</Td>
                      <Td>{r.medio}</Td>
                      <Td className="text-rose-600 dark:text-rose-400 font-medium">{r.hora}</Td>
                      <Td className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        {r.estado}
                      </Td>
                      <Td className="text-right font-semibold">{money(r.total)}</Td>
                      <Td className="text-center">
                        <div className="flex justify-center gap-2">
                          <SmallBtn variant="outline">🖨️</SmallBtn>
                          <SmallBtn>Ver</SmallBtn>
                        </div>
                      </Td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Td colSpan={8} className="text-center py-8 text-slate-500 dark:text-slate-400">
                      No hay facturas que coincidan con los filtros seleccionados.
                    </Td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Totales */}
        <section
          className={`rounded-xl p-4 shadow-sm border transition ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-100"
          }`}
        >
          <div className="flex justify-between items-center p-3 rounded-md shadow-md text-white bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500">
            <span className="text-sm font-semibold">Total general</span>
            <span className="text-lg font-bold">{money(total)}</span>
          </div>
        </section>

        {/* Botón de cierre */}
        <div className="flex justify-end">
          <GradientBtn onClick={onClose}>Cerrar</GradientBtn>
        </div>
      </div>
    </>
  );
}

/* =================== Helpers UI =================== */
function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <div className="inline-block px-2 py-1 mb-1 rounded-md text-xs font-semibold text-white bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500 shadow-sm">
      {children}
    </div>
  );
}

function Select({ label, options, value, onChange, theme }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        className={`w-full rounded-lg border px-3 py-2 text-sm transition
          ${theme === "dark"
            ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-fuchsia-400"
            : "border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-orange-300"}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function Th({ children, className = "" }) {
  return <th className={`text-left px-4 py-3 font-semibold ${className}`}>{children}</th>;
}

function Td({ children, className = "", colSpan }) {
  return <td colSpan={colSpan} className={`px-4 py-2 ${className}`}>{children}</td>;
}

function PrintButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 transition"
      type="button"
    >
      <Printer size={16} /> Imprimir
    </button>
  );
}

function SmallBtn({ children, variant = "solid", onClick }) {
  const base = "px-3 py-1.5 rounded-md text-xs font-medium transition";
  const styles =
    variant === "solid"
      ? "bg-gradient-to-r from-orange-400 to-fuchsia-500 text-white hover:brightness-110"
      : "border border-orange-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700";
  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

function GradientBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-fuchsia-500 hover:brightness-110 transition"
    >
      {children}
    </button>
  );
}

export default ConsultaFacturas;

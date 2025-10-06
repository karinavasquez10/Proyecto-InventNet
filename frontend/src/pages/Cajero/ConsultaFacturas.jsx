// src/pages/ConsultaFacturasModal.jsx
import React from "react";
import { createPortal } from "react-dom";

/* ====================== Componentes y helpers ====================== */

function ConsultaFacturas({ open, onClose }) {
  if (!open) return null;
  return createPortal(
    <ModalShell onClose={onClose}>
      <ConsultaFacturasBody onClose={onClose} />
    </ModalShell>,
    document.body
  );
}

function ModalShell({ children, onClose }) {
  // Cerrar con ESC y bloquear el scroll del body
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
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[1200px] h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-rows-[auto,1fr] transition-transform duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ====================== Contenido de la consulta ====================== */

const money = (n) =>
  n?.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
const toInputDate = (d) => new Date(d).toISOString().slice(0, 10);

// Datos demo: reemplaza por tu fetch
const INVOICES = [
  { id: 16791, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:41:49", estado: "SALDADA", subTotal: 46040, total: 46000 },
  { id: 16790, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:27:05", estado: "SALDADA", subTotal: 1752, total: 1750 },
  { id: 16789, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:23:46", estado: "SALDADA", subTotal: 18686, total: 18650 },
  { id: 16788, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:18:17", estado: "SALDADA", subTotal: 3040, total: 3000 },
  { id: 16787, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "16:02:16", estado: "SALDADA", subTotal: 3600, total: 3600 },
  { id: 16786, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "15:41:35", estado: "SALDADA", subTotal: 2128, total: 2100 },
  { id: 16785, fecha: "2025-09-20", cajero: "JULIANA HOYOS", medio: "CONTADO", hora: "15:11:44", estado: "SALDADA", subTotal: 41096, total: 41050 },
];

function ConsultaFacturasBody({ onClose }) {
  const [fecha, setFecha] = React.useState(toInputDate("2025-09-20"));
  const minId = React.useMemo(() => Math.min(...INVOICES.map((i) => i.id)), []);
  const maxId = React.useMemo(() => Math.max(...INVOICES.map((i) => i.id)), []);
  const [rangoIni, setRangoIni] = React.useState(minId);
  const [rangoFin, setRangoFin] = React.useState(maxId);
  const [cajero, setCajero] = React.useState("TODOS");
  const [medio, setMedio] = React.useState("TODOS");
  const [estado, setEstado] = React.useState("TODOS");

  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const cajeros = ["TODOS", ...Array.from(new Set(INVOICES.map((i) => i.cajero)))];
  const medios = ["TODOS", ...Array.from(new Set(INVOICES.map((i) => i.medio)))];
  const estados = ["TODOS", ...Array.from(new Set(INVOICES.map((i) => i.estado)))];

  const filtered = INVOICES.filter((i) => {
    const okFecha = !fecha || toInputDate(i.fecha) === fecha;
    const okRango = i.id >= (rangoIni || minId) && i.id <= (rangoFin || maxId);
    const okCajero = cajero === "TODOS" || i.cajero === cajero;
    const okMedio = medio === "TODOS" || i.medio === medio;
    const okEstado = estado === "TODOS" || i.estado === estado;
    return okFecha && okRango && okCajero && okMedio && okEstado;
  }).sort((a, b) => b.id - a.id);

  const subTotal = filtered.reduce((s, i) => s + (i.subTotal || 0), 0);
  const impuestos = 0;
  const total = filtered.reduce((s, i) => s + (i.total || 0), 0);

  const rangoInicialFiltrado = filtered.length ? Math.min(...filtered.map((i) => i.id)) : "";
  const rangoFinalFiltrado = filtered.length ? Math.max(...filtered.map((i) => i.id)) : "";

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <>
      {/* Header del modal */}
      <div className="h-14 px-5 bg-white border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold">Consulta Z día fiscal</h2>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Total registros: {filtered.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-slate-100 text-slate-600"
          aria-label="Cerrar"
          title="Cerrar"
        >
          ✕
        </button>
      </div>

      {/* Cuerpo scrolleable */}
      <div className="overflow-y-auto">
        <div className="p-5">
          {/* Filtros y totales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Fecha</Label>
              <input
                type="date"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                value={fecha}
                onChange={(e) => { setFecha(e.target.value); setPage(1); }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Rango inicial</Label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                  value={rangoIni}
                  onChange={(e) => { setRangoIni(parseInt(e.target.value || minId, 10)); setPage(1); }}
                />
              </div>
              <div>
                <Label>Rango final</Label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                  value={rangoFin}
                  onChange={(e) => { setRangoFin(parseInt(e.target.value || maxId, 10)); setPage(1); }}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
              <TotalRow label="Sub total" value={money(subTotal)} />
              <TotalRow label="Total impuestos" value={money(impuestos)} />
              <TotalRow label="Total" value={money(total)} highlighted />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select label="Cajero" value={cajero} onChange={setCajero} options={cajeros} />
            <Select label="Medio" value={medio} onChange={setMedio} options={medios} />
            <Select label="Estado" value={estado} onChange={setEstado} options={estados} />
          </div>

          <div className="mt-6 h-14 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm">
            Información de impuestos
          </div>
        </div>

        {/* acciones */}
        <div className="px-5 pb-3 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3">
            <PrintButton onClick={() => window.print()} />
            <span className="text-slate-500 hidden md:inline">
              Rango mostrado: <b>{rangoInicialFiltrado || "-"}</b> &rarr; <b>{rangoFinalFiltrado || "-"}</b>
            </span>
          </div>
          <div className="text-right pr-1 text-slate-600">
            <span className="uppercase tracking-wide text-xs text-slate-400 mr-2">Total</span>
            <span className="font-semibold">{money(total)}</span>
          </div>
        </div>

        {/* tabla */}
        <div className="px-5 pb-5">
          <div className="overflow-x-auto border rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th className="w-24"># factura</Th>
                  <Th>Fecha</Th>
                  <Th>Cajero</Th>
                  <Th>Medio</Th>
                  <Th>Hora</Th>
                  <Th>Estado</Th>
                  <Th className="text-right">Sub Total</Th>
                  <Th className="text-right">Total</Th>
                  <Th className="text-center w-40">Acciones</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {pageData.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <Td>{r.id}</Td>
                    <Td>{new Date(r.fecha).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}</Td>
                    <Td className="uppercase">{r.cajero}</Td>
                    <Td>{r.medio}</Td>
                    <Td className="text-rose-600 font-medium">{r.hora}</Td>
                    <Td className="text-rose-600 font-semibold">{r.estado}</Td>
                    <Td className="text-right">{money(r.subTotal)}</Td>
                    <Td className="text-right">{money(r.total)}</Td>
                    <Td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <SmallBtn onClick={() => alert(`Imprimir factura ${r.id}`)} variant="outline">
                          🖨️ Imprimir
                        </SmallBtn>
                        <SmallBtn onClick={() => alert(`Consultar factura ${r.id}`)} variant="solid">
                          Consultar
                        </SmallBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
                {!pageData.length && (
                  <tr>
                    <Td colSpan={9} className="text-center py-10 text-slate-500">
                      No hay resultados para los filtros aplicados.
                    </Td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* paginación */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <div>{page} (of {totalPages})</div>
            <div className="flex items-center gap-1">
              <PagerBtn onClick={() => go(1)}>{"<<"}</PagerBtn>
              <PagerBtn onClick={() => go(page - 1)}>{"<"}</PagerBtn>
              {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => {
                const n = i + 1;
                return (
                  <PagerBtn key={n} active={n === page} onClick={() => go(n)}>
                    {n}
                  </PagerBtn>
                );
              })}
              <PagerBtn onClick={() => go(page + 1)}>{">"}</PagerBtn>
              <PagerBtn onClick={() => go(totalPages)}>{">>"}</PagerBtn>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ====================== UI helpers ====================== */

function Label({ children }) {
  return <div className="text-xs font-medium text-slate-600 mb-1">{children}</div>;
}
function TotalRow({ label, value, highlighted = false }) {
  return (
    <div
      className={`rounded-lg border px-3 py-2 text-sm flex items-center justify-between
      ${highlighted ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-slate-50 border-slate-200"}`}
    >
      <span className="text-slate-600">{label}</span>
      <span className={`font-semibold ${highlighted ? "text-amber-900" : "text-slate-800"}`}>{value}</span>
    </div>
  );
}
function Select({ label, options, value, onChange }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
function PrintButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-50"
      type="button"
      title="Imprimir"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" className="text-slate-600">
        <path fill="currentColor" d="M7 3h10v4H7V3Zm10 18H7v-5h10v5Zm2-9a2 2 0 0 1 2 2v3h-3v-3H6v3H3v-3a2 2 0 0 1 2-2h14ZM8 6h8V5H8v1Z" />
      </svg>
      Imprimir
    </button>
  );
}
function SmallBtn({ children, variant = "solid", onClick }) {
  const base = "px-2.5 py-1.5 rounded-md text-xs";
  const styles =
    variant === "solid"
      ? "bg-sky-600 text-white hover:bg-sky-700"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  return (
    <button onClick={onClick} className={`${base} ${styles}`} type="button">
      {children}
    </button>
  );
}
function PagerBtn({ children, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded border ${active ? "bg-slate-100 font-medium" : ""}`}
      type="button"
    >
      {children}
    </button>
  );
}
function Th({ children, className = "" }) {
  return <th className={`text-left px-4 py-3 font-medium ${className}`}>{children}</th>;
}
function Td({ children, className = "", colSpan }) {
  return (
    <td colSpan={colSpan} className={`px-4 py-3 ${className}`}>
      {children}
    </td>
  );
}


export default ConsultaFacturas;

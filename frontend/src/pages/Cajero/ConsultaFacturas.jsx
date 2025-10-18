// src/pages/Admin/ConsultaFacturas.jsx
import React, { useState, useEffect } from "react";
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

/* =================== URL de la API =================== */
const API_URL = "http://localhost:5000/api";

/* =================== Cuerpo del modal =================== */
function ConsultaFacturasBody({ onClose }) {
  const theme = useSystemTheme();

  const [facturas, setFacturas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fecha, setFecha] = useState("");
  const [cajero, setCajero] = useState("TODOS");
  const [medio, setMedio] = useState("TODOS");
  const [estado, setEstado] = useState("TODOS");

  // Fetch facturas desde backend
  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/ventas`);
        if (!res.ok) throw new Error(`Error ${res.status}: No se pudieron cargar facturas.`);
        const data = await res.json();
        console.log("Facturas cargadas:", data);  // Debug
        setFacturas(data);
      } catch (err) {
        console.error("Error fetching facturas:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFacturas();
  }, []);

  // Opciones únicas para filtros (de datos reales)
  const cajeros = ["TODOS", ...Array.from(new Set(facturas.map((i) => i.nombre_usuario || ""))).filter(Boolean)];
  const medios = ["TODOS", ...Array.from(new Set(facturas.map((i) => i.metodo_pago || ""))).filter(Boolean)];
  const estados = ["TODOS", "SALDADA"];  // Asumir 'SALDADA' para todas; agregar campo si necesitas más

  const filtered = facturas.filter(
    (i) =>
      (!fecha || i.fecha.startsWith(fecha)) &&
      (cajero === "TODOS" || i.nombre_usuario === cajero) &&
      (medio === "TODOS" || i.metodo_pago === medio) &&
      (estado === "TODOS" || estado === "SALDADA")  // Asumir todas 'SALDADA'
  );

  const total = filtered.reduce((s, i) => s + (i.total || 0), 0);

  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-center text-lg">Cargando facturas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h3 className="text-red-600 mb-2">Error</h3>
          <p>{error}</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Cerrar</button>
        </div>
      </div>
    );
  }

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
          onClick={() => {
            if (typeof onClose === "function") onClose();
          }}
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
            : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-800"
        }`}
      >
        {/* Filtros */}
        <section
          className={`rounded-xl p-5 shadow-md border transition ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-200"
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
            <Select label="Medio Pago" options={medios} value={medio} onChange={setMedio} theme={theme} />
            <Select label="Estado" options={estados} value={estado} onChange={setEstado} theme={theme} />
          </div>
        </section>

        {/* Tabla */}
        <section
          className={`rounded-xl p-5 shadow-md border transition ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-200"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Lista de Facturas</h3>
            <PrintButton onClick={() => window.print()} />
          </div>

          <div className="overflow-x-auto border border-orange-100 dark:border-slate-700 rounded-xl">
            <table className="min-w-full text-sm">
              <thead
                className={`${theme === "dark"
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
                  filtered.map((r) => {
                    const fechaObj = new Date(r.fecha);
                    const hora = fechaObj.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                    return (
                      <tr
                        key={r.id_venta}
                        className={`hover:transition ${
                          theme === "dark"
                            ? "hover:bg-slate-800/60"
                            : "hover:bg-orange-50"
                        }`}
                      >
                        <Td>{r.id_venta}</Td>
                        <Td>{fechaObj.toLocaleDateString("es-CO")}</Td>
                        <Td>{r.nombre_usuario}</Td>
                        <Td>{r.metodo_pago}</Td>
                        <Td className="text-rose-600 dark:text-rose-400 font-medium">{hora}</Td>
                        <Td className="text-emerald-600 dark:text-emerald-400 font-semibold">
                          SALDADA
                        </Td>
                        <Td className="text-right font-semibold">{money(r.total)}</Td>
                        <Td className="text-center">
                          <div className="flex justify-center gap-2">
                            <SmallBtn variant="outline" onClick={() => window.print()}>
                              <Printer size={14} />
                            </SmallBtn>
                            <SmallBtn onClick={() => alert(`Detalles de factura #${r.id_venta}: ${r.observaciones || 'Sin observaciones'}`)}>
                              Ver
                            </SmallBtn>
                          </div>
                        </Td>
                      </tr>
                    );
                  })
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
          <GradientBtn onClose={onClose}>Cerrar</GradientBtn>
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

function GradientBtn({ children, onClose }) {
  return (
    <button
      onClick={onClose}
      className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-fuchsia-500 hover:brightness-110 transition"
    >
      {children}
    </button>
  );
}

export default ConsultaFacturas;
import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* =================== Hook para sincronizar modo global =================== */
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

/* ====================== Modal público ====================== */
function AbrirCaja({ open, onClose, usuario }) {
  if (!open) return null;
  return createPortal(
    <ModalShell onClose={onClose}>
      <AbrirCajaBody onClose={onClose} usuario={usuario} />
    </ModalShell>,
    document.body
  );
}

/* ====================== Shell con overlay ====================== */
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
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[900px] h-[88vh] rounded-2xl shadow-2xl overflow-hidden grid grid-rows-[auto,1fr]
        bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* ====================== Contenido principal ====================== */
const money = (n) =>
  (Number(n) || 0).toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });

const DENOMS = [
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

const API_URL = "http://localhost:5000/api";

function AbrirCajaBody({ onClose, usuario }) {
  const theme = useSystemTheme();
  const now = new Date();
  const [cajero, setCajero] = React.useState(usuario?.nombre || "");
  const [sede, setSede] = React.useState("Principal");
  const [caja, setCaja] = React.useState("Caja 1");
  const [base, setBase] = React.useState(0);
  const [obs, setObs] = React.useState("");
  const [denoms, setDenoms] = React.useState(DENOMS.map((d) => ({ ...d, qty: 0 })));
  const [loading, setLoading] = React.useState(false);

  const totalDesglose = denoms.reduce((s, d) => s + d.qty * d.value, 0);
  const mismatch = base > 0 && totalDesglose > 0 && totalDesglose !== Number(base);

  const setQty = (idx, qty) => {
    const n = Math.max(0, parseInt(qty || 0, 10));
    setDenoms((prev) => prev.map((d, i) => (i === idx ? { ...d, qty: n } : d)));
  };

  const setFromDesglose = () => setBase(totalDesglose);

  const handleSubmit = async () => {
    if (!cajero) return alert("El nombre del cajero es requerido.");
    if (!base || Number(base) <= 0) return alert("Ingresa el valor de base.");
    if (mismatch && !confirm("La suma del desglose es diferente a la base. ¿Continuar?")) return;

    const payload = {
      id_usuario: usuario?.id || 1,
      id_sucursal: 1,
      fecha_apertura: new Date().toISOString(),
      monto_inicial: Number(base),
      estado: "abierta",
      observaciones: obs,
    };

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/cajas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      alert(`✅ Caja abierta con éxito (ID: ${data.id})`);
      onClose();
    } catch (err) {
      alert("❌ Error al abrir caja: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div
        className={`h-14 px-5 flex items-center justify-between text-white shadow-sm ${
          theme === "dark"
            ? "bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-500"
            : "bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500"
        }`}
      >
        <div>
          <h2 className="text-base font-semibold">Abrir Caja</h2>
          <p className="text-[11px] opacity-90">
            {now.toLocaleDateString("es-CO", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}{" "}
            {now.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <button onClick={onClose} className="p-2 rounded-md hover:bg-white/20 transition" title="Cerrar">
          <X size={18} />
        </button>
      </div>

      {/* BODY */}
      <div
        className={`overflow-y-auto p-5 space-y-6 transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
            : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-800"
        }`}
      >
        {/* DATOS GENERALES */}
        <section
          className={`rounded-xl p-5 shadow-md border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Cajero">
              <Input
                className={`${usuario?.nombre ? "bg-slate-100 dark:bg-slate-800" : ""}`}
                placeholder="Nombre del cajero"
                value={cajero}
                onChange={(e) => setCajero(e.target.value)}
                disabled={!!usuario?.nombre}
              />
            </Field>
            <Field label="Sede">
              <select className="input bg-white dark:bg-slate-800" value={sede} onChange={(e) => setSede(e.target.value)}>
                {["Principal", "Sucursal Norte", "Sucursal Sur"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Número de Caja">
              <select className="input bg-white dark:bg-slate-800" value={caja} onChange={(e) => setCaja(e.target.value)}>
                {["Caja 1", "Caja 2", "Caja 3"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* BASE Y DESGLOSE */}
        <section
          className={`rounded-xl p-5 shadow-md border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-200"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-2">
              <Label>
                <TagLabel>Plata base (efectivo inicial)</TagLabel>
              </Label>
              <div className="flex gap-2 items-center">
                <Input type="number" value={base} onChange={(e) => setBase(e.target.value)} placeholder="" />
                <span className="text-sm font-semibold text-orange-800 dark:text-pink-200">{money(base)}</span>
              </div>
            </div>
            <div className="md:text-right">
              <GradientBtn onClick={setFromDesglose}>Usar suma del desglose</GradientBtn>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {denoms.map((d, idx) => (
              <div key={d.value} className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800">
                <div className="text-xs text-slate-600 dark:text-slate-300">{d.label}</div>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="number"
                    min={0}
                    value={d.qty}
                    onChange={(e) => setQty(idx, e.target.value)}
                    className="w-20 rounded border border-slate-300 dark:border-slate-700 dark:bg-slate-900 px-2 py-1 text-sm text-slate-700 dark:text-slate-100"
                  />
                  <span className="text-xs text-slate-500 dark:text-slate-400">= {money(d.qty * d.value)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right text-sm">
            <span className="text-slate-500 dark:text-slate-400 mr-2">Suma desglose:</span>
            <span className="font-semibold text-slate-800 dark:text-white">{money(totalDesglose)}</span>
          </div>
        </section>

        {/* Observaciones */}
        <section className="rounded-xl p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm">
          <Label>Observaciones (opcional)</Label>
          <textarea
            rows={3}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm"
            placeholder="Anota algo relevante…"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
        </section>

        {/* BOTONES */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <SmallBtn variant="outline" onClick={onClose}>Cancelar</SmallBtn>
          <GradientBtn onClick={handleSubmit} disabled={loading}>
            {loading ? "Guardando..." : "Abrir caja"}
          </GradientBtn>
        </div>
      </div>
    </>
  );
}

/* UI helpers */
function Label({ children }) {
  return <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">{children}</div>;
}
function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
// Input reutilizable (estilos consistentes con el resto del formulario)
function Input({ className = "", ...props }) {
  return <input {...props} className={`w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm ${className}`} />;
}
// Pequeña etiqueta para títulos/etiquetas compuestas
function TagLabel({ children }) {
  return <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{children}</span>;
}
function SmallBtn({ children, onClick, variant = "solid", disabled }) {
  const base = "px-4 py-2 rounded-lg text-sm font-medium transition";
  const style =
    variant === "outline"
      ? "border border-slate-300 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
      : "bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white hover:brightness-110";
  return (
    <button type="button" disabled={disabled} onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}
function GradientBtn({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 transition disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export default AbrirCaja;

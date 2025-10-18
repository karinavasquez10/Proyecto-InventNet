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
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
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

/* ====================== Utilidades ====================== */
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

const API_URL =  "http://localhost:5000/api"; // Mejor que dejar hardcodeada

/* ====================== Cuerpo del modal ====================== */
function AbrirCajaBody({ onClose, usuario }) {
  const theme = useSystemTheme();
  const now = new Date();
  const [cajero, setCajero] = React.useState(usuario?.nombre || "");
  const [sede, setSede] = React.useState("Principal");
  const [caja, setCaja] = React.useState("Caja 1");
  const [base, setBase] = React.useState("");
  const [obs, setObs] = React.useState("");
  const [denoms, setDenoms] = React.useState(DENOMS.map((d) => ({ ...d, qty: 0 })));
  const [loading, setLoading] = React.useState(false);

  // Parse base a número para los cálculos y validaciones
  const baseNumber = Number(base) || 0;

  const totalDesglose = denoms.reduce((s, d) => s + (Number(d.qty) || 0) * d.value, 0);
  const mismatch = baseNumber > 0 && totalDesglose > 0 && totalDesglose !== baseNumber;

  const setQty = (idx, qty) => {
    const n = Math.max(0, parseInt(qty || 0, 10) || 0);
    setDenoms((prev) => prev.map((d, i) => (i === idx ? { ...d, qty: n } : d)));
  };

  const setFromDesglose = () => setBase(totalDesglose);

  const handleSubmit = async () => {
    if (!cajero.trim()) {
      alert("El nombre del cajero es requerido.");
      return;
    }
    if (!baseNumber || baseNumber <= 0) {
      alert("Ingresa el valor de base.");
      return;
    }
    if (mismatch && !window.confirm("La suma del desglose es diferente a la base. ¿Continuar?")) return;

    const payload = {
      id_usuario: usuario?.id || 1,
      id_sucursal: sede === "Principal" ? 1 : sede === "Sucursal Norte" ? 2 : 3,
      numero_caja: caja.replace("Caja ", ""), // por si API requiere solo el número
      fecha_apertura: new Date().toISOString(),
      monto_inicial: baseNumber,
      estado: "abierta",
      observaciones: obs,
      desglose: denoms.map(d => ({ denominacion: d.value, cantidad: Number(d.qty) || 0 }))
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
      alert(`✅ Caja abierta con éxito (ID: ${data.id || data._id || ""})`);
      onClose();
    } catch (err) {
      alert("❌ Error al abrir caja: " + (err.message || err));
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
        <button onClick={onClose} className="p-2 rounded-md hover:bg-white/20 transition" title="Cerrar" type="button">
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
                autoComplete="off"
              />
            </Field>
            <Field label="Sede">
              <Select
                value={sede}
                onChange={e => setSede(e.target.value)}
                options={["Principal", "Sucursal Norte", "Sucursal Sur"]}
              />
            </Field>
            <Field label="Número de Caja">
              <Select
                value={caja}
                onChange={e => setCaja(e.target.value)}
                options={["Caja 1", "Caja 2", "Caja 3"]}
              />
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
                <Input
                  type="number"
                  min={0}
                  value={base}
                  onChange={e => {
                    // Solo permitir números positivos, sin decimales
                    const val = e.target.value.replace(/\D/g, "");
                    setBase(val);
                  }}
                  placeholder=""
                  autoComplete="off"
                />
                <span className="text-sm font-semibold text-orange-800 dark:text-pink-200">{money(baseNumber)}</span>
              </div>
            </div>
            <div className="md:text-right">
              <GradientBtn onClick={setFromDesglose} disabled={totalDesglose === 0}>
                Usar suma del desglose
              </GradientBtn>
            </div>
          </div>

          {/* DESGLOSE */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {denoms.map((d, idx) => (
              <div key={d.value} className={`border rounded-lg px-3 py-2 ${theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-orange-200"}`}>
                <div className="text-xs font-medium text-white bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500 px-2 py-[2px] rounded-md inline-block shadow-sm">
                  {d.label}
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    value={d.qty}
                    onChange={e => {
                      let val = e.target.value.replace(/\D/g, "");
                      setQty(idx, val);
                    }}
                    autoComplete="off"
                  />
                  <span className="text-xs font-semibold text-orange-700 dark:text-pink-200">
                    = {money((Number(d.qty) || 0) * d.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <div className="mt-4 text-right">
            <span className="inline-block bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500 text-white px-3 py-1 rounded-md shadow-sm text-sm font-medium">
              Suma desglose: {money(totalDesglose)}
            </span>
          </div>
          {mismatch && (
            <div className="mt-2 text-right">
              <span className="text-xs font-bold text-pink-600 dark:text-orange-200">
                ⚠️ La suma del desglose no coincide con la base.
              </span>
            </div>
          )}
        </section>

        {/* OBSERVACIONES */}
        <section
          className={`rounded-xl p-5 shadow-md border ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700"
              : "bg-white border-orange-200"
          }`}
        >
          <Label>
            <TagLabel>Observaciones (opcional)</TagLabel>
          </Label>
          <Textarea value={obs} onChange={(e) => setObs(e.target.value)} placeholder="Anota algo relevante para el inicio del turno…" />
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

/* ====================== COMPONENTES REUTILIZABLES ====================== */
function Input({ className = "", style = {}, ...props }) {
  return (
    <input
      {...props}
      className={
        [
          "appearance-none w-full rounded-lg border border-slate-300 dark:border-slate-700",
          "bg-white dark:bg-slate-800",
          "text-slate-800 dark:text-white",
          "px-3 py-2 text-sm focus:outline-none",
          "focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
          "transition shadow-inner",
          "placeholder-slate-400",
          "!bg-white !text-slate-800",
          className,
        ].join(" ")
      }
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        ...style,
      }}
    />
  );
}

function Select({ options, className = "", style = {}, ...props }) {
  return (
    <select
      {...props}
      className={
        [
          "appearance-none w-full rounded-lg border border-slate-300 dark:border-slate-700",
          "bg-white dark:bg-slate-800",
          "text-slate-800 dark:text-white",
          "px-3 py-2 text-sm focus:outline-none",
          "focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
          "transition shadow-inner",
          "!bg-white !text-slate-800",
          className,
        ].join(" ")
      }
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        ...style,
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Textarea({ className = "", style = {}, ...props }) {
  return (
    <textarea
      {...props}
      rows={3}
      className={
        [
          "appearance-none w-full rounded-lg border border-slate-300 dark:border-slate-700",
          "bg-white dark:bg-slate-800",
          "text-slate-800 dark:text-white",
          "px-3 py-2 text-sm focus:outline-none",
          "focus:border-orange-400 focus:ring-2 focus:ring-orange-200",
          "transition shadow-inner",
          "placeholder-slate-400",
          "!bg-white !text-slate-800",
          className,
        ].join(" ")
      }
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        ...style,
      }}
    />
  );
}

/* ====================== Etiquetas y Botones ====================== */

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

function TagLabel({ children }) {
  return (
    <span className="inline-block bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500 text-white px-2 py-[2px] rounded-md shadow-sm text-xs font-medium">
      {children}
    </span>
  );
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
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 transition disabled:opacity-60"
    >
      {children}
    </button>
  );
}

export default AbrirCaja;

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
function AbrirCaja({ open, onClose, onConfirm }) {
  if (!open) return null;
  return createPortal(
    <ModalShell onClose={onClose}>
      <AbrirCajaBody onClose={onClose} onConfirm={onConfirm} />
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

/* ====================== Cuerpo del modal ====================== */
function AbrirCajaBody({ onClose, onConfirm }) {
  const theme = useSystemTheme();
  const now = new Date();
  const [cajero, setCajero] = React.useState("");
  const [sede, setSede] = React.useState("Principal");
  const [caja, setCaja] = React.useState("Caja 1");
  const [base, setBase] = React.useState(0);
  const [obs, setObs] = React.useState("");
  const [denoms, setDenoms] = React.useState(DENOMS.map((d) => ({ ...d, qty: 0 })));

  const totalDesglose = denoms.reduce((s, d) => s + d.qty * d.value, 0);
  const mismatch = base > 0 && totalDesglose > 0 && totalDesglose !== Number(base);

  const setQty = (idx, qty) => {
    const n = Math.max(0, parseInt(qty || 0, 10));
    setDenoms((prev) => prev.map((d, i) => (i === idx ? { ...d, qty: n } : d)));
  };

  const setFromDesglose = () => setBase(totalDesglose);

  const handleSubmit = () => {
    if (!cajero) return alert("Ingresa el nombre del cajero.");
    if (!base || Number(base) <= 0) return alert("Ingresa el valor de base.");
    if (mismatch && !confirm("La suma del desglose es diferente a la base. ¿Continuar?")) return;

    const payload = {
      abiertoEn: now.toISOString(),
      cajero,
      sede,
      caja,
      base: Number(base),
      desglose: denoms.filter((d) => d.qty > 0).map(({ label, value, qty }) => ({ label, value, qty })),
      observaciones: obs,
      estado: "ABIERTA",
    };

    try {
      localStorage.setItem("caja_abierta", JSON.stringify(payload));
    } catch {}

    onConfirm?.(payload);
    onClose?.();
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
        <button
          onClick={onClose}
          className="p-2 rounded-md hover:bg-white/20 transition"
          title="Cerrar"
        >
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
            <Field label={<TagLabel>Cajero</TagLabel>}>
              <Input value={cajero} onChange={(e) => setCajero(e.target.value)} placeholder="Nombre del cajero" />
            </Field>

            <Field label={<TagLabel>Sede</TagLabel>}>
              <Select value={sede} onChange={(e) => setSede(e.target.value)} options={["Principal", "Sucursal Norte", "Sucursal Sur"]} />
            </Field>

            <Field label={<TagLabel>Número de Caja</TagLabel>}>
              <Select value={caja} onChange={(e) => setCaja(e.target.value)} options={["Caja 1", "Caja 2", "Caja 3"]} />
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
              <GradientBtn onClick={setFromDesglose}>
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
                  <Input type="number" value={d.qty} onChange={(e) => setQty(idx, e.target.value)} />
                  <span className="text-xs font-semibold text-orange-700 dark:text-pink-200">
                    = {money(d.qty * d.value)}
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
        </section>

        {/* OBSERVACIONES */}
        <section
          className={`rounded-xl p-5 shadow-md border ${
            theme === "dark"
              ? "bg-white-900 border-slate-700"
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
          <SmallBtn variant="outline" onClick={onClose}>
            Cancelar
          </SmallBtn>
          <GradientBtn onClick={handleSubmit}>Abrir caja</GradientBtn>
        </div>
      </div>
    </>
  );
}

/* ====================== COMPONENTES REUTILIZABLES ====================== */
function Input({ ...props }) {
  return (
    <input
      {...props}
      className="appearance-none w-full rounded-lg border border-slate-300 dark:border-slate-700 
      bg-white dark:bg-slate-800 
      text-slate-800 dark:text-white 
      px-3 py-2 text-sm focus:outline-none 
      focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
      transition shadow-inner 
      placeholder-slate-400 
      !bg-white !text-slate-800"
      style={{
        backgroundColor: "#ffffff", // asegura blanco real
        color: "#1e293b",
      }}
    />
  );
}

function Select({ options, ...props }) {
  return (
    <select
      {...props}
      className="appearance-none w-full rounded-lg border border-slate-300 dark:border-slate-700 
      bg-white dark:bg-slate-800 
      text-slate-800 dark:text-white 
      px-3 py-2 text-sm focus:outline-none 
      focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
      transition shadow-inner 
      !bg-white !text-slate-800"
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
      }}
    >
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  );
}

function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      rows={3}
      className="appearance-none w-full rounded-lg border border-slate-300 dark:border-slate-700 
      bg-white dark:bg-slate-800 
      text-slate-800 dark:text-white 
      px-3 py-2 text-sm focus:outline-none 
      focus:border-orange-400 focus:ring-2 focus:ring-orange-200 
      transition shadow-inner 
      placeholder-slate-400 
      !bg-white !text-slate-800"
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
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
function SmallBtn({ children, onClick, variant = "solid" }) {
  const base = "px-4 py-2 rounded-lg text-sm font-medium transition";
  const style =
    variant === "outline"
      ? "border border-slate-300 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
      : "bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white hover:brightness-110";
  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}
function GradientBtn({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 transition"
    >
      {children}
    </button>
  );
}

/* ====================== export default ====================== */
export default AbrirCaja;

// src/pages/ClientesModal.jsx
import React from "react";
import { createPortal } from "react-dom";

/* =============== Modal público =============== */
function Clientes({ open, onClose }) {
  if (!open) return null;
  return createPortal(
    <ModalShell onClose={onClose}>
      <ClientesBody onClose={onClose} />
    </ModalShell>,
    document.body
  );
}

/* =============== Shell con overlay + ESC =============== */
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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[1200px] h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-rows-[auto,1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

/* =============== Contenido del módulo =============== */

const MOCK = [
  { id: 1, doc: "10880001", nombres: "Ana María", apellidos: "Hoyos", telefono: "3001112233", email: "ana@correo.com", direccion: "Cra 12 #34-56" },
  { id: 2, doc: "10880002", nombres: "Karen", apellidos: "Hoyos", telefono: "3002223344", email: "karen@correo.com", direccion: "Cl 7 # 8-90" },
  { id: 3, doc: "10880003", nombres: "Carlos", apellidos: "Gómez", telefono: "3125558899", email: "carlos@correo.com", direccion: "Av. 30 # 12-34" },
];

function ClientesBody({ onClose }) {
  const [rows, setRows] = React.useState(MOCK);
  const [q, setQ] = React.useState("");
  const [filters, setFilters] = React.useState({
    doc: "", nombres: "", apellidos: "", telefono: "", email: "", direccion: ""
  });

  // mini-form crear cliente
  const [showCreate, setShowCreate] = React.useState(false);
  const [form, setForm] = React.useState({
    doc: "", nombres: "", apellidos: "", telefono: "", email: "", direccion: ""
  });

  // paginación
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const handleFilterChange = (k, v) => {
    setFilters((f) => ({ ...f, [k]: v }));
    setPage(1);
  };

  const filtered = rows.filter((r) => {
    const matchQ =
      !q ||
      Object.values(r).some((v) => String(v).toLowerCase().includes(q.toLowerCase()));
    const matchCols =
      (!filters.doc || r.doc.includes(filters.doc)) &&
      (!filters.nombres || r.nombres.toLowerCase().includes(filters.nombres.toLowerCase())) &&
      (!filters.apellidos || r.apellidos.toLowerCase().includes(filters.apellidos.toLowerCase())) &&
      (!filters.telefono || r.telefono.includes(filters.telefono)) &&
      (!filters.email || r.email.toLowerCase().includes(filters.email.toLowerCase())) &&
      (!filters.direccion || r.direccion.toLowerCase().includes(filters.direccion.toLowerCase()));
    return matchQ && matchCols;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  const resetFilters = () => {
    setFilters({ doc: "", nombres: "", apellidos: "", telefono: "", email: "", direccion: "" });
    setQ("");
    setPage(1);
  };

  const handleCreate = () => {
    if (!form.doc || !form.nombres) {
      alert("Documento y Nombres son obligatorios");
      return;
    }
    const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((r) => [{ id, ...form }, ...r]);
    setForm({ doc: "", nombres: "", apellidos: "", telefono: "", email: "", direccion: "" });
    setShowCreate(false);
    setPage(1);
  };

  return (
    <>
      {/* Header */}
      <div className="h-14 px-5 bg-white border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-base font-semibold">Gestión de clientes</h2>
          <span className="text-[11px] text-slate-500 hidden sm:inline">MERKA FRUVER FLORENCIA</span>
        </div>
        <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">✕</button>
      </div>

      {/* Body scrolleable */}
      <div className="overflow-y-auto">
        {/* Acciones y búsqueda */}
        <div className="p-5 pb-3 flex flex-wrap items-center gap-2">
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <SmallBtn variant="soft" onClick={() => alert("QR auto registro")}>📱 QR AUTO REGISTRO</SmallBtn>
            <SmallBtn variant="soft" onClick={() => window.location.reload()}>↻ ACTUALIZAR LISTA</SmallBtn>
            <SmallBtn variant="soft" onClick={() => alert("Creación masiva")}>⬆️ CREACIÓN MASIVA</SmallBtn>
            <SmallBtn onClick={() => setShowCreate((s) => !s)}>＋ CREAR CLIENTE</SmallBtn>
          </div>
          <div className="w-full sm:w-72">
            <input
              placeholder="Buscar cliente · Palabra clave"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Mini form crear cliente */}
        {showCreate && (
          <div className="px-5">
            <div className="border rounded-xl p-4 bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Field label="Número documento">
                  <input className="input" value={form.doc} onChange={(e) => setForm({ ...form, doc: e.target.value })} />
                </Field>
                <Field label="Nombres">
                  <input className="input" value={form.nombres} onChange={(e) => setForm({ ...form, nombres: e.target.value })} />
                </Field>
                <Field label="Apellidos">
                  <input className="input" value={form.apellidos} onChange={(e) => setForm({ ...form, apellidos: e.target.value })} />
                </Field>
                <Field label="Número telefónico">
                  <input className="input" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
                </Field>
                <Field label="Email">
                  <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </Field>
                <Field label="Dirección">
                  <input className="input" value={form.direccion} onChange={(e) => setForm({ ...form, direccion: e.target.value })} />
                </Field>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2">
                <SmallBtn variant="outline" onClick={() => setShowCreate(false)}>Cancelar</SmallBtn>
                <SmallBtn onClick={handleCreate}>Guardar</SmallBtn>
              </div>
            </div>
          </div>
        )}

        {/* Tabla */}
        <div className="p-5">
          <div className="border rounded-xl overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th className="w-14">#</Th>
                  <Th>Numero documento</Th>
                  <Th>Nombres</Th>
                  <Th>Apellidos</Th>
                  <Th>Numero Telefónico</Th>
                  <Th>Email</Th>
                  <Th>Dirección</Th>
                  <Th className="text-center w-28">Acciones</Th>
                </tr>
                {/* Filtros por columna */}
                <tr className="border-t">
                  <Td>
                    <SmallBtn variant="soft" onClick={resetFilters}>Limpiar</SmallBtn>
                  </Td>
                  <Td><input className="input" placeholder="Filtrar" value={filters.doc} onChange={(e) => handleFilterChange("doc", e.target.value)} /></Td>
                  <Td><input className="input" placeholder="Filtrar" value={filters.nombres} onChange={(e) => handleFilterChange("nombres", e.target.value)} /></Td>
                  <Td><input className="input" placeholder="Filtrar" value={filters.apellidos} onChange={(e) => handleFilterChange("apellidos", e.target.value)} /></Td>
                  <Td><input className="input" placeholder="Filtrar" value={filters.telefono} onChange={(e) => handleFilterChange("telefono", e.target.value)} /></Td>
                  <Td><input className="input" placeholder="Filtrar" value={filters.email} onChange={(e) => handleFilterChange("email", e.target.value)} /></Td>
                  <Td><input className="input" placeholder="Filtrar" value={filters.direccion} onChange={(e) => handleFilterChange("direccion", e.target.value)} /></Td>
                  <Td />
                </tr>
              </thead>

              <tbody className="divide-y">
                {pageData.map((c, i) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <Td>{(page - 1) * perPage + i + 1}</Td>
                    <Td className="font-medium">{c.doc}</Td>
                    <Td>{c.nombres}</Td>
                    <Td>{c.apellidos}</Td>
                    <Td>{c.telefono}</Td>
                    <Td>{c.email}</Td>
                    <Td>{c.direccion}</Td>
                    <Td className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <SmallBtn variant="outline" onClick={() => alert(`Editar ${c.doc}`)}>✏️</SmallBtn>
                        <SmallBtn variant="soft" onClick={() => alert(`Ver ${c.doc}`)}>👁️</SmallBtn>
                      </div>
                    </Td>
                  </tr>
                ))}
                {!pageData.length && (
                  <tr>
                    <Td colSpan={8} className="text-center py-10 text-slate-500">
                      No se encontraron registros.
                    </Td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
            <div>({filtered.length}) resultados · Página {page} de {totalPages}</div>
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

        {/* Footer informativo (opcional) */}
        <div className="px-5 pb-5 text-center text-[11px] text-slate-500">
          Póngase en contacto con nosotros · contacto@mysinventarios.com
        </div>
      </div>
    </>
  );
}

/* =============== Helpers UI =============== */
function Th({ children, className = "" }) {
  return <th className={`text-left px-3 py-2 font-medium ${className}`}>{children}</th>;
}
function Td({ children, className = "", colSpan }) {
  return <td colSpan={colSpan} className={`px-3 py-2 align-middle ${className}`}>{children}</td>;
}
function SmallBtn({ children, onClick, variant = "solid" }) {
  const base = "px-3 py-1.5 rounded-md text-xs";
  const style =
    variant === "solid"
      ? "bg-sky-600 text-white hover:bg-sky-700"
      : variant === "soft"
      ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  return (
    <button type="button" onClick={onClick} className={`${base} ${style}`}>
      {children}
    </button>
  );
}
function Field({ label, children }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-600 mb-1">{label}</div>
      {children}
    </div>
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

/* =============== export default al final =============== */
export default Clientes;

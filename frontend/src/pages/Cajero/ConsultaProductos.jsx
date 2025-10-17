import React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* =============== Hook de sincronización con modo global =============== */
function useSystemTheme() {
  const [theme, setTheme] = React.useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}

/* =============== Modal principal =============== */
function ConsultaProductos({ open, onClose }) {
  const theme = useSystemTheme();
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className={`relative w-[95vw] max-w-[1200px] h-[88vh] rounded-2xl shadow-2xl overflow-hidden grid grid-rows-[auto,1fr]
        border transition-colors duration-300 ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 text-slate-100"
            : "bg-white border-slate-200 text-slate-800"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`h-14 px-5 flex items-center justify-between transition-colors duration-300 ${
            theme === "dark"
              ? "bg-slate-800 border-b border-slate-700 text-white"
              : "bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-400 text-white"
          }`}
        >
          <h2 className="text-base font-semibold">Consulta de Productos</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-white/20 transition"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cuerpo */}
        <div
          className={`overflow-y-auto transition-colors duration-300 ${
            theme === "dark"
              ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
              : "bg-gradient-to-br from-orange-50 via-white to-rose-50"
          }`}
        >
          <ConsultaProductosBody theme={theme} />
        </div>
      </div>
    </div>,
    document.body
  );
}

/* =============== Contenido del cuerpo =============== */
const money = (n) =>
  (Number(n) || 0).toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

const PRODUCTS = [
  { id: 1, code: "A4", name: "CEBOLLA BLANCA PELADA", price: 4000, stock: -773.62, clase: "A", tipo: "BÁSCULA", categoria: "VERDURAS", status: "ACTIVO", calibrado: true, img: "https://via.placeholder.com/32x32.png?text=🥬" },
  { id: 2, code: "CA10", name: "25 G-200% PRODUCTOS $10", price: 5300, stock: -22, clase: "B", tipo: "COMPRA Y VENTA", categoria: "ABARROTES", status: "ACTIVO", calibrado: false, img: "https://via.placeholder.com/32x32.png?text=🧃" },
  { id: 3, code: "560918", name: "ACEITE BUENA SOYA X1000", price: 7500, stock: 50, clase: "A", tipo: "COMPRA Y VENTA", categoria: "ABARROTES", status: "INACTIVO", calibrado: true, img: "https://via.placeholder.com/32x32.png?text=🛢️" },
  { id: 4, code: "594343", name: "ACEITE EL FRITON X2100", price: 11800, stock: 43, clase: "C", tipo: "COMPRA Y VENTA", categoria: "ABARROTES", status: "ACTIVO", calibrado: false, img: "https://via.placeholder.com/32x32.png?text=🛢️" },
];

function ConsultaProductosBody({ theme }) {
  const [category, setCategory] = React.useState("Todas");
  const [q, setQ] = React.useState("");
  const [chip, setChip] = React.useState("TODOS");
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const categories = ["Todas", ...Array.from(new Set(PRODUCTS.map((p) => p.categoria)))];
  const chipFilter = (p) =>
    chip === "TODOS"
      ? true
      : chip === "POR CALIBRAR"
      ? !p.calibrado
      : chip === "CLASE A"
      ? p.clase === "A"
      : chip === "INACTIVOS"
      ? p.status === "INACTIVO"
      : true;

  const filtered = PRODUCTS.filter((p) => {
    const okCat = category === "Todas" || p.categoria === category;
    const okQ =
      !q ||
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.code.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ && chipFilter(p);
  });

  const pctCalibrados = filtered.length
    ? Math.round((filtered.filter((p) => p.calibrado).length / filtered.length) * 100)
    : 0;

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page - 1) * perPage, page * perPage);
  const go = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  React.useEffect(() => setPage(1), [category, q, chip]);

  return (
    <div className="p-5">
      {/* Progreso */}
      <div className="mb-4">
        <div className="text-sm font-medium text-slate-700 dark:text-slate-700 mb-2">
          Porcentaje de productos calibrados
        </div>
        <div className="w-full h-3 bg-slate-500 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-orange-500 to-fuchsia-500 transition-all"
            style={{ width: `${pctCalibrados}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-slate-600 dark:text-slate-600">
          {pctCalibrados}%
        </div>
      </div>

      {/* Filtros */}
      <div
        className={`rounded-xl p-4 mb-4 shadow-sm border transition ${
          theme === "dark"
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-600"
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-sm font-semibold">
            Lista de productos ({filtered.length})
          </div>
          <div className="hidden sm:block w-px h-5 bg-slate-600 dark:bg-slate-700" />

          {/* Filtro categoría */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-700 dark:text-slate-600">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`rounded-lg border px-3 py-1.5 text-sm transition
                ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-800 text-slate-500 focus:ring-2 focus:ring-fuchsia-400"
                    : "border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-orange-300"
                }`}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Buscador */}
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-700 dark:text-slate-600">
              Buscar
            </label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nombre o código"
              className={`rounded-lg border px-3 py-1.5 text-sm w-56 transition
                ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-800 text-slate-100 focus:ring-2 focus:ring-fuchsia-400"
                    : "border-slate-300 bg-white text-slate-800 focus:ring-2 focus:ring-orange-300"
                }`}
            />
          </div>

          {/* Chips */}
          <div className="ml-auto flex items-center gap-2 flex-wrap">
            {["TODOS", "POR CALIBRAR", "CLASE A", "INACTIVOS"].map((t) => (
              <button
                key={t}
                onClick={() => setChip(t)}
                className={`px-3 py-1.5 rounded-full text-xs border transition
                  ${
                    chip === t
                      ? "bg-gradient-to-r from-orange-400 to-fuchsia-400 text-white"
                      : theme === "dark"
                      ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                      : "bg-white border-slate-200 text-slate-700 hover:bg-orange-50"
                  }`}
              >
                {t}
              </button>
            ))}
           
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div
        className={`overflow-x-auto rounded-xl border transition ${
          theme === "dark"
            ? "border-slate-700 bg-slate-900"
            : "border-slate-200 bg-white"
        }`}
      >
        <table className="min-w-full text-sm">
          <thead
            className={`${
              theme === "dark"
                ? "bg-slate-800 text-slate-300"
                : "bg-orange-50 text-slate-700"
            }`}
          >
            <tr>
              <Th>#</Th>
              <Th>Img</Th>
              <Th>Código</Th>
              <Th>Nombre</Th>
              <Th className="text-right">Precio</Th>
              <Th className="text-right">Stock</Th>
              <Th>Clase</Th>
              <Th>Tipo</Th>
              <Th>Categoría</Th>
              <Th className="text-center">Acciones</Th>
            </tr>
          </thead>
          <tbody className={`divide-y ${theme === "dark" ? "divide-slate-700" : "divide-slate-200"}`}>
            {pageData.map((p, i) => (
              <tr
                key={p.id}
                className={`transition ${
                  theme === "dark" ? "hover:bg-slate-800/60" : "hover:bg-orange-50"
                }`}
              >
                <Td>{(page - 1) * perPage + i + 1}</Td>
                <Td>
                  <img src={p.img} alt="" className="w-8 h-8 rounded object-cover" />
                </Td>
                <Td>{p.code}</Td>
                <Td className="font-medium">{p.name}</Td>
                <Td className="text-right">{money(p.price)}</Td>
                <Td className={`text-right ${p.stock < 0 ? "text-rose-600" : ""}`}>
                  {p.stock.toLocaleString("es-CO")}
                </Td>
                <Td>
                  <span
                    className={`px-2 py-0.5 rounded text-xs border ${
                      p.clase === "A"
                        ? "bg-amber-50 border-amber-200 text-amber-800"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    {p.clase}
                  </span>
                </Td>
                <Td>{p.tipo}</Td>
                <Td>{p.categoria}</Td>
                <Td className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <SmallBtn variant="outline">✏️</SmallBtn>
                    <SmallBtn>⤴️</SmallBtn>
                  </div>
                </Td>
              </tr>
            ))}
            {!pageData.length && (
              <tr>
                <Td colSpan={10} className="text-center py-10 text-slate-500">
                  No hay resultados.
                </Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
        <div>Página {page} de {totalPages}</div>
        <div className="flex items-center gap-1">
          <PagerBtn onClick={() => go(1)}>{"<<"}</PagerBtn>
          <PagerBtn onClick={() => go(page - 1)}>{"<"}</PagerBtn>
          {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => {
            const n = i + 1;
            return <PagerBtn key={n} active={n === page} onClick={() => go(n)}>{n}</PagerBtn>;
          })}
          <PagerBtn onClick={() => go(page + 1)}>{">"}</PagerBtn>
          <PagerBtn onClick={() => go(totalPages)}>{">>"}</PagerBtn>
        </div>
      </div>
    </div>
  );
}

/* ===== UI Helpers ===== */
function Th({ children, className = "" }) {
  return <th className={`px-3 py-2 font-medium ${className}`}>{children}</th>;
}
function Td({ children, className = "", colSpan }) {
  return <td colSpan={colSpan} className={`px-3 py-2 ${className}`}>{children}</td>;
}
function SmallBtn({ children, variant = "solid", onClick }) {
  const base = "px-2.5 py-1.5 rounded-md text-xs font-medium transition";
  const style =
    variant === "solid"
      ? "bg-gradient-to-r from-orange-400 to-fuchsia-500 text-white hover:brightness-110"
      : "border border-slate-300 bg-white dark:bg-slate-800 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700";
  return (
    <button onClick={onClick} className={`${base} ${style}`} type="button">
      {children}
    </button>
  );
}
function PagerBtn({ children, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded border transition ${
        active
          ? "bg-gradient-to-r from-orange-400 to-fuchsia-500 text-white border-none"
          : "border-slate-300 dark:border-slate-700 hover:bg-orange-50 dark:hover:bg-slate-700"
      }`}
      type="button"
    >
      {children}
    </button>
  );
}

export default ConsultaProductos;

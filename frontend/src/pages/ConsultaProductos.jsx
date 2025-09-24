// src/pages/ConsultaProductosModal.jsx
import React from "react";
import { createPortal } from "react-dom";

/* ======= API ======= */
function ConsultaProductos({ open, onClose }) {
  if (!open) return null;
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-[95vw] max-w-[1200px] h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden
                   grid grid-rows-[auto,1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="h-14 px-5 bg-white border-b flex items-center justify-between">
          <h2 className="text-base font-semibold">Consulta de productos</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100">✕</button>
        </div>

        {/* body con tu contenido de ConsultaProductos */}
        <div className="overflow-y-auto">
          <ConsultaProductosBody />
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ======= Contenido (resumen del que ya tenías) ======= */
// helpers
const money = (n) => n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });
// datos demo
const PRODUCTS = [
  { id: 1, code:"A4", name:"CEBOLLA BLANCA PELADA", price:4000, stock:-773.62, clase:"A", tipo:"BÁSCULA", categoria:"VERDURAS", status:"ACTIVO", calibrado:true,  img:"https://via.placeholder.com/32x32.png?text=🥬" },
  { id: 2, code:"CA10", name:"25 G-200% PRODUCTOS $10", price:5300, stock:-22,     clase:"B", tipo:"COMPRA Y VENTA", categoria:"ABARROTES", status:"ACTIVO", calibrado:false, img:"https://via.placeholder.com/32x32.png?text=🧃" },
  { id: 3, code:"560918", name:"ACEITE BUENA SOYA X1000", price:7500, stock:50,     clase:"A", tipo:"COMPRA Y VENTA", categoria:"ABARROTES", status:"INACTIVO", calibrado:true, img:"https://via.placeholder.com/32x32.png?text=🛢️" },
  { id: 4, code:"594343", name:"ACEITE EL FRITON X2100",  price:11800, stock:43,    clase:"C", tipo:"COMPRA Y VENTA", categoria:"ABARROTES", status:"ACTIVO",   calibrado:false,img:"https://via.placeholder.com/32x32.png?text=🛢️" },
];

function ConsultaProductosBody() {
  const [category, setCategory] = React.useState("Todas");
  const [q, setQ] = React.useState("");
  const [chip, setChip] = React.useState("TODOS");
  const [page, setPage] = React.useState(1);
  const perPage = 10;

  const categories = ["Todas", ...Array.from(new Set(PRODUCTS.map(p => p.categoria)))];

  const chipFilter = (p) => chip === "TODOS" ? true :
    chip === "POR CALIBRAR" ? !p.calibrado :
    chip === "CLASE A" ? p.clase === "A" :
    chip === "INACTIVOS" ? p.status === "INACTIVO" : true;

  const filtered = PRODUCTS.filter(p => {
    const okCat = category === "Todas" || p.categoria === category;
    const okQ = !q || p.name.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ && chipFilter(p);
  });

  const pctCalibrados = filtered.length ? Math.round(filtered.filter(p=>p.calibrado).length / filtered.length * 100) : 0;

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageData = filtered.slice((page-1)*perPage, page*perPage);
  const go = (p) => setPage(Math.min(Math.max(1,p), totalPages));

  React.useEffect(()=>setPage(1), [category,q,chip]);

  return (
    <div className="p-5">
      {/* progreso */}
      <div>
        <div className="text-sm font-medium text-slate-600 mb-2">Porcentaje de productos calibrados</div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-3 bg-emerald-500" style={{width:`${pctCalibrados}%`}} />
        </div>
        <div className="mt-1 text-xs text-slate-500">{pctCalibrados}%</div>
      </div>

      {/* filtros */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="text-sm font-semibold">Lista de productos ({filtered.length})</div>
        <div className="hidden sm:block w-px h-5 bg-slate-200" />
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-600">Filtro Categoría</label>
          <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm bg-white">
            {categories.map(c=> <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-600">Buscar producto</label>
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Palabra clave" className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm w-56" />
        </div>
        <div className="ml-auto flex items-center gap-2">
          {["TODOS","POR CALIBRAR","CLASE A","INACTIVOS"].map(t=>(
            <button key={t} onClick={()=>setChip(t)}
              className={`px-3 py-1.5 rounded-full text-xs border ${chip===t ? "bg-sky-50 border-sky-300 text-sky-700" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
              {t}
            </button>
          ))}
          <button className="px-3 py-1.5 rounded-full text-xs bg-emerald-600 text-white hover:bg-emerald-700">NUEVO</button>
        </div>
      </div>

      {/* tabla */}
      <div className="mt-4 overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <Th className="w-10">#</Th>
              <Th className="w-12">Img</Th>
              <Th className="w-24">Código</Th>
              <Th>Nombre</Th>
              <Th className="text-right w-28">Precio venta</Th>
              <Th className="text-right w-24">Stock</Th>
              <Th className="w-20">Clase</Th>
              <Th className="w-36">Tipo producto</Th>
              <Th className="w-28">Categoría</Th>
              <Th className="text-center w-28">Acciones</Th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {pageData.map((p,i)=>(
              <tr key={p.id} className="hover:bg-slate-50">
                <Td>{(page-1)*perPage + i + 1}</Td>
                <Td><img src={p.img} alt="" className="w-8 h-8 rounded object-cover" /></Td>
                <Td><input className="w-24 rounded border border-slate-300 px-2 py-1 text-sm" defaultValue={p.code} /></Td>
                <Td className="font-medium">{p.name}</Td>
                <Td className="text-right">{money(p.price)}</Td>
                <Td className={`text-right ${p.stock<0 ? "text-rose-600":""}`}>{p.stock.toLocaleString("es-CO")}</Td>
                <Td><span className={`px-2 py-0.5 rounded text-xs border ${p.clase==="A"?"bg-amber-50 border-amber-200 text-amber-800":"bg-slate-50 border-slate-200 text-slate-700"}`}>{p.clase}</span></Td>
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
              <tr><Td colSpan={10} className="text-center py-10 text-slate-500">No hay resultados.</Td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* paginación */}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
        <div>Página {page} de {totalPages}</div>
        <div className="flex items-center gap-1">
          <PagerBtn onClick={()=>go(1)}>{"<<"}</PagerBtn>
          <PagerBtn onClick={()=>go(page-1)}>{"<"}</PagerBtn>
          {Array.from({length: totalPages}).slice(0,6).map((_,i)=>{
            const n=i+1;
            return <PagerBtn key={n} active={n===page} onClick={()=>go(n)}>{n}</PagerBtn>;
          })}
          <PagerBtn onClick={()=>go(page+1)}>{">"}</PagerBtn>
          <PagerBtn onClick={()=>go(totalPages)}>{">>"}</PagerBtn>
        </div>
      </div>
    </div>
  );
}

/* helpers UI */
function Th({ children, className="" }) { return <th className={`text-left px-3 py-2 font-medium ${className}`}>{children}</th>; }
function Td({ children, className="", colSpan }) { return <td colSpan={colSpan} className={`px-3 py-2 align-middle ${className}`}>{children}</td>; }
function SmallBtn({ children, variant="solid", onClick }) {
  const base="px-2.5 py-1.5 rounded-md text-xs";
  const styles=variant==="solid" ? "bg-sky-600 text-white hover:bg-sky-700" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50";
  return <button onClick={onClick} className={`${base} ${styles}`} type="button">{children}</button>;
}
function PagerBtn({ children, onClick, active=false }) {
  return <button onClick={onClick} className={`px-2 py-1 rounded border ${active?"bg-slate-100 font-medium":""}`} type="button">{children}</button>;
}

/* ==== export default al final ==== */
export default ConsultaProductos;

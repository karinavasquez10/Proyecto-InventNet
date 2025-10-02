// src/pages/HomeAdmin.jsx
import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function HomeAdmin() {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const menuItems = [
{
  label: "Productos",
  children: [
     { name: "Gestion de Categorias", path: "GestionCategorias" },
    "Cargue masivo",
    "Productos recogidos",
    "Compras",
    "Lista de precios",
    "Productos por calibrar",
    { name: "Consulta Inventario", path: "ConsultaInventarioProductos" },
    { name: "Registro de Productos", path: "RegistroProductos" },
  ],
},

    {
      label: "Ventas",
      children: [
       { name: "Consultar Ventas", path: "ConsultarVentas" },
       { name: "Cierres de Caja", path: "CierresCaja" },
        "Cotizaciones",
        "Registro de Ventas",
      ],
    },
  

    { label: "Materias primas", children: ["Entradas", "Salidas", "Kardex"] },
    { label: "Bodegas", children: ["Inventario", "Movimientos"] },
    { label: "Gestión sedes", children: ["Sede principal", "Sucursales"] },

    { label: "Usuarios",
     children: [
    { name: "Crear Usuario", path: "CrearUsuario" },
    { name: "Buscar Usuario", path: "BuscarUsuarios" },
    ]
   },

    {
      label: "Clientes",
      children: [
        { name: "Gestión de Clientes", path: "GestionClientes" },
        { name: "Indicadores", path: "Indicadores" },
      ],
    },
  ];

  // ✅ Detecta si estás en /HomeAdmin (dashboard) o en un submódulo
  const isDashboard = location.pathname === "/HomeAdmin";

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* ===== Sidebar fija ===== */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur border-r border-slate-200 shadow-sm z-40">
        <div className="h-16 flex items-center px-4 border-b">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white font-bold">MF</span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Mi Inventario</div>
              <div className="text-[11px] text-slate-500">Panel Administrativo</div>
            </div>
          </div>
        </div>

        {/* menú lateral con submódulos */}
        <nav className="py-3 px-2 overflow-y-auto bg-teal-400 h-[calc(100vh-4rem)]">
          {menuItems.map((item, idx) => (
            <div key={idx} className="mb-1">
              <button
                onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
                className="w-full flex items-center justify-between px-3 py-2 text-left rounded-lg hover:bg-slate-100 text-slate-700"
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs">{openMenu === idx ? "▲" : "▼"}</span>
              </button>

              {openMenu === idx && item.children && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child, cIdx) => {
                    if (typeof child === "string") {
                      return (
                        <button
                          key={cIdx}
                          className="block w-full text-left px-3 py-1.5 text-sm text-slate-700 rounded hover:bg-slate-200"
                        >
                          {child}
                        </button>
                      );
                    }
                    return (
                      <Link
                        key={cIdx}
                        to={child.path}
                        className="block w-full text-left px-3 py-1.5 text-sm text-slate-700 rounded hover:bg-slate-200"
                      >
                        {child.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* ===== Contenido ===== */}
      <main className="ml-64 h-screen overflow-y-auto">
     {/* Topbar sticky */}
<div className="bg-white/90 backdrop-blur border-b sticky top-0 z-30">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
    <div className="text-sm">
      <span className="text-slate-500 mr-2">BIENVENIDO:</span>
      <span className="font-semibold">ANA YULIANA HOYOS</span>
    </div>
    <div className="flex items-center gap-3">
      <span className="text-xs text-slate-500">09/20/2025 16:48:20</span>

      {/* Botón Home */}
      <Link
        to="/HomeAdmin"
        className="text-white bg-sky-600 hover:bg-sky-700 px-3 py-1.5 rounded text-sm shadow"
      >
        Home
      </Link>

      {/* Botón Actualizar */}
      <button className="text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded text-sm shadow">
        ACTUALIZAR
      </button>
    </div>
  </div>
</div>



        {/* 👇 Condicional: Dashboard o Submódulo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
          {isDashboard ? (
            <>
              {/* ===== Dashboard ===== */}
              <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-5 pt-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Dash board</h2>
                    <span className="text-[11px] text-slate-500">Acumulado mensual</span>
                  </div>
                </div>
                <div className="px-5 mt-3">
                  <TabsFilters
                    tabs={[
                      "Ventas por categoría",
                      "Ventas por día",
                      "Ventas por productos",
                      "Ventas por usuario",
                    ]}
                    defaultIndex={0}
                  />
                </div>
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-semibold text-slate-600 mb-3">Acumulado del mes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <StatLine label="Venta total" value={16101123} />
                      <StatLine label="Total costos" value={1006856} />
                      <StatLine label="Ganancia" value={15100267} emphasized />
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center">
                    <Donut value={93.8} size={170} label="% de ganancia" />
                    <p className="mt-2 text-xs text-slate-500">Costos vs Ganancia</p>
                  </div>
                </div>
              </section>

              {/* KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Kpi title="Ventas" value="$534,518" bar="from-sky-500 to-cyan-500" />
                <Kpi title="Compras" value="$0" bar="from-fuchsia-500 to-purple-500" />
                <Kpi title="Gastos" value="$0" bar="from-amber-500 to-orange-500" />
              </div>

              {/* Sección media */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card title="Ventas por categoría">
                  <ul className="divide-y">
                    {[
                      ["VERDURAS", 363012],
                      ["ABARROTES", 69150],
                      ["FRUTAS", 63856],
                      ["GRANOS", 18900],
                      ["GASEOSAS", 11600],
                      ["LÁCTEOS", 6000],
                      ["MECATO", 2000],
                    ].map(([name, amount]) => (
                      <li key={name} className="py-3 flex items-center justify-between">
                        <span className="text-slate-600">{name}</span>
                        <span className="font-medium">${amount.toLocaleString()}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="lg:col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col items-center justify-center">
                      <Donut value={93.8} size={180} label="% de ganancia" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Ventas por usuarios</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Pie data={[120642, 413876]} labels={[" JULIANA HOYOS ", "karen hoyos"]} size={220} />
                        <ul className="space-y-5">
                          <li className="flex items-center justify-between">
                            <span className="font-medium">$120,642</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="font-medium">$413,876</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Top productos */}
              <TopProducts />
            </>
          ) : (
            <Outlet /> // 👉 Aquí se carga GestiónClientes o el submódulo elegido
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================================================================
Helpers / mini-componentes
========================================================================================= */
function Card({ children, title, className = "", noPadHeader = false }) {
  return (
    <section className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
      {title && !noPadHeader && (
        <div className="p-5 border-b bg-gradient-to-r from-white via-white to-slate-50">
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
function Kpi({ title, value, bar }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="text-slate-500 text-sm mb-2">{title}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${bar} shadow-inner`} />
    </div>
  );
}
function StatLine({ label, value, emphasized = false }) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border px-3 py-2
                  ${emphasized ? "bg-teal-50/70 border-teal-200" : "bg-slate-50 border-slate-200"}`}
    >
      <span className={`text-sm ${emphasized ? "text-teal-700 font-semibold" : "text-slate-600"}`}>{label}</span>
      <span className={`font-semibold ${emphasized ? "text-teal-800" : "text-slate-800"}`}>${value.toLocaleString()}</span>
    </div>
  );
}
function TabsFilters({ tabs = [], defaultIndex = 0 }) {
  const [active, setActive] = React.useState(defaultIndex);
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => setActive(i)}
          className={`px-3 py-1.5 rounded-full text-sm border transition
            ${active === i
              ? "bg-sky-50 border-sky-300 text-sky-700 shadow-sm"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"}`}
          type="button"
        >
          {t}
        </button>
      ))}
    </div>
  );
}
function Donut({ value = 75, size = 160, label = "" }) {
  const stroke = 16;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="drop-shadow-sm">
      <g transform={`translate(${size / 2},${size / 2})`}>
        <circle r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
        <circle
          r={r}
          fill="none"
          stroke="currentColor"
          className="text-cyan-500"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
        <text x="0" y="-4" textAnchor="middle" className="fill-slate-800 text-xl font-bold">{value}%</text>
        <text x="0" y="18" textAnchor="middle" className="fill-slate-500 text-xs">{label}</text>
      </g>
    </svg>
  );
}
function Pie({ data = [70, 30, 10], labels = [], size = 220 }) {
  const total = data.reduce((a, b) => a + b, 0);
  const r = size / 2;
  let acc = 0;
  const colors = ["#06b6d4", "#f59e0b", "#8b5cf6", "#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#14b8a6"];
  const parts = data.map((v, i) => {
    const start = (acc / total) * 2 * Math.PI;
    acc += v;
    const end = (acc / total) * 2 * Math.PI;
    const la = end - start > Math.PI ? 1 : 0;
    const x1 = r + r * Math.cos(start);
    const y1 = r + r * Math.sin(start);
    const x2 = r + r * Math.cos(end);
    const y2 = r + r * Math.sin(end);
    const d = `M ${r} ${r} L ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${x2} ${y2} Z`;
    return <path key={i} d={d} fill={colors[i % colors.length]} opacity="0.92" />;
  });
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="shrink-0">
        {parts}
      </svg>
      {!!labels.length && (
        <ul className="space-y-1">
          {labels.map((l, i) => (
            <li key={l} className="text-xs text-slate-600">
              <span className="inline-block w-3 h-3 rounded-sm mr-2 align-middle" style={{ background: colors[i % colors.length] }} />
              {l}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function Th({ children, className = "" }) {
  return <th className={`text-left px-4 py-3 font-medium ${className}`}>{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
function TopProducts() {
  const rows = [
    { name: "PLÁTANO VERDE KL", qty: 42510, total: 102024 },
    { name: "PAPA PASTUSA KL", qty: 11230, total: 15722 },
    { name: "BANANO", qty: 8560, total: 32528 },
    { name: "TOMATE KL", qty: 4500, total: 20700 },
    { name: "CEBOLLA BLANCA PELADA KL", qty: 3620, total: 13756 },
    { name: "CEBOLLA LARGA", qty: 3560, total: 22110 },
    { name: "ZANAHORIA KL", qty: 2320, total: 12064 },
    { name: "AGUACATES", qty: 2210, total: 19890 },
  ];
  const pieData = rows.map((r) => r.total);
  const pieLabels = rows.map((r) => r.name);
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-5 border-b bg-gradient-to-r from-white via-white to-slate-50">
        <h3 className="font-semibold">Top de los productos más vendidos</h3>
      </div>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex items-center justify-center">
          <Pie data={pieData} labels={pieLabels.slice(0, 10)} size={240} />
        </div>
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th>#</Th>
                  <Th>Nombre</Th>
                  <Th className="text-right">Cant vendidas</Th>
                  <Th className="text-right">Total</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r, i) => (
                  <tr key={r.name} className="hover:bg-slate-50">
                    <Td>{i + 1}</Td>
                    <Td>{r.name}</Td>
                    <Td className="text-right">{r.qty.toLocaleString()}</Td>
                    <Td className="text-right">${r.total.toLocaleString()}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
            <div>1 (of 8)</div>
            <div className="flex items-center gap-1">
              {["<<", "<", "1", "2", "3", "4", ">", ">>"].map((b, idx) => (
                <button key={idx} className={`px-2 py-1 rounded border ${b === "1" ? "bg-slate-100 font-medium" : ""}`} type="button">
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// src/pages/HomeAdmin.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";


export default function HomeAdmin() {
const [openMenu, setOpenMenu] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();


  


  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/LoginForm");
  };

  const menuItems = [
    {
      label: "Productos",
      children: [
        { name: "Gestion de Categorias", path: "GestionCategorias" },
        { name: "Cargue Masivo de Productos", path: "CargueMasivo" },
        { name: "Productos Recogidos", path: "ProductosRecogidos" },
        { name: "Compras", path: "RegistroCompras" },
        { name: "Lista de Precios", path: "ListaPrecios" },
        { name: "Productos por Calibrar", path: "CalibrarProductos" },
       
        { name: "Registro de Productos", path: "RegistroProductos" },
      ],
    },
    {
      label: "Ventas",
      children: [
        { name: "Consultar Ventas", path: "ConsultarVentas" },
        { name: "Cierres de Caja", path: "CierresCaja" },
        { name: "Cotizaciones", path: "Cotizaciones" },
         { name: "Registro de ventas", path: "RegistroVentas" },
      ],
    },
    {
      label: "Materias primas",
      children: [
        { name: "Entradas", path: "Entradas" },
        { name: "Salidas", path: "Salidas" },
      ],
    },
    { label: "Bodegas",
     children: [
      { name: "Consulta Inventario", path: "ConsultaInventarioProductos" },
      { name: "Movimientos", path: "Movimientos" },
    ] },
    {
      label: "Gestión sedes",
      children: [{ name: "Sede Principal", path: "SedePrincipal" }],
    },
    {
      label: "Usuarios",
      children: [
        { name: "Crear Usuario", path: "CrearUsuario" },
        { name: "Buscar Usuario", path: "BuscarUsuarios" },
      ],
    },
    {
      label: "Clientes",
      children: [
        { name: "Gestión de Clientes", path: "GestionClientes" },
        { name: "Indicadores", path: "Indicadores" },
      ],
    },
    {
      label: "Proveedores",
      children: [{ name: "Gestión de Proveedores", path: "GestionProveedores" }],
    },

      {
      label: "Papelera",
      children: [{ name: "Gestión de papelera", path: "GestionPapelera" }],
    },
  ];

  const isDashboard = location.pathname === "/HomeAdmin";

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-pink-50 text-slate-800 min-h-screen">
      {/* ===== Sidebar fija ===== */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 shadow-lg z-40 flex flex-col">
        <div className="h-16 flex items-center px-4 border-b">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white font-bold">
              IN
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-800">
                InventNet
              </div>
              <div className="text-[11px] text-slate-500">
                Panel Administrativo
              </div>
            </div>
          </div>
        </div>

        {/* Menú lateral */}
        <nav className="flex-1 overflow-y-auto p-3">
          {menuItems.map((item, idx) => (
            <div key={idx} className="mb-2">
              <button
                onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
                className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg text-slate-700 hover:bg-orange-50 transition ${
                  openMenu === idx ? "bg-orange-100" : ""
                }`}
              >
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs">
                  {openMenu === idx ? "▲" : "▼"}
                </span>
              </button>

              {openMenu === idx && item.children && (
                <div className="ml-5 mt-1 space-y-1">
                  {item.children.map((child, cIdx) =>
                    typeof child === "string" ? (
                      <button
                        key={cIdx}
                        className="block w-full text-left px-3 py-1.5 text-sm text-slate-700 rounded hover:bg-orange-100"
                      >
                        {child}
                      </button>
                    ) : (
                      <Link
                        key={cIdx}
                        to={child.path}
                        className={`block w-full text-left px-3 py-1.5 text-sm rounded hover:bg-orange-100 ${
                          location.pathname.includes(child.path)
                            ? "bg-orange-200 font-semibold text-slate-900"
                            : "text-slate-700"
                        }`}
                      >
                        {child.name}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Configuración destacada */}
          <div className="mt-4 border-t border-slate-300 pt-3">
            <div className="flex items-center gap-2 px-3 text-orange-600 font-semibold text-sm mb-2">
              <Settings size={16} />
              Configuración
            </div>
            <Link
              to="ConfiguracionSistema"
              className="block ml-5 px-3 py-1.5 text-sm rounded bg-gradient-to-r from-orange-100 to-pink-100 hover:brightness-105 text-slate-700 font-medium"
            >
              Configuración del programa
            </Link>

                <Link
              to="UsuariosPermiso"
              className="block ml-5 px-3 py-1.5 text-sm rounded bg-gradient-to-r from-orange-100 to-pink-100 hover:brightness-105 text-slate-700 font-medium"
            >
              Permisos Usuarios
            </Link>

                    <Link
              to="Auditoria"
              className="block ml-5 px-3 py-1.5 text-sm rounded bg-gradient-to-r from-orange-100 to-pink-100 hover:brightness-105 text-slate-700 font-medium"
            >
              Auditoria
            </Link>

          </div>
        </nav>
      </aside>

      {/* ===== Contenido ===== */}
      <main className="ml-64 h-screen overflow-y-auto">
        {/* Topbar */}
        <div className="bg-white/90 backdrop-blur border-b sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-slate-500 mr-2">BIENVENIDO:</span>
              <span className="font-semibold text-slate-800">
                ANA YULIANA HOYOS
              </span>
            </div>

            <div className="flex items-center gap-3 relative">
              <Link
                to="/HomeAdmin"
                className="text-white bg-gradient-to-r from-orange-500 to-fuchsia-500 px-3 py-1.5 rounded text-sm shadow hover:brightness-110"
              >
                Home
              </Link>
              <button className="text-white bg-amber-500 hover:bg-amber-600 px-3 py-1.5 rounded text-sm shadow">
                Actualizar
              </button>

              {/* Perfil del administrador */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm hover:brightness-110"
                >
                  <User size={16} />
                  Admin
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        navigate("PerfilAdmin");
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 w-full text-left"
                    >
                      <User size={14} /> Perfil del administrador
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 👇 Dashboard o submódulo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
          {isDashboard ? <DashboardContent /> : <Outlet />}
        </div>
      </main>
    </div>
  );
}

/* =========================================================================================
Dashboard + helpers (paleta cálida y componentes completos)
========================================================================================= */
function DashboardContent() {
  // Datos mock — conservalo o reemplázalo por tus fetchs
  const ventasPorCategoria = [
    ["VERDURAS", 363012],
    ["ABARROTES", 69150],
    ["FRUTAS", 63856],
    ["GRANOS", 18900],
    ["GASEOSAS", 11600],
    ["LÁCTEOS", 6000],
    ["MECATO", 2000],
  ];
  const ventasPorUsuario = [
    ["JULIANA HOYOS", 413876],
    ["KAREN HOYOS", 120642],
  ];

  return (
    <>
      {/* Resumen + Tabs */}
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-5 pt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Dashboard</h2>
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
            <h3 className="text-sm font-semibold text-slate-600 mb-3">
              Acumulado del mes
            </h3>
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
        <Kpi title="Ventas" value="$534,518" bar="from-orange-500 to-pink-500" />
        <Kpi title="Compras" value="$0" bar="from-fuchsia-500 to-purple-500" />
        <Kpi title="Gastos" value="$0" bar="from-amber-500 to-orange-500" />
      </div>

      {/* Indicadores organizados: Categoría y Usuario */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ventas por categoría */}
        <Card title="Ventas por categoría">
          <ul className="divide-y">
            {ventasPorCategoria.map(([name, amount]) => (
              <li key={name} className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-slate-700">{name}</span>
                  <span className="font-semibold">${amount.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-2 bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500"
                    style={{
                      width: `${Math.max(
                        10,
                        Math.min(100, (amount / ventasPorCategoria[0][1]) * 100)
                      )}%`,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Ventas por usuario */}
        <Card className="lg:col-span-2" title="Ventas por usuario">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-center">
              <Pie
                data={ventasPorUsuario.map((v) => v[1])}
                labels={ventasPorUsuario.map((v) => v[0])}
                size={240}
              />
            </div>
            <div className="grid content-start gap-3">
              {ventasPorUsuario.map(([u, v]) => (
                <div
                  key={u}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2"
                >
                  <span className="font-medium text-slate-700">{u}</span>
                  <span className="font-semibold text-slate-900">
                    ${v.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="text-xs text-slate-500">
                Distribución de ventas por usuario (periodo actual).
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Top productos (conservado) */}
      <TopProducts />
    </>
  );
}

/* =========================================================================================
Helpers visuales
========================================================================================= */
function Card({ children, title, className = "", noPadHeader = false }) {
  return (
    <section className={`bg-white rounded-xl shadow-sm border border-slate-200 ${className}`}>
      {title && !noPadHeader && (
        <div className="p-5 border-b bg-gradient-to-r from-orange-50 to-pink-50">
          <h3 className="font-semibold text-slate-800">{title}</h3>
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
        ${emphasized ? "bg-orange-50 border-orange-200" : "bg-white border-slate-200"}`}
    >
      <span className={`text-sm ${emphasized ? "text-orange-700 font-semibold" : "text-slate-600"}`}>
        {label}
      </span>
      <span className={`font-semibold ${emphasized ? "text-orange-800" : "text-slate-800"}`}>
        ${value.toLocaleString()}
      </span>
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
              ? "bg-gradient-to-r from-orange-100 to-pink-100 border-orange-300 text-orange-700 shadow-sm"
              : "bg-white border-slate-200 text-slate-600 hover:bg-orange-50"}`}
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
        <circle r={r} fill="none" stroke="#f3f4f6" strokeWidth={stroke} />
        <circle
          r={r}
          fill="none"
          stroke="url(#grad)"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90)"
        />
        <defs>
          <linearGradient id="grad" gradientTransform="rotate(90)">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <text x="0" y="-4" textAnchor="middle" className="fill-slate-800 text-xl font-bold">
          {value}%
        </text>
        <text x="0" y="18" textAnchor="middle" className="fill-slate-500 text-xs">
          {label}
        </text>
      </g>
    </svg>
  );
}
function Pie({ data = [70, 30, 10], labels = [], size = 220 }) {
  const total = data.reduce((a, b) => a + b, 0);
  const r = size / 2;
  let acc = 0;
  const colors = ["#fb923c", "#ec4899", "#a855f7", "#f59e0b", "#f97316", "#f43f5e", "#e879f9"];
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
    return <path key={i} d={d} fill={colors[i % colors.length]} opacity="0.9" />;
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
      <div className="p-5 border-b bg-gradient-to-r from-orange-50 to-pink-50">
        <h3 className="font-semibold text-slate-800">Top de los productos más vendidos</h3>
      </div>
      <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 flex items-center justify-center">
          <Pie data={pieData} labels={pieLabels.slice(0, 10)} size={240} />
        </div>
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-orange-50 text-slate-600">
                <tr>
                  <Th>#</Th>
                  <Th>Nombre</Th>
                  <Th className="text-right">Cant vendidas</Th>
                  <Th className="text-right">Total</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((r, i) => (
                  <tr key={r.name} className="hover:bg-orange-50">
                    <Td>{i + 1}</Td>
                    <Td>{r.name}</Td>
                    <Td className="text-right">{r.qty.toLocaleString()}</Td>
                    <Td className="text-right">${r.total.toLocaleString()}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación ejemplo */}
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

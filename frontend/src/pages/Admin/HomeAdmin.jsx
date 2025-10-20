// src/pages/HomeAdmin.jsx
import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";

// Variable de entorno con endpoint base - normalizamos y garantizamos el sufijo /api
const RAW_API_URL = import.meta.env.VITE_API_URL || "";
const API = (() => {
  try {
    let u = RAW_API_URL || "http://localhost:5000";
    u = u.replace(/\/+$/, ""); // quitar slash final
    if (!u.endsWith("/api")) u = u + "/api";
    return u;
  } catch {
    return "http://localhost:5000/api";
  }
})();

// Función utilitaria para obtener un valor numérico correcto del stock
// Normaliza - si es NaN, null, "", undefined o no es finito, retorna 0
function parseStock(value) {
  const num =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? value.replace(/[^-0-9.,]/g, "").replace(/,/g, ".")
        : 0;
  const parsed = parseFloat(num);
  // limitamos a 2 decimales y solo si es finito
  if (!isFinite(parsed)) return 0;
  return Math.round(parsed * 100) / 100;
}

// Spinner de carga importado de ListarPrecios.jsx
function Spinner({ label = "Cargando..." }) {
  return (
    <div className="flex flex-col flex-1 justify-center items-center min-h-[300px] w-full">
      <svg className="animate-spin h-11 w-11 text-orange-400 mb-4 opacity-80" viewBox="0 0 45 45">
        <circle
          className="opacity-20"
          cx="22.5"
          cy="22.5"
          r="20"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
        />
        <path
          d="M42.5,22.5a20,20 0 1,1-40,0"
          stroke="currentColor"
          strokeWidth="5"
          fill="none"
          className="opacity-70"
        />
      </svg>
      <span className="text-orange-500 text-lg font-medium tracking-wide">{label}</span>
    </div>
  );
}

export default function HomeAdmin() {
  const [openMenu, setOpenMenu] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    navigate("/LoginForm");
  };

  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("authUser") || "null");
    } catch {
      return null;
    }
  })();

  const admin = {
    nombre: storedUser?.nombre || storedUser?.correo || "Admin",
    rol: storedUser?.cargo || storedUser?.rol || "Administrador",
    correo: storedUser?.correo || "",
    id: storedUser?.id,
  };

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";

  useEffect(() => {
  const userId = admin.id;
  if (!userId) return;

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "";
  if (!cloudName) {
    console.error("❌ VITE_CLOUDINARY_CLOUD_NAME no configurado en .env frontend");
    setProfilePhoto(""); // Placeholder vacío
    return;
  }

  // Fallback inicial desde localStorage (prioridad a foto_url)
  if (storedUser?.foto_url) {
    setProfilePhoto(storedUser.foto_url);
  } else if (storedUser?.foto_perfil) {
    setProfilePhoto(
      storedUser.foto_perfil.startsWith("http")
        ? storedUser.foto_perfil
        : `https://res.cloudinary.com/${cloudName}/image/upload/${storedUser.foto_perfil}.jpg`
    );
  }
  
  // Fetch para versión actualizada
  const fetchPhoto = async () => {
    try {
      const response = await fetch(`${API}/perfil/${userId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      
      // Siempre usar foto_url del backend (dinámica con versión)
      if (data?.foto_url) {
        setProfilePhoto(data.foto_url);
      } else if (data?.foto_perfil) {
        setProfilePhoto(`https://res.cloudinary.com/${cloudName}/image/upload/${data.foto_perfil}.jpg`);
      } else {
        setProfilePhoto("");
      }
      
      // Actualizar localStorage
      localStorage.setItem(
        "authUser",
        JSON.stringify({ 
          ...storedUser, 
          foto_url: data.foto_url,
          foto_perfil: data.foto_perfil 
        })
      );
    } catch (error) {
      console.error("Error fetching profile photo:", error);
      // Fallback a local si fetch falla
      if (storedUser?.foto_url) setProfilePhoto(storedUser.foto_url);
    }
  };

  fetchPhoto();

  const handlePhotoUpdate = () => fetchPhoto();
  window.addEventListener("profilePhotoUpdated", handlePhotoUpdate);
  return () => window.removeEventListener("profilePhotoUpdated", handlePhotoUpdate);
}, [admin.id, storedUser, cloudName]);
  
  const menuItems = [
    {
      label: "Productos",
      children: [
        { name: "Gestión de Categorías", path: "GestionCategorias" },
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
        { name: "Registro de Ventas", path: "RegistroVentas" },
      ],
    },
    {
      label: "Materias primas",
      children: [
        { name: "Entradas", path: "Entradas" },
        { name: "Salidas", path: "Salidas" },
      ],
    },
    {
      label: "Bodegas",
      children: [
        { name: "Consulta Inventario", path: "ConsultaInventarioProductos" },
        { name: "Movimientos", path: "Movimientos" },
      ],
    },
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
      children: [{ name: "Gestión de Papelera", path: "GestionPapelera" }],
    },
  ];

  const isDashboard = location.pathname === "/HomeAdmin";

  return (
    <div className="bg-gradient-to-br from-orange-50 via-white to-pink-50 text-slate-800 min-h-screen w-screen flex flex-row">
      {/* ===== Sidebar ===== */}
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
                <span className="text-xs">{openMenu === idx ? "▲" : "▼"}</span>
              </button>

              {openMenu === idx && item.children && (
                <div className="ml-5 mt-1 space-y-1">
                  {item.children.map((child, cIdx) => (
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
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Configuración adicional */}
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
              Auditoría
            </Link>
          </div>
        </nav>
      </aside>

      {/* Contenedor principal “a la derecha del sidebar”, llenando el área restante */}
      <div className="flex flex-col flex-1 min-h-screen ml-64 relative">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur border-b sticky top-0 left-0 z-30 shadow-sm w-full">
          <div className="h-16 flex items-center justify-between px-6 w-full">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setShowDropdown(true)}
            >
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Perfil"
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm">
                  {admin.nombre[0]}
                </div>
              )}
              <div className="leading-tight hidden sm:block">
                <div className="text-sm font-semibold text-slate-800">
                  {admin.nombre}
                </div>
                <div className="text-xs text-slate-500">{admin.rol}</div>
              </div>
            </div>

            {/* Botones */}
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
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white text-sm hover:brightness-110"
                >
                  <User size={16} /> Admin
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden">
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        navigate("PerfilAdmin");
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 w-full text-left"
                    >
                      <User size={14} /> Perfil del administrador
                    </button>
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        handleLogout();
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={14} /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard o submódulos: full-height usando flex-1, rellena todo el espacio restante excepto el header. */}
        <section className="flex-1 flex flex-col w-full h-[calc(100vh-4rem)] px-8 py-10 bg-transparent overflow-y-auto">
          <div className="flex-1 w-full max-w-7xl mx-auto space-y-10">
            {isDashboard ? <DashboardContent /> : <Outlet />}
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================
DASHBOARD CON DATOS REALES (ventas, productos, cajas, usuarios, proveedores, compras)
========================================================= */
function DashboardContent() {
  const [ventasMes, setVentasMes] = useState(0);
  const [, setNumVentas] = useState(0);
  const [ventasPorUsuario, setVentasPorUsuario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cajas, setCajas] = useState([]);
  const [, setProveedores] = useState([]);
  const [, setComprasMes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [numCajeros, setNumCajeros] = useState(0);
  const [, setCajerosActivosDetalle] = useState([]); // Nuevo: para mostrar lista real

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ===== Usuarios: obtener solo los "cajeros" activos desde la tabla usuarios (mover al inicio para filtrar ventas después)
        let cajerosActivos = [];
        let usuariosArray = [];
        try {
          const resUsuarios = await fetch(`${API}/perfil`);
          if (!resUsuarios.ok) {
            throw new Error(`Error al obtener usuarios: ${resUsuarios.status}`);
          } else {
            usuariosArray = await resUsuarios.json();
          }

          // Filtrar usuarios con estado 1 y cargo/rol 'cajero'
          cajerosActivos = Array.isArray(usuariosArray)
            ? usuariosArray.filter(
                (user) =>
                  String(user.estado) === "1" &&
                  (
                    (typeof user.rol === "string" && user.rol.toLowerCase().includes("cajero")) ||
                    (typeof user.cargo === "string" && user.cargo.toLowerCase().includes("cajero"))
                  )
              )
            : [];

          setNumCajeros(cajerosActivos.length);
          setCajerosActivosDetalle(cajerosActivos); // Guardamos los datos completos
          // Extraer nombres de cajeros activos para filtrar ventas
          const activeCajerosNames = cajerosActivos.map((u) => u.nombre);
          window.activeCajerosNames = activeCajerosNames; // Temporal para usar en ventas (mejor práctica: estado, pero para simplicidad)
        } catch (err) {
          console.error("Error al cargar usuarios/cajeros:", err);
          setNumCajeros(0);
          setCajerosActivosDetalle([]);
          window.activeCajerosNames = []; // Fallback
        }

        // ===== Ventas =====
        let ventas = [];
        try {
          const resVentas = await fetch(`${API}/ventas`);
          if (resVentas.ok) ventas = await resVentas.json();
          else console.warn("No se pudo obtener /ventas:", resVentas.status);
        } catch (e) {
          console.warn("Error fetching ventas:", e);
          ventas = [];
        }
        const month = new Date().getMonth();
        // monedas y fechas pueden ser string, hay que procesar consistentemente
        const ventasMesActual = ventas.filter(
          (v) => {
            const fecha = v.fecha || v.fecha_venta || v.created_at;
            if (!fecha) return false;
            const fechaObj = new Date(fecha);
            return fechaObj.getMonth() === month && fechaObj.getFullYear() === new Date().getFullYear();
          }
        );
        const totalVentasMes = ventasMesActual.reduce(
          (acc, v) => acc + parseFloat(v.total || v.total_venta || 0),
          0
        );
        setVentasMes(totalVentasMes);
        setNumVentas(ventasMesActual.length);

        // Ventas por usuario (solo cajeros activos, top 5 por ventas descendente)
        // Map nombre usuario a sumatoria de ventas (total)
        const activeCajerosNames = cajerosActivos.map(u => u.nombre);
        const agrupado = {};
        ventas.forEach((v) => {
          const u = v.nombre_usuario || v.usuario || "Sin usuario";
          if (activeCajerosNames.includes(u)) {
            if (!agrupado[u]) agrupado[u] = 0;
            agrupado[u] += parseFloat(v.total || v.total_venta || 0);
          }
        });

        // Creamos estructura que tiene todos los datos del cajero, pero también el total de ventas
        // Solo los top 5 por mayor total vendido
        const topCajeros = cajerosActivos
          .map(cajero => ({
            ...cajero,
            totalVentas: agrupado[cajero.nombre] || 0
          }))
          .sort((a, b) => b.totalVentas - a.totalVentas)
          .slice(0, 5);

        // [{nombre, ..., totalVentas}]
        setVentasPorUsuario(topCajeros);

        // ===== Productos =====
        try {
          const resProd = await fetch(`${API}/products/productos`);
          if (!resProd.ok) throw new Error(`Error al obtener productos: ${resProd.status}`);
          const productosData = await resProd.json();
          // Normalizar los datos de stock aquí por cada producto
          const productosNormalizados = Array.isArray(productosData)
            ? productosData.map(prod => ({
                ...prod,
                stock_actual: parseStock(prod.stock_actual != null ? prod.stock_actual : prod.stock),
                stock: parseStock(prod.stock),
                stock_minimo: parseStock(prod.stock_minimo)
              }))
            : [];
          setProductos(productosNormalizados);
        } catch (err) {
          console.error("Error al cargar productos:", err);
          setProductos([]);
        }

        // ===== Clientes =====
        try {
          const resClientes = await fetch(`${API}/clientes`);
          if (!resClientes.ok) throw new Error(`Error al obtener clientes: ${resClientes.status}`);
          const clientesData = await resClientes.json();
          setClientes(Array.isArray(clientesData) ? clientesData : []);
        } catch (err) {
          console.error("Error al cargar clientes:", err);
          setClientes([]);
        }

        try {
          const res = await fetch(`${API}/cajas`);
          if (!res.ok) throw new Error(`Error ${res.status}`);
          let data = await res.json();
          if (!Array.isArray(data)) data = data.cajas || [];
          const normalized = data.map((c) => ({
            ...c,
            estado_caja: c.estado_caja ?? c.estado ?? "",
            numero_caja: c.numero_caja ?? c.numero ?? "",
          }));
          setCajas(normalized);
        } catch (err) {
          console.error("❌ Error al obtener cajas:", err);
          setCajas([]);
        }

        // ==== Proveedores ====
        try {
          const resProv = await fetch(`${API}/proveedores`);
          if (!resProv.ok) throw new Error(`Error al obtener proveedores: ${resProv.status}`);
          const provData = await resProv.json();
          setProveedores(Array.isArray(provData) ? provData : []);
        } catch (err) {
          console.error("Error al cargar proveedores:", err);
          setProveedores([]);
        }

        // ==== Compras del mes ====
        let comprasMesTotal = 0;
        let resCompras = await fetch(`${API}/compras`);
        if (resCompras.ok) {
          const compras = await resCompras.json();
          const mesActual = new Date().getMonth();
          comprasMesTotal = compras
            .filter((c) => {
              const fecha = c.fecha_compra || c.fecha || c.created_at;
              if (!fecha) return false;
              const fechaObj = new Date(fecha);
              return fechaObj.getMonth() === mesActual && fechaObj.getFullYear() === new Date().getFullYear();
            })
            .reduce((acc, c) => acc + (parseFloat(c.total) || 0), 0);
        }
        setComprasMes(comprasMesTotal);
      } catch (err) {
        console.error("Error al cargar dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // El dashboard y los gráficos ocupan todo el espacio disponible gracias a min-h y flex-1

  const cajasAbiertas = cajas.filter((c) => {
    // El estado puede venir en distintos campos y formas
    // Usamos lower-case defensivo y aceptamos los formatos "abierta"/"ABIERTA", etc.
    const estadoCaja = (c.estado_caja || c.estado || "").toString().trim().toLowerCase();
    return estadoCaja === "abierta";
  }).length;

  const cajasTotales = cajas.length;
  const porcentajeCajas =
    cajasTotales > 0 ? Math.round((cajasAbiertas / cajasTotales) * 100) : 0;

  // Para KPIs, usamos parseStock y mostramos máximo 2 decimales
  const totalStock = productos.reduce(
    (a, p) => a + (parseStock(p.stock_actual)),
    0
  );
  const ventasPct = Math.min(Math.round((ventasMes / 1000000) * 100), 100);

  return (
    <div className="flex flex-col flex-1 min-h-[540px] w-full justify-start gap-10">
      {loading ? (
        <Spinner label="Cargando datos del Dashboard..." />
      ) : (
        <>
          {/* === KPIs === */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <Kpi 
              title="Ventas del mes" 
              value={`$${ventasMes.toLocaleString()}`} 
              subtitle={`${numCajeros} Cajeros activos`}
              bar="from-orange-500 to-pink-500" 
            />
            <Kpi 
              title="Stock total" 
              value={totalStock.toLocaleString(undefined, {maximumFractionDigits: 2})} 
              subtitle={`${productos.length} productos`}
              bar="from-green-400 to-lime-400" 
            />
            <Kpi 
              title="Clientes" 
              value={clientes.length} 
              subtitle="registrados"
              bar="from-emerald-500 to-teal-500" 
            />
            <Kpi 
              title="Estado cajas" 
              value={`${cajasAbiertas}/${cajasTotales}`} 
              subtitle={`${porcentajeCajas}% en operación`}
              bar="from-amber-500 to-orange-500" 
            />
          </div>

          {/* === Gráficos principales === */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card title="Rendimiento de Ventas">
            <div className="flex flex-col items-center space-y-2">
              <Donut value={ventasPct} label="Meta mensual" />
              <div className="text-center">
                <p className="mt-2 text-lg font-bold text-slate-700">
                  ${ventasMes.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">
                  Total en ventas este mes
                </p>
              </div>
            </div>
          </Card>

            <Card title="Operaciones">
              <div className="flex flex-col items-center space-y-2">
                <Donut value={porcentajeCajas} label="Cajas activas" />
                <div className="text-center">
                  <p className="mt-2 text-lg font-bold text-slate-700">
                    {cajasAbiertas} de {cajasTotales}
                  </p>
                  <p className="text-xs text-slate-500">
                    Puntos de venta operativos
                  </p>
                </div>
              </div>
            </Card>

            <Card title="Inventario">
              <div className="flex flex-col items-center space-y-2">
                <Donut
                  value={productos.length > 0 ? 
                    Math.round(productos.filter(p => parseStock(p.stock_actual) > parseStock(p.stock_minimo)).length * 100 / productos.length) : 0
                  }
                  label="Stock saludable"
                />
                <div className="text-center">
                  <p className="mt-2 text-lg font-bold text-slate-700">
                    {productos.filter(p => parseStock(p.stock_actual) > parseStock(p.stock_minimo)).length} productos
                  </p>
                  <p className="text-xs text-slate-500">
                    con stock sobre el mínimo
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* === Ventas por Usuario === */}
          <Card title="Ventas por usuario">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 py-4">
              <div className="relative">
                <Pie
                  data={ventasPorUsuario.map((entry) => entry.totalVentas)}
                  labels={ventasPorUsuario.map((entry) => entry.nombre)}
                  size={260}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-700">
                      ${ventasMes.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500">Total del mes</div>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px]">
                <div className="mb-3 pb-2 border-b border-slate-200">
                  <div className="text-sm font-medium text-slate-400">
                    Top Cajeros Activos del Mes
                  </div>
                </div>
                <ul className="text-sm text-slate-600 space-y-3">
                  {ventasPorUsuario.map((cajero, index) => (
                    <li key={cajero.id || cajero.nombre} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                        index === 0 ? 'bg-gradient-to-r from-amber-400 to-orange-500' :
                        index === 1 ? 'bg-gradient-to-r from-slate-400 to-slate-500' :
                        index === 2 ? 'bg-gradient-to-r from-amber-700 to-orange-800' :
                        'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{cajero.nombre}</div>
                        <div className="text-xs text-slate-400">
                          {ventasMes > 0
                            ? `${Math.round((cajero.totalVentas / ventasMes) * 100)}% del total`
                            : "0% del total"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {cajero.email || cajero.correo || cajero.usuario || ""}
                        </div>
                      </div>
                      <div className="font-semibold text-orange-600">
                        ${parseFloat(cajero.totalVentas || 0).toLocaleString()}
                      </div>
                    </li>
                  ))}
                  {ventasPorUsuario.length === 0 && (
                    <li className="text-xs text-slate-400 text-center py-2">No hay ventas registradas por cajeros activos este mes.</li>
                  )}
                </ul>
              </div>
            </div>
          </Card>

          {/* === Top Productos === */}
          <TopProducts />
        </>
      )}
    </div>
  );
}

/* =========================================================
HELPERS (sin cambios estructurales)
========================================================= */
function Card({ children, title }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200">
      {title && (
        <div className="p-5 border-b bg-gradient-to-r from-orange-50 to-pink-50">
          <h3 className="font-semibold text-slate-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}

function Kpi({ title, value, subtitle, bar }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-between min-h-[110px]">
      <div className="text-slate-500 text-sm mb-2">{title}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      {subtitle && (
        <div className="text-xs text-slate-400 mt-1">{subtitle}</div>
      )}
      <div className={`mt-4 h-2 rounded-full bg-gradient-to-r ${bar}`} />
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
        <text
          x="0"
          y="-4"
          textAnchor="middle"
          className="fill-slate-800 text-xl font-bold"
        >
          {value}%
        </text>
        <text
          x="0"
          y="18"
          textAnchor="middle"
          className="fill-slate-500 text-xs"
        >
          {label}
        </text>
      </g>
    </svg>
  );
}

function TopProducts() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        // Obtenemos todas las ventas con sus detalles
        const ventasRes = await fetch(`${API}/ventas`);
        if (!ventasRes.ok) throw new Error(`Error al obtener ventas: ${ventasRes.status}`);
        
        const ventas = await ventasRes.json();
        let productStats = {};
        
        // Procesamos cada venta para obtener estadísticas por producto
        for (const venta of ventas) {
          try {
            const detRes = await fetch(`${API}/ventas/${venta.id_venta}`);
            if (!detRes.ok) continue;
            
            const { detalles } = await detRes.json();
            if (!Array.isArray(detalles)) continue;

            for (const detalle of detalles) {
              const id = detalle.id_producto;
              if (!productStats[id]) {
                productStats[id] = {
                  name: detalle.nombre_producto,
                  qty: 0,
                  total: 0,
                  lastSale: null,
                  frequency: 0 // número de ventas en las que aparece
                };
              }
              
              // Normalizamos cantidad y precios para evitar errores
              const cantidad = parseStock(detalle.cantidad);
              const precioUnit = parseStock(detalle.precio_unitario);
              productStats[id].qty += cantidad;
              productStats[id].total += precioUnit * cantidad;
              productStats[id].frequency++;
              productStats[id].lastSale = venta.fecha;
            }
          } catch (err) {
            console.warn('Error procesando venta', venta.id_venta, err);
            continue;
          }
        }

        // Calculamos score para cada producto (ventas totales + frecuencia)
        const productsArray = Object.entries(productStats).map(([id, stats]) => ({
          id,
          ...stats,
          score: (stats.total * 0.7) + (stats.frequency * stats.qty * 0.3) // 70% por valor, 30% por frecuencia y cantidad
        }));

        // Ordenamos por score y tomamos los top 8
        const topList = productsArray
          .sort((a, b) => b.score - a.score)
          .slice(0, 8);

        setRows(topList);
      } catch (err) {
        console.error("Error al procesar top productos:", err);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTop();
  }, []);

  const pieData = rows.map((r) => r.total);
  const pieLabels = rows.map((r) => r.name);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="p-5 border-b bg-gradient-to-r from-orange-50 to-pink-50">
        <h3 className="font-semibold text-slate-800">Top de los productos más vendidos</h3>
      </div>
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex items-center justify-center">
          {loading ? (
            <Spinner label="Cargando ranking de productos..." />
          ) : (
            <Pie data={pieData} labels={pieLabels} size={240} />
          )}
        </div>
        <div className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-orange-50 text-slate-600">
                <tr>
                  <Th>#</Th>
                  <Th>Nombre</Th>
                  <Th className="text-right">Cant</Th>
                  <Th className="text-right">Total</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <Td>
                        <div className="h-4 w-7 bg-orange-50 rounded" />
                      </Td>
                      <Td>
                        <div className="h-4 w-28 bg-orange-50 rounded" />
                      </Td>
                      <Td className="text-right">
                        <div className="h-4 w-12 bg-orange-50 rounded ml-auto" />
                      </Td>
                      <Td className="text-right">
                        <div className="h-4 w-14 bg-orange-50 rounded ml-auto" />
                      </Td>
                    </tr>
                  ))
                ) : (
                  rows.map((r, i) => (
                    <tr key={i} className="hover:bg-orange-50">
                      <Td>{i + 1}</Td>
                      <Td>{r.name}</Td>
                      <Td className="text-right">
                        {parseStock(r.qty).toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </Td>
                      <Td className="text-right">
                        ${parseStock(r.total).toLocaleString(undefined, {maximumFractionDigits: 2})}
                      </Td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pie({ data = [], labels = [], size = 220 }) {
  const total = data.reduce((a, b) => a + b, 0);
  const r = size / 2;
  let acc = 0;
  const colors = [
    "#fb923c",
    "#ec4899",
    "#a855f7",
    "#f59e0b",
    "#f97316",
    "#f43f5e",
    "#e879f9",
  ];
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
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {parts}
      </svg>
      <ul className="space-y-1">
        {labels.map((l, i) => (
          <li key={l} className="text-xs text-slate-600">
            <span
              className="inline-block w-3 h-3 rounded-sm mr-2 align-middle"
              style={{ background: colors[i % colors.length] }}
            />
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Th({ children }) {
  return <th className="text-left px-4 py-3 font-medium">{children}</th>;
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 ${className}`}>{children}</td>;
}
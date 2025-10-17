import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Users,
  Box,
  Archive,
  Moon,
  Sun,
  User,
  LogOut,
} from "lucide-react";
import Cobrar from "./Cobrar";
import Catalogo from "./Catalogo";
import CerrarCaja from "./CerrarCaja";
import ConsultaFacturas from "./ConsultaFacturas";
import ConsultaProductos from "./ConsultaProductos";
import AbrirCaja from "./AbrirCaja";
import Clientes from "./Clientes";
import PerfilCajera from "./PerfilCajera";

const POSHome = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: null, nombre: "Todas" }]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCobrar, setShowCobrar] = useState(false);
  const [showCatalogo, setShowCatalogo] = useState(false);
  const [showCerrarCaja, setShowCerrarCaja] = useState(false);
  const [showFacturas, setShowFacturas] = useState(false);
  const [showInventario, setShowInventario] = useState(false);
  const [showAbrirCaja, setShowAbrirCaja] = useState(false);
  const [showClientes, setShowClientes] = useState(false);
    const [showPerfilCajera, setShowPerfilCajera] = useState(false);
   const navigate = useNavigate();

  // Perfil
  const [showProfile, setShowProfile] = useState(false);
  // Datos del usuario autenticado (desde localStorage)
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  })();
  const cajero = {
    nombre: storedUser?.nombre || storedUser?.email || "Usuario",
    rol: storedUser?.cargo || storedUser?.rol || "",
    correo: storedUser?.email || "",
    id: storedUser?.id,
  };

  // Foto de perfil del usuario
  const [profilePhoto, setProfilePhoto] = useState("");

  // Helper para obtener cloud name (se usa fuera del efecto)
  const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || import.meta.env.CLOUDINARY_CLOUD_NAME || "");

  // 🌗 Tema
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // 🔄 Cargar productos/categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetch("http://localhost:5000/api/products/productos"),
          fetch("http://localhost:5000/api/categorias"),
        ]);
        if (!productResponse.ok || !categoryResponse.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
        const productsData = await productResponse.json();
        const categoriesData = await categoryResponse.json();

        const formattedProducts = productsData.map((p) => ({
          id: p.id_producto,
          name: p.nombre,
          price: p.precio_venta,
          category: p.id_categoria,
          stock: p.stock_actual,
          image: "🛍️",
        }));

        // Corrección: Mapear categoriesData para usar 'id' en lugar de 'id_categoria'
        const formattedCategories = categoriesData.map((cat) => ({
          id: cat.id_categoria,
          nombre: cat.nombre,
        }));

        setProducts(formattedProducts);
        setCategories([{ id: null, nombre: "Todas" }, ...formattedCategories]);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  // Cargar foto_perfil del usuario
  useEffect(() => {
    const userId = cajero.id;
    if (!userId) return;
    fetch(`http://localhost:5000/api/perfil/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.foto_perfil && cloudName) {
          setProfilePhoto(`https://res.cloudinary.com/${cloudName}/image/upload/${data.foto_perfil}`);
        }
      })
      .catch(() => {});
  }, [cajero.id, cloudName]);

  // 🔍 Filtrar productos
  const categoryId = categories.find((cat) => cat.nombre === selectedCategory)?.id;
  const filteredProducts = products.filter((p) => 
    (selectedCategory === "Todas" || p.category === categoryId) && p.stock > 0
  );

  // 🛒 Funciones carrito
  const addToCart = (p) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === p.id);
      if (existing)
        return prev.map((i) =>
          i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...p, quantity: 1 }];
    });
  };
  const updateQuantity = (id, change) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + change) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };
  const removeFromCart = (id) => setCart((p) => p.filter((i) => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ==================== UI ====================
  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-zinc-900 via-gray-900 to-stone-900 text-slate-100"
          : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-700"
      }`}
    >
      {/* ===== Sidebar ===== */}
      <aside
        className={`w-56 flex flex-col border-r backdrop-blur-xl shadow-md ${
          theme === "dark"
            ? "bg-slate-950/80 border-slate-800"
            : "bg-white/80 border-orange-200"
        }`}
      >
        <div
          className={`p-4 text-lg font-bold border-b text-center ${
            theme === "dark"
              ? "border-slate-800 bg-gradient-to-r from-orange-600/30 to-fuchsia-500/30"
              : "border-orange-100 bg-gradient-to-r from-orange-400 via-rose-400 to-fuchsia-400 text-white rounded-br-2xl"
          }`}
        >
          Categorías
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {categories.map((cat) => (
            <button
              key={cat.nombre}
              onClick={() => setSelectedCategory(cat.nombre)}
              className={`w-full mb-2 px-4 py-2 text-left rounded-xl transition-all ${
                selectedCategory === cat.nombre
                  ? "bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 text-white font-semibold shadow-md"
                  : theme === "dark"
                  ? "bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800"
                  : "bg-white hover:bg-orange-50 border border-orange-100 text-slate-700"
              }`}
            >
              {cat.nombre}
            </button>
          ))}
        </div>
      </aside>

      {/* ===== Panel Central ===== */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`px-3 py-2 flex flex-wrap gap-3 items-center justify-between border-b ${
            theme === "dark"
              ? "bg-slate-900/80 border-slate-800 text-slate-200"
              : "bg-white/80 border-orange-100 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            >
              {profilePhoto ? (
                <img src={profilePhoto} alt="Perfil" className="w-10 h-10 rounded-full object-cover border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 flex items-center justify-center text-white font-bold">
                  {cajero.nombre[0]}
                </div>
              )}
              <div className="leading-tight">
                <div className="text-sm font-semibold">{cajero.nombre}</div>
                <div className="text-xs opacity-70">{cajero.rol}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {[
              ["Clientes", () => setShowClientes(true), <Users size={16} />],
              ["Abrir Caja", () => setShowAbrirCaja(true), <Box size={16} />],
              ["Cerrar Caja", () => setShowCerrarCaja(true), <Box size={16} />],
              ["Facturas", () => setShowFacturas(true), <Archive size={16} />],
              ["Catálogo", () => setShowCatalogo(true), <Archive size={16} />],
              ["Inventario", () => setShowInventario(true), <Archive size={16} />],
            ].map(([label, action, icon]) => (
              <button
                key={label}
                onClick={action}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition text-sm ${
                  theme === "dark"
                    ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
                    : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "bg-gray-800 text-yellow-300"
                : "bg-gray-100 text-gray-700"
            } hover:scale-105 transition`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Productos */}
        <section className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className={`rounded-2xl h-36 p-4 flex flex-col justify-between text-center cursor-pointer transition hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-slate-900 border border-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-fuchsia-500 hover:text-white"
                    : "bg-white border border-orange-100 hover:shadow-lg"
                }`}
              >
                <div className="text-2xl">{product.image}</div>
                <h3 className="text-sm font-semibold truncate">{product.name}</h3>
                <span
                  className={`font-bold text-sm ${
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  ${product.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ===== Factura (más angosta) ===== */}
      <aside
        className={`w-80 flex flex-col border-l shadow-lg transition ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 text-slate-200"
            : "bg-white border-orange-100 text-slate-700"
        }`}
      >
        <div
          className={`p-3 border-b ${
            theme === "dark"
              ? "border-slate-700 bg-gradient-to-r from-orange-600 to-fuchsia-600 text-white"
              : "border-orange-100 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 text-white"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart size={20} />
            <h2 className="text-md font-semibold">Factura</h2>
          </div>
          <input
            type="text"
            placeholder="Buscar producto..."
            className={`w-full rounded-lg p-2 text-sm focus:ring-2 ${
              theme === "dark"
                ? "bg-slate-800 border border-slate-700 text-white focus:ring-orange-400"
                : "bg-white border border-orange-200 text-slate-700 focus:ring-orange-400"
            }`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {cart.length === 0 ? (
            <div className="text-center text-slate-500 mt-8">
              <ShoppingCart
                size={48}
                className={`mx-auto mb-4 opacity-50 ${
                  theme === "dark" ? "text-orange-400" : "text-orange-500"
                }`}
              />
              <p className="font-medium">Factura vacía</p>
              <p className="text-sm text-slate-400">
                Selecciona productos para agregar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl p-3 border ${
                    theme === "dark"
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-orange-100"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-7 h-7 bg-rose-500 hover:bg-rose-600 text-white rounded-full flex items-center justify-center"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-right text-sm">
                      <div className="text-slate-400">
                        ${item.price.toLocaleString()}
                      </div>
                      <div
                        className={`font-bold ${
                          theme === "dark"
                            ? "text-orange-400"
                            : "text-orange-600"
                        }`}
                      >
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={`border-t p-3 ${
            theme === "dark"
              ? "border-slate-700 bg-slate-950"
              : "border-orange-100 bg-white"
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span
              className={`text-2xl font-extrabold ${
                theme === "dark" ? "text-orange-400" : "text-orange-600"
              }`}
            >
              ${total.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => setShowCobrar(true)}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 hover:brightness-110 transition"
          >
            Procesar Pago
          </button>
        </div>
      </aside>

      {/* ===== Menú de perfil del cajero ===== */}
      {showProfile && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`w-80 rounded-2xl p-6 shadow-xl border border-orange-100 ${
              theme === "dark" ? "bg-slate-900 text-white" : "bg-white"
            }`}
          >
            {/* Encabezado */}
            <div className="flex flex-col items-center gap-2">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Perfil" className="w-16 h-16 rounded-full object-cover border-4 border-orange-200" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-fuchsia-500 flex items-center justify-center text-2xl text-white font-bold">
                  {cajero.nombre[0]}
                </div>
              )}
              <h3 className="text-lg font-semibold">{cajero.nombre}</h3>
              <p className="text-sm opacity-80">{cajero.rol}</p>
              <p className="text-sm text-slate-400">{cajero.correo}</p>
            </div>

            {/* Botones de acción */}
            <div className="mt-5 space-y-2">
              {/* 👉 Ver perfil completo */}
              <button
                onClick={() => {
                  setShowProfile(false);
                  setShowPerfilCajera(true);
                }}
                className="w-full py-2 bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white rounded-lg font-semibold hover:brightness-110 transition"
              >
                Ver perfil completo
              </button>

        {/* Cerrar sesión */}
        <button
          onClick={() => window.location.reload()}
          className="w-full py-2 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>

              {/* Cerrar ventana */}
              <button
                onClick={() => setShowProfile(false)}
                className="w-full text-sm text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 mt-3"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Modal Perfil completo ===== */}
      {showPerfilCajera && (
        <PerfilCajera onClose={() => setShowPerfilCajera(false)} />
      )}

      {/* ===== Modales ===== */}
      {showCobrar && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <Cobrar total={total} onClose={() => setShowCobrar(false)} />
        </div>
      )}
      {showCatalogo && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <Catalogo onClose={() => setShowCatalogo(false)} />
        </div>
      )}
      {showCerrarCaja && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <CerrarCaja
            ventas={{ efectivo: 200000, tarjeta: 150000, nequi: 50000 }}
            onClose={() => setShowCerrarCaja(false)}
          />
        </div>
      )}
      <ConsultaFacturas open={showFacturas} onClose={() => setShowFacturas(false)} />
      <ConsultaProductos open={showInventario} onClose={() => setShowInventario(false)} />
      <Clientes open={showClientes} onClose={() => setShowClientes(false)} />
      <AbrirCaja open={showAbrirCaja} onClose={() => setShowAbrirCaja(false)} />
    </div>
  );
};

export default POSHome;
import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Cobrar from "./Cobrar";
import Catalogo from "./Catalogo";
import CerrarCaja from "./CerrarCaja";
import ConsultaFacturas from "./ConsultaFacturas";
import ConsultaProductos from "./ConsultaProductos";
import AbrirCaja from "./AbrirCaja";
import Clientes from "./Clientes";

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

  // 🌗 Estado y persistencia del tema
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // 🔄 Cargar productos y categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          fetch("http://localhost:5000/api/products/productos"),
          fetch("http://localhost:5000/api/categorias"),
        ]);

        const productsData = await productResponse.json();
        const categoriesData = await categoryResponse.json();

        const formattedProducts = productsData.map((product) => ({
          id: product.id_producto,
          name: product.nombre,
          price: product.precio_venta,
          category: product.id_categoria,
          stock: product.stock_actual,
          image: "🛍️",
        }));

        setProducts(formattedProducts);
        setCategories([{ id: null, nombre: "Todas" }, ...categoriesData]);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    fetchData();
  }, []);

  // 🔍 Filtrar productos
  const filteredProducts =
    selectedCategory === "Todas"
      ? products.filter((p) => p.stock > 0)
      : products.filter(
          (p) =>
            p.category ===
            categories.find((cat) => cat.nombre === selectedCategory)?.id
        );

  // 🛒 Funciones carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      return [...prev, { ...product, quantity: 1 }];
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

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // ==================== UI ====================
  return (
    <div
      className={`flex h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 text-slate-100"
          : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-700"
      }`}
    >
      {/* ===== Sidebar ===== */}
      <aside
        className={`w-56 flex flex-col border-r backdrop-blur-xl shadow-md transition-all ${
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
        {/* Barra superior */}
        <header
  className={`px-1 py-3 flex flex-wrap gap-2 items-center justify-center sm:justify-between border-b backdrop-blur-xl shadow-sm ${
    theme === "dark"
      ? "bg-slate-900/80 border-slate-800 text-slate-200"
      : "bg-white/80 border-orange-100 text-slate-700"
  }`}
>
  {/* ===== Botones de Módulos ===== */}
  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
    <button
      onClick={() => setShowClientes(true)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 hover:brightness-110 transition"
    >
      <Users size={16} /> Clientes
    </button>
    <button
      onClick={() => setShowAbrirCaja(true)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
          : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50"
      }`}
    >
      <Box size={16} /> Abrir Caja
    </button>
    <button
      onClick={() => setShowCerrarCaja(true)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
          : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50"
      }`}
    >
      <Box size={16} /> Cerrar Caja
    </button>
    <button
      onClick={() => setShowFacturas(true)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
          : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50"
      }`}
    >
      <Archive size={16} /> Facturas
    </button>
    <button
      onClick={() => setShowCatalogo(true)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
          : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50"
      }`}
    >
      <Archive size={16} /> Catálogo
    </button>
    <button
      onClick={() => setShowInventario(true)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition ${
        theme === "dark"
          ? "border-slate-700 bg-slate-800 hover:bg-slate-700"
          : "border-orange-300 bg-white text-orange-700 hover:bg-orange-50"
      }`}
    >
      <Archive size={16} /> Inventario
    </button>
  </div>

  {/* ===== Switch Modo Oscuro ===== */}
  <div className="flex items-center gap-3">
    <span className="text-xs font-medium opacity-70 hidden sm:block">
      {theme === "dark" ? "Modo Oscuro" : "Modo Claro"}
    </span>

    {/* Toggle */}
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 flex items-center rounded-full transition-all duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-r from-orange-500 to-fuchsia-500"
          : "bg-slate-300 hover:bg-slate-400"
      }`}
    >
      <span
        className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
          theme === "dark" ? "translate-x-7" : "translate-x-1"
        }`}
      ></span>
      {theme === "dark" ? (
        <Sun
          size={14}
          className="absolute left-1 text-white transition-transform duration-300"
        />
      ) : (
        <Moon
          size={14}
          className="absolute right-1 text-slate-600 transition-transform duration-300"
        />
      )}
    </button>
  </div>
</header>


        {/* Productos */}
        <section className="flex-1 overflow-y-auto p-2 ">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className={`rounded-2xl p-4 text-center cursor-pointer transition hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-slate-900 border border-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-fuchsia-500 hover:text-white"
                    : "bg-white border border-orange-100 hover:shadow-lg"
                }`}
              >
                <div className="text-3xl mb-2">{product.image}</div>
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <span
                  className={`font-bold mt-1 block ${
                    theme === "dark" ? "text-orange-400" : "text-orange-600"
                  }`}
                >
                  ${product.price.toLocaleString()}
                </span>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-slate-400 py-10">
                No hay productos disponibles.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ===== Carrito ===== */}
      <aside
        className={`w-96 flex flex-col border-l shadow-lg transition ${
          theme === "dark"
            ? "bg-slate-900 border-slate-800 text-slate-200"
            : "bg-white border-orange-100 text-slate-700"
        }`}
      >
        <div
          className={`p-2 border-b ${
            theme === "dark"
              ? "border-slate-700 bg-gradient-to-r from-orange-600 to-fuchsia-600 text-white"
              : "border-orange-100 bg-gradient-to-r from-orange-500 via-rose-500 to-fuchsia-500 text-white"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart size={22} />
            <h2 className="text-lg font-semibold">Factura</h2>
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

        {/* Contenido del carrito */}
        <div className="flex-1 overflow-y-auto p-4">
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

        {/* Total */}
        <div
          className={`border-t p-4 ${
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

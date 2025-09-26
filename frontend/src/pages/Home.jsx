import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingCart, Users, Box, FileText, Archive } from 'lucide-react';
import Cobrar from './Cobrar';
import Catalogo from './Catalogo'; 
import CerrarCaja from "./CerrarCaja";
import ConsultaFacturas from './ConsultaFacturas';
import ConsultaProductos from './ConsultaProductos';
import AbrirCaja from './AbrirCaja';
import Clientes from './Clientes';

const POSHome = () => {
  const products = [
    { id: 1, name: 'Hamburguesa Clásica', price: 15000, image: '🍔', category: 'Hamburguesas' },
    { id: 2, name: 'Pizza Margherita', price: 25000, image: '🍕', category: 'Pizzas' },
    { id: 3, name: 'Tacos Mexicanos', price: 12000, image: '🌮', category: 'Mexicana' },
    { id: 4, name: 'Sushi Roll', price: 30000, image: '🍣', category: 'Japonesa' },
    { id: 5, name: 'Pasta Carbonara', price: 18000, image: '🍝', category: 'Italiana' },
    { id: 6, name: 'Pollo Asado', price: 22000, image: '🍗', category: 'Carnes' },
    { id: 7, name: 'Ensalada César', price: 14000, image: '🥗', category: 'Ensaladas' },
    { id: 8, name: 'Sandwich Club', price: 16000, image: '🥪', category: 'Sandwiches' },
    { id: 9, name: 'Burrito', price: 17000, image: '🌯', category: 'Mexicana' },
    { id: 10, name: 'Hot Dog', price: 10000, image: '🌭', category: 'Rápida' },
    { id: 11, name: 'Donut Glaseado', price: 5000, image: '🍩', category: 'Postres' },
    { id: 12, name: 'Café Americano', price: 6000, image: '☕', category: 'Bebidas' }
  ];

  const categories = ['Todas', 'Hamburguesas', 'Pizzas', 'Mexicana', 'Japonesa', 'Italiana', 'Carnes', 'Ensaladas', 'Sandwiches', 'Rápida', 'Postres', 'Bebidas'];

  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState("");
  const [showCobrar, setShowCobrar] = useState(false);
  const [showCatalogo, setShowCatalogo] = useState(false); // <-- estado para modal catálogo
  const [showCerrarCaja, setShowCerrarCaja] = useState(false);
  const [showC, setShowC] = useState(false);
  const [showFacturas, setShowFacturas] = useState(false);     // ⬅️ estado separado
  const [showInventario, setShowInventario] = useState(false); 
  const [showAbrirCaja, setShowAbrirCaja] = useState(false); 
  const [showClientes, setShowClientes] = useState(false); 


  const filteredProducts = selectedCategory === 'Todas'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, change) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleProductClick = (product) => {
    addToCart(product);
  };

  return (
    <div className="flex h-screen relative">
      {/* Sidebar izquierdo - Categorías */}
      <div className="w-52 bg-gray-900 text-white flex flex-col">
        <div className="p-4 font-bold text-lg border-b border-gray-700">Categorías</div>
        <div className="flex-1 overflow-y-auto">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full px-4 py-3 text-left text-sm border-b border-gray-800 hover:bg-gray-700 ${
                selectedCategory === category ? 'bg-orange-500 font-bold' : ''
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Panel central */}
      <div className="flex-1 flex flex-col bg-black">
        {/* Barra superior - Módulos */}
        <div className="bg-gray-800 p-3 flex gap-3 text-sm text-white border-b border-gray-700">
      
         <button
          onClick={() => setShowClientes(true)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded text-white"
        >
          <Users size={16} /> Clientes
        </button>


          {/* botón Abrir Caja */}
        <button
          onClick={() => setShowAbrirCaja(true)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded"
        >
          <Box size={16} /> Abrir Caja
        </button>

          <button 
          onClick={() => setShowCerrarCaja(true)} 
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded"
          >
          <Box size={16}/> Cerrar Caja
          </button>

                <button
          onClick={() => setShowFacturas(true)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded"
        >
          <Archive size={16}/> Consultar Facturas
        </button>

        <button
          onClick={() => setShowCatalogo(true)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded"
        >
          <Archive size={16}/> Catálogo
        </button>

        <button
          onClick={() => setShowInventario(true)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-700 rounded"
        >
          <Archive size={16}/> Inventario
        </button>


      
        </div>

        {/* Productos */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-gray-900 text-white rounded-lg p-3 flex flex-col items-center cursor-pointer hover:bg-gray-700"
              >
                <div className="text-3xl mb-2">{product.image}</div>
                <h3 className="text-xs font-semibold text-center">{product.name}</h3>
                <span className="text-sm text-orange-400 font-bold mt-1">
                  ${product.price.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Carrito / Factura */}
      <div className="w-96 bg-white border-l shadow-lg flex flex-col">
        {/* Header del carrito */}
        <div className="p-4 border-b border-gray-200 bg-orange-500 text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart size={24} />
            <h2 className="text-xl font-bold">Factura</h2>
          </div>

          {/* 🔍 Búsqueda de productos */}
          <input
            type="text"
            placeholder="Buscar producto..."
            className="mt-3 w-full border rounded-lg p-2 text-sm text-black focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Sugerencias */}
          {searchQuery && (
            <div className="mt-2 max-h-40 overflow-y-auto border rounded-lg bg-white shadow-sm text-black">
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((product) => (
                  <div
                    key={product.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between"
                    onClick={() => {
                      handleProductClick(product);
                      setSearchQuery("");
                    }}
                  >
                    <span>{product.name}</span>
                    <span className="font-bold text-blue-600">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Items del carrito */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-50" />
              <p>Factura vacía</p>
              <p className="text-sm">Selecciona productos para agregar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3 border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm flex-1">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">
                        ${item.price.toLocaleString()}
                      </div>
                      <div className="font-bold text-orange-600">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total y botón de pago */}
        <div className="border-t border-gray-200 p-4 bg-white">
          <div className="mb-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span className="text-2xl text-orange-600">${total.toLocaleString()}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowCobrar(true)} 
            className="w-full py-3 rounded-lg font-bold text-white bg-green-600 hover:bg-green-700"
          >
            Procesar Pago
          </button>
        </div>
      </div>

      {/* Modal Cobrar */}
      {showCobrar && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <Cobrar total={total} onClose={() => setShowCobrar(false)} />
        </div>
      )}

      {/* Modal Catálogo */}
      {showCatalogo && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <Catalogo onClose={() => setShowCatalogo(false)} />
        </div>
      )}

      {showCerrarCaja && (
  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <CerrarCaja 
      ventas={{ efectivo: 200000, tarjeta: 150000, nequi: 50000 }} 
      onClose={() => setShowCerrarCaja(false)} 
    />
  </div>
  
)}
    <ConsultaFacturas open={showFacturas} onClose={() => setShowFacturas(false)} />
    <ConsultaProductos open={showInventario} onClose={() => setShowInventario(false)} />
    <Clientes open={showClientes} onClose={() => setShowClientes(false)} />

        {/* Modal Abrir Caja */}
      <AbrirCaja
        open={showAbrirCaja}
        onClose={() => setShowAbrirCaja(false)}
        onConfirm={(payload) => {
          console.log("Caja abierta:", payload);
          // aquí podrías disparar un fetch a tu backend si lo deseas
        }}
      />
    </div>
  );
};

export default POSHome;

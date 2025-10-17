import React, { useEffect, useRef } from "react";
import { X, Printer } from "lucide-react";

/* ===================== Hook de tema global ===================== */
function useSystemTheme() {
  const [theme, setTheme] = React.useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  useEffect(() => {
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

/* ===================== Componente principal ===================== */
export default function ModeloFactura({ open, onClose, datos = {} }) {
  const theme = useSystemTheme();
  const facturaRef = useRef(null);

  const {
    numero = "F-000231",
    fecha = new Date().toLocaleString("es-CO"),
    cliente = "Cliente General",
    cajero = "Juliana Hoyos",
    metodoPago = "Efectivo",
    subtotal = 69400,
    descuento = 0,
    iva = 0.19,
    recibido = 70000,
    cambio = 600,
    productos = [
      { id: 1, nombre: "Arroz Diana 1Kg", cantidad: 2, precio: 4200 },
      { id: 2, nombre: "Aceite Premier 1000ml", cantidad: 1, precio: 9800 },
      { id: 3, nombre: "Pan Bimbo Familiar", cantidad: 1, precio: 7500 },
      { id: 4, nombre: "Gaseosa Colombiana 1.5L", cantidad: 1, precio: 5600 },
      { id: 5, nombre: "Huevos Kikes x30", cantidad: 1, precio: 21500 },
    ],
  } = datos;

  const totalIva = subtotal * iva;
  const totalFinal = subtotal - descuento + totalIva;

  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const handlePrint = () => {
    window.print();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        ref={facturaRef}
        className={`relative w-[380px] rounded-xl overflow-hidden shadow-2xl border text-sm 
          ${
            theme === "dark"
              ? "bg-slate-900 border-slate-700 text-slate-100"
              : "bg-white border-slate-300 text-slate-800"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======= Header ======= */}
        <div
          className={`flex items-center justify-between px-4 py-2 border-b ${
            theme === "dark"
              ? "border-slate-700 bg-gradient-to-r from-orange-600 via-pink-600 to-fuchsia-600"
              : "border-orange-200 bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-400"
          } text-white`}
        >
          <h2 className="font-bold text-base">Factura de Venta</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-white/20 transition"
            title="Cerrar"
          >
            <X size={16} />
          </button>
        </div>

        {/* ======= Encabezado de empresa ======= */}
        <div className="px-4 py-3 text-center text-xs border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-extrabold text-orange-600 dark:text-orange-400">
            SUPERMERCADO INVENTNET
          </h3>
          <p>NIT: 901.567.234-5</p>
          <p>Cra 12 #34-56, Florencia - Caquetá</p>
          <p>Tel: (608) 435-8900</p>
        </div>

        {/* ======= Datos de la factura ======= */}
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700 text-xs">
          <div className="flex justify-between">
            <span>No. {numero}</span>
            <span>{fecha}</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Cliente:</span>
            <span className="font-semibold">{cliente}</span>
          </div>
          <div className="flex justify-between">
            <span>Cajero:</span>
            <span>{cajero}</span>
          </div>
          <div className="flex justify-between">
            <span>Método:</span>
            <span>{metodoPago}</span>
          </div>
        </div>

        {/* ======= Detalle de productos ======= */}
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs">
            <thead>
              <tr
                className={`${
                  theme === "dark"
                    ? "text-orange-300 border-slate-700"
                    : "text-orange-600 border-slate-300"
                } border-b font-semibold`}
              >
                <th className="text-left">Cant</th>
                <th className="text-left">Producto</th>
                <th className="text-right">V. Unit</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => (
                <tr key={p.id} className="border-b border-slate-100 dark:border-slate-800">
                  <td>{p.cantidad}</td>
                  <td>{p.nombre}</td>
                  <td className="text-right">{money(p.precio)}</td>
                  <td className="text-right">{money(p.cantidad * p.precio)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ======= Totales ======= */}
        <div className="px-4 py-2 text-xs border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{money(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Descuento:</span>
            <span>{money(descuento)}</span>
          </div>
          <div className="flex justify-between">
            <span>IVA (19%):</span>
            <span>{money(totalIva)}</span>
          </div>
          <div className="flex justify-between font-bold border-t mt-1 pt-1">
            <span>TOTAL A PAGAR:</span>
            <span>{money(totalFinal)}</span>
          </div>
        </div>

        {/* ======= Pago ======= */}
        <div className="px-4 py-2 text-xs border-b border-slate-200 dark:border-slate-700">
          <div className="flex justify-between">
            <span>Efectivo recibido:</span>
            <span>{money(recibido)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Cambio:</span>
            <span>{money(cambio)}</span>
          </div>
        </div>

        {/* ======= Pie ======= */}
        <div className="px-4 py-4 text-center text-xs">
          <p>¡Gracias por su compra!</p>
          <p>Vuelva pronto 💫</p>
          <p className="mt-2 text-[10px] text-slate-500">
            Software de facturación desarrollado por InventNet © 2025
          </p>
        </div>

        {/* ======= Botón imprimir ======= */}
        <div className="absolute top-2 right-10">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white hover:brightness-110 transition"
          >
            <Printer size={14} /> Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}

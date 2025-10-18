import React, { useState, useEffect } from "react";
import { X, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Importar aquí

/* ======= Hook para sincronizar el modo de color global ======= */

function useSystemTheme() {
  const [theme, setTheme] = useState(
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

/* ======= Componente principal ======= */
function Cobrar({ initialCliente = null, carrito = [], usuario, idCaja, onClose }) {
  const theme = useSystemTheme();

  const navigate = useNavigate();
  const [efectivo, setEfectivo] = useState("");
  const [cliente, setCliente] = useState(initialCliente);
  const [showNuevoCliente, setShowNuevoCliente] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    identificacion: "",
    direccion: "",
    telefono: "",
    correo: "",
    tipo: "persona",
  });

  // Normalizar items recibidos
  const [items, setItems] = useState([]);
  const [descuentoGlobal, setDescuentoGlobal] = useState(0);

  useEffect(() => {
    setItems(
      (carrito || []).map((it) => ({
        id_producto: it.id_producto ?? it.id,
        nombre: it.nombre ?? it.name,
        cantidad: it.cantidad ?? it.quantity ?? 1,
        precio_unitario: it.precio_unitario ?? it.price ?? 0,
        descuento: it.descuento ?? 0,
      }))
    );
  }, [carrito]);

  const [impuestoRate, setImpuestoRate] = useState(0.19);

  useEffect(() => {
    fetch("http://localhost:5000/api/impuesto")
      .then((r) => r.json())
      .then((d) => {
        if (d && d.impuesto) setImpuestoRate(parseFloat(d.impuesto));
      })
      .catch((err) => console.warn("Error cargando tasa de impuesto:", err));
  }, []);

  const handleNumberClick = (num) => setEfectivo(efectivo + num);
  const handleClear = () => setEfectivo("");
  const handleBackspace = () => setEfectivo(efectivo.slice(0, -1));

  // Cálculos
  function calcularSubtotalBruto() {
    return items.reduce(
      (s, it) => s + it.precio_unitario * it.cantidad - (it.descuento || 0),
      0
    );
  }

  const subtotalBruto = calcularSubtotalBruto();
  const subtotalNeto = subtotalBruto - descuentoGlobal;

  function calcularImpuesto(subtotal) {
    return subtotal * impuestoRate;
  }

  function calcularTotal(subtotal, impuesto) {
    return subtotal + impuesto;
  }

  const impuesto = calcularImpuesto(subtotalNeto);
  const total = calcularTotal(subtotalNeto, impuesto);

  const efectivoInt = parseInt(efectivo || 0);
  const cambio = efectivoInt - total;

  const money = (n) =>
    (Number(n) || 0).toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  async function crearCliente() {
    if (!nuevoCliente.nombre || !nuevoCliente.identificacion) {
      alert("Nombre e identificación son obligatorios");
      return;
    }

    const res = await fetch("http://localhost:5000/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoCliente),
    });

    if (!res.ok) {
      alert("Error creando cliente");
      return;
    }

    const c = await res.json();
    setCliente(c);
    setShowNuevoCliente(false);
    setNuevoCliente({
      nombre: "",
      identificacion: "",
      direccion: "",
      telefono: "",
      correo: "",
      tipo: "persona",
    });
  }

  function aplicarDescuentoPorcentaje(porcentaje) {
    const descuento = (subtotalBruto * porcentaje) / 100;
    setDescuentoGlobal(descuento);
  }

  async function confirmarVenta(metodo_pago = "efectivo", imprimir = false) {
    if (!idCaja) {
      alert("No hay caja abierta. Abra una caja antes de facturar.");
      return;
    }

    const subtotalFinal = subtotalNeto;
    const impuestoFinal = calcularImpuesto(subtotalFinal);
    const totalFinal = calcularTotal(subtotalFinal, impuestoFinal);

    const payload = {
      id_cliente: cliente ? cliente.id_cliente || cliente.id : null,
      id_usuario: usuario.id_usuario || usuario.id,
      id_caja: idCaja,
      subtotal: subtotalFinal,
      impuesto: impuestoFinal,
      total: totalFinal,
      metodo_pago,
      observaciones: `Descuento global: ${descuentoGlobal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      })}`,
      items: items.map((it) => ({
        id_producto: it.id_producto,
        cantidad: it.cantidad,
        precio_unitario: it.precio_unitario,
        descuento: it.descuento || 0,
        total: it.precio_unitario * it.cantidad - (it.descuento || 0),
      })),
    };

    try {
      const res = await fetch("http://localhost:5000/api/ventas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(
          errorText || `Error ${res.status}: No se pudo guardar la venta.`
        );
      }

      const data = await res.json();
      console.log("Venta y movimiento creados:", data);  // Debug: Confirma movimiento
      alert(`✅ Venta registrada exitosamente. ID: ${data.id_venta}`);

      if (imprimir) {
        setTimeout(() => window.print?.(), 300);
      }

      onClose();
    } catch (err) {
      console.error("Error en confirmarVenta:", err);
      alert(`❌ ${err.message}`);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className={`relative w-[95vw] max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border transition-all duration-300 py-6 sm:py-8
          ${
            theme === "dark"
              ? "bg-slate-900 border-slate-800"
              : "bg-white border-slate-200"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel izquierdo */}
        <div
          className={`flex-1 p-6 flex flex-col justify-between transition-colors duration-300
            ${
              theme === "dark"
                ? "bg-slate-900 text-slate-100"
                : "bg-gradient-to-br from-orange-50 via-white to-rose-50 text-slate-800"
            }
          `}
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-bold text-orange-500 dark:text-orange-400">
                TOTAL
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-orange-100 dark:hover:bg-slate-800 transition"
                title="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-fuchsia-500 bg-clip-text text-transparent mb-5">
              {money(total)}
            </div>

            <div className="space-y-3 text-sm">
              <InfoRow label="Tipo de pago" value="CONTADO" />
              <InfoRow label="Sub Total" value={money(subtotalBruto)} />
              <InfoRow label="Descuento Global" value={money(descuentoGlobal)} />
              <InfoRow label="Subtotal Neto" value={money(subtotalNeto)} />
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="font-semibold">Cliente:</span>
                {cliente ? (
                  <div className="text-right">
                    <div className="font-semibold">{cliente.nombre}</div>
                    <div className="text-xs opacity-70">{cliente.identificacion}</div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNuevoCliente(true)}
                    className="px-3 py-1.5 rounded-md bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white text-xs hover:brightness-110 flex items-center gap-1"
                  >
                    <UserPlus size={14} />
                    Nuevo Cliente
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2 max-h-[200px] overflow-y-auto">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg text-xs ${
                    theme === "dark"
                      ? "bg-slate-800"
                      : "bg-white border border-slate-200"
                  }`}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{item.nombre}</span>
                    <span>
                      {money(item.precio_unitario * item.cantidad - item.descuento)}
                    </span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    {item.cantidad} x {money(item.precio_unitario)}
                    {item.descuento > 0 && ` - Desc: ${money(item.descuento)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-xs text-center text-slate-500 dark:text-slate-400">
            Sistema de Facturación - InventNet © 2025
          </div>
        </div>

        {/* Panel derecho */}
        <div
          className={`w-full md:w-[380px] p-4 flex flex-col transition-colors duration-300 border-l
            ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-slate-100"
                : "bg-white border-slate-200 text-slate-800"
            }
          `}
        >
          {/* Campo de efectivo */}
          <input
            type="number"
            placeholder="Digite el efectivo recibido"
            value={efectivo}
            onChange={(e) => setEfectivo(e.target.value)}
            className={`mb-3 p-3 rounded-lg text-sm font-medium w-full text-center border transition
              ${
                theme === "dark"
                  ? "bg-slate-900 border-slate-700 text-white focus:ring-2 focus:ring-fuchsia-400"
                  : "bg-white border-slate-300 text-slate-800 focus:ring-2 focus:ring-orange-300"
              }`}
          />

          {/* Totales */}
          <div className="grid grid-cols-1 gap-2 mb-3 text-center text-sm font-semibold">
            <div
              className={`py-2 rounded-lg font-bold ${
                theme === "dark"
                  ? "bg-emerald-600 text-white"
                  : "bg-gradient-to-r from-emerald-500 to-green-400 text-white"
              }`}
            >
              EFECTIVO: {money(efectivoInt)}
            </div>
            <div
              className={`py-2 rounded-lg ${
                cambio < 0
                  ? "bg-rose-600 text-white"
                  : theme === "dark"
                  ? "bg-green-700 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              CAMBIO: {money(cambio > 0 ? cambio : 0)}
            </div>
          </div>

          {/* Teclado numérico */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <NumButton key={n} label={n} onClick={() => handleNumberClick(n.toString())} />
            ))}
            <NumButton label="⬅" onClick={handleBackspace} />
            <NumButton label="0" onClick={() => handleNumberClick("0")} />
            <NumButton label="CE" variant="danger" onClick={handleClear} />
          </div>

          {/* Descuentos */}
          <div className="mb-3">
            <div className="text-xs font-semibold mb-2 text-center">Descuento Global</div>
            <div className="grid grid-cols-5 gap-2">
              {[5, 10, 15, 20, 25].map((d) => (
                <button
                  key={d}
                  onClick={() => aplicarDescuentoPorcentaje(d)}
                  className={`py-2 rounded-md text-xs font-medium transition ${
                    theme === "dark"
                      ? "bg-slate-700 hover:bg-slate-600 text-white"
                      : "bg-slate-100 hover:bg-orange-100 text-slate-700"
                  }`}
                >
                  {d}%
                </button>
              ))}
            </div>
            {descuentoGlobal > 0 && (
              <div className="text-center text-xs mt-2 text-green-600 dark:text-green-400">
                Descuento aplicado: {money(descuentoGlobal)}
              </div>
            )}
          </div>

          {/* Botones finales */}
          <div className="flex gap-2 mb-2">
            <button
              onClick={onClose}
              className={`flex-1 py-2 rounded-md font-bold text-xs transition ${
                theme === "dark"
                  ? "bg-rose-700 hover:bg-rose-800"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              Cancelar
            </button>
            <button
              onClick={() => confirmarVenta("efectivo")}
              className={`flex-1 py-2 rounded-md font-bold text-xs transition ${
                theme === "dark"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Confirmar
            </button>
          </div>

       <button
        onClick={async () => {
          await confirmarVenta("efectivo", true);
          navigate("/ModeloFactura"); // 🔹 redirige después de imprimir
        }}
        className={`w-full py-2 rounded-md font-bold text-xs transition ${
          theme === "dark"
            ? "bg-sky-700 hover:bg-sky-800"
            : "bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110 text-white"
        }`}
      >
        Confirmar e Imprimir
      </button>

        </div>
      </div>

      {/* Modal Nuevo Cliente */}
      {showNuevoCliente && (
        <div
          className="absolute inset-0 z-[70] flex items-center justify-center bg-black/50"
          onClick={() => setShowNuevoCliente(false)}
        >
          <div
            className={`w-[450px] rounded-2xl shadow-2xl p-6 ${
              theme === "dark" ? "bg-slate-900 text-white" : "bg-white text-slate-800"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Nuevo Cliente</h3>
              <button
                onClick={() => setShowNuevoCliente(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3">
              <InputField
                label="Nombre *"
                value={nuevoCliente.nombre}
                onChange={(v) => setNuevoCliente({ ...nuevoCliente, nombre: v })}
              />
              <InputField
                label="Identificación *"
                value={nuevoCliente.identificacion}
                onChange={(v) =>
                  setNuevoCliente({ ...nuevoCliente, identificacion: v })
                }
              />
              <select
                value={nuevoCliente.tipo}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, tipo: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-300"
                }`}
              >
                <option value="persona">Persona</option>
                <option value="empresa">Empresa</option>
              </select>
              <InputField
                label="Teléfono"
                value={nuevoCliente.telefono}
                onChange={(v) => setNuevoCliente({ ...nuevoCliente, telefono: v })}
              />
              <InputField
                label="Correo"
                value={nuevoCliente.correo}
                onChange={(v) => setNuevoCliente({ ...nuevoCliente, correo: v })}
              />
              <textarea
                value={nuevoCliente.direccion}
                onChange={(e) =>
                  setNuevoCliente({ ...nuevoCliente, direccion: e.target.value })
                }
                className={`w-full px-3 py-2 rounded-lg border text-sm ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-300"
                }`}
                placeholder="Dirección completa"
                rows={2}
              />
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setShowNuevoCliente(false)}
                className="flex-1 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-300 transition text-sm font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={crearCliente}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-fuchsia-500 text-white hover:brightness-110 transition text-sm font-medium"
              >
                Crear Cliente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======= Componentes auxiliares ======= */
function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}

function NumButton({ label, onClick, variant = "normal" }) {
  const base = "py-2 rounded-lg font-bold text-base transition";
  const color =
    variant === "danger"
      ? "bg-rose-600 hover:bg-rose-700 text-white"
      : "bg-gradient-to-r from-orange-500 to-fuchsia-500 hover:brightness-110 text-white";
  return (
    <button onClick={onClick} className={`${base} ${color}`}>
      {label}
    </button>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-medium mb-1 block">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
      />
    </div>
  );
}

export default Cobrar;

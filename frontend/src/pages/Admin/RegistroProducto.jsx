import React, { useState } from "react";
import {
  PackagePlus,
  UploadCloud,
  Layers,
  Tag,
  CheckCircle2,
  Trash2,
  ArchiveX,
} from "lucide-react";

export default function RegistroProductos() {
  const [preview, setPreview] = useState(null);
  const [activo, setActivo] = useState(true);
  const [productos, setProductos] = useState([]);

  const [formData, setFormData] = useState({
    tipo: "",
    codigo: "",
    nombre: "",
    precioCompra: "",
    precioVenta: "",
    categoria: "",
    subcategoria: "",
    observaciones: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!formData.nombre || !formData.codigo) {
      alert("Por favor completa el código y el nombre del producto.");
      return;
    }

    const nuevoProducto = {
      ...formData,
      activo,
      imagen: preview,
      id: Date.now(),
    };

    setProductos([...productos, nuevoProducto]);
    setFormData({
      tipo: "",
      codigo: "",
      nombre: "",
      precioCompra: "",
      precioVenta: "",
      categoria: "",
      subcategoria: "",
      observaciones: "",
    });
    setPreview(null);
    setActivo(true);
  };

  const handleEliminar = (id) => {
    setProductos(productos.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 px-6 sm:px-12 py-10 rounded-xl">
      {/* ===== Encabezado ===== */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-emerald-500 to-sky-500 p-2.5 rounded-lg shadow-md text-white">
          <PackagePlus size={22} />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Registro de Productos
        </h1>
      </div>

      {/* ===== Formulario ===== */}
      <div className="bg-white/90 border border-emerald-100 rounded-2xl shadow-md p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Imagen del producto */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-6 hover:border-sky-400 hover:bg-slate-50 transition">
            {preview ? (
              <img
                src={preview}
                alt="Vista previa"
                className="w-40 h-40 object-cover rounded-lg shadow"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <UploadCloud size={48} className="mb-2" />
                <p className="text-sm text-center">
                  Subir imagen del producto
                </p>
              </div>
            )}
            <label className="mt-4 bg-sky-600 hover:bg-sky-700 text-white px-5 py-2 rounded-md text-sm cursor-pointer shadow-sm transition">
              + Seleccionar imagen
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Datos del producto */}
          <div className="md:col-span-2 space-y-5">
            <h2 className="text-lg font-semibold text-slate-700 flex items-center gap-2 border-b pb-2 border-slate-200">
              <Tag size={18} className="text-emerald-500" />
              Datos del producto
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Tipo de producto
                </label>
                <select
                  value={formData.tipo}
                  onChange={(e) => handleChange("tipo", e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
                >
                  <option>Seleccione...</option>
                  <option>Báscula</option>
                  <option>Compra y Venta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Código
                </label>
                <input
                  type="text"
                  value={formData.codigo}
                  onChange={(e) => handleChange("codigo", e.target.value)}
                  placeholder="Ej: A001"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  placeholder="Ej: Cebolla blanca pelada"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>
          </div>
        </div>

        {/* === Clasificación y precios === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Precio de compra
            </label>
            <input
              type="number"
              value={formData.precioCompra}
              onChange={(e) => handleChange("precioCompra", e.target.value)}
              placeholder="$0.00"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Precio de venta
            </label>
            <input
              type="number"
              value={formData.precioVenta}
              onChange={(e) => handleChange("precioVenta", e.target.value)}
              placeholder="$0.00"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Categoría
            </label>
            <select
              value={formData.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            >
              <option>Seleccione...</option>
              <option>Verduras</option>
              <option>Frutas</option>
              <option>Abarrotes</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Subcategoría
            </label>
            <select
              value={formData.subcategoria}
              onChange={(e) => handleChange("subcategoria", e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            >
              <option>Seleccione...</option>
              <option>Clase A</option>
              <option>Clase B</option>
              <option>Clase C</option>
            </select>
          </div>
        </div>

        {/* === Estado y Observaciones === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="activo"
              checked={activo}
              onChange={() => setActivo(!activo)}
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-400"
            />
            <label htmlFor="activo" className="text-sm text-slate-700">
              Producto activo en inventario
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Observaciones
            </label>
            <textarea
              rows="2"
              value={formData.observaciones}
              onChange={(e) => handleChange("observaciones", e.target.value)}
              placeholder="Notas adicionales, proveedor, condiciones..."
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-200"
            ></textarea>
          </div>
        </div>

        {/* === Botones === */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              setFormData({
                tipo: "",
                codigo: "",
                nombre: "",
                precioCompra: "",
                precioVenta: "",
                categoria: "",
                subcategoria: "",
                observaciones: "",
              });
              setPreview(null);
            }}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-md text-sm font-medium shadow-sm transition flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            Registrar Producto
          </button>
        </div>
      </div>

      {/* ===== Tabla de productos ===== */}
      <div className="bg-white/90 border border-emerald-100 rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-5 text-slate-700">
          Productos Registrados ({productos.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-emerald-400/80 to-sky-400/80 text-white">
              <tr>
                {[
                  "Código",
                  "Nombre",
                  "Categoría",
                  "Tipo",
                  "Compra",
                  "Venta",
                  "Activo",
                  "Acciones",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2 text-left text-xs uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.length > 0 ? (
                productos.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-slate-100 hover:bg-emerald-50 transition"
                  >
                    <td className="px-4 py-2">{p.codigo}</td>
                    <td className="px-4 py-2 font-medium text-slate-800">
                      {p.nombre}
                    </td>
                    <td className="px-4 py-2">{p.categoria}</td>
                    <td className="px-4 py-2">{p.tipo}</td>
                    <td className="px-4 py-2 text-right text-slate-700">
                      ${p.precioCompra}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold text-emerald-600">
                      ${p.precioVenta}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          p.activo
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {p.activo ? "Sí" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEliminar(p.id)}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded-md text-xs shadow"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center py-8 text-slate-400 text-sm"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ArchiveX size={32} className="text-slate-300" />
                      <p>No hay productos registrados aún...</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

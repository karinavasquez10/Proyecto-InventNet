import React from "react";
import { BarChart3, PieChart as PieIcon, Users } from "lucide-react";

// ===== Gráfico de barras mejorado =====
function BarChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.visitas));
  const colors = ["#fb923c", "#f97316", "#f43f5e", "#ec4899", "#a855f7"];

  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-slate-700">{d.nombre}</span>
            <span className="text-slate-500">{d.visitas}</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-3 rounded-full transition-all duration-700"
              style={{
                width: `${(d.visitas / maxVal) * 100}%`,
                backgroundColor: colors[i % colors.length],
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== Gráfico de pastel mejorado =====
function PieChart({ data }) {
  const total = data.reduce((acc, d) => acc + d.valor, 0);
  let acumulado = 0;
  const colors = ["#fb923c", "#f97316", "#ec4899", "#a855f7", "#10b981"];

  return (
    <div className="flex flex-col items-center justify-center">
      <svg viewBox="0 0 32 32" className="w-44 h-44 drop-shadow-sm">
        {data.map((d, i) => {
          const start = (acumulado / total) * 100;
          const end = ((acumulado + d.valor) / total) * 100;
          acumulado += d.valor;
          const largeArc = end - start > 50 ? 1 : 0;
          const startAngle = (start / 100) * 2 * Math.PI;
          const endAngle = (end / 100) * 2 * Math.PI;
          const x1 = 16 + 16 * Math.cos(startAngle);
          const y1 = 16 + 16 * Math.sin(startAngle);
          const x2 = 16 + 16 * Math.cos(endAngle);
          const y2 = 16 + 16 * Math.sin(endAngle);

          return (
            <path
              key={i}
              d={`M16 16 L${x1} ${y1} A16 16 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={colors[i % colors.length]}
              opacity="0.9"
            />
          );
        })}
      </svg>

      {/* Leyenda */}
      <ul className="mt-4 space-y-1 text-sm w-full max-w-xs">
        {data.map((c, i) => (
          <li key={i} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: colors[i % colors.length] }}
              ></span>
              <span className="text-slate-700">{c.categoria}</span>
            </div>
            <span className="font-medium text-slate-600">{c.valor}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Indicadores() {
  const clientesFrecuentes = [
    { nombre: "Karen Hoyos", visitas: 25 },
    { nombre: "Juliana Hoyos", visitas: 18 },
    { nombre: "Carlos Pérez", visitas: 12 },
    { nombre: "Ana Gómez", visitas: 10 },
    { nombre: "Luis Martínez", visitas: 8 },
  ];

  const categoriasClientes = [
    { categoria: "Frecuentes", valor: 40 },
    { categoria: "Ocasionales", valor: 30 },
    { categoria: "Nuevos", valor: 20 },
    { categoria: "Inactivos", valor: 10 },
  ];

  return (
    <div className="pt-4 pb-6 sm:pt-2 sm:pb-8 px-50 bg-gradient-to-br from-orange-50 via-white to-pink-50 min-h-screen rounded-xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-8 flex items-center justify-center gap-2">
        <Users size={24} className="text-orange-500" />
        Indicadores de Clientes
      </h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {[
          { title: "Total Clientes", value: 120 },
          { title: "Clientes Frecuentes", value: 45 },
          { title: "Visitas Promedio", value: 6 },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/90 backdrop-blur border border-orange-100 rounded-2xl shadow p-5 text-center hover:shadow-md transition"
          >
            <h3 className="text-sm text-slate-500 mb-1">{item.title}</h3>
            <p className="text-3xl font-bold text-orange-600">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white/90 border border-orange-100 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
            <BarChart3 size={18} className="text-orange-500" /> Clientes más frecuentes
          </h2>
          <BarChart data={clientesFrecuentes} />
        </div>

        <div className="bg-white/90 border border-orange-100 rounded-2xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-slate-700">
            <PieIcon size={18} className="text-orange-500" /> Distribución de clientes
          </h2>
          <PieChart data={categoriasClientes} />
        </div>
      </div>

      {/* Tabla de clientes frecuentes */}
      <div className="bg-white/90 border border-orange-100 rounded-2xl shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4 text-slate-700 flex items-center gap-2">
          <Users size={18} className="text-orange-500" /> Top Clientes
        </h2>
        <table className="min-w-full text-sm border border-orange-100 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-orange-400/80 to-fuchsia-400/80 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Visitas</th>
            </tr>
          </thead>
          <tbody>
            {clientesFrecuentes.map((c, i) => (
              <tr
                key={i}
                className="border-b border-orange-100 hover:bg-orange-50 transition"
              >
                <td className="px-4 py-2 text-slate-700">{c.nombre}</td>
                <td className="px-4 py-2 text-slate-600">{c.visitas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

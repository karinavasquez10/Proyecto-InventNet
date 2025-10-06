import React from "react";

// Gráfico de barras simple
function BarChart({ data }) {
  const maxVal = Math.max(...data.map((d) => d.visitas));
  return (
    <div className="space-y-2">
      {data.map((d, i) => (
        <div key={i}>
          <div className="flex justify-between text-xs sm:text-sm mb-1">
            <span>{d.nombre}</span>
            <span>{d.visitas}</span>
          </div>
          <div className="h-3 bg-slate-200 rounded">
            <div
              className="h-3 bg-blue-500 rounded"
              style={{ width: `${(d.visitas / maxVal) * 100}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Gráfico de pastel simple
function PieChart({ data }) {
  const total = data.reduce((acc, d) => acc + d.valor, 0);
  let acumulado = 0;
  const colors = ["#0ea5e9", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

  return (
    <svg viewBox="0 0 32 32" className="w-40 h-40 mx-auto">
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
    <div className="px-55">
      <h1 className="text-xl sm:text-2xl font-bold mb-6">Indicadores de Clientes</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 px-30">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-slate-500">Total Clientes</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-slate-500">Clientes Frecuentes</h3>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-sm text-slate-500">Visitas Promedio</h3>
          <p className="text-2xl font-bold">6</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Clientes más frecuentes</h2>
          <BarChart data={clientesFrecuentes} />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Distribución de clientes</h2>
          <PieChart data={categoriasClientes} />
          <ul className="mt-4 space-y-1 text-sm">
            {categoriasClientes.map((c, i) => (
              <li key={i} className="flex justify-between">
                <span>{c.categoria}</span>
                <span className="font-medium">{c.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tabla de clientes frecuentes */}
      <div className="bg-white rounded-lg shadow p-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Top Clientes</h2>
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-3 py-2 text-left">Nombre</th>
              <th className="px-3 py-2 text-left">Visitas</th>
            </tr>
          </thead>
          <tbody>
            {clientesFrecuentes.map((c, i) => (
              <tr key={i} className="border-b hover:bg-slate-50">
                <td className="px-3 py-2">{c.nombre}</td>
                <td className="px-3 py-2">{c.visitas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

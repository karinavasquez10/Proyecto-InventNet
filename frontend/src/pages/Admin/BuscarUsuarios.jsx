// BuscarUsuarios.jsx (versión ajustada - usar /api/perfil para fetch, sin sede, rol en acciones si se desea)
import React, { useState, useEffect } from "react";
import { UserSearch, RotateCw, Search } from "lucide-react";

export default function BuscarUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({ documento: '', nombre: '', telefono: '', correo: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  // Fetch inicial
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setLoading(true);
        setError(null);
        let url = "http://localhost:5000/api/perfil";
        const params = new URLSearchParams();
        if (filtros.documento) params.append('documento', filtros.documento);
        if (filtros.nombre) params.append('nombre', filtros.nombre);
        if (filtros.telefono) params.append('telefono', filtros.telefono);
        if (filtros.correo) params.append('correo', filtros.correo);
        if (params.toString()) url += `?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        console.error('Error al fetch usuarios:', err);
        setError(err.message);
        setUsuarios([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, [filtros]);

  const handleFiltroChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const handleBuscar = () => {
    // Trigger refetch on button click if needed, but useEffect handles
  };

  const handleActualizar = () => {
    window.location.reload();
  };

  const usuariosFiltrados = usuarios.filter(u =>
    (filtros.documento ? u.documento_identidad?.includes(filtros.documento) : true) &&
    (filtros.nombre ? u.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) : true) &&
    (filtros.telefono ? u.telefono?.includes(filtros.telefono) : true) &&
    (filtros.correo ? u.correo?.includes(filtros.correo) : true)
  );

  const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsuarios = usuariosFiltrados.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="p-6 w-full max-w-[calc(150%-16rem)]">
      {/* ======= ENCABEZADO ======= */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-500 p-2.5 rounded-lg text-white shadow">
            <UserSearch size={20} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            Gestión de Usuarios
          </h1>
        </div>
        <button onClick={handleActualizar} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-md text-sm shadow transition">
          <RotateCw size={16} />
          Actualizar
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-sm">
          {error}
        </div>
      )}

      {/* ======= CONTENEDOR TABLA ======= */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-x-auto">
        <table className="min-w-full text-sm">
          {/* CABECERA */}
          <thead className="bg-slate-100 text-slate-600 uppercase text-xs tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Foto</th>
              <th className="px-4 py-3 text-left">Documento</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Teléfono</th>
              <th className="px-4 py-3 text-left">Correo</th>
              <th className="px-4 py-3 text-center">Activo</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>

          {/* FILTROS */}
          <thead className="bg-white border-b">
            <tr>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  name="documento"
                  placeholder="Documento..."
                  value={filtros.documento}
                  onChange={handleFiltroChange}
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre..."
                  value={filtros.nombre}
                  onChange={handleFiltroChange}
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  name="telefono"
                  placeholder="Teléfono..."
                  value={filtros.telefono}
                  onChange={handleFiltroChange}
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2">
                <input
                  type="text"
                  name="correo"
                  placeholder="Correo..."
                  value={filtros.correo}
                  onChange={handleFiltroChange}
                  className="w-full border rounded-md px-2 py-1 text-xs focus:ring focus:ring-sky-100"
                />
              </th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2 text-center">
                <button onClick={handleBuscar} className="bg-sky-500 hover:bg-sky-600 text-white px-3 py-1.5 rounded-md text-xs flex items-center justify-center gap-1 mx-auto">
                  <Search size={14} />
                  Buscar
                </button>
              </th>
            </tr>
          </thead>

          {/* CUERPO */}
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-slate-500">Cargando usuarios...</td>
              </tr>
            ) : currentUsuarios.length > 0 ? (
              currentUsuarios.map((usuario) => (
                <tr
                  key={usuario.id_usuario}
                  className="hover:bg-slate-50 transition duration-150"
                >
                  <td className="px-4 py-3">
                    <img
                      src={usuario.foto_perfil ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${usuario.foto_perfil}` : 'https://via.placeholder.com/40'}
                      alt={usuario.nombre}
                      className="w-10 h-10 rounded-full border border-slate-200"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {usuario.documento_identidad || 'N/A'}
                  </td>
                  <td className="px-4 py-3 max-w-[150px] truncate">{usuario.nombre}</td>
                  <td className="px-4 py-3">{usuario.telefono || 'N/A'}</td>
                  <td className="px-4 py-3 max-w-[150px] truncate">{usuario.correo}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        usuario.estado === 1
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-600"
                      }`}
                    >
                      {usuario.estado === 1 ? "Sí" : "No"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded-md text-xs shadow">
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-slate-500">No se encontraron usuarios.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ======= PAGINACIÓN ======= */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2 text-xs text-slate-600">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-2.5 py-1 border rounded-md hover:bg-slate-100 disabled:opacity-50"
          >
            «
          </button>
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-2.5 py-1 border rounded-md hover:bg-slate-100 disabled:opacity-50"
          >
            ‹
          </button>
          <span className="px-2 font-semibold text-slate-800">{currentPage}</span>
          <span className="px-2 text-slate-500">de {totalPages}</span>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 border rounded-md hover:bg-slate-100 disabled:opacity-50"
          >
            ›
          </button>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-2.5 py-1 border rounded-md hover:bg-slate-100 disabled:opacity-50"
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}
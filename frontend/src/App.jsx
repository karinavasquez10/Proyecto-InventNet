import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import Cobrar from './pages/Cobrar';
import Catalogo from './pages/Catalogo';
import CerrarCaja from './pages/CerrarCaja';
import HomeAdmin from './pages/HomeAdmin';
import ConsultaFacturas from './pages/ConsultaFacturas';
import ConsultaProductos from './pages/ConsultaProductos';
import AbrirCaja from './pages/AbrirCaja';
import Clientes from './pages/Clientes';
import GestionClientes from './pages/GestionClientes';
import ConsultaInventarioProductos from './pages/ConsultaInventarioProductos';
import RegistroProductos from "./pages/RegistroProducto";
import GestionCategorias from "./pages/GestionCategorias";
import CrearUsuario from "./pages/CrearUsuario";
import BuscarUsuarios from "./pages/BuscarUsuarios";
import ConsultarVentas from "./pages/ConsultarVentas";
import CierresCaja from "./pages/CierresCaja";



function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Router>
        <Routes>
          {/* rutas normales */}
          <Route path="/" element={<Home />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/cobrar" element={<Cobrar />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/CerrarCaja" element={<CerrarCaja />} />
          <Route path="/ConsultaFacturas" element={<ConsultaFacturas />} />
          <Route path="/ConsultaProductos" element={<ConsultaProductos />} />
          <Route path="/AbrirCaja" element={<AbrirCaja />} />
          <Route path="/Clientes" element={<Clientes />} />
            
          {/* Rutas de admin */}
          <Route path="/HomeAdmin" element={<HomeAdmin />}>
            <Route path="GestionClientes" element={<GestionClientes />} />
            <Route path="ConsultaInventarioProductos" element={<ConsultaInventarioProductos />} />
            <Route path="RegistroProductos" element={<RegistroProductos />} />
            <Route path="GestionCategorias" element={<GestionCategorias />} />
            <Route path="CrearUsuario" element={<CrearUsuario />} />
            <Route path="BuscarUsuarios" element={<BuscarUsuarios />} />
            <Route path="ConsultarVentas" element={<ConsultarVentas />} />
            <Route path="CierresCaja" element={<CierresCaja />} />


          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

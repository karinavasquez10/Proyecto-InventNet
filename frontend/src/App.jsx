import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import Home from "./pages/Cajero/Home";
import Cobrar from './pages/Cajero/Cobrar';
import Catalogo from './pages/Cajero/Catalogo';
import CerrarCaja from './pages/Cajero/CerrarCaja';
import HomeAdmin from './pages/Admin/HomeAdmin';
import ConsultaFacturas from './pages/Cajero/ConsultaFacturas';
import ConsultaProductos from './pages/Cajero/ConsultaProductos';
import AbrirCaja from './pages/Cajero/AbrirCaja';
import Clientes from './pages/Cajero/Clientes';
import GestionClientes from './pages/Admin/GestionClientes';
import ConsultaInventarioProductos from './pages/Admin/ConsultaInventarioProductos';
import RegistroProductos from "./pages/Admin/RegistroProducto";
import GestionCategorias from "./pages/Admin/GestionCategorias";
import CrearUsuario from "./pages/Admin/CrearUsuario";
import BuscarUsuarios from "./pages/Admin/BuscarUsuarios";
import ConsultarVentas from "./pages/Admin/ConsultarVentas";
import CierresCaja from "./pages/Admin/CierresCaja";
import GestionProveedores from "./pages/Admin/GestionProveedores";
import Indicadores from "./pages/Admin/Indicadores";
import Entradas from "./pages/Admin/Entradas";
import SedePrincipal from "./pages/Admin/SedePrincipal";
import CargueMasivo from "./pages/Admin/CargueMasivo";
import ProductosRecogidos from "./pages/Admin/ProductosRecogidos";
import Cotizaciones from "./pages/Admin/Cotizaciones";
import HomePrincipal from "./pages/HomePrincipal";



function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Router>
        <Routes>
          {/* rutas cajero */}
          <Route path="/" element={<HomePrincipal />} />
          <Route path="/loginForm" element={<LoginForm />} />
          <Route path="/cobrar" element={<Cobrar />} />
          <Route path="/Catalogo" element={<Catalogo />} />
          <Route path="/CerrarCaja" element={<CerrarCaja />} />
          <Route path="/ConsultaFacturas" element={<ConsultaFacturas />} />
          <Route path="/ConsultaProductos" element={<ConsultaProductos />} />
          <Route path="/AbrirCaja" element={<AbrirCaja />} />
          <Route path="/Clientes" element={<Clientes />} />
          <Route path="/Home" element={<Home />} />
            
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
            <Route path="GestionProveedores" element={<GestionProveedores />} />
            <Route path="Indicadores" element={<Indicadores />} />
            <Route path="Entradas" element={<Entradas />} />
            <Route path="SedePrincipal" element={<SedePrincipal />} />
            <Route path="CargueMasivo" element={<CargueMasivo />} />
            <Route path="ProductosRecogidos" element={<ProductosRecogidos />} />
            <Route path="Cotizaciones" element={<Cotizaciones />} />

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

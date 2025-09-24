import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// src/App.jsx
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import Cobrar from './pages/Cobrar';
import Catalogo from './pages/Catalogo';
import CerrarCaja from './pages/CerrarCaja';
import HomeAdmin from './pages/HomeAdmin';
import ConsultaFacturas from './pages/ConsultaFacturas';
import ConsultaProductos from './pages/ConsultaProductos';
import AbrirCaja from './pages/AbrirCaja';


function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/cobrar" element={<Cobrar />} />
          <Route path="/Catalogo" element={<Catalogo/>}/>
          <Route path="/CerrarCaja" element={<CerrarCaja/>}/>
          <Route path="/HomeAdmin" element={<HomeAdmin/>}/>
          <Route path="/ConsultaFacturas" element={<ConsultaFacturas/>}/>
          <Route path="/ConsultaProductos" element={<ConsultaProductos/>}/>
           <Route path="/AbrirCaja" element={<AbrirCaja/>}/>
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;

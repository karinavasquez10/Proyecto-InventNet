import { useState } from "react";
import api from "../api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password }); // Toma los datos digitados en los input y los envía al backend

      setMensaje(`✅ Bienvenido: ${res.data.user.nombre}`);
    } catch (error) {
      setMensaje("❌ Credenciales inválidas o error en servidor");
      console.error(error);
    }
  };

  // Retorna el diseño general del formulario a presentar

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Iniciar Sesión
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">Correo</label>
          <input
            type="email"
            value={email} // Tomamos el valor ingresado en el input
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="ejemplo@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">Contraseña</label>
          <input
            type="password"
            value={password}  // Tomamos el valor ingresado en el input
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg py-2 transition duration-200"
        >
          Entrar
        </button>
      </form>
      {mensaje && (
        <p className="mt-4 text-center text-sm text-gray-700">{mensaje}</p>
      )}
    </div>
  );
}

export default LoginForm;

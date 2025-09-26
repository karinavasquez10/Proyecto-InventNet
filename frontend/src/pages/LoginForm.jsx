import { useState } from "react";
import api from "../api";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      if (remember) {
        try {
          localStorage.setItem("last_email", email);
        } catch {}
      }
      setMensaje(`✅ Bienvenido: ${res.data.user?.nombre ?? "Usuario"}`);
    } catch (error) {
      setMensaje("❌ Credenciales inválidas o error en servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar último correo recordado
  useState(() => {
    try {
      const last = localStorage.getItem("last_email");
      if (last) setEmail(last);
    } catch {}
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Panel izquierdo: Form */}
        <div className="p-7 sm:p-10">
          {/* Branding */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-orange-500 text-white font-bold grid place-items-center">
              MI
            </div>
            <div>
              <div className="font-semibold leading-tight">Mis Inventarios</div>
              <div className="text-xs text-slate-500 -mt-0.5">Controla tu negocio fácil</div>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate-500">
            Ingresa tus credenciales para continuar.
          </p>

          {/* Mensaje */}
          {mensaje && (
            <div
              className={`mt-5 text-sm rounded-lg px-3 py-2 border ${
                mensaje.startsWith("✅")
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              {mensaje}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                placeholder="tucorreo@dominio.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 pr-10 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 text-xs px-2 py-1 rounded-md hover:bg-slate-100"
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPwd ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-orange-600"
                />
                Recordarme
              </label>
              <a
                href="/recuperar"
                className="text-sm text-orange-600 hover:text-orange-700 hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-2.5 transition-colors shadow-sm"
            >
              {loading ? "Ingresando…" : "Entrar"}
            </button>
          </form>

          {/* Legal */}
          <p className="mt-6 text-[11px] text-slate-500">
            Al continuar, aceptas nuestros{" "}
            <a href="/terminos" className="underline hover:text-slate-700">
              Términos
            </a>{" "}
            y{" "}
            <a href="/privacidad" className="underline hover:text-slate-700">
              Política de Privacidad
            </a>
            .
          </p>
        </div>

        {/* Panel derecho: CTA registro (se oculta en móvil) */}
        <div className="hidden md:block relative bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-500">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.25),transparent_50%)]" />
          <div className="h-full w-full text-white p-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl font-extrabold drop-shadow-sm">
              ¿Aún no estás registrado?
            </h2>
            <p className="mt-3 max-w-sm text-white/90">
              Regístrate para administrar productos, ventas y tu negocio
              de forma sencilla.
            </p>
            <a
              href="/registro"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-white/90 text-rose-600 hover:bg-white px-5 py-2 font-semibold shadow"
            >
              Crear cuenta
            </a>

            <div className="mt-10 text-xs text-white/70">
              Soporte: lun–sáb 8:00am–6:00pm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

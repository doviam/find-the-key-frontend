import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../components/Button.jsx";
import { getSafeNextPath } from "../utils/navigation.js";

export function Login() {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const nextPath = getSafeNextPath(searchParams.get("next")) || "/dashboard";
  const authQuery = searchParams.toString() ? `?${searchParams.toString()}` : "";

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate(nextPath, { replace: true });
    } catch (err) {
      setError(err.message || "Error");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-ink-muted">Cargando sesión…</div>
    );
  }
  if (user) {
    return <Navigate to={nextPath} replace />;
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <p className="mt-2 text-sm text-ink-muted">
        ¿Nuevo aquí?{" "}
        <Link to={`/register${authQuery}`} className="text-accent hover:underline">
          Crear cuenta
        </Link>
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-ink-muted">Email</label>
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-ink-muted">Contraseña</label>
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <Button className="w-full" type="submit">
          Continuar
        </Button>
      </form>
    </div>
  );
}

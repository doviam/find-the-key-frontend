import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../components/Button.jsx";
import { getSafeNextPath } from "../utils/navigation.js";

export function Register() {
  const { register, user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState("artist");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stageName, setStageName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  const nextPath = getSafeNextPath(searchParams.get("next")) || "/dashboard";
  const authQuery = searchParams.toString() ? `?${searchParams.toString()}` : "";

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register({
        email,
        password,
        role,
        stage_name: role === "artist" ? stageName : undefined,
        company_name: role === "promoter" ? companyName : undefined,
      });
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
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <p className="mt-2 text-sm text-ink-muted">
        ¿Ya tienes cuenta?{" "}
        <Link to={`/login${authQuery}`} className="text-accent hover:underline">
          Entrar
        </Link>
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
        <div>
          <span className="block text-xs font-medium text-ink-muted">Tipo de cuenta</span>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setRole("artist")}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium ${
                role === "artist" ? "border-accent bg-accent/10 text-accent" : "border-white/10 text-ink-muted"
              }`}
            >
              Artista
            </button>
            <button
              type="button"
              onClick={() => setRole("promoter")}
              className={`flex-1 rounded-xl border py-3 text-sm font-medium ${
                role === "promoter" ? "border-accent bg-accent/10 text-accent" : "border-white/10 text-ink-muted"
              }`}
            >
              Promotor
            </button>
          </div>
        </div>
        {role === "artist" ? (
          <div>
            <label className="block text-xs font-medium text-ink-muted">Nombre artístico (opcional)</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              placeholder="Ej. Luna Norte"
            />
          </div>
        ) : (
          <div>
            <label className="block text-xs font-medium text-ink-muted">Nombre empresa (opcional)</label>
            <input
              className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
        )}
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
            minLength={6}
            autoComplete="new-password"
          />
        </div>
        <Button className="w-full" type="submit">
          Registrarme
        </Button>
      </form>
    </div>
  );
}

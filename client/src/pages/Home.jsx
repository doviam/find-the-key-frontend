import { Link } from "react-router-dom";
import { buttonClass } from "../components/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function Home() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-6xl px-4 pb-24 pt-16 md:pt-24">
      <div className="max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">Marketplace musical + comunidad</p>
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-[1.1]">
          Find The <span className="text-[#ff8000]">Key</span>
        </h1>
        <p className="mt-6 text-lg text-ink-muted md:text-xl">
          Conecta con promotores, gana visibilidad y construye tu carrera. Plataforma donde la música se mueve.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          {user ? (
            <Link to="/dashboard" className={buttonClass("primary")}>
              Ir a mi panel
            </Link>
          ) : (
            <Link to="/register" className={buttonClass("primary")}>
              Empieza gratis
            </Link>
          )}
          <Link to="/discover" className={buttonClass("ghost")}>
            Descubre artistas
          </Link>
          <Link to="/feed" className={buttonClass("subtle")}>
            Ver feed
          </Link>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-3">
        {[
          { t: "Para artistas", d: "Perfil, tracks y métricas visibles. Pensado para crecer y monetizar." },
          { t: "Para promotores", d: "Descubre talento y publica oportunidades cuando activemos el módulo." },
          { t: "Gamificación", d: "Puntos y nivel desde el registro; likes, subidas y ranking amplían el juego en fases siguientes." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border border-white/10 bg-surface-card/80 p-6">
            <h2 className="font-semibold text-white">{x.t}</h2>
            <p className="mt-2 text-sm text-ink-muted">{x.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

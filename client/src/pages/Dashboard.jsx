import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { buttonClass } from "../components/Button.jsx";

export function Dashboard() {
  const { user, profile, isArtist, isPromoter } = useAuth();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Panel</h1>
          <p className="mt-1 text-ink-muted">
            {user?.email} · {isArtist ? "Artista" : "Promotor"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isArtist && (
            <Link to="/upload" className={buttonClass("primary")}>
              Subir canción
            </Link>
          )}
          <Link to="/profile/edit" className={buttonClass("ghost")}>
            Editar perfil
          </Link>
          <Link to="/feed" className={buttonClass("subtle")}>
            Ver feed
          </Link>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-surface-card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold">Tu perfil</h2>
          {isArtist && (
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-ink-muted">Nombre artístico</dt>
                <dd className="font-medium">{profile?.stage_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Ciudad</dt>
                <dd className="font-medium">{profile?.city || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Género</dt>
                <dd className="font-medium">{profile?.genre || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Puntos / Nivel</dt>
                <dd className="font-medium">
                  {profile?.points ?? 0} pts · Nivel {profile?.level ?? 1}
                </dd>
              </div>
            </dl>
          )}
          {isPromoter && (
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-ink-muted">Empresa</dt>
                <dd className="font-medium">{profile?.company_name || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Tipo</dt>
                <dd className="font-medium">{profile?.entity_type || "—"}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Ciudad</dt>
                <dd className="font-medium">{profile?.city || "—"}</dd>
              </div>
            </dl>
          )}
          <Link to={`/u/${user?.id}`} className="mt-6 inline-block text-sm text-accent hover:underline">
            Ver perfil público →
          </Link>
        </div>
        <div className="rounded-2xl border border-dashed border-white/20 bg-ink/50 p-6">
          <h2 className="text-lg font-semibold">Próximo</h2>
          <p className="mt-2 text-sm text-ink-muted">
            Likes, ranking y oportunidades en fases siguientes.
          </p>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/client.js";

export function Discover() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api("/api/users/artists");
        if (!cancelled) setArtists(data.artists || []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Artistas</h1>
      <p className="mt-2 text-ink-muted">Perfiles registrados como artista.</p>
      {error && <p className="mt-6 text-red-400">{error}</p>}
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {artists.map((a) => (
          <li key={a.id}>
            <Link
              to={`/u/${a.id}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-surface-card p-4 transition hover:border-accent/40"
            >
              <div
                className="h-14 w-14 shrink-0 rounded-full bg-surface-hover bg-cover bg-center"
                style={a.photo_url ? { backgroundImage: `url(${a.photo_url})` } : undefined}
              />
              <div className="min-w-0">
                <p className="truncate font-semibold">{a.stage_name?.trim() || "Artista"}</p>
                <p className="truncate text-sm text-ink-muted">
                  {a.city || "Ciudad —"} · {a.genre || "Género —"}
                </p>
                <p className="text-xs text-accent/90">{a.points} pts</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {artists.length === 0 && !error && (
        <p className="mt-8 text-center text-ink-muted">Ningún artista todavía.</p>
      )}
    </div>
  );
}

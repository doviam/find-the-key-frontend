import { useEffect, useState } from "react";
import { api } from "../api/client.js";
import { TrackCard } from "../components/TrackCard.jsx";

export function Feed() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await api("/api/tracks/feed");
        if (!cancelled) setTracks(data.tracks || []);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">Feed</h1>
      <p className="mt-2 text-ink-muted">Últimas subidas de la comunidad.</p>
      {error && <p className="mt-6 text-red-400">{error}</p>}
      <div className="mt-8 flex flex-col gap-4">
        {tracks.length === 0 && !error && (
          <p className="rounded-2xl border border-white/10 bg-surface-card p-8 text-center text-ink-muted">
            Aún no hay canciones. Sé el primero en subir una desde tu panel.
          </p>
        )}
        {tracks.map((t) => (
          <TrackCard key={t.id} track={t} />
        ))}
      </div>
    </div>
  );
}

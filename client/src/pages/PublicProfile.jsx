import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client.js";
import { TrackCard } from "../components/TrackCard.jsx";

export function PublicProfile() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const d = await api(`/api/users/${id}/public`);
        if (!cancelled) setData(d);
      } catch (e) {
        if (!cancelled) setError(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-red-400">
        {error}
      </div>
    );
  }
  if (!data) {
    return <div className="px-4 py-16 text-center text-ink-muted">Cargando…</div>;
  }

  const { user, profile, tracks } = data;
  const isArtist = user.role === "artist";

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-2xl border border-white/10 bg-surface-card p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div
            className="mx-auto h-28 w-28 shrink-0 rounded-2xl bg-surface-hover bg-cover bg-center sm:mx-0"
            style={
              isArtist && profile?.photo_url ? { backgroundImage: `url(${profile.photo_url})` } : undefined
            }
          />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest text-accent">{isArtist ? "Artista" : "Promotor"}</p>
            <h1 className="mt-1 text-3xl font-bold">
              {isArtist ? profile?.stage_name || "Artista" : profile?.company_name || "Empresa"}
            </h1>
            {profile?.city && <p className="mt-2 text-ink-muted">{profile.city}</p>}
            {isArtist && (profile?.genre || profile?.points != null) && (
              <p className="mt-2 text-sm text-ink-muted">
                {profile?.genre}
                {profile?.genre && profile?.points != null ? " · " : ""}
                {profile?.points != null ? `${profile.points} pts · Nivel ${profile.level}` : ""}
              </p>
            )}
            {isArtist && profile?.bio && <p className="mt-4 text-sm leading-relaxed text-white/90">{profile.bio}</p>}
            {!isArtist && profile?.description && (
              <p className="mt-4 text-sm leading-relaxed text-white/90">{profile.description}</p>
            )}
            {isArtist && profile?.spotify_url && (
              <a
                href={profile.spotify_url}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm text-accent hover:underline"
              >
                Spotify →
              </a>
            )}
          </div>
        </div>
      </div>

      {isArtist && tracks?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Canciones</h2>
          <div className="mt-4 flex flex-col gap-4">
            {tracks.map((t) => (
              <TrackCard
                key={t.id}
                track={{
                  ...t,
                  stage_name: profile?.stage_name,
                  photo_url: profile?.photo_url,
                  city: profile?.city,
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

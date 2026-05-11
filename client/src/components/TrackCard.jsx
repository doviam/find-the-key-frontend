export function TrackCard({ track }) {
  const name = track.stage_name || "Artista";
  return (
    <article className="rounded-2xl border border-white/10 bg-surface-card p-4 transition hover:border-accent/30">
      <div className="flex gap-4">
        <div
          className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-surface-hover bg-cover bg-center"
          style={
            track.cover_url
              ? { backgroundImage: `url(${track.cover_url})` }
              : undefined
          }
        >
          {!track.cover_url && (
            <div className="flex h-full w-full items-center justify-center text-2xl text-ink-muted">♪</div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">{track.title}</h3>
          <p className="text-sm text-ink-muted">
            {name}
            {track.city ? ` · ${track.city}` : ""}
          </p>
          {track.genre && <p className="mt-1 text-xs uppercase tracking-wide text-accent/90">{track.genre}</p>}
          <audio controls className="mt-3" src={track.audio_url} preload="metadata" />
        </div>
      </div>
    </article>
  );
}

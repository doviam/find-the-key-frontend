import { Link, Navigate, useParams } from "react-router-dom";
import { getSessionBySlug } from "../data/keysSessions.js";

const KEYS_NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='kn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23kn)'/%3E%3C/svg%3E")`;

function toYouTubeEmbed(url = "") {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export function KeySession() {
  const { slug } = useParams();
  const session = slug ? getSessionBySlug(slug) : null;

  if (!session || !session.available) {
    return <Navigate to="/keys" replace />;
  }

  const keyLabel = `KEY #${String(session.keyNumber).padStart(2, "0")}`;
  const embedUrl = toYouTubeEmbed(session.youtubeUrl);

  return (
    <div className="relative min-h-[min(100dvh,100vh)] w-full pb-24 pt-10 md:pt-14">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#09090d_55%,#0c0c0f_100%)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: KEYS_NOISE }}
        aria-hidden
      />

      <div className="relative z-[1] mx-auto max-w-3xl px-4 pt-6 sm:px-6 md:px-8">
        <Link
          to="/keys"
          className="inline-flex items-center gap-2 font-mono text-[0.72rem] font-medium uppercase tracking-[0.26em] text-[#ff6a00] transition-colors duration-200 hover:text-[#ff8533]"
        >
          <span aria-hidden>←</span> Keys
        </Link>

        <p className="mt-10 font-mono text-xs font-semibold uppercase tracking-[0.35em] text-[#ff6a00]">{keyLabel}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">{session.artistName}</h1>
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.09] bg-black/55 shadow-[0_26px_64px_-32px_rgba(255,106,0,0.35)] ring-1 ring-[#ff6a00]/15">
          <div className="relative aspect-video w-full">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={`${session.artistName} - Key Session`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <>
                <img src={session.thumbnail} alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden />
                <span className="absolute bottom-4 left-5 font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/72">
                  Session preview
                </span>
              </>
            )}
          </div>
          <div className="border-t border-white/[0.07] px-5 py-5">
            <p className="text-sm text-white/45">
              {embedUrl ? "Reproduciendo session oficial de YouTube." : "Playback y metadatos de sesión próximamente."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

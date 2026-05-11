import { keysSessions } from "../data/keysSessions.js";
import { KeyCard } from "../components/keys/KeyCard.jsx";

const KEYS_NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='kn'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23kn)'/%3E%3C/svg%3E")`;

export function Keys() {
  return (
    <div className="relative min-h-[min(100dvh,calc(100vh-120px))] w-full pb-24 pt-12 md:pt-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#09090d_42%,#0c0c0f_100%)]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: KEYS_NOISE }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,106,0,0.06),transparent_52%)]" aria-hidden />

      <h1 className="relative z-[1] text-center text-4xl font-bold uppercase tracking-[0.14em] text-white md:text-5xl">Keys</h1>
      <p className="relative z-[1] mx-auto mt-4 max-w-3xl px-4 text-center text-sm text-white/75 sm:text-base">
        Sesiones musicales exclusivas. Accede con tu llave.
      </p>

      <div className="relative z-[1] mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6">
        <ul className="grid list-none gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {keysSessions.map((session, i) => (
            <li key={session.slug}>
              <KeyCard session={session} staggerMs={i * 70} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

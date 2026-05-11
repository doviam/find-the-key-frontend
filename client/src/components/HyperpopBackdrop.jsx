import { useLocation } from "react-router-dom";

/**
 * Capa de fondo fija: parpadeo CRT muy suave, scanlines y elementos hyperpop (globo wireframe).
 * En home el hero es el foco emotivo → globo y barras algo más contenidos.
 */
export function HyperpopBackdrop() {
  const home = useLocation().pathname === "/";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Base con viñeta suave */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_70%_at_50%_20%,rgba(57,255,20,0.06),transparent_55%),#030303]" />

      {/* Globo wireframe (referencia hyperpop / Y2K) */}
      <img
        src="/hyperpop-globe.png"
        alt=""
        className={`absolute -right-[8%] top-[12%] w-[min(42vw,340px)] max-w-none motion-safe:animate-globe-spin mix-blend-screen sm:top-[8%] md:w-[min(32vw,380px)] ${home ? "opacity-[0.085]" : "opacity-[0.18]"}`}
        decoding="async"
      />
      <img
        src="/hyperpop-globe.png"
        alt=""
        className={`absolute -left-[12%] bottom-[5%] w-[min(38vw,280px)] motion-safe:animate-globe-spin-reverse mix-blend-screen blur-[0.5px] ${home ? "opacity-[0.04]" : "opacity-[0.08]"}`}
        decoding="async"
      />

      {/* Primitivos wireframe (acentos urbanos, sin peso visual) */}
      <div className="absolute left-[6%] top-[28%] h-10 w-10 border border-studio-neon/25 motion-safe:animate-hyper-float motion-reduce:opacity-40" />
      <div className="absolute right-[18%] top-[42%] h-6 w-6 rotate-45 border border-studio-neon/20 motion-safe:animate-hyper-float-delayed motion-reduce:opacity-35" />
      <div className="absolute bottom-[22%] left-[22%] h-4 w-16 border-b border-studio-neon/15" />

      {/* Scanlines tipo CRT */}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0) 0px, rgba(255,255,255,0) 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)",
        }}
      />

      {/* Parpadeo / “nieve” de tele antigua: capa clara casi invisible */}
      <div className="absolute inset-0 bg-white motion-safe:animate-crt-flicker mix-blend-overlay" />

      {/* Ruido fino extra (SVG) */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ondas de sonido (barras animadas, muy bajas — refuerzo “música urbana”) */}
      <div
        className={`absolute bottom-0 left-0 right-0 flex h-16 items-end justify-center gap-1 motion-reduce:opacity-0 ${home ? "opacity-[0.07]" : "opacity-[0.12]"}`}
        aria-hidden
      >
        {[4, 7, 5, 9, 6, 8, 4, 7, 5, 10, 6, 8, 5, 7, 4].map((h, i) => (
          <span
            key={i}
            className="origin-bottom w-1 rounded-t-sm bg-studio-neon motion-safe:animate-sound-bar"
            style={
              {
                height: `${h * 4}px`,
                animationDelay: `${i * 0.08}s`,
              }
            }
          />
        ))}
      </div>
    </div>
  );
}

import { StudioPackCard } from "../components/studio/StudioPackCard.jsx";
import { useState } from "react";
import { AboutModal } from "../components/studio/AboutModal.jsx";

const STUDIO_EMAIL = "studio@findthekey.com";

/** Textura film grain + overlay (SVG inline, sin assets). */
function GrainLayer() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.11] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

/** Halos radiales verdes — animación muy suave (solo opacidad). */
function NeonGlowField() {
  return (
    <>
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[55%] w-[70%] rounded-full bg-studio-neon/15 blur-[100px] animate-studio-glow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 bottom-0 h-[45%] w-[60%] rounded-full bg-studio-neon/10 blur-[90px] animate-studio-glow [animation-delay:1.2s]"
        aria-hidden
      />
    </>
  );
}

/** Espectro / barras de frecuencia de fondo (altura fija, baja opacidad). */
function SpectrumBackdrop() {
  const bars = Array.from({ length: 48 }, (_, i) => ({
    h: 14 + ((i * 5) % 52),
    o: 0.05 + (i % 4) * 0.02,
  }));
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 flex h-36 items-end justify-center gap-0.5 opacity-50 sm:h-44"
      aria-hidden
    >
      {bars.map((b, i) => (
        <div
          key={i}
          className="w-px min-h-[6px] rounded-t-sm bg-studio-neon"
          style={{ height: `${b.h}px`, opacity: b.o }}
        />
      ))}
    </div>
  );
}

const PACKS = [
  {
    title: "Mic Checkers",
    price: "60€",
    buttonLabel: "Mic Checkers",
    mailSubject: "Reserva pack MIC CHECKERS (60€)",
    lines: [
      { text: "1 sesión de 3h", excluded: false },
      { text: "(20€/hora extra)", excluded: false },
      { text: "Una revisión", excluded: false },
      { text: "Pre-producción", excluded: true },
      { text: "Beat exclusivo", excluded: true },
      { text: "Grabación", excluded: true },
      { text: "Edición de audio", excluded: true },
      { text: "Mezcla", excluded: true },
      { text: "Masterización", excluded: true },
      { text: "Post-producción Sonido", excluded: true },
    ],
  },
  {
    title: "Hit Makers",
    price: "120€",
    buttonLabel: "Hit Makers",
    mailSubject: "Reserva pack HIT MAKERS (120€)",
    lines: [
      { text: "2 sesiones de 3h cada una", excluded: false },
      { text: "(20€/hora extra)", excluded: false },
      { text: "Dos revisiones", excluded: false },
      { text: "Pre-producción", excluded: false },
      { text: "Beat exclusivo", excluded: false },
      { text: "Grabación", excluded: false },
      { text: "Edición de audio", excluded: false },
      { text: "Mezcla", excluded: false },
      { text: "Masterización", excluded: false },
      { text: "Post-producción Sonido", excluded: false },
    ],
  },
  {
    title: "Beat Makers",
    price: "Beat catálogo 60€",
    buttonLabel: "Catálogo",
    mailSubject: "Consulta BEAT MAKERS — beat catálogo 60€",
    lines: [
      { text: "(Exclusivo consultar)", excluded: false },
      { text: "1 sesión de 3h", excluded: false },
      { text: "(20€/hora extra)", excluded: false },
      { text: "Una revisión", excluded: false },
      { text: "Pre-producción", excluded: false },
      { text: "Grabación", excluded: true },
      { text: "Edición de audio", excluded: true },
      { text: "Mezcla", excluded: true },
      { text: "Masterización", excluded: true },
      { text: "Post-producción Sonido", excluded: true },
    ],
  },
];

export function Studio() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AboutModal open={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Fondo página: gradiente profundo + rejilla + grain (identidad estudio) */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(57,255,20,0.08),transparent_50%),linear-gradient(180deg,#020202_0%,#050508_45%,#020202_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-studio-grid bg-studio-grid-size opacity-[0.35]"
        aria-hidden
      />
      <GrainLayer />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <header className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.35em] text-studio-neon/80">Find The Key</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl sm:tracking-tighter">
              Studio
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsAboutOpen(true)}
            className="inline-flex items-center justify-center rounded-xl border border-studio-neon/30 bg-studio-neon/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-studio-neon shadow-[0_0_0_1px_rgba(57,255,20,0.08),0_10px_24px_-16px_rgba(57,255,20,0.5)] transition hover:border-studio-neon/60 hover:bg-studio-neon/20 hover:text-studio-neon-bright"
          >
            Who is me
          </button>
        </header>

        {/* Bloque packs: contenedor con atmósfera propia */}
        <section
          className="relative mt-8 overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-studio-lift via-studio-void to-black px-4 py-10 shadow-[0_0_0_1px_rgba(57,255,20,0.06),0_40px_100px_-40px_rgba(0,0,0,0.9)] sm:px-8 sm:py-12"
          aria-label="Packs de estudio"
        >
          <NeonGlowField />
          <SpectrumBackdrop />
          <GrainLayer />

          {/* Líneas “técnicas” verticales en los bordes */}
          <div
            className="pointer-events-none absolute inset-y-8 left-3 w-px bg-gradient-to-b from-transparent via-studio-neon/15 to-transparent sm:left-6"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-8 right-3 w-px bg-gradient-to-b from-transparent via-studio-neon/15 to-transparent sm:right-6"
            aria-hidden
          />

          <div className="relative">
            <div className="mx-auto grid max-w-5xl gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {PACKS.map((pack) => (
                <StudioPackCard
                  key={pack.title}
                  title={pack.title}
                  price={pack.price}
                  lines={pack.lines}
                  buttonLabel={pack.buttonLabel}
                  mailHref={`mailto:${STUDIO_EMAIL}?subject=${encodeURIComponent(pack.mailSubject)}`}
                />
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

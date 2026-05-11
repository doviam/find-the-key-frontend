import { useMemo } from "react";
import { getLabToolUrls } from "../../config/labTools.js";

function LabParticles({ className = "" }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${8 + (i * 7) % 86}%`,
        top: `${12 + ((i * 13) % 70)}%`,
        delay: `${i * 0.35}s`,
        size: 2 + (i % 4),
        dur: `${10 + (i % 5)}s`,
      })),
    []
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute rounded-full bg-accent/30 blur-[1px] motion-safe:animate-lab-float-soft motion-reduce:opacity-30"
          style={{
            left: d.left,
            top: d.top,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.dur,
          }}
        />
      ))}
    </div>
  );
}

function SynthOscVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div className="absolute -right-[10%] top-1/2 h-[140%] w-[70%] -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[80px] motion-safe:animate-lab-halo motion-reduce:opacity-30" />
      <div className="absolute inset-x-8 bottom-[22%] top-[18%] opacity-[0.55]">
        <svg className="h-full w-full motion-safe:animate-lab-sine motion-reduce:animate-none" viewBox="0 0 400 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lab-sine-a" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(57,255,20,0)" />
              <stop offset="40%" stopColor="rgba(57,255,20,0.45)" />
              <stop offset="100%" stopColor="rgba(57,255,20,0)" />
            </linearGradient>
          </defs>
          <path
            d="M0,60 Q50,20 100,60 T200,60 T300,60 T400,60"
            fill="none"
            stroke="url(#lab-sine-a)"
            strokeWidth="1.5"
            className="motion-reduce:opacity-40"
          />
          <path
            d="M0,72 Q55,100 110,72 T220,72 T330,72 T440,72"
            fill="none"
            stroke="rgba(57,255,20,0.2)"
            strokeWidth="1"
            transform="translate(-20,0)"
          />
          <path
            d="M0,48 Q45,8 90,48 T180,48 T270,48 T360,48"
            fill="none"
            stroke="rgba(57,255,20,0.15)"
            strokeWidth="1"
            transform="translate(10,4)"
          />
        </svg>
      </div>
      <div className="absolute bottom-[14%] left-[8%] flex gap-3 md:gap-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1.5">
            <div
              className="h-9 w-9 rounded-full border border-white/10 bg-gradient-to-b from-white/[0.08] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_0_1px_rgba(57,255,20,0.12)] ring-1 ring-accent/20 md:h-11 md:w-11"
              style={{ transform: `rotate(${i * 14}deg)` }}
            >
              <div className="mx-auto mt-2 h-1 w-1 rounded-full bg-accent/80" />
            </div>
            <span className="h-px w-5 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DetectorVisual() {
  const bars = [0.4, 0.85, 0.55, 1, 0.7, 0.45, 0.9, 0.6, 0.75, 0.5, 0.95, 0.65];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div className="absolute -left-[20%] top-1/2 h-[120%] w-[60%] -translate-y-1/2 rounded-full bg-accent/[0.06] blur-[64px]" />
      <div className="absolute inset-x-6 top-[14%] h-[38%] opacity-70">
        <svg viewBox="0 0 320 80" className="h-full w-full" preserveAspectRatio="none">
          <path
            d="M0,40 L20,25 40,50 60,30 80,45 100,22 120,48 140,28 160,42 180,26 200,46 220,32 240,44 260,24 280,50 300,34 320,40"
            fill="none"
            stroke="rgba(57,255,20,0.35)"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          <path
            d="M0,52 L25,38 50,58 75,40 100,55 125,36 150,50 175,34 200,48 225,30 250,52 275,38 300,46 320,44"
            fill="none"
            stroke="rgba(57,255,20,0.12)"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="absolute bottom-[12%] left-0 right-0 flex items-end justify-center gap-[3px] px-8">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-[5px] origin-bottom rounded-sm bg-gradient-to-t from-accent/15 to-accent/70 motion-safe:animate-lab-bar motion-reduce:h-8"
            style={{
              height: `${h * 100}%`,
              maxHeight: "4.5rem",
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute right-[10%] top-[12%] rounded-lg border border-white/10 bg-black/40 px-2.5 py-1 font-mono text-[10px] text-accent/90 backdrop-blur-sm md:text-xs">
        <span className="text-white/40">BPM</span> <span className="tabular-nums">128.0</span>
      </div>
    </div>
  );
}

function FrequencyGameVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(57,255,20,0.14),transparent_45%)] motion-safe:animate-lab-arcade-pulse motion-reduce:opacity-80" />
      <div className="absolute left-[8%] top-[14%] font-mono text-2xl font-bold tabular-nums text-accent md:text-3xl">
        <span className="text-white/25">SC</span>
        <span className="text-accent/90">847</span>
      </div>
      <div className="absolute bottom-[14%] left-[8%] right-[8%] flex h-16 items-end justify-between gap-1 md:h-20">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm bg-gradient-to-t from-lime-400/10 via-accent/55 to-accent motion-safe:animate-lab-bar"
            style={{
              height: `${30 + ((i * 17) % 70)}%`,
              animationDelay: `${i * 0.06}s`,
              animationDuration: `${0.85 + (i % 5) * 0.08}s`,
            }}
          />
        ))}
      </div>
      <div className="absolute right-[10%] top-[40%] h-10 w-10 rounded-full border border-accent/40 shadow-[0_0_24px_rgba(57,255,20,0.25)] md:h-12 md:w-12" />
    </div>
  );
}

function ConnectVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden>
      <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(57,255,20,0.08),transparent_55%)] blur-[2px]" />
      <svg className="absolute inset-[8%] h-[84%] w-[84%] text-accent/40" viewBox="0 0 200 200">
        <g fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round">
          <path d="M40,100 Q100,40 160,100" strokeDasharray="4 6" className="motion-safe:animate-lab-node-line motion-reduce:opacity-50" />
          <path d="M50,140 Q100,80 150,60" strokeDasharray="3 5" opacity="0.5" />
          <path d="M30,70 L100,100 L170,130" strokeDasharray="2 5" opacity="0.35" />
        </g>
        {[
          [40, 100],
          [100, 45],
          [160, 100],
          [55, 145],
          [150, 58],
          [100, 155],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={i === 1 ? 5 : 3.5}
            className="fill-accent/20 stroke-accent/50"
            strokeWidth="0.5"
          />
        ))}
      </svg>
    </div>
  );
}

function glassCardBase(extra = "") {
  return [
    "relative overflow-hidden rounded-3xl border border-white/[0.08]",
    "bg-gradient-to-br from-white/[0.06] via-transparent to-black/40",
    "shadow-[0_0_0_1px_rgba(57,255,20,0.06),0_24px_80px_-32px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.05)]",
    "backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-500 ease-out",
    "motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:shadow-[0_0_0_1px_rgba(57,255,20,0.18),0_32px_90px_-28px_rgba(0,0,0,0.85),0_0_48px_-12px_rgba(57,255,20,0.12)]",
    "motion-reduce:transform-none",
    extra,
  ].join(" ");
}

function CtaPill({ children, accent }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] md:text-[11px]",
        accent
          ? "border-accent/35 bg-accent/10 text-accent shadow-[0_0_24px_-8px_rgba(57,255,20,0.5)]"
          : "border-white/15 bg-white/[0.04] text-white/90",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function LabToolsSection() {
  const urls = getLabToolUrls();

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% -10%, rgba(57,255,20,0.09), transparent 50%), radial-gradient(ellipse 50% 40% at 100% 60%, rgba(57,255,20,0.04), transparent 45%)",
        }}
      />

      <header className="mx-auto max-w-6xl px-4 pb-10 pt-10 text-center md:pb-14 md:pt-14">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.45em] text-accent/85 md:text-xs">Creative tools</p>
        <h1 className="bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-5xl font-bold uppercase leading-[0.95] tracking-tight text-transparent md:text-7xl lg:text-8xl">
          The Lab
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
          Interactive tools built for artists, producers and creators.
        </p>
      </header>

      <div className="mx-auto max-w-6xl space-y-5 px-4 pb-20 md:space-y-6 md:pb-28">
        {/* Hero — Synth */}
        <a
          href={urls.synth}
          className="group relative block min-h-[320px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:min-h-[380px] lg:min-h-[420px]"
        >
          <article className={`${glassCardBase("min-h-[inherit]")} h-full`}>
            <LabParticles />
            <SynthOscVisual />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(57,255,20,0.04)_55%,transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:opacity-0" />

            <div className="relative z-10 flex h-full min-h-[320px] flex-col justify-between p-6 md:min-h-[380px] md:p-10 lg:min-h-[420px]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent/90">Synth Master · v7</p>
                <h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  Synth Master
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted md:text-base">
                  Shape sound directly in your browser.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <CtaPill accent>Open synth</CtaPill>
                <span className="text-xs text-white/35">Web · low-latency engine</span>
              </div>
            </div>
          </article>
        </a>

        {/* Secondary grid */}
        <div className="grid gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {/* Detector */}
          <a
            href={urls.detector}
            className="group relative block min-h-[280px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:min-h-[300px]"
          >
            <article className={`${glassCardBase("h-full min-h-[inherit]")}`}>
              <DetectorVisual />
              <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-5 md:min-h-[300px] md:p-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent/80">Analysis</p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">Detector</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Detect key, pitch and tempo in real time.
                  </p>
                </div>
                <CtaPill accent>Open detector</CtaPill>
              </div>
            </article>
          </a>

          {/* Find the frequency — arcade */}
          <a
            href={urls.frequencyGame}
            className="group relative block min-h-[280px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:min-h-[300px]"
          >
            <article
              className={`${glassCardBase("h-full min-h-[inherit] border-lime-300/10 group-hover:border-accent/30")} ring-1 ring-accent/[0.07]`}
            >
              <FrequencyGameVisual />
              <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-5 md:min-h-[300px] md:p-6">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-lime-300/85">Game mode</p>
                  <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">Find the frequency</h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    Train your ear. Master frequencies.
                  </p>
                </div>
                <CtaPill accent>Play game</CtaPill>
              </div>
            </article>
          </a>

          {/* Connect — coming soon */}
          <article
            className={`${glassCardBase("min-h-[280px] cursor-default md:min-h-[300px]")} md:col-span-2 lg:col-span-1 motion-safe:hover:translate-y-0`}
          >
            <ConnectVisual />
            <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-between p-5 md:min-h-[300px] md:p-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">Network</p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-white md:text-2xl">Connect</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  Find collaborators. Build creative teams.
                </p>
              </div>
              <span
                className="inline-flex w-fit rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/45"
                aria-label="Próximamente"
              >
                COMING SOON
              </span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}

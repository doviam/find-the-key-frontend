/**
 * Tarifa pack — estética estudio urbano (neón + negro profundo).
 * Reutilizable para otras landings de producto musical.
 */
function ChevronDown() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-studio-neon/70"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StudioPackCard({ title, price, lines, buttonLabel, mailHref }) {
  return (
    <article
      className="group relative flex min-h-[540px] flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-studio-card text-center shadow-studio-drop transition duration-300 ease-out will-change-transform
        shadow-studio-ring hover:-translate-y-1 hover:scale-[1.015] hover:shadow-studio-ring-hover"
    >
      {/* Brillo esquina (detalle urbano ligero) */}
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-studio-neon/10 blur-3xl transition duration-500 group-hover:bg-studio-neon/18"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-studio-neon/5 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        aria-hidden
      />

      <header className="relative z-10 flex items-center justify-center gap-2 border-b border-white/[0.06] bg-black/40 py-4 px-3 backdrop-blur-[2px]">
        <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white sm:text-xs">{title}</h2>
        <ChevronDown />
      </header>

      {/* Precio: color sólido neón (evita fallos con bg-clip-text) + brillo legible */}
      <div className="relative z-10 px-3 pt-8 pb-2">
        <p
          className="text-[2.75rem] font-black leading-[0.95] tracking-tighter text-studio-neon drop-shadow-[0_0_24px_rgba(57,255,20,0.45)] sm:text-5xl"
          style={{ textShadow: "0 0 40px rgba(57, 255, 20, 0.25)" }}
        >
          {price}
        </p>
        <p className="mt-2 text-[0.65rem] font-medium uppercase tracking-[0.25em] text-white/30">precio pack</p>
      </div>

      <ul className="relative z-10 flex flex-1 flex-col gap-2.5 px-5 py-6 text-[0.8125rem] leading-snug">
        {lines.map((line, i) => (
          <li
            key={`${title}-${i}`}
            className={
              line.excluded
                ? "text-white/[0.28] line-through decoration-white/20 decoration-1"
                : "font-medium text-white/[0.92]"
            }
          >
            {line.text}
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto p-5 pt-0">
        <a
          href={mailHref}
          className="flex w-full items-center justify-center rounded-lg bg-studio-neon py-3.5 text-xs font-black uppercase tracking-[0.2em] text-black shadow-[0_0_20px_-6px_rgba(57,255,20,0.55)] transition duration-200 ease-out hover:scale-[1.02] hover:bg-studio-neon-bright hover:shadow-[0_0_28px_-4px_rgba(93,255,58,0.65)] active:scale-[0.99]"
        >
          {buttonLabel}
        </a>
      </div>
    </article>
  );
}

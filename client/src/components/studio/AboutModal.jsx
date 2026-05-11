import { useEffect, useState } from "react";

const ABOUT_TEXT = [
  "Find The Key es un Start Up innovadora y revolucionaria que lleva la producción de audio a otro nivel. Fundada en 2019 por David Osete Vázquez, un ingeniero en sistemas audiovisuales y multimedia más conocido como Doviam.",
  "Find The Key no es solo encuentra la llave, también significa da con la clave, detrás de cada persona hay un potencial oculto y que cada uno tiene que dar con la clave de su propio camino para desbloquearlo.",
];

export function AboutModal({ open, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!open) return;

    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[80] overflow-y-auto bg-black/80 p-4 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
      onClick={onClose}
      role="presentation"
    >
      <div className="flex min-h-full items-start justify-center py-4 sm:items-center">
        <section
          className={`relative max-h-[90vh] w-[90%] max-w-[800px] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[#0a0a0a] p-10 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.05)] transition duration-300 [scrollbar-gutter:stable] ${visible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
          style={{ WebkitOverflowScrolling: "touch" }}
          onClick={(event) => event.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Who is me"
        >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg text-white/70 transition hover:border-white/40 hover:text-white"
          aria-label="Cerrar quienes somos"
        >
          X
        </button>

        <img
          src="/gun.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute left-6 top-20 hidden w-36 opacity-70 md:block"
        />
        <img
          src="/gun.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-6 top-20 hidden w-36 -scale-x-100 opacity-70 md:block"
        />

        <img
          src="/cara.png"
          alt="Retrato artistico de Find The Key"
          className="mx-auto w-32 rotate-[5deg] rounded-md border border-white/20 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.85)] sm:w-36"
        />

        <h2 className="mt-6 text-3xl font-semibold text-white sm:text-4xl">Who is me</h2>

        <div className="mx-auto mt-5 max-w-[600px] space-y-3 text-sm leading-relaxed text-[#ccc] sm:text-base">
          {ABOUT_TEXT.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="mt-7 text-4xl font-black leading-none text-[#ff6a00] sm:text-5xl">111</p>
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Mas de 100 trabajos realizados</p>
        <div className="mx-auto mt-6 max-w-[620px] space-y-3 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>Estas producciones no están relacionadas con las llaves.</p>
          <p>Su finalidad es financiar la marca colaborando de manera creativa y exclusiva con artistas.</p>
          <p>La exclusividad total de la marca empezará en 2026,</p>
          <p>por lo que aprovecha ahora para dar con la clave de tu música con un excelente equipo creativo.</p>
        </div>
        </section>
      </div>
    </div>
  );
}

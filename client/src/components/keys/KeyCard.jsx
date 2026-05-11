import { Link } from "react-router-dom";

const ORANGE = "#ff6a00";

/** Misma talla visual que la miniatura “llave” (esquina superior izquierda) */
const KEY_THUMB_SIZE = "h-11 w-11 sm:h-[48px] sm:w-[48px]";

/** Candado minimalista desde /public */
function LockIconOverlay({ className = "" }) {
  return (
    <img
      src="/candado minimalista.png"
      alt=""
      className={`shrink-0 object-contain ${className}`}
      draggable={false}
      aria-hidden
    />
  );
}

/**
 * Mini key arriba izquierda; sin candado en bloqueadas (va en capa centrada).
 */
function KeyThumbBadge({ thumbnail, locked }) {
  return (
    <div className="pointer-events-none absolute left-[10px] top-[10px] z-[30]" aria-hidden>
      <img
        src={thumbnail}
        alt=""
        width={96}
        height={96}
        className={`${KEY_THUMB_SIZE} object-cover ${locked ? "opacity-[0.38] saturate-[0.42]" : ""}`}
        draggable={false}
      />
    </div>
  );
}

/** Capa “no disponible” — contenido inaccesible con candado centrado */
function LockedSessionOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-[18] bg-black/90" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[22] px-2" aria-hidden>
        <div className="absolute left-1/2 top-1/2 w-max max-w-full -translate-x-1/2 -translate-y-1/2">
          <LockIconOverlay className={`${KEY_THUMB_SIZE} opacity-100 [filter:brightness(0)_invert(1)]`} />
        </div>
      </div>
    </>
  );
}

export function KeyCard({ session, staggerMs = 0 }) {
  const { slug, artistName, keyNumber, thumbnail, background, available } = session;
  const keyLabel = `KEY #${String(keyNumber).padStart(2, "0")}`;
  const locked = !available;
  const animStyle = { animationDelay: `${staggerMs}ms` };
  const cardBgStyle =
    available && background
      ? {
          backgroundImage: `url("${background}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : undefined;

  const inner = (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[inherit] bg-[#0e0e10]" style={cardBgStyle}>

      <div
        className={`pointer-events-none absolute inset-0 z-[1] ${available ? "bg-black/[0.4]" : "bg-black/[0.84]"}`}
        aria-hidden
      />

      {locked && <LockedSessionOverlay />}

      {!locked && <KeyThumbBadge thumbnail={thumbnail} locked={locked} />}

      <div className="absolute inset-x-0 bottom-0 z-[40] bg-gradient-to-t from-black via-black/92 to-transparent px-3 pb-4 pt-16 sm:px-4 sm:pb-5 sm:pt-20">
        <p
          className={`line-clamp-2 text-center text-[0.95rem] font-semibold leading-snug tracking-tight sm:text-base ${
            locked ? "text-white/55" : "text-white"
          }`}
        >
          {artistName}
        </p>
        <p
          className={`mt-2 text-center font-mono text-sm font-semibold uppercase tracking-[0.2em] sm:text-[0.95rem] sm:tracking-[0.24em] ${
            locked ? "opacity-60" : ""
          }`}
          style={{ color: ORANGE }}
        >
          {keyLabel}
        </p>
      </div>
    </div>
  );

  const shellAvail = `group/key relative overflow-hidden rounded-2xl bg-[#0b0b0e] shadow-[0_20px_48px_-28px_rgba(0,0,0,0.9)] transition-[box-shadow] duration-300 ease-out motion-reduce:transition-none animate-keys-card-enter motion-reduce:animate-none motion-reduce:opacity-100`;

  const shellLocked = `${shellAvail} shadow-[0_18px_40px_-24px_rgba(0,0,0,0.95)] opacity-100`;

  const hoverAvail = `${shellAvail} hover:shadow-[0_20px_48px_-28px_rgba(0,0,0,0.88),0_0_26px_-8px_rgba(255,106,0,0.28)]`;

  if (available) {
    return (
      <article className={hoverAvail} style={animStyle}>
        <Link
          to={`/keys/${slug}`}
          className="block cursor-pointer outline-none ring-[rgba(255,106,0,0.35)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={`Abrir sesión ${keyLabel} · ${artistName}`}
        >
          {inner}
        </Link>
      </article>
    );
  }

  return (
    <article className={`${shellLocked} cursor-not-allowed`} style={animStyle} aria-disabled>
      <div className="pointer-events-none">{inner}</div>
    </article>
  );
}

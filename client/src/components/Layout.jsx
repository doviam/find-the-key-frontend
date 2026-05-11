import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { buttonClass } from "./Button.jsx";
import { FooterSocialIcons } from "./FooterSocialIcons.jsx";
import { HyperpopBackdrop } from "./HyperpopBackdrop.jsx";

/** PNG transparente en /public — subir `?v=` al cambiar el archivo */
const LOGO_SRC = "/find-the-key-logo-transparent.png?v=1";

const navCls = ({ isActive }) =>
  `text-sm font-medium ${isActive ? "text-accent" : "text-ink-muted hover:text-white"}`;

export function Layout({ children }) {
  const { user, logout, loading } = useAuth();

  return (
    <div className="relative min-h-screen">
      <HyperpopBackdrop />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header
          className="sticky top-0 z-50 border-b border-white/10 bg-black/40 shadow-[0_4px_32px_-12px_rgba(0,0,0,0.55),0_0_24px_-8px_rgba(57,255,20,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link
              to="/"
              className="group block shrink-0 [perspective:1000px] outline-none ring-accent/40 focus-visible:ring-2 ring-offset-2 ring-offset-black/20"
            >
              {/*
                Giro continuo en Y: una sola cara plana “desaparece” al ponerse de canto.
                Dos caras con la misma imagen (0° y 180°) evita el hueco en 90°/270°.
              */}
              <div
                className="relative inline-block transform-gpu [transform-style:preserve-3d] motion-safe:animate-logo-spin-y motion-reduce:animate-none [@media(hover:hover)]:group-hover:[animation-play-state:paused]"
              >
                <img
                  src={LOGO_SRC}
                  alt="Find The Key — inicio"
                  width={180}
                  height={48}
                  className="relative block h-8 w-auto object-contain sm:h-10 [backface-visibility:hidden]"
                  decoding="async"
                  fetchPriority="high"
                />
                <img
                  src={LOGO_SRC}
                  alt=""
                  width={180}
                  height={48}
                  className="pointer-events-none absolute left-0 top-0 h-8 w-auto object-contain sm:h-10 [backface-visibility:hidden] [transform:rotateY(180deg)]"
                  decoding="async"
                  aria-hidden
                />
              </div>
            </Link>
            <nav className="hidden items-center gap-6 md:flex">
              <NavLink to="/feed" className={navCls}>
                Feed
              </NavLink>
              <NavLink to="/discover" className={navCls}>
                Artistas
              </NavLink>
              <NavLink to="/studio" className={navCls}>
                Studio
              </NavLink>
              <NavLink to="/shows" className={navCls}>
                Shows
              </NavLink>
              <NavLink to="/keys" className={navCls}>
                Keys
              </NavLink>
              <NavLink to="/herramientas" className={navCls}>
                Tools
              </NavLink>
              {user && (
                <NavLink to="/dashboard" className={navCls}>
                  Panel
                </NavLink>
              )}
            </nav>
            <div className="flex items-center gap-2">
              {!loading && !user && (
                <>
                  <Link to="/login" className={`${buttonClass("ghost")} !py-2 !px-3`}>
                    Entrar
                  </Link>
                  <Link to="/register" className={`${buttonClass("primary")} !py-2`}>
                    Empieza gratis
                  </Link>
                </>
              )}
              {user && (
                <>
                  <span className="hidden text-xs text-ink-muted sm:inline">{user.email}</span>
                  <button
                    type="button"
                    className={`${buttonClass("ghost")} !py-2 !px-3`}
                    onClick={logout}
                  >
                    Salir
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        <div className="flex min-h-0 flex-1 flex-col bg-ink/88 backdrop-blur-[2px]">
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/10 py-8 text-center text-xs text-ink-muted">
            <div className="flex flex-col items-center gap-3">
              <FooterSocialIcons />
              <p className="m-0">Find The Key — plataforma en construcción</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

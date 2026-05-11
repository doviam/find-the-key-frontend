/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        ink: { DEFAULT: "#0c0c0f", muted: "#6b6b76" },
        surface: { DEFAULT: "#14141a", card: "#1a1a22", hover: "#22222c" },
        accent: { DEFAULT: "#39ff14", dim: "#2bd60f" },
        /** Keys / sesiones premium (naranja editorial) */
        keys: { orange: "#ff6a00", glow: "rgba(255,106,0,0.45)" },
        lime: "#bef264",
        studio: {
          void: "#020202",
          lift: "#0a0a0a",
          card: "#060606",
          line: "#141414",
          neon: "#39ff14",
          "neon-bright": "#5dff3a",
          "neon-dim": "#2bd60f",
          muted: "rgba(255,255,255,0.52)",
        },
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(12,12,15,0) 0%, #0c0c0f 90%), radial-gradient(circle at 50% 0%, rgba(57,255,20,0.1) 0%, transparent 55%)",
        /** Rejilla técnica muy sutil (estudio / DAW vibe) */
        "studio-grid":
          "linear-gradient(rgba(57,255,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "studio-grid": "48px 48px",
      },
      boxShadow: {
        "studio-ring": "0 0 0 1px rgba(57,255,20,0.14), inset 0 1px 0 rgba(255,255,255,0.04)",
        "studio-ring-hover":
          "0 0 0 1px rgba(57,255,20,0.4), 0 0 36px -8px rgba(57,255,20,0.28), inset 0 1px 0 rgba(255,255,255,0.06)",
        "studio-drop": "0 24px 48px -28px rgba(0,0,0,0.95)",
      },
      keyframes: {
        /** Pulso muy suave en halos (no distrae al leer) */
        "studio-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.55" },
        },
        /** Parpadeo TV: variaciones mínimas de opacidad (no cansa la vista) */
        "crt-flicker": {
          "0%, 100%": { opacity: "0.012" },
          "8%": { opacity: "0.028" },
          "9%": { opacity: "0.011" },
          "21%": { opacity: "0.022" },
          "22%": { opacity: "0.013" },
          "41%": { opacity: "0.026" },
          "42%": { opacity: "0.012" },
          "63%": { opacity: "0.019" },
          "64%": { opacity: "0.011" },
        },
        "globe-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "globe-spin-rev": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
        "hyper-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.35" },
          "50%": { transform: "translateY(-6px) rotate(180deg)", opacity: "0.55" },
        },
        "logo-spin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "sound-bar": {
          "0%, 100%": { transform: "scaleY(0.45)", opacity: "0.5" },
          "50%": { transform: "scaleY(1)", opacity: "0.9" },
        },
        /** Giro 3D continuo sobre el eje Y (requisito: perspectiva en el contenedor padre) */
        "logo-spin-y": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
        /** Hero: movimiento casi imperceptible en still urbano */
        "hero-ken": {
          "0%": { transform: "scale(1.08) translate(1.2%, -0.4%)" },
          "100%": { transform: "scale(1.14) translate(-1.6%, 0.9%)" },
        },
        "hero-brand-halo": {
          "0%, 100%": { opacity: "0.42", transform: "scale(1)" },
          "50%": { opacity: "0.62", transform: "scale(1.05)" },
        },
        "hero-brand-breathe": {
          "0%, 100%": { opacity: "0.12", transform: "scale(1)" },
          "50%": { opacity: "0.2", transform: "scale(1.05)" },
        },
        "hero-logo-drift": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "keys-card-enter": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /** The Lab — micro-movimiento premium (sin distracción) */
        "lab-halo": {
          "0%, 100%": { opacity: "0.22", transform: "scale(1)" },
          "50%": { opacity: "0.42", transform: "scale(1.06)" },
        },
        "lab-bar": {
          "0%, 100%": { transform: "scaleY(0.35)", opacity: "0.45" },
          "50%": { transform: "scaleY(1)", opacity: "0.95" },
        },
        "lab-sine": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-20%)" },
        },
        "lab-node-line": {
          "0%, 100%": { strokeDashoffset: "12" },
          "50%": { strokeDashoffset: "0" },
        },
        "lab-arcade-pulse": {
          "0%, 100%": { opacity: "0.55", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.15)" },
        },
        "lab-float-soft": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-6px) translateX(3px)" },
        },
      },
      animation: {
        "studio-glow": "studio-glow 5s ease-in-out infinite",
        "crt-flicker": "crt-flicker 5.5s steps(1, end) infinite",
        "globe-spin": "globe-spin 72s linear infinite",
        "globe-spin-reverse": "globe-spin-rev 96s linear infinite",
        "hyper-float": "hyper-float 14s ease-in-out infinite",
        "hyper-float-delayed": "hyper-float 18s ease-in-out infinite 2s",
        "logo-spin": "logo-spin 26s linear infinite",
        "sound-bar": "sound-bar 1.2s ease-in-out infinite",
        "logo-spin-y": "logo-spin-y 18s linear infinite",
        "hero-ken": "hero-ken 42s ease-in-out infinite alternate",
        "hero-brand-halo": "hero-brand-halo 7.5s ease-in-out infinite",
        "hero-brand-breathe": "hero-brand-breathe 10s ease-in-out infinite",
        "hero-logo-drift": "hero-logo-drift 13s ease-in-out infinite",
        "keys-card-enter": "keys-card-enter 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "lab-halo": "lab-halo 8s ease-in-out infinite",
        "lab-bar": "lab-bar 1.1s ease-in-out infinite",
        "lab-sine": "lab-sine 14s linear infinite",
        "lab-node-line": "lab-node-line 4s ease-in-out infinite",
        "lab-arcade-pulse": "lab-arcade-pulse 3.5s ease-in-out infinite",
        "lab-float-soft": "lab-float-soft 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

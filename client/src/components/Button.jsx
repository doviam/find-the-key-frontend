const base =
  "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:opacity-50";

const variants = {
  primary: "bg-accent text-ink hover:bg-accent-dim",
  ghost: "border border-white/15 bg-transparent text-white hover:bg-surface-hover",
  subtle: "bg-surface-card text-white hover:bg-surface-hover border border-white/10",
};

export function buttonClass(variant = "primary") {
  return `${base} ${variants[variant] || variants.primary}`;
}

export function Button({ children, variant = "primary", className = "", ...props }) {
  return (
    <button type="button" className={`${buttonClass(variant)} ${className}`} {...props}>
      {children}
    </button>
  );
}

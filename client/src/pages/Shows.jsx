export function Shows() {
  const shows = [
    { id: "05", title: "Show #05", image: null, date: "Próximamente", status: "upcoming" },
    { id: "04", title: "Show #04", image: "/show04.png", date: "07/11/2025" },
    {
      id: "03",
      title: "Show #03",
      image: "/show03.png",
      date: "14/02/2025",
      subtitle: "FIND THE HIT I",
      winner: "GANADOR: MECOS",
    },
    { id: "02", title: "Show #02", image: "/SHOW02.png", date: "10/05/2024" },
    { id: "01", title: "Show #01", image: "/SHOW01.png", date: "15/04/2024" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-3xl font-bold">Shows</h1>
      <p className="mt-1 text-ink-muted">Conciertos y directos.</p>

      <div className="mt-4">
        {shows.map((show) => (
          <article
            key={show.id}
            className="mb-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.03)] px-5 py-4 transition duration-200 last:mb-0 hover:bg-[rgba(255,255,255,0.06)] hover:shadow-[0_10px_24px_-16px_rgba(255,255,255,0.45)]"
          >
            {show.image ? (
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={show.image}
                  alt={show.title}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            ) : null}
            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <div className="min-w-0 text-left leading-[1.4]">
                <h2 className="text-base font-medium text-white">{show.title}</h2>
                {show.subtitle ? <p className="text-xs text-white/55">{show.subtitle}</p> : null}
                {show.winner ? <p className="text-xs text-white/55">{show.winner}</p> : null}
              </div>
              <div className="min-w-0 text-right leading-[1.4]">
                <p className="text-xs text-white/65">{show.date}</p>
              </div>
            </div>
            <div className="ml-auto shrink-0">
              {show.status === "upcoming" ? (
                <span
                  className="inline-flex min-w-[132px] items-center justify-center rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider text-white"
                  style={{
                    backgroundColor: "#3b82f6",
                    border: "1px solid #93c5fd",
                    boxShadow: "0 0 24px rgba(59,130,246,0.55)",
                  }}
                >
                  PRÓXIMAMENTE
                </span>
              ) : (
                <span
                  className="inline-flex min-w-[132px] items-center justify-center rounded-full px-5 py-2 text-xs font-black uppercase tracking-wider text-white"
                  style={{
                    backgroundColor: "#ff0000",
                    border: "1px solid #ff9b9b",
                    boxShadow: "0 0 24px rgba(255,0,0,0.7)",
                  }}
                >
                  SOLD OUT
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

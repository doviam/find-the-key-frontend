/** Keys: `/public/1.png` … `9.png`. Solo 1 y 2 disponibles. */

export const keysSessions = [
  {
    slug: "depauly-tini-studio",
    artistName: "Key #01 // Rolan (Especial Navidad)",
    keyNumber: 1,
    thumbnail: "/1.png",
    background: "/gif 1.webp",
    youtubeUrl: "https://youtu.be/6dcAkTsr73Y?si=rQpRUJrqyAxUB4Xw",
    available: true,
  },
  {
    slug: "afterhours-live",
    artistName: "Key #02 // 2LOWS (Not San Valentin)",
    keyNumber: 2,
    thumbnail: "/2.png",
    background: "/gif 2.gif",
    youtubeUrl: "https://youtu.be/WQEzXk8AuI8?si=216QPoR8hz7f-Pib",
    available: true,
  },
  { slug: "key-session-03", artistName: "Por anunciar", keyNumber: 3, thumbnail: "/3.png", available: false, lockedLabel: "LOCKED" },
  { slug: "key-session-04", artistName: "Por anunciar", keyNumber: 4, thumbnail: "/4.png", available: false, lockedLabel: "LOCKED" },
  { slug: "key-session-05", artistName: "Por anunciar", keyNumber: 5, thumbnail: "/5.png", available: false, lockedLabel: "LOCKED" },
  { slug: "key-session-06", artistName: "Por anunciar", keyNumber: 6, thumbnail: "/6.png", available: false, lockedLabel: "LOCKED" },
  { slug: "key-session-07", artistName: "Por anunciar", keyNumber: 7, thumbnail: "/7.png", available: false, lockedLabel: "LOCKED" },
  { slug: "key-session-08", artistName: "Por anunciar", keyNumber: 8, thumbnail: "/8.png", available: false, lockedLabel: "LOCKED" },
  { slug: "key-session-09", artistName: "Por anunciar", keyNumber: 9, thumbnail: "/9.png", available: false, lockedLabel: "LOCKED" },
];

export function getSessionBySlug(slug) {
  return keysSessions.find((s) => s.slug === slug);
}

/**
 * Evita open-redirect: solo rutas internas que empiezan por un solo "/".
 * @param {string | null | undefined} raw
 * @returns {string | null}
 */
export function getSafeNextPath(raw) {
  if (typeof raw !== "string" || !raw.length) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(raw.trim());
  } catch {
    return null;
  }
  if (!decoded.startsWith("/") || decoded.startsWith("//") || decoded.includes("://")) {
    return null;
  }
  return decoded;
}

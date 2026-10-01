/**
 * Site URL & Domain Configuration
 * Provides a single source of truth for canonical production domain and URL resolution.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://drrattanentclinic.com"
).replace(/\/+$/, "");

/**
 * Returns an absolute URL string for a given path based on the canonical SITE_URL.
 */
export function absoluteUrl(path: string = ""): string {
  if (!path || path === "/") {
    return SITE_URL;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

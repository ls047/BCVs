import { appConfig } from '../config/app.config';

/** Path segment for a member CV page (e.g. `/cv/jane-doe`). */
export function getMemberCvPath(slug: string): string {
  return `/cv/${encodeURIComponent(slug)}`;
}

/**
 * Absolute URL for a member CV page, suitable for QR codes and sharing.
 * Uses `app.cvSiteUrl`, then `app.url`, when http(s); otherwise the current origin.
 */
export function getMemberCvAbsoluteUrl(slug: string): string {
  const path = getMemberCvPath(slug);
  const base = (appConfig.app.cvSiteUrl ?? appConfig.app.url ?? '').trim().replace(/\/$/, '');
  if (/^https?:\/\//i.test(base)) {
    return `${base}${path}`;
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  return path;
}

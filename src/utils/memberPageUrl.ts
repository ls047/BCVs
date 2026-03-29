import { appConfig } from '../config/app.config';

/** Path segment for a member CV page (e.g. `/cv/jane-doe`). */
export function getMemberCvPath(slug: string): string {
  return `/cv/${encodeURIComponent(slug)}`;
}

/**
 * Absolute URL for a member CV page, suitable for QR codes and sharing.
 * Uses `app.url` from config when it is an http(s) URL; otherwise the current origin.
 */
export function getMemberCvAbsoluteUrl(slug: string): string {
  const path = getMemberCvPath(slug);
  const fromConfig = (appConfig.app.url ?? '').trim().replace(/\/$/, '');
  if (/^https?:\/\//i.test(fromConfig)) {
    return `${fromConfig}${path}`;
  }
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${path}`;
  }
  return path;
}

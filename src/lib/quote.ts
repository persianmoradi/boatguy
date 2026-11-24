// Checks a quote request before anything is sent. Used by the API (the trust boundary) and mirrored in the browser.
export const SERVICE_KEYS = ['polish', 'fullBottom', 'antifouling', 'interior', 'exterior', 'teak'] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];
export type Condition = 'good' | 'average' | 'poor';
/** boat length bounds in metres */
export const LENGTH = { min: 2, max: 40 };

export const FILE_LIMITS = { count: 5, eachBytes: 5 * 1024 * 1024, types: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] };

export type QuoteError = 'required' | 'email' | 'length' | 'services' | 'files' | 'fileType' | 'fileSize';
export type QuoteData = {
  lang: 'da' | 'en';
  name: string;
  email: string;
  phone: string;
  location: string;
  model: string;
  message: string;
  length: number;
  condition: Condition;
  services: ServiceKey[];
};
type FileLike = { name: string; type: string; size: number };

const one = <T extends string>(v: unknown, allowed: readonly T[], fallback: T): T => (allowed.includes(v as T) ? (v as T) : fallback);
const text = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function validateQuote(fields: Record<string, unknown>, files: FileLike[]) {
  const errors: Record<string, QuoteError> = {};
  const name = text(fields.name, 120);
  const email = text(fields.email, 200);
  const location = text(fields.location, 200);
  const length = Number(String(fields.length ?? '').replace(',', '.'));
  const services = (Array.isArray(fields.services) ? fields.services : [fields.services]).filter((s): s is ServiceKey => SERVICE_KEYS.includes(s as ServiceKey));

  if (!name) errors.name = 'required';
  if (!email) errors.email = 'required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'email';
  if (!location) errors.location = 'required';
  if (!Number.isFinite(length) || length < LENGTH.min || length > LENGTH.max) errors.length = 'length';
  if (!services.length) errors.services = 'services';
  if (files.length > FILE_LIMITS.count) errors.photos = 'files';
  // some browsers send HEIC photos with no type at all: judge those by their extension
  else if (files.some((f) => !FILE_LIMITS.types.includes(f.type) && !(f.type === '' && /\.(heic|heif)$/i.test(f.name)))) errors.photos = 'fileType';
  else if (files.some((f) => f.size > FILE_LIMITS.eachBytes)) errors.photos = 'fileSize';

  const data: QuoteData = {
    lang: one(fields.lang, ['da', 'en'], 'da'),
    name,
    email,
    phone: text(fields.phone, 40),
    location,
    model: text(fields.model, 120),
    message: text(fields.message, 3000),
    length,
    condition: one(fields.condition, ['good', 'average', 'poor'], 'average'),
    services: [...new Set(services)],
  };
  return { ok: Object.keys(errors).length === 0, errors, data };
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** The email TheBoatGuy receives (always in Danish), as plain text and HTML. */
export function staffEmail(d: QuoteData, photoCount: number) {
  const rows: [string, string][] = [
    ['Navn', d.name],
    ['E-mail', d.email],
    ['Telefon', d.phone || '–'],
    ['Båd', `${d.length} m${d.model ? `, ${d.model}` : ''}`],
    ['Stand', d.condition],
    ['Havn / sted', d.location],
    ['Ydelser', d.services.join(', ')],
    ['Billeder', String(photoCount)],
    ['Besked', d.message || '–'],
    ['Sprog', d.lang],
  ];
  return {
    subject: `Tilbudsforespørgsel: ${d.name}, ${d.length} m`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
    html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows.map(([k, v]) => `<tr><td style="color:#555;vertical-align:top"><b>${esc(k)}</b></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`).join('')}</table>`,
  };
}

/** The confirmation the customer receives, in their language. */
export function customerEmail(d: QuoteData) {
  const da = d.lang === 'da';
  const subject = da ? 'Vi har modtaget din forespørgsel' : 'We have received your request';
  const body = da
    ? `Hej ${d.name}\n\nTak for din forespørgsel om bådpleje. Vi vender tilbage med et forslag til arbejdet.\n\nVenlig hilsen\nTheBoatGuy.dk\n+45 91 46 79 78 · info@theboatguy.dk`
    : `Hi ${d.name}\n\nThank you for your boat care request. We will come back to you with a proposal for the work.\n\nKind regards\nTheBoatGuy.dk\n+45 91 46 79 78 · info@theboatguy.dk`;
  return { subject, text: body, html: `<div style="font-family:sans-serif;font-size:15px;line-height:1.5">${esc(body).replace(/\n/g, '<br>')}</div>` };
}

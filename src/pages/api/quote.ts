// POST /api/quote: validates a quote request with photos, then emails it to TheBoatGuy (and a confirmation to the customer) via Resend.
// Needs RESEND_API_KEY and QUOTE_FROM (an address on a domain verified in Resend). QUOTE_TO defaults to info@theboatguy.dk.
import type { APIRoute } from 'astro';
import { validateQuote, staffEmail, customerEmail } from '../../lib/quote.ts';

export const prerender = false;

const MAX_BODY = 30 * 1024 * 1024; // 5 photos at 5 MB (base64 stays under Resend's 40 MB cap) plus the form, with room for multipart overhead
const env = (k: string) => (import.meta.env[k] as string | undefined) ?? process.env[k];
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

// shortcut: per-process memory, so it only limits within one server instance; use the host's rate limiting when deployed at scale
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
};

async function send(key: string, mail: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify(mail),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!(request.headers.get('content-type') ?? '').includes('multipart/form-data')) return json(415, { error: 'unsupported' });
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY) return json(413, { error: 'too_large' });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { error: 'bad_form' });
  }

  // spam trap: people never see or fill this field; bots do. Answer as if it worked.
  if (String(form.get('company') ?? '').trim()) return json(200, { ok: true });
  if (limited(clientAddress ?? 'unknown')) return json(429, { error: 'rate_limited' });

  const files = form.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
  const fields = Object.fromEntries([...new Set(form.keys())].filter((k) => k !== 'photos').map((k) => [k, k === 'services' ? form.getAll(k) : form.get(k)]));
  const { ok, errors, data } = validateQuote(fields, files);
  if (!ok) return json(422, { errors });

  const key = env('RESEND_API_KEY');
  const from = env('QUOTE_FROM');
  if (!key || !from) return json(503, { error: 'not_configured' });

  const attachments = await Promise.all(
    files.map(async (f, i) => ({
      filename: `${i + 1}-${f.name.replace(/[^\w.-]+/g, '_').slice(-60)}`,
      content: Buffer.from(await f.arrayBuffer()).toString('base64'),
    })),
  );

  try {
    const staff = staffEmail(data, files.length);
    await send(key, { from, to: env('QUOTE_TO') ?? 'info@theboatguy.dk', reply_to: data.email, ...staff, attachments });
  } catch (e) {
    console.error('quote: staff email failed', e);
    return json(502, { error: 'send_failed' });
  }
  // the customer's confirmation is a courtesy: the request has already reached the business
  send(key, { from, to: data.email, ...customerEmail(data) }).catch((e) => console.error('quote: confirmation failed', e));

  return json(200, { ok: true });
};

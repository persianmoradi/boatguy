// /sitemap.xml: both language versions of the home page, each listing the other as its alternate.
import type { APIRoute } from 'astro';
import { languages } from '../i18n/ui';

export const GET: APIRoute = ({ site }) => {
  const url = (lang: string) => new URL(`/${lang}/`, site).href;
  const alternates =
    languages.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${url(l)}"/>`).join('') +
    `<xhtml:link rel="alternate" hreflang="x-default" href="${url('da')}"/>`;
  const lastmod = new Date().toISOString().slice(0, 10);
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    languages.map((l) => `  <url><loc>${url(l)}</loc><lastmod>${lastmod}</lastmod>${alternates}</url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
};

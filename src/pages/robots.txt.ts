import type { APIContext } from "astro";
import { site } from "../lib/site";

// In demo mode Google is asked to stay away entirely; at launch it gets the sitemap.
export function GET(context: APIContext) {
  const sitemap = new URL("sitemap-index.xml", context.site).href;
  const body = site.demoMode
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${sitemap}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}

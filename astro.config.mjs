// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Netlify sets URL to the site's main address during builds, so canonical
// links and the sitemap always use the right domain without editing this file.
const site = process.env.URL || "https://gateway-demo.netlify.app";

export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: [
    sitemap({
      // The editor is not a page for Google.
      filter: (page) => !/\/(admin|thanks|404)\//.test(page),
    }),
  ],
});

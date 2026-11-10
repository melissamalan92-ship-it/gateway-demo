import type { ImageMetadata } from "astro";
import site from "../data/site.json";

export { site };

// Images chosen in the editor's "Site settings" are saved as paths such as
// "../assets/site/hero.jpg". This turns that path into an image Astro can
// resize, so settings photos are optimised like every other photo.
const assets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

export function assetImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;
  const key = "/src/" + path.replace(/^(\.\.\/)+/, "").replace(/^src\//, "");
  return assets[key]?.default;
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
}

export function telHref(phone: string): string {
  return "tel:" + phone.replace(/[^+\d]/g, "");
}

export function whatsappHref(number: string): string {
  return "https://wa.me/" + number.replace(/\D/g, "");
}

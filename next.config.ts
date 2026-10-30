import type { NextConfig } from "next";
import { langs, routes } from "./lib/i18n";

// Les pages vivent dans app/[lang]/<clé française>. Chaque langue a ses propres adresses
// (ex. /it/negozio, /en/shop) : on les réécrit vers le dossier interne, et l'adresse
// non traduite (ex. /en/boutique) redirige vers la bonne.
const translated = langs.flatMap((lang) =>
  Object.entries(routes)
    .filter(([key, slugs]) => slugs[lang] !== key)
    .map(([key, slugs]) => ({ lang, key, slug: slugs[lang] })),
);

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/", destination: "/fr", permanent: false },
      ...translated.map(({ lang, key, slug }) => ({
        source: `/${lang}/${key}`,
        destination: `/${lang}/${slug}`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    return translated.map(({ lang, key, slug }) => ({
      source: `/${lang}/${slug}`,
      destination: `/${lang}/${key}`,
    }));
  },
};

export default nextConfig;

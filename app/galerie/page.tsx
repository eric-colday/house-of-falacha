import type { Metadata } from "next";
import { PageHero } from "@/components/Footer";
import { site } from "@/lib/content";
import { getTikTokPosts, photos, themes } from "@/lib/galerie";
import { Galerie } from "./Galerie";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Les workshops, événements et actions solidaires de House of Falacha en vidéos et en photos.",
};
export const revalidate = 43200;

export default async function GaleriePage() {
  const posts = await getTikTokPosts();

  return (
    <>
      <PageHero
        lignes={["Nos", "souvenirs", "en images"]}
        intro="Workshops, after events, interviews et actions solidaires : revivez les moments de la maison. Appuie sur une vidéo pour la lancer."
      />
      <Galerie themes={themes} posts={posts} photos={photos} />
      <section className="border-t border-or/40 bg-lin">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-6">
          <p className="max-w-xl text-xl font-light">Toutes nos vidéos, au fil des samedis, sont sur TikTok.</p>
          <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn btn-marine">Suivre {site.tiktokHandle}</a>
        </div>
      </section>
    </>
  );
}

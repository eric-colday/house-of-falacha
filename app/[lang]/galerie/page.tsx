import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/Footer";
import { site } from "@/lib/content";
import { getTikTokPosts, photos, themes } from "@/lib/galerie";
import { getDict, isLang } from "@/lib/i18n";
import { Galerie } from "./Galerie";

export const revalidate = 43200;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLang(lang) ? getDict(lang).nav.galerie : "Galerie" };
}

export default async function GaleriePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const posts = await getTikTokPosts();

  return (
    <>
      <PageHero lignes={t.galerie.heroTitle} intro={t.galerie.heroText} photo="/galerie/cercle-de-danse.jpg" />
      <Galerie themes={themes} posts={posts} photos={photos} />
      <p className="mx-auto max-w-7xl px-4 pb-10 text-sm text-ardoise sm:px-6">{t.common.photoCredit}</p>
      <section className="border-t border-or/40 bg-lin">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-12 sm:px-6">
          <p className="max-w-xl text-xl font-light">{t.galerie.footer}</p>
          <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn btn-marine">{t.common.follow} {site.tiktokHandle}</a>
        </div>
      </section>
    </>
  );
}

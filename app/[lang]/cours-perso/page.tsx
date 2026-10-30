import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/Footer";
import { getDict, isLang } from "@/lib/i18n";
import { CoursPersoForm } from "./CoursPersoForm";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLang(lang) ? getDict(lang).nav.cours : "Cours perso" };
}

export default async function CoursPerso({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = getDict(lang).cours;

  return (
    <>
      <PageHero lignes={c.heroTitle} intro={c.heroText} photo="/galerie/duo-sourires.jpg" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[0.75fr_1.25fr] md:py-20">
        <aside>
          <h2 className="lettrage text-xl text-or-fonce">{c.how}</h2>
          <ol className="mt-6">
            {c.steps.map(([title, text], i) => (
              <li key={title} className="couture flex gap-5 py-5 first:border-t-0">
                <span className="text-4xl font-light text-or-fonce">{i + 1}</span>
                <div>
                  <p className="text-lg font-medium">{title}</p>
                  <p className="text-ardoise">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
        <CoursPersoForm />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/Footer";
import { Lotus } from "@/components/Logo";
import { equipe, partners, photosMaison, site } from "@/lib/content";
import { getDict, isLang, l } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return { title: t.nav.apropos, description: t.apropos.intro };
}

function Titre({ lignes }: { lignes: [string, string, string] }) {
  return (
    <h2 className="escalier text-or-fonce text-[clamp(2.2rem,5.5vw,4.2rem)]">
      <span>{lignes[0]}</span>
      <span>{lignes[1]}</span>
      <span>{lignes[2]}</span>
    </h2>
  );
}

export default async function APropos({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const a = t.apropos;

  return (
    <>
      <PageHero lignes={a.heroTitle} intro={a.intro} />

      {/* HISTOIRE */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div className="space-y-5 text-lg leading-relaxed text-ardoise">
          {a.histoire.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="flex flex-col items-center gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-house-of-falacha.png" alt="House of Falacha" width={207} height={240} className="w-48" />
          <p className="max-w-xs text-center text-2xl font-light italic">« {t.common.tagline} »</p>
        </div>
      </section>

      {/* PHOTO DE GROUPE */}
      <figure className="border-y border-or/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photosMaison.apropos} alt="" className="max-h-[70vh] w-full max-w-full object-cover" />
      </figure>

      {/* EN QUELQUES MOTS */}
      <section className="border-b border-or/30 bg-abysse text-ivoire">
        <dl className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          {a.chiffres.map((c) => (
            <div key={c.value}>
              <dt className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-or-clair">{c.value}</dt>
              <dd className="mt-1 text-ivoire/75">{c.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* VALEURS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <Titre lignes={a.valeursTitle} />
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {a.valeurs.map((v) => (
            <div key={v.title} className="couture flex gap-5 pt-6">
              <Lotus className="h-8 w-11 shrink-0" />
              <div>
                <h3 className="lettrage text-xl text-or-fonce">{v.title}</h3>
                <p className="mt-2 text-ardoise">{v.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ÉQUIPE */}
      <section className="border-t border-or/40 bg-lin">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 md:items-end">
            <Titre lignes={a.equipeTitle} />
            <p className="max-w-md text-lg text-ardoise">{a.equipeText}</p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {equipe.map((m) => (
              <li key={m.name}>
                <div className="relative flex aspect-square w-full max-w-full items-center justify-center overflow-hidden rounded-[3rem_0.5rem_3rem_0.5rem] bg-blanc">
                  <div className="cotes absolute inset-0 opacity-50" />
                  <span className="relative text-6xl font-light text-or-fonce">{m.name.charAt(0)}</span>
                </div>
                <p className="mt-4 text-lg font-medium">{m.name}</p>
                <p className="text-ardoise">{m.role === "founder" ? a.founder : a.coach}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-2xl text-ardoise">{a.visora}</p>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Titre lignes={a.parcoursTitle} />
            <p className="mt-8 text-lg text-ardoise">{t.home.charityText}</p>
          </div>
          <ol>
            {t.home.timeline.map((ev) => (
              <li key={ev.title} className="couture grid grid-cols-[5.5rem_1fr] gap-4 py-6 first:border-t-0">
                <span className="text-3xl font-light text-or-fonce">{ev.year}</span>
                <div>
                  <h3 className="text-xl font-medium">{ev.title}</h3>
                  <p className="mt-1 text-ardoise">{ev.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SPONSORS + APPEL */}
      <section className="border-t border-or/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="lettrage text-sm text-or-fonce">{t.home.sponsors}</p>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3 text-lg text-ardoise">
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="couture mt-14 flex flex-wrap items-center justify-between gap-6 pt-10">
            <p className="max-w-xl text-2xl font-light">{a.join}</p>
            <div className="flex flex-wrap gap-3">
              <a href={l(lang, "/workshops")} className="btn btn-marine">{a.joinCta}</a>
              <a href={site.whatsapp} className="btn btn-contour">{t.common.writeUs}</a>
            </div>
          </div>
          <p className="mt-10 text-sm text-ardoise">{t.common.photoCredit}</p>
        </div>
      </section>
    </>
  );
}

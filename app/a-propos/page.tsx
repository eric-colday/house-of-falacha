import type { Metadata } from "next";
import { PageHero } from "@/components/Footer";
import { LogoComplet, Lotus } from "@/components/Logo";
import { apropos, charity, partners, site, temps } from "@/lib/content";

export const metadata: Metadata = {
  title: "À propos",
  description: "L'histoire de House of Falacha, l'académie H.O.F de Reggio Emilia : danse, art, culture et sport pour la diaspora et tous ceux qui aiment bouger.",
};

function Initiale({ name }: { name: string }) {
  return (
    <div className="relative flex aspect-square w-full max-w-full items-center justify-center overflow-hidden rounded-[3rem_0.5rem_3rem_0.5rem] bg-lin">
      <div className="cotes absolute inset-0 opacity-50" />
      <span className="relative text-6xl font-light text-or-fonce">{name.charAt(0)}</span>
    </div>
  );
}

export default function APropos() {
  return (
    <>
      <PageHero lignes={["Notre", "histoire", "et nos valeurs"]} intro={apropos.intro} />

      {/* HISTOIRE */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:py-24">
        <div className="space-y-5 text-lg leading-relaxed text-ardoise">
          {apropos.histoire.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="flex flex-col items-center gap-8">
          <LogoComplet className="w-[min(70vw,320px)] text-[min(70vw,320px)]" />
          <p className="max-w-xs text-center text-2xl font-light italic text-marine">« {apropos.mission} »</p>
        </div>
      </section>

      {/* EN QUELQUES MOTS */}
      <section className="border-y border-or/30 bg-abysse text-ivoire">
        <dl className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
          {apropos.chiffres.map((c) => (
            <div key={c.value}>
              <dt className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-light text-or-clair">{c.value}</dt>
              <dd className="mt-1 text-ivoire/75">{c.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* VALEURS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <h2 className="escalier text-or-fonce text-[clamp(2.2rem,5.5vw,4.2rem)]">
          <span>Ce</span>
          <span>qui nous</span>
          <span>porte</span>
        </h2>
        <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {apropos.valeurs.map((v) => (
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
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="escalier text-or-fonce text-[clamp(2.2rem,5.5vw,4.2rem)]">
              <span>L'équipe</span>
              <span>de la</span>
              <span>maison</span>
            </h2>
            <p className="max-w-md text-lg text-ardoise">Le fondateur et les coachs qui animent les workshops chaque samedi.</p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
            {apropos.equipe.map((m) => (
              <li key={m.name}>
                <Initiale name={m.name} />
                <p className="mt-4 text-lg font-medium">{m.name}</p>
                <p className="text-ardoise">{m.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PARCOURS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="escalier text-or-fonce text-[clamp(2.2rem,5.5vw,4.2rem)]">
              <span>Le</span>
              <span>parcours</span>
              <span>de H.O.F</span>
            </h2>
            <p className="mt-8 text-lg text-ardoise">{charity.text}</p>
          </div>
          <ol>
            {temps.map((t) => (
              <li key={t.title} className="couture grid grid-cols-[5.5rem_1fr] gap-4 py-6 first:border-t-0">
                <span className="text-3xl font-light text-or-fonce">{t.year}</span>
                <div>
                  <h3 className="text-xl font-medium">{t.title}</h3>
                  <p className="mt-1 text-ardoise">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PARTENAIRES + APPEL */}
      <section className="border-t border-or/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <p className="lettrage text-sm text-or-fonce">Ils nous ont soutenus</p>
          <ul className="mt-4 flex flex-wrap gap-x-10 gap-y-3 text-lg text-ardoise">
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="couture mt-14 flex flex-wrap items-center justify-between gap-6 pt-10">
            <p className="max-w-xl text-2xl font-light">Envie de rejoindre la maison, de devenir partenaire ou d'organiser un événement avec nous ?</p>
            <div className="flex flex-wrap gap-3">
              <a href="/workshops" className="btn btn-marine">Venir à un workshop</a>
              <a href={site.whatsapp} className="btn btn-contour">Nous écrire</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

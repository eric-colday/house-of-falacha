import { notFound } from "next/navigation";
import { LogoComplet, Lotus } from "@/components/Logo";
import { ProductVisual } from "@/components/ProductVisual";
import { TikTokFeed } from "@/components/TikTokFeed";
import { boutiqueOuverte, formatDate, formatPrice, products, workshops } from "@/lib/catalog";
import { partners, photosMaison, site } from "@/lib/content";
import { getDict, isLang, l, locale } from "@/lib/i18n";

function Titre({ lignes, className = "" }: { lignes: [string, string, string]; className?: string }) {
  return (
    <h2 className={`escalier text-or-fonce text-[clamp(2.2rem,5.5vw,4.2rem)] ${className}`}>
      <span>{lignes[0]}</span>
      <span>{lignes[1]}</span>
      <span>{lignes[2]}</span>
    </h2>
  );
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const h = t.home;
  const today = new Date().toISOString().slice(0, 10);
  const prochain = workshops.filter((w) => w.date >= today).sort((a, b) => a.date.localeCompare(b.date))[0];

  return (
    <>
      {/* LE LOGO EN GRAND */}
      <section className="relative overflow-hidden border-b border-or/40">
        <div className="cotes pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_30%_50%,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
          <div className="flex justify-center md:justify-start">
            <LogoComplet animated className="w-[min(78vw,440px)] text-[min(78vw,440px)]" />
          </div>
          <div className="max-w-lg">
            <h1 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-tight">{h.heroTitle}</h1>
            <p className="mt-6 text-lg text-ardoise">{h.heroText}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={l(lang, "/workshops")} className="btn btn-marine">{h.ctaEvent}</a>
              <a href={l(lang, "/boutique")} className="btn btn-contour">{h.ctaShop}</a>
            </div>
          </div>
        </div>
      </section>

      {/* BANDE PHOTOS */}
      <section aria-label={h.imagesTitle.join(" ")} className="border-b border-or/40">
        <div className="grid grid-cols-2 gap-1 bg-abysse sm:grid-cols-3 lg:grid-cols-5">
          {photosMaison.strip.map((src, i) => (
            <a key={src} href={l(lang, "/galerie")} className={`group relative block aspect-[4/5] overflow-hidden ${i > 2 ? "hidden lg:block" : ""} ${i === 2 ? "hidden sm:block" : ""}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading={i < 3 ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </a>
          ))}
        </div>
      </section>

      {/* PROCHAIN RENDEZ-VOUS */}
      {prochain && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr]">
            <div>
              <Titre lignes={h.nextTitle} />
              <p className="mt-6 max-w-md text-lg text-ardoise">{h.nextText}</p>
              <div className="couture mt-8 pt-6">
                <p className="text-6xl font-light text-or-fonce">
                  {new Date(`${prochain.date}T12:00:00`).getDate()}{" "}
                  <span className="lettrage text-3xl">{new Date(`${prochain.date}T12:00:00`).toLocaleDateString(locale(lang), { month: "long", year: "numeric" })}</span>
                </p>
                <p className="lettrage mt-4 text-xl">{prochain.title[lang]}</p>
                <p className="mt-1 text-ardoise">{prochain.place}</p>
                <p className="mt-1 text-ardoise">{formatDate(prochain.date, lang)}</p>
              </div>
              <a href={l(lang, "/workshops")} className="btn btn-marine mt-8">{h.nextCta}</a>
              <p className="mt-6 max-w-md text-sm text-ardoise">{h.weekly}</p>
            </div>
            {prochain.photo && (
              <div className="overflow-hidden rounded-[3rem_0.5rem_3rem_0.5rem] border border-or/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prochain.photo} alt={prochain.title[lang]} className="aspect-[4/5] w-full max-w-full object-cover" />
              </div>
            )}
          </div>
        </section>
      )}

      {/* LA MAISON */}
      <section className="border-y border-or/40 bg-lin">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Titre lignes={h.maisonTitle} />
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ardoise">{h.maisonBody}</p>
              <a href={l(lang, "/a-propos")} className="btn btn-contour mt-6">{h.maisonCta}</a>
            </div>
            <div className="overflow-hidden rounded-[0.5rem_3rem_0.5rem_3rem] border border-or/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photosMaison.maison} alt="" loading="lazy" className="aspect-[3/2] w-full max-w-full object-cover" />
            </div>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {h.pillars.map((p) => (
              <div key={p.title}>
                <Lotus className="h-8 w-11" />
                <h3 className="lettrage mt-4 text-xl text-or-fonce">{p.title}</h3>
                <p className="mt-2 text-ardoise">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Titre lignes={h.merchTitle} />
          <a href={l(lang, "/boutique")} className="btn btn-contour">{h.merchCta}</a>
        </div>
        {!boutiqueOuverte && <p className="mt-6 max-w-xl text-lg text-ardoise">{h.merchText}</p>}
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <a key={p.id} href={l(lang, "/boutique")} className="group block">
              <div className="relative overflow-hidden rounded-[2rem_0.25rem_2rem_0.25rem] border border-or/40">
                <ProductVisual visual={p.visual} color={p.color} photo={p.photo} />
                {!boutiqueOuverte && (
                  <span className="absolute left-3 top-3 rounded-full bg-or px-3 py-1 text-xs font-medium text-nuit">{t.common.soon}</span>
                )}
              </div>
              <span className="mt-4 block font-medium group-hover:text-or-fonce">{p.name[lang]}</span>
              {boutiqueOuverte && <span className="text-or-fonce">{formatPrice(p.price, lang)}</span>}
            </a>
          ))}
        </div>
      </section>

      {/* TIKTOK */}
      <section id="tiktok" className="scroll-mt-16 border-y border-or/30 bg-abysse text-ivoire">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="escalier text-or-clair text-[clamp(2.2rem,5.5vw,4.2rem)]">
              <span>{h.tiktokTitle[0]}</span>
              <span>{h.tiktokTitle[1]}</span>
              <span>{h.tiktokTitle[2]}</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <a href={l(lang, "/galerie")} className="btn btn-or">{h.tiktokGallery}</a>
              <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn border-or-clair text-ivoire hover:bg-ivoire hover:text-nuit">
                {t.common.follow} {site.tiktokHandle}
              </a>
            </div>
          </div>
          <TikTokFeed />
        </div>
      </section>

      {/* COURS PERSO + SOLIDARITÉ */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-0 md:py-24">
        <div className="md:pr-12">
          <Titre lignes={h.coursTitle} />
          <p className="mt-6 max-w-md text-lg text-ardoise">{h.coursText}</p>
          <a href={l(lang, "/cours-perso")} className="btn btn-marine mt-8">{h.coursCta}</a>
        </div>
        <div className="border-t border-or/40 pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <Titre lignes={h.charityTitle} />
          <p className="mt-6 max-w-md text-lg text-ardoise">{h.charityText}</p>
          <a href={site.whatsapp} className="btn btn-contour mt-8">{h.charityCta}</a>
        </div>
      </section>

      {/* TEMPS FORTS + SPONSORS */}
      <section className="border-t border-or/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Titre lignes={h.timelineTitle} />
          <ol className="mt-12">
            {h.timeline.map((ev) => (
              <li key={ev.title} className="couture grid gap-2 py-6 md:grid-cols-[9rem_1fr_1.5fr] md:items-baseline md:gap-8">
                <span className="text-4xl font-light text-or-fonce">{ev.year}</span>
                <h3 className="text-xl font-medium">{ev.title}</h3>
                <p className="text-ardoise">{ev.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="lettrage text-sm text-or-fonce">{h.sponsors}</span>
            {partners.map((p) => (
              <span key={p} className="text-lg text-ardoise">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-16 border-t border-or/40 bg-lin">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.4fr] md:items-center md:py-24">
          <Titre lignes={h.contactTitle} />
          <div className="min-w-0">
            <p className="text-lg text-ardoise">{h.contactText}</p>
            <a href={site.whatsapp} className="mt-5 block text-[clamp(2rem,5vw,3.6rem)] font-light text-or-fonce hover:text-marine">
              {site.phone}
            </a>
            <p className="mt-3 break-all text-lg">{site.email}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={site.instagram} target="_blank" rel="noreferrer" className="btn btn-contour">Instagram {site.instagramHandle}</a>
              <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn btn-contour">TikTok</a>
            </div>
            <p className="mt-5 text-ardoise">{site.city}, {site.country[lang]}</p>
          </div>
        </div>
      </section>
    </>
  );
}

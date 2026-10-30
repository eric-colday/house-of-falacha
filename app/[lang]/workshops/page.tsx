import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/Footer";
import { Lotus } from "@/components/Logo";
import { ReserveWorkshop } from "@/components/ReserveWorkshop";
import { formatDate, formatPrice, workshopSku, workshops } from "@/lib/catalog";
import { site } from "@/lib/content";
import { getDict, isLang } from "@/lib/i18n";
import { getStock } from "@/lib/stock";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLang(lang) ? getDict(lang).nav.workshops : "Workshops" };
}

export default async function Workshops({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const e = t.events;
  const stock = await getStock();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = workshops.filter((w) => w.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero lignes={e.heroTitle} intro={e.heroText} photo="/galerie/banniere-workshop.jpg" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        {upcoming.length === 0 ? (
          <p className="py-10 text-center text-lg text-ardoise">{e.none}</p>
        ) : (
          <ul className="space-y-10">
            {upcoming.map((w) => {
              const sku = workshopSku(w.id);
              const remaining = stock[sku] ?? 0;
              const d = new Date(`${w.date}T12:00:00`);
              const open = w.reservationsOuvertes && w.price != null;
              return (
                <li key={w.id} id={w.id} className="scroll-mt-24">
                  <article className="grid overflow-hidden rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 lg:grid-cols-[1fr_1.15fr]">
                    {w.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={w.photo} alt={w.title[lang]} className="aspect-[4/3] h-full w-full max-w-full object-cover lg:aspect-auto" />
                    )}
                    <div className="flex min-w-0 flex-col gap-6 p-6 sm:p-8">
                      <div className="flex items-end gap-4">
                        <span className="text-7xl font-light leading-none text-or-fonce">{d.getDate()}</span>
                        <span className="lettrage pb-1 text-xl">{d.toLocaleDateString(lang === "it" ? "it-IT" : "fr-FR", { month: "long", year: "numeric" })}</span>
                      </div>
                      <div>
                        <p className="text-ardoise">{w.subtitle[lang]}</p>
                        <h2 className="lettrage mt-1 text-3xl text-or-fonce md:text-4xl">{w.title[lang]}</h2>
                      </div>
                      <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <div><dt className="text-sm text-ardoise">{e.date}</dt><dd className="font-medium">{formatDate(w.date, lang)}</dd></div>
                        <div><dt className="text-sm text-ardoise">{e.time}</dt><dd className="font-medium">{w.time ?? e.timeSoon}</dd></div>
                        <div><dt className="text-sm text-ardoise">{e.place}</dt><dd className="font-medium">{w.place}</dd></div>
                        <div><dt className="text-sm text-ardoise">{e.level}</dt><dd className="font-medium">{w.level[lang]}</dd></div>
                      </dl>

                      <div className="couture mt-auto pt-6">
                        {open ? (
                          <div className="space-y-4">
                            <div className="flex items-baseline justify-between">
                              <span className="text-3xl font-light">{formatPrice(w.price!, lang)} <span className="text-base text-ardoise">{e.perSeat}</span></span>
                              <span className={`text-sm ${remaining > 0 && remaining <= 10 ? "font-medium text-or-fonce" : "text-ardoise"}`}>
                                {remaining > 0 ? e.seatsLeft(remaining) : e.full}
                              </span>
                            </div>
                            <ReserveWorkshop sku={sku} remaining={remaining} />
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <p className="lettrage text-lg text-or-fonce">{e.soon}</p>
                            <p className="text-ardoise">{e.soonText}</p>
                            <div className="flex flex-wrap gap-3">
                              <a href={site.whatsapp} className="btn btn-marine">{e.notify}</a>
                              <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn btn-contour">TikTok</a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-16 grid gap-10 border-t border-or/40 pt-12 md:grid-cols-3">
          {e.infos.map((info) => (
            <div key={info.title}>
              <Lotus className="h-7 w-10" />
              <h3 className="lettrage mt-3 text-lg text-or-fonce">{info.title}</h3>
              <p className="mt-2 text-ardoise">{info.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

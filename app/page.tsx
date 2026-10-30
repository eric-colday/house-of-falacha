import { LogoComplet, Lotus } from "@/components/Logo";
import { ProductVisual } from "@/components/ProductVisual";
import { TikTokFeed } from "@/components/TikTokFeed";
import { formatPrice, products, workshopSku, workshops } from "@/lib/catalog";
import { charity, maison, partners, site, temps } from "@/lib/content";
import { getStock } from "@/lib/stock";

export const dynamic = "force-dynamic";

function Titre({ lignes, className = "" }: { lignes: [string, string, string]; className?: string }) {
  return (
    <h2 className={`escalier text-or-fonce text-[clamp(2.2rem,5.5vw,4.2rem)] ${className}`}>
      <span>{lignes[0]}</span>
      <span>{lignes[1]}</span>
      <span>{lignes[2]}</span>
    </h2>
  );
}

export default async function Home() {
  const stock = await getStock();
  const today = new Date().toISOString().slice(0, 10);
  const prochains = workshops.filter((w) => w.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      {/* LE LOGO EN GRAND */}
      <section className="relative overflow-hidden border-b border-or/40">
        <div className="cotes pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_30%_50%,black,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 md:grid-cols-[1fr_1fr] md:py-20">
          <div className="flex justify-center md:justify-start">
            <LogoComplet animated className="w-[min(78vw,440px)] text-[min(78vw,440px)]" />
          </div>
          <div className="max-w-lg">
            <h1 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-light leading-tight">
              Danse, art, culture et sport à Reggio Emilia. Là où chaque événement devient souvenir.
            </h1>
            <p className="mt-6 text-lg text-ardoise">
              Workshops d'afro dance tous les samedis, merch officiel à récupérer sur place, et cours personnalisés dans ta ville.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/workshops" className="btn btn-marine">Réserver un workshop</a>
              <a href="/boutique" className="btn btn-contour">La boutique</a>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <Titre lignes={["Le", "programme", "du samedi"]} />
            <p className="mt-6 max-w-xs text-ardoise">Tous niveaux, avec les coachs de la maison. Places limitées, ton e-mail Stripe sert de billet.</p>
          </div>
          <ul>
            {prochains.map((w) => {
              const left = stock[workshopSku(w.id)] ?? 0;
              const d = new Date(`${w.date}T12:00:00`);
              const style = w.title.split("—")[1]?.trim() ?? w.title;
              return (
                <li key={w.id} className="couture first:border-t-0">
                  <a href={`/workshops#${w.id}`} className="group grid grid-cols-[4.5rem_1fr_auto] items-center gap-4 py-5 sm:grid-cols-[6rem_1fr_auto]">
                    <span className="text-center">
                      <span className="block text-5xl font-light leading-none text-or-fonce sm:text-6xl">{d.getDate()}</span>
                      <span className="lettrage text-xs text-ardoise">{d.toLocaleDateString("fr-FR", { month: "short" }).replace(".", "")}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xl font-medium group-hover:text-or-fonce">{style}</span>
                      <span className="text-sm text-ardoise">{w.time}, {w.place}</span>
                    </span>
                    <span className="text-right">
                      <span className="block font-medium">{formatPrice(w.price).replace(",00", "")}</span>
                      <span className={`text-sm ${left > 0 && left <= 10 ? "text-or-fonce" : "text-ardoise"}`}>
                        {left > 0 ? `${left} places` : "Complet"}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* LA MAISON */}
      <section className="border-y border-or/40 bg-lin">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-end">
            <Titre lignes={["Ta", "deuxième", "famille"]} />
            <div>
              <p className="max-w-lg text-lg leading-relaxed text-ardoise">{maison.body}</p>
              <a href="/a-propos" className="btn btn-contour mt-6">Notre histoire</a>
            </div>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {maison.pillars.map((p) => (
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
          <Titre lignes={["Le", "merch", "officiel"]} />
          <a href="/boutique" className="btn btn-contour">Toute la boutique</a>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <a key={p.id} href="/boutique" className="group block">
              <div className="overflow-hidden rounded-[2rem_0.25rem_2rem_0.25rem] border border-or/40">
                <ProductVisual visual={p.visual} color={p.color} />
              </div>
              <span className="mt-4 block font-medium group-hover:text-or-fonce">{p.name}</span>
              <span className="text-or-fonce">{formatPrice(p.price)}</span>
            </a>
          ))}
        </div>
        <p className="mt-8 text-ardoise">Paiement par Stripe. Pas de livraison : tu récupères ta commande au prochain workshop.</p>
      </section>

      {/* TIKTOK */}
      <section id="tiktok" className="scroll-mt-16 bg-marine text-blanc">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="escalier text-or-clair text-[clamp(2.2rem,5.5vw,4.2rem)]">
              <span>Sur</span>
              <span>TikTok</span>
              <span>en direct</span>
            </h2>
            <div className="flex flex-wrap gap-3">
              <a href="/galerie" className="btn btn-or">Voir la galerie</a>
              <a href={site.tiktok} target="_blank" rel="noreferrer" className="btn border-or-clair text-blanc hover:bg-blanc hover:text-marine">Suivre {site.tiktokHandle}</a>
            </div>
          </div>
          <TikTokFeed />
        </div>
      </section>

      {/* COURS PERSO + SOLIDARITÉ */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-0 md:py-24">
        <div className="md:pr-12">
          <Titre lignes={["Un cours", "rien que", "pour vous"]} />
          <p className="mt-6 max-w-md text-lg text-ardoise">
            Entre amis, pour un anniversaire ou une équipe : un coach vient dans ta ville pour un cours de danse ou de fitness.
          </p>
          <a href="/cours-perso" className="btn btn-marine mt-8">Demander un cours</a>
        </div>
        <div className="border-t border-or/40 pt-12 md:border-l md:border-t-0 md:pl-12 md:pt-0">
          <Titre lignes={["La", "danse qui", "donne"]} />
          <p className="mt-6 max-w-md text-lg text-ardoise">{charity.text}</p>
          <a href={site.whatsapp} className="btn btn-contour mt-8">{charity.cta}</a>
        </div>
      </section>

      {/* TEMPS FORTS */}
      <section className="border-t border-or/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24">
          <Titre lignes={["Les", "temps", "forts"]} />
          <ol className="mt-12">
            {temps.map((t) => (
              <li key={t.title} className="couture grid gap-2 py-6 md:grid-cols-[9rem_1fr_1.5fr] md:items-baseline md:gap-8">
                <span className="text-4xl font-light text-or-fonce">{t.year}</span>
                <h3 className="text-xl font-medium">{t.title}</h3>
                <p className="text-ardoise">{t.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3">
            <span className="lettrage text-sm text-or-fonce">Avec le soutien de</span>
            {partners.map((p) => (
              <span key={p} className="text-ardoise">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="scroll-mt-16 border-t border-or/40 bg-lin">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.4fr] md:items-center md:py-24">
          <Titre lignes={["Écris", "à la", "maison"]} />
          <div>
            <p className="text-lg text-ardoise">Workshop, collaboration, événement à organiser : on répond vite sur WhatsApp.</p>
            <a href={site.whatsapp} className="mt-5 block text-[clamp(2rem,5vw,3.6rem)] font-light text-or-fonce hover:text-marine">
              {site.phone}
            </a>
            <p className="mt-3">{site.city}, {site.country}</p>
          </div>
        </div>
      </section>
    </>
  );
}

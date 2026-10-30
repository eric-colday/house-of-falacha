import type { Metadata } from "next";
import { PageHero } from "@/components/Footer";
import { Lotus } from "@/components/Logo";
import { ReserveWorkshop } from "@/components/ReserveWorkshop";
import { formatDate, formatPrice, workshopSku, workshops } from "@/lib/catalog";
import { getStock } from "@/lib/stock";

export const metadata: Metadata = { title: "Workshops" };
export const dynamic = "force-dynamic";

export default async function Workshops() {
  const stock = await getStock();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = workshops.filter((w) => w.date >= today).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <PageHero
        lignes={["Réserve", "ta place", "au workshop"]}
        intro="Chaque samedi à Reggio Emilia : afro dance, afro urbain, chorégraphie et fitness. Places limitées, paiement en ligne, et ton e-mail de confirmation sert de billet."
      />

      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 md:py-20">
        {upcoming.length === 0 ? (
          <p className="py-10 text-center text-lg text-ardoise">Les prochaines dates arrivent bientôt. Suis-nous sur TikTok pour être prévenu.</p>
        ) : (
          <ul className="space-y-6">
            {upcoming.map((w) => {
              const sku = workshopSku(w.id);
              const remaining = stock[sku] ?? 0;
              const d = new Date(`${w.date}T12:00:00`);
              const style = w.title.split("—")[1]?.trim() ?? w.title;
              return (
                <li key={w.id} id={w.id} className="scroll-mt-24">
                  <article className="grid overflow-hidden rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 md:grid-cols-[10rem_1fr_18rem]">
                    <div className="flex items-center gap-4 bg-lin px-6 py-5 md:flex-col md:justify-center md:gap-1">
                      <span className="text-6xl font-light leading-none text-or-fonce md:text-7xl">{d.getDate()}</span>
                      <span className="lettrage text-sm">{d.toLocaleDateString("fr-FR", { month: "long" })}</span>
                    </div>
                    <div className="min-w-0 px-6 py-6">
                      <h2 className="lettrage text-2xl text-or-fonce md:text-3xl">{style}</h2>
                      <p className="mt-2 capitalize text-ardoise">{formatDate(w.date)}</p>
                      <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                        <div><dt className="text-sm text-ardoise">Horaire</dt><dd className="font-medium">{w.time}</dd></div>
                        <div><dt className="text-sm text-ardoise">Lieu</dt><dd className="font-medium">{w.place}</dd></div>
                        <div><dt className="text-sm text-ardoise">Niveau</dt><dd className="font-medium">{w.level}</dd></div>
                      </dl>
                    </div>
                    <div className="couture flex flex-col justify-center gap-4 px-6 py-6 md:border-l-2 md:border-t-0 md:border-dashed md:border-or/70">
                      <div className="flex items-baseline justify-between">
                        <span className="text-3xl font-light">{formatPrice(w.price).replace(",00", "")}</span>
                        <span className={`text-sm ${remaining > 0 && remaining <= 10 ? "font-medium text-or-fonce" : "text-ardoise"}`}>
                          {remaining > 0 ? `${remaining} place${remaining > 1 ? "s" : ""} restante${remaining > 1 ? "s" : ""}` : "Complet"}
                        </span>
                      </div>
                      <ReserveWorkshop sku={sku} remaining={remaining} />
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-16 grid gap-10 border-t border-or/40 pt-12 md:grid-cols-3">
          {[
            ["Ton billet", "L'e-mail de confirmation Stripe fait office d'entrée. Garde-le sur ton téléphone."],
            ["En groupe", "Jusqu'à 6 places par réservation. Au-delà, demande un cours perso."],
            ["Le merch", "Commande en boutique et récupère-le au workshop."],
          ].map(([t, d]) => (
            <div key={t}>
              <Lotus className="h-7 w-10" />
              <h3 className="lettrage mt-3 text-lg text-or-fonce">{t}</h3>
              <p className="mt-2 text-ardoise">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

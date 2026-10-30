import { LogoComplet } from "./Logo";
import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-marine text-blanc" style={{ ["--logo-trait" as string]: "#0e1220" }}>
      <div className="cotes h-3 opacity-80" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <LogoComplet className="w-44 text-[11rem]" />
          <p className="mt-6 max-w-xs text-blanc/70">{site.tagline}</p>
        </div>
        <div className="space-y-2 text-blanc/80">
          <p className="lettrage text-sm text-or-clair">Nous trouver</p>
          <p>{site.city}, {site.country}</p>
          <p>WhatsApp {site.phone}</p>
          <a href={site.tiktok} target="_blank" rel="noreferrer" className="inline-block border-b border-or/60 hover:text-or-clair">
            TikTok {site.tiktokHandle}
          </a>
        </div>
        <div className="space-y-2 text-blanc/70">
          <p className="lettrage text-sm text-or-clair">Commandes</p>
          <p>Paiement sécurisé par Stripe.</p>
          <p>Pas de livraison : retrait sur place le jour de l'événement.</p>
        </div>
      </div>
      <p className="border-t border-blanc/10 px-4 py-5 text-center text-sm text-blanc/50">
        © {new Date().getFullYear()} House of Falacha, H.O.F Academy
      </p>
    </footer>
  );
}

/** En-tête des pages internes : titre en escalier façon logo, lotus en filigrane. */
export function PageHero({ lignes, intro }: { lignes: [string, string, string]; intro?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-or/40 bg-lin">
      <div className="cotes pointer-events-none absolute inset-y-0 right-0 w-1/3 opacity-40 [mask-image:linear-gradient(90deg,transparent,black)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        <h1 className="escalier text-or-fonce text-[clamp(2.6rem,7vw,5.5rem)]">
          <span>{lignes[0]}</span>
          <span>{lignes[1]}</span>
          <span>{lignes[2]}</span>
        </h1>
        {intro && <p className="mt-8 max-w-2xl text-lg text-ardoise md:text-xl">{intro}</p>}
      </div>
    </section>
  );
}

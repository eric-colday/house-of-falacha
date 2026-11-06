import { getDict, type Lang } from "@/lib/i18n";
import { site } from "@/lib/content";

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  return (
    <footer className="border-t border-or/30 bg-abysse text-ivoire">
      <div className="cotes h-3 opacity-80" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-house-of-falacha.png" alt="House of Falacha" width={207} height={240} className="h-40 w-auto" />
          <p className="mt-6 max-w-xs text-ivoire/70">{t.common.tagline}</p>
        </div>
        <div className="space-y-2 text-ivoire/80">
          <p className="lettrage text-sm text-or-clair">{t.common.findUs}</p>
          <p>{site.city}, {site.country[lang]}</p>
          <p>WhatsApp {site.phone}</p>
          <p className="break-all">{site.email}</p>
          <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
            <a href={site.instagram} target="_blank" rel="noreferrer" className="border-b border-or/60 hover:text-or-clair">Instagram</a>
            <a href={site.tiktok} target="_blank" rel="noreferrer" className="border-b border-or/60 hover:text-or-clair">TikTok</a>
          </div>
        </div>
        <div className="space-y-2 text-ivoire/70">
          <p className="lettrage text-sm text-or-clair">{t.common.orders}</p>
          <p>{t.common.stripe}</p>
          <p>{t.common.retrait}</p>
          <p className="pt-3 text-sm text-ivoire/50">{t.common.photoCredit}</p>
        </div>
      </div>
      <p className="border-t border-ivoire/10 px-4 py-5 text-center text-sm text-ivoire/50">
        © {new Date().getFullYear()} House of Falacha, H.O.F Academy
      </p>
    </footer>
  );
}

/** En-tête des pages internes : titre en escalier façon logo, photo facultative. */

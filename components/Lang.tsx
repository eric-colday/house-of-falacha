"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { dicts, l, langs, routeKey, type Lang } from "@/lib/i18n";

const Ctx = createContext<Lang>("fr");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
}

/** Langue courante, son dictionnaire et le préfixeur de liens. */
export function useLang() {
  const lang = useContext(Ctx);
  return { lang, t: dicts[lang], href: (path: string) => l(lang, path) };
}

/** Sélecteur FR / IT / EN : garde la même page dans l'autre langue, à son adresse traduite. */
export function LangSwitch() {
  const { lang } = useLang();
  const pathname = usePathname() ?? `/${lang}`;
  // /it/negozio → clé « boutique » → /en/shop
  const [, , slug = "", ...rest] = pathname.split("/");
  const target = (code: Lang) => `${l(code, slug ? `/${routeKey(slug)}` : "/")}${rest.length ? `/${rest.join("/")}` : ""}`;
  return (
    <div className="flex items-center rounded-full border border-or/50 p-0.5 text-xs font-medium" role="group" aria-label="Langue / Lingua / Language">
      {langs.map((code) => (
        <a
          key={code}
          href={target(code)}
          hrefLang={code}
          aria-current={code === lang ? "true" : undefined}
          className={`rounded-full px-2.5 py-1 uppercase tracking-wide ${code === lang ? "bg-or text-nuit" : "text-ivoire/80 hover:text-or-clair"}`}
        >
          {code}
        </a>
      ))}
    </div>
  );
}

"use client";

import { createContext, useContext } from "react";
import { usePathname } from "next/navigation";
import { dicts, l, langs, type Lang } from "@/lib/i18n";

const Ctx = createContext<Lang>("fr");

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <Ctx.Provider value={lang}>{children}</Ctx.Provider>;
}

/** Langue courante, son dictionnaire et le préfixeur de liens. */
export function useLang() {
  const lang = useContext(Ctx);
  return { lang, t: dicts[lang], href: (path: string) => l(lang, path) };
}

/** Sélecteur FR / IT : garde la même page dans l'autre langue. */
export function LangSwitch() {
  const { lang } = useLang();
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(fr|it)(?=\/|$)/, "");
  return (
    <div className="flex items-center rounded-full border border-or/50 p-0.5 text-xs font-medium" role="group" aria-label="Langue / Lingua">
      {langs.map((code) => (
        <a
          key={code}
          href={`/${code}${rest}`}
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

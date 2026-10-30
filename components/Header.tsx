import { CartLink } from "./Cart";
import { LangSwitch } from "./Lang";
import { getDict, l, type Lang } from "@/lib/i18n";

export function Header({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const nav = [
    { href: l(lang, "/workshops"), label: t.nav.workshops },
    { href: l(lang, "/boutique"), label: t.nav.boutique },
    { href: l(lang, "/cours-perso"), label: t.nav.cours },
    { href: l(lang, "/galerie"), label: t.nav.galerie },
    { href: l(lang, "/a-propos"), label: t.nav.apropos },
    { href: `${l(lang)}#contact`, label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-or/40 bg-blanc/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <a href={l(lang)} className="flex items-center gap-3" aria-label={`House of Falacha, ${t.common.home}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lotus.png" alt="" width={207} height={153} className="h-9 w-auto" />
          <span className="lettrage hidden text-lg text-or-fonce sm:inline">House of Falacha</span>
        </a>

        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="border-b border-transparent py-1 text-[0.95rem] hover:border-or">
              {item.label}
            </a>
          ))}
          <LangSwitch />
          <CartLink />
        </nav>

        <div className="flex items-center gap-2 xl:hidden">
          <LangSwitch />
          <CartLink />
          <details className="relative">
            <summary className="btn btn-contour cursor-pointer list-none px-4 py-2">{t.common.menu}</summary>
            <div className="absolute right-0 mt-2 w-60 border border-or/50 bg-blanc py-2 shadow-lg">
              {nav.map((item) => (
                <a key={item.href} href={item.href} className="block px-5 py-3 hover:bg-lin">
                  {item.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}

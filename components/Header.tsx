import { Lotus } from "./Logo";
import { CartLink } from "./Cart";
import { nav } from "@/lib/content";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-or/40 bg-blanc/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="/" className="flex items-center gap-3" aria-label="House of Falacha, accueil">
          <Lotus className="h-9 w-12" />
          <span className="lettrage hidden text-lg text-or-fonce sm:inline">House of Falacha</span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="border-b border-transparent py-1 text-[0.95rem] hover:border-or">
              {item.label}
            </a>
          ))}
          <CartLink />
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <CartLink />
          <details className="relative">
            <summary className="btn btn-contour cursor-pointer list-none px-4 py-2">Menu</summary>
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

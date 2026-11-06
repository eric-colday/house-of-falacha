"use client";

import { useEffect } from "react";

/*
  Apparition au défilement, sur tout le site.
  - Les éléments marqués data-r (ou data-r="mask" pour une image qui glisse dans son cadre) apparaissent
    quand ils entrent à l'écran.
  - Pour ne pas annoter chaque page à la main, les blocs de contenu des sections (hors hero) sont
    marqués automatiquement, avec un léger décalage entre voisins (data-d 1 à 3).
*/
const AUTO = [
  "main section:not([data-hero]) h2",
  "main section:not([data-hero]) > div > p",
  "main section:not([data-hero]) > div > div > p",
  "main section:not([data-hero]) ol > li",
  "main section:not([data-hero]) ul > li",
  "main section:not([data-hero]) article",
  "main section:not([data-hero]) .couture",
  "main section:not([data-hero]) form",
  "main section:not([data-hero]) dl",
].join(",");

export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const marque = (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>(AUTO).forEach((el) => {
        if (el.dataset.r !== undefined || el.closest("[data-r]") || el.closest("[data-no-r]")) return;
        el.dataset.r = "";
        const freres = el.parentElement ? Array.from(el.parentElement.children) : [];
        const i = freres.indexOf(el);
        if (i > 0) el.dataset.d = String(Math.min(i, 3));
      });
      root.querySelectorAll<HTMLElement>("[data-r]:not(.in)").forEach((el) => io.observe(el));
    };

    marque(document);
    // La galerie et le panier changent leur contenu après coup : on marque aussi les nouveaux blocs.
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n instanceof HTMLElement && marque(n.parentElement ?? n));
    });
    const main = document.querySelector("main");
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

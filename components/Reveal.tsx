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
        // Les blocs qui entrent ensemble arrivent l'un après l'autre, sans se bousculer.
        const visibles = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left);
        visibles.forEach((e, i) => {
          const el = e.target as HTMLElement;
          const voisin = Number(el.dataset.d ?? 0) * 0.15;
          const delai = Math.min(0.12 + i * 0.16 + voisin, 1.1);
          el.style.setProperty("--r-delai", `${delai.toFixed(2)}s`);
          el.classList.add("in");
          // Une fois arrivé, on retire le délai pour que le survol reste vif.
          window.setTimeout(() => el.style.removeProperty("--r-delai"), (delai + 2) * 1000);
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.1 },
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

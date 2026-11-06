"use client";

import { useEffect, useState } from "react";

/** En-tête posé sur le hero : transparent en haut de page, fond nuit dès qu'on défile. */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [plein, setPlein] = useState(false);
  useEffect(() => {
    const onScroll = () => setPlein(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        plein ? "border-b border-or/40 bg-blanc/92 backdrop-blur" : "bg-gradient-to-b from-abysse/70 to-transparent"
      }`}
    >
      {children}
    </header>
  );
}

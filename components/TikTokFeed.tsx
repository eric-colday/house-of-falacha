"use client";

import { useEffect } from "react";
import { site } from "@/lib/content";

/**
 * Intégration officielle « profil créateur » de TikTok : affiche automatiquement
 * les dernières vidéos publiées sur @house.of.falacha, sans rien mettre à jour à la main.
 */
export function TikTokFeed() {
  useEffect(() => {
    const id = "tiktok-embed-script";
    document.getElementById(id)?.remove();
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://www.tiktok.com/embed.js";
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const handle = site.tiktokHandle.replace("@", "");
  return (
    <div className="mx-auto max-w-[780px] overflow-hidden bg-blanc">
      <blockquote
        className="tiktok-embed"
        cite={site.tiktok}
        data-unique-id={handle}
        data-embed-type="creator"
        style={{ maxWidth: 780, minWidth: 288, margin: 0 }}
      >
        <section className="p-8 text-center text-marine">
          <a target="_blank" rel="noreferrer" href={site.tiktok} className="font-bold underline">
            {site.tiktokHandle}
          </a>
          <p className="mt-2 text-sm text-ardoise">Chargement des dernières vidéos…</p>
        </section>
      </blockquote>
    </div>
  );
}

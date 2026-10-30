"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/Lang";
import { Lotus } from "@/components/Logo";
import { locale } from "@/lib/i18n";
import type { Photo, TikTokPost } from "@/lib/galerie";

function useDateCourte() {
  const { lang } = useLang();
  return (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString(locale(lang), { day: "numeric", month: "long", year: "numeric" });
}

function CarteTikTok({ post }: { post: TikTokPost }) {
  const { lang, t } = useLang();
  const dateCourte = useDateCourte();
  const title = post.title[lang];
  const forme = "relative block aspect-[9/16] w-full max-w-full overflow-hidden rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/40";

  // Carrousel de photos : TikTok ne permet pas de l'intégrer, on ouvre la publication.
  const legende = (
    <figcaption className="mt-3 px-1">
      <span className="block text-sm text-or-fonce">{dateCourte(post.date)}</span>
      <span className="font-medium leading-snug">{title}</span>
    </figcaption>
  );

  if (post.type === "photo") {
    return (
      <figure>
        <a href={post.url} target="_blank" rel="noreferrer" className={`${forme} group bg-abysse`} aria-label={`${title}, ${t.galerie.seePhotos} (TikTok)`}>
          <div className="cotes absolute inset-0 opacity-40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5" >
            <Lotus className="h-16 w-24" />
            <span className="rounded-full border border-ivoire/70 px-4 py-2 text-sm text-ivoire transition group-hover:bg-or group-hover:text-nuit">
              {t.galerie.seePhotos}
            </span>
          </div>
        </a>
        {legende}
      </figure>
    );
  }

  // Vidéo : lecteur officiel TikTok, chargé seulement quand la carte approche de l'écran.
  return (
    <figure>
      <div className={`${forme} bg-abysse`}>
        <iframe
          src={`https://www.tiktok.com/player/v1/${post.id}?rel=0&description=0&music_info=0&controls=1&progress_bar=1`}
          title={title}
          loading="lazy"
          allow="fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {legende}
    </figure>
  );
}

function Visionneuse({ photos, index, onClose, onMove }: { photos: Photo[]; index: number; onClose: () => void; onMove: (i: number) => void }) {
  const { lang, t } = useLang();
  const photo = photos[index];
  const alt = photo.alt[lang];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onMove((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onMove((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, photos.length, onClose, onMove]);

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[100] flex flex-col bg-abysse/95 p-4 text-ivoire" onClick={onClose}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-ivoire/70 tabular-nums">{index + 1} / {photos.length}</span>
        <button type="button" onClick={onClose} className="btn btn-or px-4 py-2">{t.galerie.close}</button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 py-4" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => onMove((index - 1 + photos.length) % photos.length)} className="hidden h-12 w-12 shrink-0 rounded-full border border-ivoire/40 sm:block" aria-label={t.galerie.prev}>‹</button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={alt} className="max-h-full min-w-0 max-w-full rounded-[2rem_0.3rem_2rem_0.3rem] object-contain" />
        <button type="button" onClick={() => onMove((index + 1) % photos.length)} className="hidden h-12 w-12 shrink-0 rounded-full border border-ivoire/40 sm:block" aria-label={t.galerie.next}>›</button>
      </div>
      <p className="text-center text-ivoire/80">{alt}</p>
    </div>
  );
}

export function Galerie({ themes, posts, photos }: { themes: string[]; posts: TikTokPost[]; photos: Photo[] }) {
  const { lang, t: dict } = useLang();
  const g = dict.galerie;
  const [theme, setTheme] = useState<string>("Tout");
  const [ouverte, setOuverte] = useState<number | null>(null);

  const postsFiltres = theme === "Tout" ? posts : posts.filter((p) => p.theme === theme);
  const photosFiltrees = theme === "Tout" ? photos : photos.filter((p) => p.theme === theme);
  const filtres = ["Tout", ...themes];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-wrap gap-2" role="group" aria-label={g.filter}>
        {filtres.map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={theme === t}
            onClick={() => setTheme(t)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              theme === t ? "border-or bg-or text-nuit" : "border-or/60 hover:border-marine"
            }`}
          >
            {t === "Tout" ? g.all : g.themes[t] ?? t}
          </button>
        ))}
      </div>

      {photosFiltrees.length > 0 && (
        <section className="mt-12">
          <h2 className="lettrage text-xl text-or-fonce">{g.photos}</h2>
          <div className="mt-6 columns-2 gap-4 md:columns-3 lg:columns-4">
            {photosFiltrees.map((p) => (
              <button
                key={p.src}
                type="button"
                onClick={() => setOuverte(photos.indexOf(p))}
                className="mb-4 block w-full overflow-hidden rounded-[1.8rem_0.3rem_1.8rem_0.3rem] border border-or/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt[lang]} loading="lazy" className="w-full transition duration-300 hover:scale-[1.03]" />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="lettrage text-xl text-or-fonce">{g.videos}</h2>
          <p className="text-sm text-ardoise">{g.posts(postsFiltres.length)}</p>
        </div>
        {postsFiltres.length === 0 ? (
          <p className="mt-6 text-ardoise">{g.empty}</p>
        ) : (
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {postsFiltres.map((p) => (
              <li key={p.id}>
                <CarteTikTok post={p} />
              </li>
            ))}
          </ul>
        )}
      </section>

      {ouverte !== null && photos[ouverte] && (
        <Visionneuse photos={photos} index={ouverte} onClose={() => setOuverte(null)} onMove={setOuverte} />
      )}
    </div>
  );
}

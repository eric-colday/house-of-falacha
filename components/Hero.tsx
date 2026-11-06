/*
  Hero de page, inspiré des grandes ouvertures « éditoriales » :
  photo plein cadre assombrie, fil d'Ariane, sur-titre doré précédé d'un trait,
  titre sur trois lignes dont celle du milieu en italique or, intro sous un filet,
  boutons à droite et repère vertical « Découvrir ».
  Variante « partage » : texte sur fond nuit à gauche, photo à droite fondue dans le noir.
*/

type Cta = { href: string; label: string; contour?: boolean };

export type HeroProps = {
  lignes: [string, string, string];
  eyebrow: string;
  intro?: string;
  photo: string;
  /** Cadrage de la photo (object-position), ex. "50% 30%". */
  focus?: string;
  crumbs?: { label: string; href?: string }[];
  ctas?: Cta[];
  discover?: string;
  variant?: "plein" | "partage";
  compact?: boolean;
};

function Titre({ lignes }: { lignes: [string, string, string] }) {
  return (
    <h1 className="text-[clamp(2.7rem,7.4vw,6.4rem)] font-light leading-[0.98] tracking-[-0.01em] text-ivoire">
      <span className="hero-ligne"><span>{lignes[0]}</span></span>
      <span className="hero-ligne pl-[0.9em] font-light italic text-or-fonce"><span>{lignes[1]}</span></span>
      <span className="hero-ligne pl-[0.45em]"><span>{lignes[2]}</span></span>
    </h1>
  );
}

function Haut({ crumbs, eyebrow }: { crumbs?: HeroProps["crumbs"]; eyebrow: string }) {
  return (
    <>
      {crumbs && crumbs.length > 0 && (
        <nav aria-label="Fil d'Ariane" className="hero-fade mb-6 text-[0.7rem] uppercase tracking-[0.22em] text-ivoire/60">
          {crumbs.map((c, i) => (
            <span key={c.label}>
              {i > 0 && <span className="px-2">—</span>}
              {c.href ? (
                <a href={c.href} className="hover:text-or-clair">{c.label}</a>
              ) : (
                <span aria-current="page">{c.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <p className="hero-fade mb-7 flex items-center gap-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-or">
        <span aria-hidden className="h-px w-10 bg-or" />
        {eyebrow}
      </p>
    </>
  );
}

function Boutons({ ctas }: { ctas?: Cta[] }) {
  if (!ctas || ctas.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {ctas.map((c) => (
        <a key={c.href + c.label} href={c.href} className={`btn ${c.contour ? "btn-contour" : "btn-marine"}`}>
          {c.label}
          {!c.contour && <span aria-hidden className="fleche ml-1">→</span>}
        </a>
      ))}
    </div>
  );
}

function Decouvrir({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <a
      href="#suite"
      className="absolute bottom-10 right-6 hidden flex-col items-center gap-4 text-[0.62rem] uppercase tracking-[0.35em] text-ivoire/70 hover:text-or-clair md:flex"
    >
      <span className="[writing-mode:vertical-rl]">{label}</span>
      <span aria-hidden className="goutte h-[70px] w-px bg-gradient-to-b from-or to-transparent" />
    </a>
  );
}

export function Hero({ lignes, eyebrow, intro, photo, focus = "50% 50%", crumbs, ctas, discover, variant = "plein", compact }: HeroProps) {
  const hauteur = compact ? "min-h-[64svh]" : "min-h-[92svh]";

  if (variant === "partage") {
    return (
      <>
        <section data-hero className={`relative grid overflow-hidden border-b border-or/40 bg-abysse md:grid-cols-2 ${hauteur}`}>
          <div className="relative order-2 flex items-end px-4 pb-14 pt-10 sm:px-6 md:order-1 md:pb-20 md:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] md:pt-36">
            <div className="max-w-xl">
              <Haut crumbs={crumbs} eyebrow={eyebrow} />
              <Titre lignes={lignes} />
              {intro && <p className="hero-fade-2 couture mt-10 pt-6 text-lg text-ivoire/80">{intro}</p>}
              {ctas && <div className="hero-fade-2 mt-8"><Boutons ctas={ctas} /></div>}
            </div>
          </div>
          <div className="relative order-1 min-h-[52svh] overflow-hidden md:order-2 md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="" fetchPriority="high" className="hero-zoom absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }} />
            <div className="absolute inset-0 bg-gradient-to-t from-abysse via-transparent to-abysse/40 md:bg-gradient-to-r md:from-abysse md:via-abysse/10 md:to-transparent" />
          </div>
          <Decouvrir label={discover} />
        </section>
        <div id="suite" />
      </>
    );
  }

  return (
    <>
      <section data-hero className={`relative flex items-end overflow-hidden border-b border-or/40 bg-abysse ${hauteur}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" fetchPriority="high" className="hero-zoom absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }} />
        <div className="absolute inset-0 bg-gradient-to-t from-abysse via-abysse/55 to-abysse/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-abysse/80 via-abysse/30 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 pt-36 sm:px-6 md:pb-16">
          <Haut crumbs={crumbs} eyebrow={eyebrow} />
          <Titre lignes={lignes} />
          {(intro || ctas) && (
            <div className="hero-fade-2 mt-12 grid gap-8 border-t border-ivoire/20 pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
              {intro ? <p className="max-w-xl text-[1.05rem] leading-relaxed text-ivoire/80">{intro}</p> : <span />}
              <Boutons ctas={ctas} />
            </div>
          )}
        </div>
        <Decouvrir label={discover} />
      </section>
      <div id="suite" />
    </>
  );
}

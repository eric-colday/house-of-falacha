// Lotus House of Falacha, redessiné d'après le logo brodé : deux ailes de trois pétales pointus,
// côtelés comme du fil de broderie, or avec contour bleu marine.
// Pour utiliser le fichier officiel : déposer /public/logo.png et l'afficher à la place.

type Petal = { angle: number; length: number; width: number };

// De l'arrière (pétale intérieur, le plus haut) vers l'avant (pétale extérieur, le plus large).
const PETALS: Petal[] = [
  { angle: 21, length: 54, width: 20 },
  { angle: 36, length: 57, width: 24 },
  { angle: 52, length: 60, width: 29 },
];

/** Pétale asymétrique : bord intérieur presque droit, bord extérieur bombé, pointe effilée. */
function leaf(length: number, width: number) {
  const L = length;
  const W = width;
  return `M0 0 C ${-W * 1.05} ${-L * 0.22} ${-W * 0.85} ${-L * 0.78} 0 ${-L} C ${W * 0.12} ${-L * 0.75} ${W * 0.2} ${-L * 0.35} 0 0 Z`;
}

/** Côte de broderie : une courbe de la base à la pointe, plus ou moins bombée. */
function rib(length: number, width: number, k: number) {
  const L = length;
  const W = width * k;
  return `M0 0 C ${-W * 1.05} ${-L * 0.22} ${-W * 0.85} ${-L * 0.78} 0 ${-L}`;
}

function Wing({ side, animated }: { side: 1 | -1; animated: boolean }) {
  return (
    <g transform={`translate(${50 + side * 1.8} 84) scale(${side} 1)`}>
      {PETALS.map((p, i) => (
        <g key={i} transform={`rotate(${-p.angle})`}>
          <g className={animated ? "petale" : undefined} style={animated ? { animationDelay: `${0.15 + (2 - i) * 0.14}s` } : undefined}>
            <path d={leaf(p.length, p.width)} fill="var(--logo-or, #b8955a)" stroke="var(--logo-trait, #1b2033)" strokeWidth="1.6" strokeLinejoin="round" />
            {[0.12, 0.3, 0.48, 0.66, 0.84].map((k) => (
              <path key={k} d={rib(p.length, p.width, k)} fill="none" stroke="var(--logo-trait, #1b2033)" strokeWidth="0.8" strokeLinecap="round" />
            ))}
          </g>
        </g>
      ))}
    </g>
  );
}

export function Lotus({ className = "h-10 w-10", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="-8 14 116 74" className={className} aria-hidden="true">
      <Wing side={-1} animated={animated} />
      <Wing side={1} animated={animated} />
    </svg>
  );
}

/** Logo complet : lotus + « House of Falacha » en escalier, comme sur la broderie. */
export function LogoComplet({ className = "", animated = false }: { className?: string; animated?: boolean }) {
  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <Lotus className="w-full" animated={animated} />
      <p className="escalier mt-[4%] text-or" style={{ fontSize: "0.17em" }} aria-label="House of Falacha">
        <span>House</span>
        <span>of</span>
        <span>Falacha</span>
      </p>
    </div>
  );
}

// Compatibilité avec les anciens imports
export const Logo = Lotus;

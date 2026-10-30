import { Lotus } from "./Logo";

// Visuel de produit en attendant les vraies photos.
// Pour une photo : ajoute "image": "/produits/mon-produit.jpg" dans data/catalog.json et affiche-la ici.
const shapes: Record<string, string> = {
  tshirt: "M30 18 L42 12 Q50 20 58 12 L70 18 L82 32 L72 40 L68 34 L68 88 L32 88 L32 34 L28 40 L18 32 Z",
  cap: "M18 64 Q20 34 50 32 Q80 34 82 64 Z M14 64 L92 64 Q92 72 82 72 L14 72 Z",
  bag: "M28 36 L72 36 L76 88 L24 88 Z M38 36 Q38 18 50 18 Q62 18 62 36",
  bracelet: "M50 26 A26 26 0 1 1 49.9 26 Z M50 36 A16 16 0 1 0 50.1 36 Z",
};

export function ProductVisual({ visual, color }: { visual: string; color: string }) {
  const light = ["#ffffff", "#efe6d2"].includes(color.toLowerCase());
  return (
    <div className="relative flex aspect-square max-w-full items-center justify-center overflow-hidden bg-[#1c2240]">
      <svg viewBox="0 0 100 100" className="h-3/4 w-3/4 drop-shadow-md" aria-hidden="true">
        <path
          d={shapes[visual] ?? shapes.bag}
          fill={color}
          fillRule="evenodd"
          stroke={light ? "#8a6a35" : "#c4a266"}
          strokeWidth="1"
          strokeLinejoin="round"
        />
      </svg>
      {visual !== "bracelet" && (
        <div className="absolute left-1/2 top-[45%] -translate-x-1/2">
          <Lotus className="h-7 w-10" />
        </div>
      )}
    </div>
  );
}

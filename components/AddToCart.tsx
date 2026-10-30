"use client";

import { useState } from "react";
import { useCart } from "./Cart";

type Variant = { variant: string; sku: string; stock: number };

export function AddToCart({ name, price, variants }: { name: string; price: number; variants: Variant[] }) {
  const { add, items } = useCart();
  const firstAvailable = variants.find((v) => v.stock > 0);
  const [selected, setSelected] = useState(firstAvailable?.sku ?? "");
  const [added, setAdded] = useState(false);

  const current = variants.find((v) => v.sku === selected);
  const inCart = items.find((i) => i.sku === selected)?.qty ?? 0;
  const canAdd = current && current.stock > inCart;
  const hasSizes = !(variants.length === 1 && variants[0].variant === "unique");

  if (!firstAvailable) {
    return <p className="btn btn-contour w-full opacity-50">Épuisé</p>;
  }

  return (
    <div className="space-y-3">
      {hasSizes && (
        <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Taille">
          {variants.map((v) => (
            <button
              key={v.sku}
              type="button"
              role="radio"
              aria-checked={selected === v.sku}
              disabled={v.stock === 0}
              onClick={() => setSelected(v.sku)}
              className={`h-11 min-w-11 rounded-full border px-3 font-medium disabled:cursor-not-allowed disabled:opacity-30 disabled:line-through ${
                selected === v.sku ? "border-or bg-or text-nuit" : "border-or/60 hover:border-marine"
              }`}
            >
              {v.variant}
            </button>
          ))}
        </div>
      )}
      <p className={`text-sm ${current && current.stock <= 5 ? "font-medium text-or-fonce" : "text-ardoise"}`}>
        {current && current.stock <= 5 ? `Plus que ${current.stock} en stock` : `${current?.stock} en stock`}
      </p>
      <button
        type="button"
        disabled={!canAdd}
        onClick={() => {
          if (!current) return;
          add({ sku: current.sku, name, price, detail: hasSizes ? `Taille ${current.variant}` : "Taille unique" });
          setAdded(true);
          setTimeout(() => setAdded(false), 1800);
        }}
        className={`btn w-full ${added ? "btn-or" : "btn-marine"}`}
      >
        {added ? "Ajouté au panier" : canAdd ? "Ajouter au panier" : "Tout le stock est dans ton panier"}
      </button>
    </div>
  );
}

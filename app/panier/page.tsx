"use client";

import { useState } from "react";
import { startCheckout, useCart } from "@/components/Cart";
import { formatPrice } from "@/lib/catalog";

export default function Panier() {
  const { items, setQty, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="lettrage text-or-fonce text-[clamp(2.4rem,6vw,4rem)]">Ton panier</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 p-10">
          <p className="text-lg">Ton panier est vide.</p>
          <a href="/boutique" className="btn btn-marine mt-6">Voir la boutique</a>
        </div>
      ) : (
        <>
          <ul className="mt-8 border-t border-or/50">
            {items.map((item) => (
              <li key={item.sku} className="flex flex-wrap items-center gap-4 couture py-5">
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-ardoise">{item.detail}</p>
                </div>
                <div className="flex items-center" aria-label={`Quantité de ${item.name}`}>
                  <button type="button" onClick={() => setQty(item.sku, item.qty - 1)} className="h-10 w-10 rounded-full border border-or/60 hover:border-marine" aria-label="Retirer un">−</button>
                  <span className="w-10 text-center font-medium tabular-nums">{item.qty}</span>
                  <button type="button" onClick={() => setQty(item.sku, item.qty + 1)} className="h-10 w-10 rounded-full border border-or/60 hover:border-marine" aria-label="Ajouter un">+</button>
                </div>
                <p className="w-24 text-right font-medium tabular-nums">{formatPrice(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-baseline justify-between">
            <span className="lettrage text-or-fonce">Total</span>
            <span className="text-4xl font-light tabular-nums">{formatPrice(total)}</span>
          </div>

          <p className="mt-6 rounded-[1.5rem_0.3rem_1.5rem_0.3rem] bg-lin p-5 text-ardoise">
            <strong className="font-medium text-marine">Retrait sur place.</strong> Pas de livraison : tu récupères ta commande au stand House of Falacha le jour
            de l'événement, sur présentation de ton e-mail de confirmation.
          </p>

          {error && <p role="alert" className="mt-4 font-medium text-or-fonce">{error}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={async () => {
                setLoading(true);
                setError("");
                try {
                  await startCheckout(items.map(({ sku, qty }) => ({ sku, qty })));
                } catch (e) {
                  setError((e as Error).message);
                  setLoading(false);
                }
              }}
              className="btn btn-marine flex-1"
            >
              {loading ? "Redirection vers Stripe…" : "Payer avec Stripe"}
            </button>
            <button type="button" onClick={clear} className="btn btn-contour">
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
}

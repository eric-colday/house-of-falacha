"use client";

import { useState } from "react";
import { startCheckout, useCart } from "@/components/Cart";
import { useLang } from "@/components/Lang";
import { formatPrice } from "@/lib/catalog";

export default function Panier() {
  const { lang, t, href } = useLang();
  const p = t.panier;
  const { items, setQty, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20">
      <h1 className="lettrage text-or-fonce text-[clamp(2.4rem,6vw,4rem)]">{p.title}</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 p-10">
          <p className="text-lg">{p.empty}</p>
          <a href={href("/boutique")} className="btn btn-marine mt-6">{p.shop}</a>
        </div>
      ) : (
        <>
          <ul className="mt-8 border-t border-or/50">
            {items.map((item) => (
              <li key={item.sku} className="couture flex flex-wrap items-center gap-4 py-5">
                <div className="min-w-0 flex-1">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p className="text-ardoise">{item.detail}</p>
                </div>
                <div className="flex items-center" aria-label={p.qty(item.name)}>
                  <button type="button" onClick={() => setQty(item.sku, item.qty - 1)} className="h-10 w-10 rounded-full border border-or/60 hover:border-marine" aria-label={p.minus}>−</button>
                  <span className="w-10 text-center font-medium tabular-nums">{item.qty}</span>
                  <button type="button" onClick={() => setQty(item.sku, item.qty + 1)} className="h-10 w-10 rounded-full border border-or/60 hover:border-marine" aria-label={p.plus}>+</button>
                </div>
                <p className="w-24 text-right font-medium tabular-nums">{formatPrice(item.price * item.qty, lang)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-baseline justify-between">
            <span className="lettrage text-or-fonce">{p.total}</span>
            <span className="text-4xl font-light tabular-nums">{formatPrice(total, lang)}</span>
          </div>

          <p className="mt-6 rounded-[1.5rem_0.3rem_1.5rem_0.3rem] bg-lin p-5 text-ardoise">
            <strong className="font-medium text-marine">{t.shop.retraitTitle}</strong> {t.shop.retraitText}
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
                  await startCheckout(items.map(({ sku, qty }) => ({ sku, qty })), lang, t.errors.start);
                } catch (e) {
                  setError((e as Error).message);
                  setLoading(false);
                }
              }}
              className="btn btn-marine flex-1"
            >
              {loading ? p.paying : p.pay}
            </button>
            <button type="button" onClick={clear} className="btn btn-contour">{p.clear}</button>
          </div>
        </>
      )}
    </div>
  );
}

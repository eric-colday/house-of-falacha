"use client";

import { useState } from "react";
import { startCheckout } from "./Cart";
import { useLang } from "./Lang";

export function ReserveWorkshop({ sku, remaining }: { sku: string; remaining: number }) {
  const { lang, t } = useLang();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (remaining <= 0) {
    return <p className="btn btn-contour w-full opacity-50">{t.events.full}</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <label htmlFor={`qty-${sku}`} className="sr-only">{t.events.seatsLabel}</label>
        <select
          id={`qty-${sku}`}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="h-[3.1rem] rounded-full border border-or/60 bg-blanc px-4"
        >
          {Array.from({ length: Math.min(remaining, 6) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{t.events.seats(n)}</option>
          ))}
        </select>
        <button
          type="button"
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setError("");
            try {
              await startCheckout([{ sku, qty }], lang, t.errors.start);
            } catch (e) {
              setError((e as Error).message);
              setLoading(false);
            }
          }}
          className="btn btn-marine flex-1"
        >
          {loading ? t.events.redirect : t.events.reserve}
        </button>
      </div>
      {error && <p role="alert" className="text-sm font-medium text-or-fonce">{error}</p>}
    </div>
  );
}

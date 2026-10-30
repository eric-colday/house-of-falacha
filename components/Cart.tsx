"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItem = { sku: string; name: string; detail: string; price: number; qty: number };

type CartContext = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartContext | null>(null);
const KEY = "hof-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (next: CartItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };

  const value: CartContext = {
    items,
    add: (item, qty = 1) => {
      const existing = items.find((i) => i.sku === item.sku);
      save(
        existing
          ? items.map((i) => (i.sku === item.sku ? { ...i, qty: i.qty + qty } : i))
          : [...items, { ...item, qty }],
      );
    },
    setQty: (sku, qty) => save(qty <= 0 ? items.filter((i) => i.sku !== sku) : items.map((i) => (i.sku === sku ? { ...i, qty } : i))),
    clear: () => save([]),
    count: items.reduce((n, i) => n + i.qty, 0),
    total: items.reduce((n, i) => n + i.qty * i.price, 0),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}

export function CartLink() {
  const { count } = useCart();
  return (
    <a href="/panier" className="btn btn-marine px-4 py-2">
      Panier
      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-or px-1.5 text-xs text-marine tabular-nums">{count}</span>
    </a>
  );
}

/** Envoie des articles à Stripe Checkout et redirige vers la page de paiement. */
export async function startCheckout(items: { sku: string; qty: number }[]) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.url) throw new Error(data.error ?? "Le paiement n'a pas pu démarrer. Réessaie.");
  window.location.href = data.url;
}

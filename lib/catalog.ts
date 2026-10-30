import catalog from "@/data/catalog.json";
import { locale, type Lang, type Localized } from "./i18n";

export type Product = {
  id: string;
  name: Localized;
  category: Localized;
  description: Localized;
  price: number;
  color: string;
  visual: string;
  photo?: string;
  stock: Record<string, number>;
};

export type Workshop = {
  id: string;
  title: Localized;
  subtitle: Localized;
  date: string;
  time: string | null;
  place: string;
  level: Localized;
  photo?: string;
  reservationsOuvertes: boolean;
  price: number | null;
  capacity: number | null;
};

export const currency = catalog.currency;
export const boutiqueOuverte: boolean = catalog.boutiqueOuverte;
export const products = catalog.products as unknown as Product[];
export const workshops = catalog.workshops as unknown as Workshop[];

export type Sku = string;

export function productSku(productId: string, variant: string): Sku {
  return variant === "unique" ? productId : `${productId}--${variant}`;
}

export function workshopSku(workshopId: string): Sku {
  return `ws-${workshopId}`;
}

export type SkuInfo = {
  sku: Sku;
  kind: "produit" | "workshop";
  name: Localized;
  variant: string;
  price: number;
  initialStock: number;
  date?: string;
};

/** Articles réellement vendables : boutique ouverte et événements ouverts à la réservation. */
export function allSkus(): SkuInfo[] {
  const list: SkuInfo[] = [];
  if (boutiqueOuverte) {
    for (const p of products) {
      for (const [variant, qty] of Object.entries(p.stock)) {
        list.push({ sku: productSku(p.id, variant), kind: "produit", name: p.name, variant, price: p.price, initialStock: qty });
      }
    }
  }
  for (const w of workshops) {
    if (!w.reservationsOuvertes || w.price == null || w.capacity == null) continue;
    list.push({ sku: workshopSku(w.id), kind: "workshop", name: w.title, variant: "", price: w.price, initialStock: w.capacity, date: w.date });
  }
  return list;
}

export function findSku(sku: Sku): SkuInfo | undefined {
  return allSkus().find((s) => s.sku === sku);
}

export function formatPrice(cents: number, lang: Lang = "fr") {
  return new Intl.NumberFormat(locale(lang), { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

/** « Dimanche 7 mars 2027 » / « Domenica 7 marzo 2027 » : majuscule sur le premier mot seulement. */
export function formatDate(iso: string, lang: Lang = "fr") {
  const s = new Intl.DateTimeFormat(locale(lang), { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00`),
  );
  return s.charAt(0).toUpperCase() + s.slice(1);
}

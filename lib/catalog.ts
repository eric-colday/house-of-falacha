import catalog from "@/data/catalog.json";

export type Product = (typeof catalog.products)[number];
export type Workshop = (typeof catalog.workshops)[number];

export const currency = catalog.currency;
export const products: Product[] = catalog.products;
export const workshops: Workshop[] = catalog.workshops;

/** Un SKU identifie un article vendable : une taille d'un produit, ou une place de workshop. */
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
  name: string;
  detail: string;
  price: number;
  initialStock: number;
};

/** Tous les SKU du catalogue avec leur stock de départ. */
export function allSkus(): SkuInfo[] {
  const list: SkuInfo[] = [];
  for (const p of products) {
    for (const [variant, qty] of Object.entries(p.stock)) {
      list.push({
        sku: productSku(p.id, variant),
        kind: "produit",
        name: p.name,
        detail: variant === "unique" ? "Taille unique" : `Taille ${variant}`,
        price: p.price,
        initialStock: qty,
      });
    }
  }
  for (const w of workshops) {
    list.push({
      sku: workshopSku(w.id),
      kind: "workshop",
      name: w.title,
      detail: `${formatDate(w.date)} · ${w.time} · ${w.place}`,
      price: w.price,
      initialStock: w.capacity,
    });
  }
  return list;
}

export function findSku(sku: Sku): SkuInfo | undefined {
  return allSkus().find((s) => s.sku === sku);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: currency.toUpperCase() }).format(cents / 100);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00`),
  );
}

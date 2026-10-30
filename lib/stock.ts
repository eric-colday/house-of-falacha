import "server-only";
import { allSkus, type Sku } from "./catalog";
import { stripe } from "./stripe";

/**
 * Le stock vit dans Stripe : chaque SKU est un produit Stripe (même identifiant)
 * dont la métadonnée `stock` donne la quantité restante. `npm run stripe:sync` crée ces produits.
 * Sans clé Stripe, on affiche le stock de départ de data/catalog.json (mode démo).
 */
export async function getStock(): Promise<Record<Sku, number>> {
  const skus = allSkus();
  const result: Record<Sku, number> = Object.fromEntries(skus.map((s) => [s.sku, s.initialStock]));
  if (!stripe) return result;

  for await (const product of stripe.products.list({ limit: 100, active: true })) {
    if (product.id in result && product.metadata.stock !== undefined) {
      result[product.id] = Math.max(0, Number(product.metadata.stock) || 0);
    }
  }
  return result;
}

/** Retire les quantités vendues. Appelé par le webhook après un paiement réussi. */
export async function decrementStock(items: { sku: Sku; qty: number }[]) {
  if (!stripe) return;
  for (const { sku, qty } of items) {
    const product = await stripe.products.retrieve(sku);
    const current = Number(product.metadata.stock) || 0;
    await stripe.products.update(sku, { metadata: { stock: String(Math.max(0, current - qty)) } });
  }
}

/** Panier encodé dans les métadonnées de la session Stripe : "sku:qty,sku:qty". */
export function encodeItems(items: { sku: Sku; qty: number }[]) {
  return items.map((i) => `${i.sku}:${i.qty}`).join(",");
}

export function decodeItems(value: string | undefined) {
  if (!value) return [];
  return value.split(",").map((pair) => {
    const [sku, qty] = pair.split(":");
    return { sku, qty: Number(qty) || 0 };
  });
}

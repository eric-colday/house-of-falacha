// Crée dans Stripe un produit par article (taille) et par workshop, avec le stock de départ.
// Usage : npm run stripe:sync            → crée ce qui manque, ne touche pas au stock existant
//         npm run stripe:sync -- --reset → remet aussi le stock aux valeurs de data/catalog.json
import { readFileSync } from "node:fs";
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("STRIPE_SECRET_KEY manquante (ajoute-la dans .env.local).");
  process.exit(1);
}
const stripe = new Stripe(key);
const reset = process.argv.includes("--reset");
const catalog = JSON.parse(readFileSync(new URL("../data/catalog.json", import.meta.url), "utf8"));

const skus = [];
for (const p of catalog.products) {
  for (const [variant, qty] of Object.entries(p.stock)) {
    skus.push({
      id: variant === "unique" ? p.id : `${p.id}--${variant}`,
      name: variant === "unique" ? p.name : `${p.name} (${variant})`,
      stock: qty,
    });
  }
}
for (const w of catalog.workshops) {
  skus.push({ id: `ws-${w.id}`, name: `Place — ${w.title} (${w.date})`, stock: w.capacity });
}

for (const s of skus) {
  try {
    const existing = await stripe.products.retrieve(s.id);
    if (reset) {
      await stripe.products.update(s.id, { name: s.name, active: true, metadata: { stock: String(s.stock) } });
      console.log(`↺ ${s.id} → stock ${s.stock}`);
    } else {
      console.log(`= ${s.id} (stock actuel ${existing.metadata.stock ?? "?"})`);
    }
  } catch (err) {
    if (err?.code !== "resource_missing") throw err;
    await stripe.products.create({ id: s.id, name: s.name, metadata: { stock: String(s.stock) } });
    console.log(`+ ${s.id} → stock ${s.stock}`);
  }
}
console.log("Terminé.");

import type { Metadata } from "next";
import { AddToCart } from "@/components/AddToCart";
import { PageHero } from "@/components/Footer";
import { ProductVisual } from "@/components/ProductVisual";
import { formatPrice, productSku, products } from "@/lib/catalog";
import { getStock } from "@/lib/stock";

export const metadata: Metadata = { title: "Boutique" };
export const dynamic = "force-dynamic";

export default async function Boutique() {
  const stock = await getStock();
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <PageHero
        lignes={["La", "boutique", "de la maison"]}
        intro="T-shirts et accessoires brodés du lotus House of Falacha. Tu commandes ici, tu paies avec Stripe, tu récupères au prochain workshop."
      />

      <div className="border-b border-or/40">
        <p className="mx-auto max-w-7xl px-4 py-4 text-ardoise sm:px-6">
          <span className="font-medium text-marine">Retrait sur place.</span> Pas de livraison pour l'instant : ta commande t'attend au stand House of Falacha le jour de l'événement, sur présentation de ton e-mail de confirmation.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        {categories.map((cat) => (
          <section key={cat} className="mb-20 last:mb-0">
            <h2 className="lettrage mb-8 text-2xl text-or-fonce">{cat}</h2>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((p) => p.category === cat)
                .map((p) => {
                  const variants = Object.keys(p.stock).map((variant) => {
                    const sku = productSku(p.id, variant);
                    return { variant, sku, stock: stock[sku] ?? 0 };
                  });
                  return (
                    <article key={p.id} className="flex flex-col">
                      <div className="overflow-hidden rounded-[2rem_0.25rem_2rem_0.25rem] border border-or/40">
                        <ProductVisual visual={p.visual} color={p.color} />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 pt-5">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-xl font-medium leading-snug">{p.name}</h3>
                          <p className="whitespace-nowrap text-lg text-or-fonce">{formatPrice(p.price)}</p>
                        </div>
                        <p className="flex-1 text-ardoise">{p.description}</p>
                        <AddToCart name={p.name} price={p.price} variants={variants} />
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

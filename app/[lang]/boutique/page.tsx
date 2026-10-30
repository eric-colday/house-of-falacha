import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/AddToCart";
import { PageHero } from "@/components/Footer";
import { ProductVisual } from "@/components/ProductVisual";
import { boutiqueOuverte, formatPrice, productSku, products } from "@/lib/catalog";
import { getDict, isLang } from "@/lib/i18n";
import { getStock } from "@/lib/stock";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: isLang(lang) ? getDict(lang).nav.boutique : "Boutique" };
}

export default async function Boutique({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const s = t.shop;
  const stock = await getStock();
  const categories = [...new Set(products.map((p) => p.category[lang]))];

  return (
    <>
      <PageHero lignes={s.heroTitle} intro={s.heroText} photo="/galerie/equipe-tshirt-falacha.jpg" />

      <div className="border-b border-or/40">
        <p className="mx-auto max-w-7xl px-4 py-4 text-ardoise sm:px-6">
          {boutiqueOuverte ? (
            <>
              <span className="font-medium text-marine">{s.retraitTitle}</span> {s.retraitText}
            </>
          ) : (
            <>
              <span className="font-medium text-or-fonce">{s.closedTitle}</span> {s.closedText}
            </>
          )}
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20">
        {categories.map((cat) => (
          <section key={cat} className="mb-20 last:mb-0">
            <h2 className="lettrage mb-8 text-2xl text-or-fonce">{cat}</h2>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {products
                .filter((p) => p.category[lang] === cat)
                .map((p) => {
                  const variants = Object.keys(p.stock).map((variant) => {
                    const sku = productSku(p.id, variant);
                    return { variant, sku, stock: stock[sku] ?? 0 };
                  });
                  return (
                    <article key={p.id} className="flex flex-col">
                      <div className="relative overflow-hidden rounded-[2rem_0.25rem_2rem_0.25rem] border border-or/40">
                        <ProductVisual visual={p.visual} color={p.color} photo={p.photo} />
                        {!boutiqueOuverte && (
                          <span className="absolute left-3 top-3 rounded-full bg-or px-3 py-1 text-xs font-medium text-nuit">{t.common.soon}</span>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col gap-3 pt-5">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-xl font-medium leading-snug">{p.name[lang]}</h3>
                          {boutiqueOuverte && <p className="whitespace-nowrap text-lg text-or-fonce">{formatPrice(p.price, lang)}</p>}
                        </div>
                        <p className="flex-1 text-ardoise">{p.description[lang]}</p>
                        {boutiqueOuverte ? (
                          <AddToCart name={p.name[lang]} price={p.price} variants={variants} />
                        ) : (
                          <p className="btn btn-contour w-full cursor-default opacity-70">{t.common.soon}</p>
                        )}
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

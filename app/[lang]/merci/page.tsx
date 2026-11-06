import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClearCart } from "./ClearCart";
import { Hero } from "@/components/Hero";
import { formatPrice } from "@/lib/catalog";
import { getDict, isLang, l } from "@/lib/i18n";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = { title: "Merci · Grazie" };
export const dynamic = "force-dynamic";

export default async function Merci({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const m = getDict(lang).merci;
  const { session_id } = await searchParams;
  let name = "";
  let total = "";
  let lines: string[] = [];

  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items"] });
      if (session.payment_status === "paid") {
        name = session.customer_details?.name?.split(" ")[0] ?? "";
        total = formatPrice(session.amount_total ?? 0, lang);
        lines = session.line_items?.data.map((li) => `${li.quantity} × ${li.description}`) ?? [];
      }
    } catch {}
  }

  return (
    <>
      <ClearCart />
      <Hero
        compact
        eyebrow={getDict(lang).heros.merci.eyebrow}
        lignes={name ? [`${getDict(lang).heros.merci.lignes[0].replace(/,$/, "")} ${name},`, getDict(lang).heros.merci.lignes[1], getDict(lang).heros.merci.lignes[2]] : getDict(lang).heros.merci.lignes}
        intro={m.text}
        photo="/galerie/photo-de-groupe.jpg"
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {lines.length > 0 && (
          <ul className="max-w-lg border-t border-or/50">
            {lines.map((line) => (
              <li key={line} className="couture py-3">{line}</li>
            ))}
            <li className="couture flex justify-between py-3 text-lg font-medium"><span>{m.paid}</span><span>{total}</span></li>
          </ul>
        )}
        <p className="mt-6 text-ardoise">{getDict(lang).common.retrait}</p>
        <a href={l(lang)} className="btn btn-marine mt-8">{m.back}</a>
      </div>
    </>
  );
}

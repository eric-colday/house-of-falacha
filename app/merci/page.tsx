import type { Metadata } from "next";
import { ClearCart } from "./ClearCart";
import { stripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/catalog";

export const metadata: Metadata = { title: "Merci" };
export const dynamic = "force-dynamic";

export default async function Merci({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let name = "";
  let total = "";
  let lines: string[] = [];

  if (stripe && session_id) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items"] });
      if (session.payment_status === "paid") {
        name = session.customer_details?.name?.split(" ")[0] ?? "";
        total = formatPrice(session.amount_total ?? 0);
        lines = session.line_items?.data.map((l) => `${l.quantity} × ${l.description}`) ?? [];
      }
    } catch {}
  }

  return (
    <>
      <section className="border-b border-or/40 bg-lin">
        <ClearCart />
        <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6">
          <h1 className="escalier text-or-fonce text-[clamp(2.6rem,7vw,5rem)]"><span>Merci</span><span>{name || "à toi"}</span><span>!</span></h1>
          <p className="mt-6 max-w-xl text-lg text-ardoise">
            Ton paiement est confirmé. Stripe t'envoie un e-mail : garde-le, c'est ton billet pour les workshops et ton bon de retrait pour la boutique.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {lines.length > 0 && (
          <ul className="max-w-lg border-t border-or/50">
            {lines.map((l) => (
              <li key={l} className="couture py-3">{l}</li>
            ))}
            <li className="couture flex justify-between py-3 text-lg font-medium"><span>Total payé</span><span>{total}</span></li>
          </ul>
        )}
        <p className="mt-6 text-ardoise">Les articles se récupèrent sur place, le jour de l'événement.</p>
        <a href="/" className="btn btn-marine mt-8">Retour à l'accueil</a>
      </div>
    </>
  );
}

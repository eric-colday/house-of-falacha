import { NextResponse } from "next/server";
import { currency, findSku } from "@/lib/catalog";
import { encodeItems, getStock } from "@/lib/stock";
import { stripe } from "@/lib/stripe";

type Body = { items?: { sku: string; qty: number }[] };

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Le paiement en ligne n'est pas encore activé. Contacte-nous sur WhatsApp pour réserver." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as Body;
  const items = (body.items ?? []).filter((i) => i && typeof i.sku === "string" && Number.isInteger(i.qty) && i.qty > 0);
  if (items.length === 0) {
    return NextResponse.json({ error: "Ton panier est vide." }, { status: 400 });
  }

  const stock = await getStock();
  const lineItems = [];
  for (const item of items) {
    const info = findSku(item.sku);
    if (!info) return NextResponse.json({ error: "Un article n'existe plus. Vide ton panier et réessaie." }, { status: 400 });
    if ((stock[item.sku] ?? 0) < item.qty) {
      return NextResponse.json(
        { error: `Plus assez de stock pour « ${info.name} » (${info.detail}). Il en reste ${stock[item.sku] ?? 0}.` },
        { status: 409 },
      );
    }
    lineItems.push({
      quantity: item.qty,
      price_data: {
        currency,
        unit_amount: info.price,
        product_data: {
          name: info.kind === "workshop" ? `Place — ${info.name}` : info.name,
          description: info.detail,
          metadata: { sku: info.sku },
        },
      },
    });
  }

  const encoded = encodeItems(items);
  if (encoded.length > 500) {
    return NextResponse.json({ error: "Panier trop grand pour une seule commande. Sépare-le en deux." }, { status: 400 });
  }

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    phone_number_collection: { enabled: true },
    customer_creation: "always",
    metadata: { items: encoded },
    custom_text: {
      submit: {
        message:
          "Pas de livraison : les articles se récupèrent sur place, le jour de l'événement. Les places de workshop sont nominatives.",
      },
    },
    success_url: `${origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/panier`,
  });

  return NextResponse.json({ url: session.url });
}

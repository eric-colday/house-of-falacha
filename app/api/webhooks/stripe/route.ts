import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { decodeItems, decrementStock } from "@/lib/stock";
import { stripe } from "@/lib/stripe";

/** Stripe appelle cette adresse après chaque paiement : on retire les quantités vendues du stock. */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Signature manquante" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      await decrementStock(decodeItems(session.metadata?.items));
    }
  }

  return NextResponse.json({ received: true });
}

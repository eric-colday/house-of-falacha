import { NextResponse } from "next/server";
import { currency, findSku } from "@/lib/catalog";
import { getDict, isLang, l, type Lang } from "@/lib/i18n";
import { encodeItems, getStock } from "@/lib/stock";
import { stripe } from "@/lib/stripe";

type Body = { items?: { sku: string; qty: number }[]; lang?: string };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const lang: Lang = body.lang && isLang(body.lang) ? body.lang : "fr";
  const t = getDict(lang);

  if (!stripe) return NextResponse.json({ error: t.errors.stripeOff }, { status: 503 });

  const items = (body.items ?? []).filter((i) => i && typeof i.sku === "string" && Number.isInteger(i.qty) && i.qty > 0);
  if (items.length === 0) return NextResponse.json({ error: t.errors.empty }, { status: 400 });

  const stock = await getStock();
  const lineItems = [];
  for (const item of items) {
    const info = findSku(item.sku);
    if (!info) return NextResponse.json({ error: t.errors.gone }, { status: 400 });
    const left = stock[item.sku] ?? 0;
    if (left < item.qty) return NextResponse.json({ error: t.errors.stock(info.name[lang], left) }, { status: 409 });
    const detail =
      info.kind === "workshop"
        ? info.date ?? ""
        : info.variant === "unique"
          ? t.shop.oneSize
          : t.shop.sizeLabel(info.variant);
    lineItems.push({
      quantity: item.qty,
      price_data: {
        currency,
        unit_amount: info.price,
        product_data: { name: info.name[lang], description: detail, metadata: { sku: info.sku } },
      },
    });
  }

  const encoded = encodeItems(items);
  if (encoded.length > 500) return NextResponse.json({ error: t.errors.tooBig }, { status: 400 });

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: lang,
    line_items: lineItems,
    phone_number_collection: { enabled: true },
    customer_creation: "always",
    metadata: { items: encoded, lang },
    custom_text: { submit: { message: t.errors.pickup } },
    success_url: `${origin}${l(lang, "/merci")}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}${l(lang, "/panier")}`,
  });

  return NextResponse.json({ url: session.url });
}

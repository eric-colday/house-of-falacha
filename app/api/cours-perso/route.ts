import { NextResponse } from "next/server";
import { getDict, isLang } from "@/lib/i18n";

/**
 * Envoie la demande de cours personnalisé dans HubSpot (API Forms v3, sans clé privée).
 * Variables : HUBSPOT_PORTAL_ID et HUBSPOT_FORM_ID (le formulaire doit contenir les champs
 * firstname, lastname, email, phone, city et message).
 */
export async function POST(request: Request) {
  const data = (await request.json().catch(() => null)) as Record<string, string> | null;
  const t = getDict(data?.lang && isLang(data.lang) ? data.lang : "fr");
  if (!data) return NextResponse.json({ error: t.errors.required }, { status: 400 });

  const required = ["firstname", "email", "phone", "city", "type"];
  const missing = required.filter((k) => !data[k]?.trim());
  if (missing.length) return NextResponse.json({ error: t.errors.required }, { status: 400 });
  if (!/^\S+@\S+\.\S+$/.test(data.email)) return NextResponse.json({ error: t.errors.email }, { status: 400 });

  const message = [
    `Langue du site : ${data.lang ?? "fr"}`,
    `Type de cours : ${data.type}`,
    `Occasion : ${data.occasion || "—"}`,
    `Date souhaitée : ${data.date || "à définir"}`,
    `Nombre de personnes : ${data.people || "—"}`,
    "",
    data.message || "",
  ].join("\n");

  const portal = process.env.HUBSPOT_PORTAL_ID;
  const form = process.env.HUBSPOT_FORM_ID;
  if (!portal || !form) {
    console.info("[cours-perso] HubSpot non configuré, demande reçue :", { ...data, message });
    return NextResponse.json({ ok: true, demo: true });
  }

  const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portal}/${form}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: [
        { name: "firstname", value: data.firstname },
        { name: "lastname", value: data.lastname ?? "" },
        { name: "email", value: data.email },
        { name: "phone", value: data.phone },
        { name: "city", value: data.city },
        { name: "message", value: message },
      ],
      context: { pageUri: request.headers.get("referer") ?? undefined, pageName: "Cours personnalisé" },
    }),
  });

  if (!res.ok) {
    console.error("[cours-perso] HubSpot a refusé la demande", res.status, await res.text());
    return NextResponse.json({ error: t.errors.send }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

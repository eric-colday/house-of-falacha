"use client";

import { useState } from "react";
import { useLang } from "@/components/Lang";

const field = "w-full rounded-xl border border-or/60 bg-blanc px-4 py-3 text-marine outline-none focus:border-marine";
const label = "mb-1.5 block text-sm font-medium";

export function CoursPersoForm() {
  const { lang, t } = useLang();
  const f = t.cours.form;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = { ...(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>), lang };
    const res = await fetch("/api/cours-perso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) setStatus("sent");
    else {
      setError(json.error ?? f.error);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 bg-lin p-10">
        <p className="lettrage text-3xl text-or-fonce">{f.sentTitle}</p>
        <p className="mt-3 text-lg">{f.sentText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 bg-lin p-5 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="firstname" className={label}>{f.firstname}</label>
        <input id="firstname" name="firstname" required autoComplete="given-name" className={field} />
      </div>
      <div>
        <label htmlFor="lastname" className={label}>{f.lastname}</label>
        <input id="lastname" name="lastname" autoComplete="family-name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>{f.email}</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>{f.phone}</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor="type" className={label}>{f.type}</label>
        <select id="type" name="type" required className={field} defaultValue={f.types[0]}>
          {f.types.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="city" className={label}>{f.city}</label>
        <input id="city" name="city" required placeholder={f.cityPh} className={field} />
      </div>
      <div>
        <label htmlFor="occasion" className={label}>{f.occasion}</label>
        <select id="occasion" name="occasion" className={field} defaultValue={f.occasions[0]}>
          {f.occasions.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date" className={label}>{f.date}</label>
          <input id="date" name="date" type="date" className={field} />
        </div>
        <div>
          <label htmlFor="people" className={label}>{f.people}</label>
          <input id="people" name="people" type="number" min={1} max={200} defaultValue={6} className={field} />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>{f.message}</label>
        <textarea id="message" name="message" rows={4} placeholder={f.messagePh} className={field} />
      </div>
      {error && <p role="alert" className="font-medium text-or-fonce sm:col-span-2">{error}</p>}
      <button type="submit" disabled={status === "sending"} className="btn btn-marine sm:col-span-2">
        {status === "sending" ? f.sending : f.send}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

const field = "w-full rounded-xl border border-or/60 bg-blanc px-4 py-3 text-marine outline-none focus:border-marine";
const label = "mb-1.5 block text-sm font-medium";

export function CoursPersoForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const res = await fetch("/api/cours-perso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) setStatus("sent");
    else {
      setError(json.error ?? "L'envoi a échoué. Réessaie.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 bg-lin p-10">
        <p className="lettrage text-3xl text-or-fonce">Demande envoyée</p>
        <p className="mt-3 text-lg">Un coach House of Falacha te recontacte sous 48 h pour fixer le programme et le tarif.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-[2.5rem_0.4rem_2.5rem_0.4rem] border border-or/50 bg-lin p-5 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="firstname" className={label}>Prénom *</label>
        <input id="firstname" name="firstname" required autoComplete="given-name" className={field} />
      </div>
      <div>
        <label htmlFor="lastname" className={label}>Nom</label>
        <input id="lastname" name="lastname" autoComplete="family-name" className={field} />
      </div>
      <div>
        <label htmlFor="email" className={label}>E-mail *</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="phone" className={label}>Téléphone / WhatsApp *</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" className={field} />
      </div>
      <div>
        <label htmlFor="type" className={label}>Type de cours *</label>
        <select id="type" name="type" required className={field} defaultValue="Danse">
          <option>Danse</option>
          <option>Fitness</option>
          <option>Danse + fitness</option>
        </select>
      </div>
      <div>
        <label htmlFor="city" className={label}>Ville *</label>
        <input id="city" name="city" required placeholder="Reggio Emilia, Parme, Bologne…" className={field} />
      </div>
      <div>
        <label htmlFor="occasion" className={label}>Occasion</label>
        <select id="occasion" name="occasion" className={field} defaultValue="Entre amis">
          <option>Entre amis</option>
          <option>Anniversaire</option>
          <option>EVJF / EVG</option>
          <option>Mariage</option>
          <option>Entreprise / association</option>
          <option>École</option>
          <option>Autre</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="date" className={label}>Date souhaitée</label>
          <input id="date" name="date" type="date" className={field} />
        </div>
        <div>
          <label htmlFor="people" className={label}>Personnes</label>
          <input id="people" name="people" type="number" min={1} max={200} defaultValue={6} className={field} />
        </div>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="message" className={label}>Ton projet</label>
        <textarea id="message" name="message" rows={4} placeholder="Style de danse, durée, lieu, niveau du groupe…" className={field} />
      </div>
      {error && <p role="alert" className="font-medium text-or-fonce sm:col-span-2">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-marine sm:col-span-2"
      >
        {status === "sending" ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}

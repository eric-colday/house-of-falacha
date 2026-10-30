// Données fixes de la maison (non traduites). Les textes sont dans lib/i18n.ts.
// Sources : TikTok @house.of.falacha et messages WhatsApp de David (30 oct. 2026).

export const site = {
  name: "House of Falacha",
  short: "H.O.F Academy",
  city: "Reggio Emilia",
  country: { fr: "Italie", it: "Italia", en: "Italy" },
  phone: "+39 352 020 2406",
  whatsapp: "https://wa.me/393520202406",
  email: "sibafeuedavid@gmail.com",
  tiktok: "https://www.tiktok.com/@house.of.falacha",
  tiktokHandle: "@house.of.falacha",
  instagram: "https://www.instagram.com/house_of_falacha/",
  instagramHandle: "@house_of_falacha",
};

/** Sponsors communiqués par David. */
export const partners = ["La_ProceduR", "Visora", "Destroy Party", "TheOldDreams", "Bahamshez"];

/** Fondateur et coachs (Visora est le studio photo/vidéo partenaire, pas un coach). */
export const equipe = [
  { name: "David", role: "founder" as const, photo: "/galerie/equipe-tshirt-falacha.jpg" },
  { name: "The Ryan", role: "coach" as const },
  { name: "Lady Brown", role: "coach" as const },
  { name: "Caporal237", role: "coach" as const },
];

/** Photos envoyées par David (crédits : Randy_237 photography, Visora). */
export const photosMaison = {
  hero: "/galerie/photo-de-groupe.jpg",
  maison: "/galerie/cercle-de-danse.jpg",
  apropos: "/galerie/photo-de-groupe.jpg",
  strip: [
    "/galerie/coach-falacha.jpg",
    "/galerie/danseuse-tresses.jpg",
    "/galerie/workshop-salle.jpg",
    "/galerie/duo-sourires.jpg",
    "/galerie/choregraphie-groupe.jpg",
  ],
};

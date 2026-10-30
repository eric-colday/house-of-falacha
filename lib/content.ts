// Tout le contenu éditorial du site est ici. Produits, prix et dates de workshops : data/catalog.json.
// Sources : TikTok @house.of.falacha (oct. 2026) et brief audio de David.

export const site = {
  name: "House of Falacha",
  short: "H.O.F Academy",
  tagline: "Là où chaque événement devient souvenir.",
  taglineEn: "Where community comes alive.",
  city: "Reggio Emilia",
  country: "Italie",
  pillars: ["Danse", "Art", "Culture", "Sport"],
  phone: "+39 352 020 2406",
  whatsapp: "https://wa.me/393520202406",
  tiktok: "https://www.tiktok.com/@house.of.falacha",
  tiktokHandle: "@house.of.falacha",
  instagramHandle: "house of Falacha",
};

export const nav = [
  { href: "/workshops", label: "Workshops" },
  { href: "/boutique", label: "Boutique" },
  { href: "/cours-perso", label: "Cours perso" },
  { href: "/galerie", label: "Galerie" },
  { href: "/a-propos", label: "À propos" },
  { href: "/#contact", label: "Contact" },
];

export const maison = {
  title: "Ta deuxième famille",
  body: "House of Falacha réunit la diaspora et tous ceux qui aiment bouger, à Reggio Emilia. Afro dance, afro urbain, fitness : on apprend, on transpire, on rit, et on repart avec des souvenirs.",
  pillars: [
    { title: "Danse", text: "Chorégraphies afro et afro-urbaines, encadrées par les coachs de la maison." },
    { title: "Culture", text: "Les racines camerounaises, la vie en Italie, la musique qui relie les deux." },
    { title: "Partage", text: "Interviews, after events, collaborations : la communauté est au centre." },
  ],
};

export const temps = [
  { year: "2026", title: "Workshop 2026", text: "Une grande journée de danse avec coachs, DJ et participants venus de toute l'Italie." },
  { year: "2026", title: "L'after event", text: "Le workshop prolongé en soirée : DJ set et ambiance afro jusqu'au bout." },
  { year: "2027", title: "Nouvelle édition", text: "De nouveaux locaux, un programme plus grand. Les réservations ouvriront ici." },
];

export const charity = {
  title: "La danse qui donne",
  text: "L'équipe House of Falacha s'est rendue dans un orphelinat au Cameroun pour une journée de détente avec les enfants. Une partie des événements soutient ces actions.",
  cta: "Proposer une action",
};

export const partners = ["Taptap Send Cameroun", "Orange Cameroun", "Nbiko TV", "AEC Viterbo"];

// Page À propos. Les noms des coachs viennent des remerciements publiés sur TikTok : à confirmer avec David.
export const apropos = {
  intro:
    "House of Falacha, c'est l'académie H.O.F : une maison ouverte à Reggio Emilia où la danse, l'art, la culture et le sport rassemblent la diaspora et tous ceux qui aiment bouger.",
  histoire: [
    "Tout est parti d'une envie simple : créer en Italie un lieu où l'on retrouve l'énergie des soirées et des cours de danse de chez nous, et où chacun se sent accueilli comme en famille.",
    "Les workshops du samedi sont devenus le rendez-vous de la maison. Autour d'eux, House of Falacha organise de grands événements, des after events, des interviews et des actions solidaires jusqu'au Cameroun.",
    "Le lotus du logo résume l'esprit de la maison : chaque pétale est une personne, et c'est ensemble qu'ils forment la fleur.",
  ],
  mission: "Là où chaque événement devient souvenir.",
  valeurs: [
    { title: "Accueillir", text: "Tous niveaux, tous âges, toutes origines. On vient comme on est, on repart avec une deuxième famille." },
    { title: "Transmettre", text: "Les coachs partagent les pas, mais aussi la culture et la musique qui les portent." },
    { title: "Rassembler", text: "Entre le Cameroun et l'Italie, la maison relie les cultures et les générations." },
    { title: "Donner", text: "Une partie de l'énergie des événements va à des actions solidaires, comme la visite d'un orphelinat au Cameroun." },
  ],
  equipe: [
    { name: "David", role: "Fondateur de House of Falacha" },
    { name: "The Ryan", role: "Coach" },
    { name: "Lady Brown", role: "Coach" },
    { name: "Visora", role: "Coach" },
  ],
  chiffres: [
    { value: "Chaque samedi", label: "un workshop à Reggio Emilia" },
    { value: "4 piliers", label: "danse, art, culture, sport" },
    { value: "2 pays", label: "le Cameroun et l'Italie, réunis" },
  ],
};

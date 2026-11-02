# House of Falacha — site web

Next.js 16 + Tailwind CSS 4 + Stripe + HubSpot. Site de H.O.F Academy (Reggio Emilia), construit à partir du brief audio de David (`brief-david-transcription.txt`) et de son TikTok.

## Ce que fait le site
- **Workshops** (`/workshops`) : réservation des places en ligne, places restantes affichées, paiement Stripe. L'e-mail Stripe sert de billet.
- **Boutique** (`/boutique`) : t-shirts (par taille) et accessoires, stock affiché, panier, paiement Stripe.
  **Pas de livraison** : retrait sur place le jour de l'événement.
- **Cours perso** (`/cours-perso`) : demande de cours de danse / fitness dans une ville, envoyée dans HubSpot.
- **TikTok** : les dernières vidéos de @house.of.falacha s'affichent automatiquement sur l'accueil.

## Démarrer
```bash
npm install
cp .env.example .env.local   # puis remplir les clés
npm run dev                  # http://localhost:3000
```
Sans clés, le site tourne en **mode démo** : le stock vient de `data/catalog.json`, le bouton de paiement affiche un message, et les demandes de cours perso s'écrivent dans la console.

## Brancher Stripe
1. Créer le compte Stripe de David (commissions : voir https://stripe.com/it/pricing).
2. Mettre `STRIPE_SECRET_KEY` dans `.env.local` (clé de test `sk_test_…` d'abord).
3. `npm run stripe:sync` crée un produit Stripe par taille et par workshop, avec le stock de départ.
   `npm run stripe:sync -- --reset` remet le stock aux valeurs du catalogue.
4. Webhook : Stripe → Développeurs → Webhooks → `https://<domaine>/api/webhooks/stripe`, événement `checkout.session.completed`.
   Copier le secret dans `STRIPE_WEBHOOK_SECRET`. En local : `stripe listen --forward-to localhost:3000/api/webhooks/stripe`.

Le stock vit dans Stripe (métadonnée `stock` de chaque produit) : pas de base de données à gérer.
Pour réapprovisionner : modifier la métadonnée dans le tableau de bord Stripe, ou `data/catalog.json` puis `--reset`.

## Brancher HubSpot
Créer un formulaire HubSpot avec les champs `firstname`, `lastname`, `email`, `phone`, `city`, `message`,
puis renseigner `HUBSPOT_PORTAL_ID` et `HUBSPOT_FORM_ID`. Le type de cours, l'occasion, la date et le nombre de personnes arrivent dans `message`.

## Langues
Le site est en trois langues : français sur `/fr` (par défaut, `/` y redirige), italien sur `/it` et anglais sur `/en`, avec un sélecteur FR / IT / EN qui garde la même page.
Tous les textes sont dans `lib/i18n.ts` ; les noms de produits, événements et légendes ont leurs versions `fr` / `it` / `en` dans `data/`.

Les adresses sont traduites (table `routes` de `lib/i18n.ts`) :

| Page | Français | Italiano | English |
|---|---|---|---|
| Workshops | `/fr/workshops` | `/it/workshop` | `/en/workshops` |
| Boutique | `/fr/boutique` | `/it/negozio` | `/en/shop` |
| Cours perso | `/fr/cours-perso` | `/it/lezioni-private` | `/en/private-classes` |
| Galerie | `/fr/galerie` | `/it/galleria` | `/en/gallery` |
| À propos | `/fr/a-propos` | `/it/chi-siamo` | `/en/about` |
| Panier | `/fr/panier` | `/it/carrello` | `/en/cart` |
| Merci | `/fr/merci` | `/it/grazie` | `/en/thank-you` |

Les fichiers restent dans `app/[lang]/<nom français>/` : `next.config.ts` réécrit les adresses traduites vers eux et redirige (308) une adresse non traduite, par exemple `/en/boutique` → `/en/shop`. Dans le code, toujours construire les liens avec `l(lang, "/boutique")`.

## Pages
Accueil, Workshops, Boutique, Cours perso, Galerie, À propos, Panier, Merci — dans chaque langue (voir le tableau ci-dessus).

## Galerie
- Vidéos TikTok : `data/galerie.json` → `tiktok`. Pour en ajouter une, copie l'identifiant à la fin de l'adresse (`…/video/7700908810659056929`), un titre, un thème et la date. Elles se lisent directement sur le site avec le lecteur officiel TikTok.
- Photos : dépose les fichiers dans `public/galerie/`, puis ajoute-les dans `photos` (`src`, `alt` en `fr` / `it`, `theme`). Elles s'affichent en mosaïque avec une visionneuse plein écran.

## Modifier le contenu
- Produits, prix (en centimes), stock de départ, dates de workshops : `data/catalog.json`.
- Coordonnées, équipe, sponsors, photos clés : `lib/content.ts`.
- Ouvrir la boutique : `"boutiqueOuverte": true` dans `data/catalog.json` (avec les vrais prix et stocks).
- Ouvrir les réservations d'un événement : `"reservationsOuvertes": true`, `price` (centimes) et `capacity`.

## Reçu de David (30 oct. 2026, WhatsApp)
- Logo officiel (`public/logo-house-of-falacha.png`, lotus seul : `public/lotus.png`) et 11 photos (`public/galerie/`).
- Prochain grand événement : Afro Urban Dance Workshop, 7 mars 2027, SD Factory Studio, Reggio Emilia.
- Coachs : The Ryan, Lady Brown, Caporal237. Visora = studio photo/vidéo partenaire.
- Sponsors : La_ProceduR, Visora, Destroy Party, TheOldDreams, Bahamshez.
- Contact : sibafeuedavid@gmail.com, Instagram house_of_falacha. Site en français, italien et anglais.

## Reçu de David (31 oct. 2026, WhatsApp)
- Boutique : pour l'instant seulement des t-shirts noir, blanc et rose, tailles XS à XXL (casquette et tote bag retirés).
- Workshop du 7 mars : début à 11 h précises. Deux entrées : participer à la battle, ou venir pour l'événement et l'ambiance. Prix et nombre de places : plus tard.
- Paiement : OK pour Stripe. Son e-mail PayPal / paiement : sibafeuedavid@gmail.com.
- Toutes les photos et vidéos sont faites par Visora (crédit mis à jour partout).
- Parcours : collaboration avec SD Factory depuis mai 2026, pour le bien-être des jeunes par le sport (danse) et des ateliers de peinture.
- 2 photos de la visite de l'orphelinat (`orphelinat-enfants.jpg`, `orphelinat-equipe.jpg`).

## À compléter avec David
- Prix et stock de chaque t-shirt (dans `data/catalog.json`, puis `boutiqueOuverte: true`).
- Prix de chaque entrée du workshop et nombre de places (pour ouvrir les réservations ; aujourd'hui une seule réservation par événement, les deux types d'entrée demanderont deux billets dans le code).
- Créer le compte Stripe avec sibafeuedavid@gmail.com et brancher les clés sur Vercel.
- Photos des coachs ; validation du texte À propos.

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

## Pages
Accueil, Workshops, Boutique, Cours perso, Galerie (`/galerie`), À propos (`/a-propos`), Panier, Merci.

## Galerie
- Vidéos TikTok : `data/galerie.json` → `tiktok`. Pour en ajouter une, copie l'identifiant à la fin de l'adresse (`…/video/7700908810659056929`), un titre, un thème et la date. Elles se lisent directement sur le site avec le lecteur officiel TikTok.
- Photos : dépose les fichiers dans `public/galerie/`, puis ajoute-les dans `photos` (`src`, `alt`, `theme`). Elles s'affichent en mosaïque avec une visionneuse plein écran. Un exemple est dans `photos_exemple`.

## Modifier le contenu
- Produits, prix (en centimes), stock de départ, dates de workshops : `data/catalog.json`.
- Textes de l'accueil et de la page À propos : `lib/content.ts`.

## À compléter avec David
- Page À propos : l'histoire de la maison (rédigée à partir de ses publications TikTok) et la liste des coachs (noms repris de ses remerciements TikTok), à valider. Ajouter leurs photos.
- Photos pour la galerie.
- Prix réels, tailles et quantités du merch ; dates, horaires et tarif des workshops (valeurs actuelles = exemples).
- Logo officiel (`public/logo.png`, à brancher dans `components/Logo.tsx`) et photos des produits.
- Adresse exacte des workshops.

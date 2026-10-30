import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/Cart";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: { default: "House of Falacha — Danse, Art, Culture & Sport à Reggio Emilia", template: "%s · House of Falacha" },
  description:
    "H.O.F Academy : réserve ta place aux workshops d'afro-danse, commande le merch à récupérer sur place, ou demande un cours personnalisé de danse ou de fitness.",
  openGraph: { title: "House of Falacha — H.O.F Academy", description: "Danse • Art • Culture • Sport — Reggio Emilia", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { CartProvider } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { LangProvider } from "@/components/Lang";
import { getDict, isLang, langs } from "@/lib/i18n";

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    title: { default: t.meta.title, template: "%s · House of Falacha" },
    description: t.meta.description,
    icons: { icon: "/lotus.png" },
    alternates: { languages: { fr: "/fr", it: "/it", en: "/en" } },
    openGraph: {
      title: "House of Falacha — H.O.F Academy",
      description: t.meta.description,
      images: ["/galerie/photo-de-groupe.jpg"],
      locale: { fr: "fr_FR", it: "it_IT", en: "en_GB" }[lang],
      type: "website",
    },
  };
}

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap" />
      </head>
      <body>
        <LangProvider lang={lang}>
          <CartProvider>
            <Header lang={lang} />
            <main>{children}</main>
            <Footer lang={lang} />
          </CartProvider>
        </LangProvider>
      </body>
    </html>
  );
}

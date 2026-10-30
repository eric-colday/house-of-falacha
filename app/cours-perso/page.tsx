import type { Metadata } from "next";
import { PageHero } from "@/components/Footer";
import { CoursPersoForm } from "./CoursPersoForm";

export const metadata: Metadata = { title: "Cours personnalisé" };

const etapes = [
  ["Tu décris ton projet", "Type de cours, ville, date et nombre de personnes."],
  ["Un coach te rappelle", "Il te propose un programme et un tarif sous 48 h."],
  ["On danse", "Le coach vient sur place avec la musique et l'énergie."],
];

export default function CoursPerso() {
  return (
    <>
      <PageHero
        lignes={["On vient", "danser", "chez vous"]}
        intro="Entre amis, en famille, pour un anniversaire, un EVJF ou une équipe : réserve un coach House of Falacha pour un cours de danse ou de fitness dans ta ville."
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[0.75fr_1.25fr] md:py-20">
        <aside>
          <h2 className="lettrage text-xl text-or-fonce">Comment ça marche</h2>
          <ol className="mt-6">
            {etapes.map(([t, d], i) => (
              <li key={t} className="couture flex gap-5 py-5 first:border-t-0">
                <span className="text-4xl font-light text-or-fonce">{i + 1}</span>
                <div>
                  <p className="text-lg font-medium">{t}</p>
                  <p className="text-ardoise">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
        <CoursPersoForm />
      </div>
    </>
  );
}

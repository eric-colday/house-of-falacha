import "server-only";
import galerie from "@/data/galerie.json";
import { site } from "./content";

export type Photo = { src: string; alt: string; theme: string };
export type TikTokPost = {
  id: string;
  type: "video" | "photo";
  title: string;
  theme: string;
  date: string;
  url: string;
};

export const themes: string[] = galerie.themes;
export const photos: Photo[] = galerie.photos as Photo[];

/** Publications TikTok de la galerie, avec leur adresse publique. */
export async function getTikTokPosts(): Promise<TikTokPost[]> {
  return galerie.tiktok.map((t) => ({
    ...t,
    type: t.type as TikTokPost["type"],
    url: `https://www.tiktok.com/${site.tiktokHandle}/${t.type}/${t.id}`,
  }));
}

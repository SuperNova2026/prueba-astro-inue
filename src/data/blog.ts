import type { ImageMetadata } from "astro";
import coverUniversidadesEnsenada from "../assets/images/blog/cover1.webp";
import coverMarcoAurelio from "../assets/images/blog/cover2.webp";
import coverUniversidadesEnLinea from "../assets/images/blog/cover3.webp";

export interface BlogPost {
  href: string;
  cover: ImageMetadata; 
  eyebrow?: string;
  title: string;
  excerpt: string;
  date: Date;
}

const blogPosts: BlogPost[] = [
  {
    href: "#",
    cover: coverUniversidadesEnsenada,
    title: "Mejores universidades de Ensenada (2026): lista completa y cómo elegir",
    excerpt:
      "Las 17 instituciones de educación superior registradas en Ensenada, Baja California: públicas y privadas, con sitio oficial. Incluye cómo verificar un RVOE por ti mismo y qué preguntar antes de inscribirte.",
    date: new Date("2026-07-25T16:00:00.000Z"),
  },
  {
    href: "#",
    cover: coverMarcoAurelio,
    title: "Marco Aurelio, el Emperador Filósofo: Vida, Meditaciones y Lecciones",
    excerpt:
      "Quién fue Marco Aurelio, por qué se le llama el emperador filósofo y qué enseñan sus Meditaciones: estoicismo práctico que la psicología moderna sigue estudiando.",
    date: new Date("2026-07-11T17:00:00.000Z"),
  },
  {
    href: "#",
    cover: coverUniversidadesEnLinea,
    eyebrow: "Orientación Vocacional",
    title: "Mejores Universidades en Línea en México (2026) con Validez SEP",
    excerpt:
      "¿Buscas una universidad en línea con validez oficial, precios accesibles y programas flexibles? Estudiar a distancia ya no es el futuro: es el presente.",
    date: new Date("2025-07-02T06:49:47.000Z"),
  },
];

export function getLatestPosts(count = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, count);
}
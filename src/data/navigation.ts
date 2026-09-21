export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProgramGroup {
  title: string;
  items: NavItem[];
}

// Solo se evalúa la home: los destinos son "#". Cuando existan las rutas
// reales se cambian aquí y en ningún otro lugar.
export const programGroups: ProgramGroup[] = [
  {
    title: "Bachillerato",
    items: [{ label: "Bachillerato", href: "#" }],
  },
  {
    title: "Licenciatura",
    items: [{ label: "Licenciatura", href: "#" }],
  },
  {
    title: "Posgrado",
    items: [
      { label: "Maestría", href: "#" },
      { label: "Doctorado", href: "#" },
    ],
  },
];

export const primaryNav: NavItem[] = [
  { label: "Inglés", href: "#" },
  { label: "Acerca de", href: "#" },
  { label: "Campus en línea", href: "#", external: true },
];

// "/#contacto" funciona desde cualquier página y hoy es un ancla real
// hacia <section id="contacto"> del formulario.
export const contactLink = { label: "Contacto", href: "/#contacto" } as const;
export const portalLink = { label: "Portal de alumnos", href: "#" } as const;

/** target y rel solo cuando el destino es una URL externa real (no "#"). */
export function linkAttrs(item: NavItem) {
  const opensNewTab = item.external && item.href.startsWith("http");
  return opensNewTab ? { target: "_blank", rel: "noopener" } : {};
}
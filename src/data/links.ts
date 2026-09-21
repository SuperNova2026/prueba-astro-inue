export const socialLinks = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Youtube", href: "#" },
] as const;

export const highschoolLink = { label: "Bachillerato", href: "#" } as const;
export const bachelorLink = { label: "Licenciatura", href: "#" } as const;
export const masterLink = { label: "Maestría", href: "#" } as const;
export const doctorateLink = { label: "Doctorado", href: "#" } as const;

export const legalLink = { label: "Política de Privacidad", href: "#" } as const;
export const enrollLink = { label: "Inscribirme ahora", href: "#" } as const;

export const rvoeLink = { label: "Verificar RVOE", href: "#" } as const;

export const blogIndexLink = { label: "Ver todo", href: "#" } as const;

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const primaryNav: readonly NavItem[] = [
  { label: "Inglés", href: "#" },
  { label: "Acerca de", href: "#" },
  { label: "Campus en línea", href: "#", external: true },
];

export const contactLink = { label: "Contacto", href: "#contacto" } as const;
export const studentPortalLink = { label: "Portal de alumnos", href: "#" } as const;

export function linkAttrs({ external, href }: NavItem) {
  return external && href !== "#" ? ({ target: "_blank", rel: "noopener" } as const) : {};
}
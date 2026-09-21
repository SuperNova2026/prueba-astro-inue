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
  external?: boolean; // muestra el ícono de enlace externo y abre otra pestaña
}

export const primaryNav: readonly NavItem[] = [
  { label: "Inglés", href: "#" },
  { label: "Acerca de", href: "#" },
  { label: "Campus en línea", href: "#", external: true },
];

// "#contacto" sí funciona: es el id de la sección del formulario en la home.
export const contactLink = { label: "Contacto", href: "#contacto" } as const;
export const studentPortalLink = { label: "Portal de alumnos", href: "#" } as const;

/** Atributos de un enlace externo. Con href="#" no abre pestaña: llevaría a la misma página. */
export function linkAttrs({ external, href }: NavItem) {
  return external && href !== "#" ? ({ target: "_blank", rel: "noopener" } as const) : {};
}
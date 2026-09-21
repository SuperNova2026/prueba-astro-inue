export const countryOptions = [{ value: "MX", label: "MX" }] as const;

export const programOptions = [
  { value: "bachillerato", label: "Bachillerato" },
  { value: "licenciatura", label: "Licenciatura" },
  { value: "maestria", label: "Maestría" },
  { value: "doctorado", label: "Doctorado" },
] as const;

export const modalityOptions = [
  { value: "presencial", label: "Presencial" },
  { value: "ejecutiva", label: "Ejecutiva (sabatina)" },
  { value: "en-linea", label: "En línea" },
  { value: "asesoria", label: "No estoy seguro, quiero asesoría" },
] as const;

export const examples = {
  nombre: "María",
  apellido: "Pérez López",
  email: "nombre@dominio.com",
  telefono: "6461234567",
} as const;

// Validaciones de campos de contacto. Se usan en el atributo pattern de los inputs.
export const NAME_MIN_LENGTH = 2;
export const PHONE_DIGITS = 10;
export const phonePattern = `[0-9]{${PHONE_DIGITS}}`;
export const emailPattern = "[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}";
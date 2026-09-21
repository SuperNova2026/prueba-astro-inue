import { NAME_MIN_LENGTH, PHONE_DIGITS, examples } from "../data/contact.ts";
export type FormField = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export function isFormField(el: unknown): el is FormField {
  return (
    el instanceof HTMLInputElement ||
    el instanceof HTMLSelectElement ||
    el instanceof HTMLTextAreaElement
  );
}

export const DIGITS_ONLY_NOTICE = `Solo se aceptan números, sin letras, espacios ni guiones. Ejemplo: ${examples.telefono}.`;
const charCount = (value: string) => [...value.trim().normalize("NFC")].length;

// Mensajes que dependen del valor escrito

function emailFormat({ value }: FormField): string {
  const example = `Ejemplo: ${examples.email}.`;
  if (/\s/.test(value)) return `El correo no debe tener espacios. ${example}`;
  if (!value.includes("@")) return `Al correo le falta la "@". ${example}`;
  if (!/@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return `Al correo le falta el dominio completo (por ejemplo, gmail.com). ${example}`;
  }
  return `El correo no tiene un formato válido. ${example}`;
}

function phoneFormat({ value }: FormField): string {
  const example = `Ejemplo: ${examples.telefono}.`;
  const count = value.length;
  if (count < PHONE_DIGITS) {
    return `El teléfono está incompleto: tiene ${count} de ${PHONE_DIGITS} dígitos. ${example}`;
  }
  return `El teléfono tiene ${count} dígitos y debe tener ${PHONE_DIGITS} (sin +52). ${example}`;
}

function tooShortMessage(noun: "nombre" | "apellido", example: string) {
  return (field: FormField): string =>
    `El ${noun} es muy corto: debe de tener ${NAME_MIN_LENGTH} caracteres como mínimo. Ejemplo: ${example}.`;
}

// Tabla de mensajes 

type Rule = "valueMissing" | "tooShort" | "typeMismatch" | "patternMismatch";
type Message = string | ((field: FormField) => string);


const MESSAGES: Record<string, Partial<Record<Rule, Message>>> = {
  nombre: {
    valueMissing: `Falta tu nombre. Ejemplo: ${examples.nombre}.`,
    tooShort: tooShortMessage("nombre", examples.nombre),
  },
  apellido: {
    valueMissing: `Falta tu apellido. Ejemplo: ${examples.apellido}.`,
    tooShort: tooShortMessage("apellido", examples.apellido),
  },
  email: {
    valueMissing: `Falta tu correo electrónico. Ejemplo: ${examples.email}.`,
    typeMismatch: emailFormat,
    patternMismatch: emailFormat,
  },
  telefono: {
    valueMissing: `Falta tu teléfono o WhatsApp. Escribe ${PHONE_DIGITS} dígitos, solo números. Ejemplo: ${examples.telefono}.`,
    patternMismatch: phoneFormat,
  },
  programa: { valueMissing: "Falta elegir un programa de interés." },
  modalidad: { valueMissing: "Falta elegir una modalidad." },
};

export function getFieldError(field: FormField): string {
  const rules = MESSAGES[field.name] ?? {};

  const pick = (rule: Rule, fallback: string): string => {
    const message = rules[rule];
    return typeof message === "function" ? message(field) : (message ?? fallback);
  };

  const isBlank = field.required && field.value.trim() === "";
  if (isBlank || field.validity.valueMissing) {
    return pick("valueMissing", "Este campo es obligatorio.");
  }

  if (!(field instanceof HTMLSelectElement) && field.minLength > 0) {
    const count = charCount(field.value);
    if (count > 0 && count < field.minLength) {
      return pick("tooShort", `Escribe al menos ${field.minLength} caracteres.`);
    }
  }

  if (field.validity.typeMismatch) return pick("typeMismatch", field.validationMessage);
  if (field.validity.patternMismatch) return pick("patternMismatch", field.validationMessage);
  return "";
}

// Limpieza de valores

export function keepDigits(field: HTMLInputElement): boolean {
  const digits = field.value.replace(/\D/g, "");
  if (digits === field.value) return false; 
  field.value = digits;
  return true;
}

export function sanitizeField(field: FormField) {
  if (field instanceof HTMLSelectElement) return;
  if (field instanceof HTMLInputElement && field.hasAttribute("data-digits-only")) {
    keepDigits(field);
  } else {
    field.value = field.value.trim();
  }
}
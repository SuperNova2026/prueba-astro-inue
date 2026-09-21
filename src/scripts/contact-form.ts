import {
  DIGITS_ONLY_NOTICE,
  getFieldError,
  isFormField,
  keepDigits,
  sanitizeField,
  type FormField,
} from "./validation";

type MessageState = "idle" | "error" | "success";
type Problem = { field: FormField; message: string };

const TEXT = {
  sending: "Enviando...",
  success: "Mensaje enviado. Un asesor te contactará pronto.",
  failure: "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
} as const;

//const summaryTitle = (count: number) =>
 // count === 1 ? "Hay 1 campo por corregir:" : `Hay ${count} campos por corregir:`;

// --- Cuadro general -----------------------------------------------------------

function showMessage(box: HTMLElement, state: MessageState, text = "", problems: Problem[] = []) {
  const title = box.querySelector<HTMLElement>("[data-message-text]");
  const list = box.querySelector<HTMLElement>("[data-message-list]");

  if (title) title.textContent = text;
  list?.replaceChildren(
    ...problems.map(({ field, message }) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.target = field.name;
      button.textContent = message;
      item.append(button);
      return item;
    })
  );
  box.dataset.state = state;
}

function setFieldError(field: FormField, message: string) {
  const error = field.closest("[data-field]")?.querySelector<HTMLElement>("[data-error]");
  const hasError = message !== "";

  field.setAttribute("aria-invalid", String(hasError)); // borde rojo + lector de pantalla
  if (error) {
    error.textContent = message;
    error.hidden = !hasError;
  }
}

function validateField(field: FormField) {
  setFieldError(field, getFieldError(field));
}

function getFields(form: HTMLFormElement): FormField[] {
  return Array.from(form.elements).filter(
    (el): el is FormField => isFormField(el) && el.willValidate
  );
}

function collectProblems(fields: FormField[]): Problem[] {
  return fields.flatMap((field) => {
    const message = getFieldError(field);
    return message ? [{ field, message }] : [];
  });
}

// Simula el envío del formulario.
async function sendForm(_data: FormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500));
}

function initContactForm() {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form || form.dataset.bound === "true") return;
  form.dataset.bound = "true";

  const submit = form.querySelector<HTMLButtonElement>("[data-submit]");
  const submitLabel = form.querySelector<HTMLElement>("[data-submit-label]");
  const message = form.querySelector<HTMLElement>("[data-message]");
  if (!submit || !submitLabel || !message) return;

  const defaultLabel = submitLabel.textContent ?? "Enviar";
  let attempted = false; 


  form.addEventListener("input", (event) => {
    const field = event.target;
    if (!isFormField(field)) return;

    if (field instanceof HTMLInputElement && field.hasAttribute("data-digits-only")) {
      if (keepDigits(field)) {
        setFieldError(field, DIGITS_ONLY_NOTICE);
        return;
      }
    }

    if (field.getAttribute("aria-invalid") === "true") {
      validateField(field);
    }
  });

  form.addEventListener("focusout", (event) => {
    const field = event.target;
    if (!isFormField(field)) return;

    sanitizeField(field);
    const hadError = field.getAttribute("aria-invalid") === "true";
    if (field.value !== "" || attempted || hadError) {
      validateField(field);
      // refreshSummary(form, message);
    }
  });

  message.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLElement>("[data-target]");
    if (!button) return;
    const target = form.elements.namedItem(button.dataset.target ?? "");
    if (target instanceof HTMLElement) target.focus();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    attempted = true;

    const fields = getFields(form);
    fields.forEach(sanitizeField);

    const problems: Problem[] = [];
    for (const field of fields) {
      const error = getFieldError(field);
      setFieldError(field, error);
      if (error) problems.push({ field, message: error });
    }

    if (problems.length > 0) {
      problems[0].field.focus();
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = TEXT.sending;
    showMessage(message, "idle");

    try {
      await sendForm(new FormData(form));
      form.reset();
      attempted = false;
      showMessage(message, "success", TEXT.success);
    } catch {
      showMessage(message, "error", TEXT.failure);
    } finally {
      submit.disabled = false;
      submitLabel.textContent = defaultLabel;
    }
  });
}

initContactForm();
document.addEventListener("astro:page-load", initContactForm);
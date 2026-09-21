
const DESKTOP = window.matchMedia("(min-width: 48rem)"); // = breakpoint "md" de Tailwind

const $ = (selector: string) => document.querySelector<HTMLElement>(selector);

const programs = () => ({ trigger: $("[data-programs-trigger]"), panel: $("[data-programs-panel]") });
const mobile = () => ({ trigger: $("[data-mobile-toggle]"), panel: $("[data-mobile-menu]") });
const isOpen = (panel: HTMLElement | null) => !!panel && !panel.hidden;

function setPrograms(open: boolean) {
  const { trigger, panel } = programs();
  if (!trigger || !panel) return;
  trigger.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
}

function setMobile(open: boolean) {
  const { trigger, panel } = mobile();
  if (!trigger || !panel) return;
  trigger.setAttribute("aria-expanded", String(open));
  panel.hidden = !open;
  document.documentElement.classList.toggle("overflow-hidden", open);
}

document.addEventListener("click", (event) => {
  const target = event.target as Element | null;
  if (!target) return;

  if (target.closest("[data-programs-trigger]")) {
    setPrograms(!isOpen(programs().panel));
    return;
  }
  if (target.closest("[data-mobile-toggle]")) {
    setMobile(!isOpen(mobile().panel));
    return;
  }

  if (target.closest("[data-programs-panel] a, [data-mobile-menu] a")) {
    setPrograms(false);
    setMobile(false);
    return;
  }

  if (!target.closest("[data-programs-root]")) setPrograms(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  const p = programs();
  if (isOpen(p.panel)) {
    setPrograms(false);
    p.trigger?.focus(); 
  }
  const m = mobile();
  if (isOpen(m.panel)) {
    setMobile(false);
    m.trigger?.focus();
  }
});

document.addEventListener("focusin", (event) => {
  const target = event.target as Element | null;
  if (target && !target.closest("[data-programs-root]")) setPrograms(false);
});

DESKTOP.addEventListener("change", () => {
  setPrograms(false);
  setMobile(false);
});
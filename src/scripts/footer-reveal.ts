const root = document.documentElement;

let observer: ResizeObserver | undefined;
let footerHeight = 0;
let frame = 0;

function updateProgress() {
  frame = 0;
  if (!footerHeight) return;

  const maxScroll = root.scrollHeight - window.innerHeight;
  const revealStart = maxScroll - footerHeight;
  const progress = Math.min(1, Math.max(0, (window.scrollY - revealStart) / footerHeight));

  root.style.setProperty("--footer-progress", progress.toFixed(3));
}
function scheduleUpdate() {
  if (!frame) frame = requestAnimationFrame(updateProgress);
}

function revealOnFocus() {
  window.scrollTo({ top: root.scrollHeight, behavior: "instant" });
}

function init() {
  const footer = document.querySelector<HTMLElement>("[data-footer]");
  if (!footer) return;

  footer.addEventListener("focusin", revealOnFocus);

  observer?.disconnect(); 
  observer = new ResizeObserver(([entry]) => {
    const height = entry.borderBoxSize?.[0]?.blockSize ?? footer.offsetHeight;
    footerHeight = Math.ceil(height);
    root.style.setProperty("--footer-height", `${footerHeight}px`);
    scheduleUpdate();
  });
  observer.observe(footer);
}

window.addEventListener("scroll", scheduleUpdate, { passive: true });
window.addEventListener("resize", scheduleUpdate);

init();
document.addEventListener("astro:page-load", init);
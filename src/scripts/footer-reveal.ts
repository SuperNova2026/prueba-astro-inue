let observer: ResizeObserver | undefined;

function init() {
  const footer = document.querySelector<HTMLElement>("[data-footer]");
  if (!footer) return;

  observer?.disconnect(); // evita observadores duplicados al navegar
  observer = new ResizeObserver(([entry]) => {
    const height = entry.borderBoxSize?.[0]?.blockSize ?? footer.offsetHeight;
    document.documentElement.style.setProperty(
      "--footer-height",
      `${Math.ceil(height)}px`
    );
  });
  observer.observe(footer);
}

init();
// Solo se dispara si usas <ClientRouter />; si no, es inofensivo.
document.addEventListener("astro:page-load", init);
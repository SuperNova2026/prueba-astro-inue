let observer: ResizeObserver | undefined;

function init() {
  const footer = document.querySelector<HTMLElement>("[data-footer]");
  if (!footer) return;

  observer?.disconnect(); 
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
window.addEventListener("resize", init);
document.addEventListener("astro:after-swap",init); // 
document.addEventListener("astro:page-load", init);
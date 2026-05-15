export function scrollToTop() {
  if (typeof window === "undefined") return;

  requestAnimationFrame(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  });
}

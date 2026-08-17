export function getHeaderOffset(): number {
  const header = document.querySelector<HTMLElement>(".site-header");

  return header ? header.getBoundingClientRect().height : 0;
}

export function scrollToSection(section: HTMLElement): void {
  const top = section.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

  window.scrollTo({ top, behavior: "smooth" });
}

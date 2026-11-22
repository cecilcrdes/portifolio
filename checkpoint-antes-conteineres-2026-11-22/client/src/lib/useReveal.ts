import { useLayoutEffect } from "react";

// Blocos que entram com animação ao aparecer na tela.
const REVEAL_SELECTOR = [
  ".section-title", ".about-copy", ".knowledge-line", ".filters", ".featured-card", ".work-card",
  ".contact-card-box", ".case-navigation .wrap", ".case-section", ".case-project-nav .wrap",
  ".site-contact-tag", ".site-contact-section h2", ".project-detail",
].join(",");

// Itens de grade/lista que entram em sequência, um após o outro.
const STAGGER_SELECTOR = ".knowledge-line, .featured-card, .work-card, .contact-card-box";

// Cartões da grade "Outros trabalhos" só esmaecem (o deslocamento mostraria o fundo entre eles).
const FADE_ONLY_SELECTOR = ".work-card";

/**
 * Aplica animação de entrada aos blocos da página quando eles entram na tela.
 * Sem suporte a IntersectionObserver ou com "reduzir movimento" ativado, o conteúdo aparece direto.
 */
export function useReveal(deps: unknown[] = []) {
  // useLayoutEffect: as classes entram antes da primeira pintura, sem "piscar" o conteúdo.
  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)).filter(
      (element) => element.dataset.revealed !== "true",
    );

    // Depois que o bloco aparece, as classes da animação saem e o estilo original (hover etc.) volta a valer.
    const finish = (element: HTMLElement) => {
      element.dataset.revealed = "true";
      element.classList.remove("reveal", "reveal-fade", "is-visible");
      element.style.removeProperty("--reveal-index");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("is-visible");
          observer.unobserve(element);
          window.setTimeout(() => finish(element), 1200);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    elements.forEach((element) => {
      if (element.matches(STAGGER_SELECTOR) && element.parentElement) {
        const siblings = Array.from(element.parentElement.children).filter((child) => child.matches(STAGGER_SELECTOR));
        element.style.setProperty("--reveal-index", String(siblings.indexOf(element) % 4));
      }
      element.classList.add("reveal");
      if (element.matches(FADE_ONLY_SELECTOR)) element.classList.add("reveal-fade");
      observer.observe(element);
    });

    // Ao trocar de página ou idioma, nada fica escondido pela metade.
    return () => {
      observer.disconnect();
      elements.forEach(finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

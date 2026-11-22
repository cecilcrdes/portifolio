import { useEffect } from "react";

type Language = "pt" | "en";

const SITE_NAME = "Cecília Rodrigues";

/** Atualiza o título da aba e o idioma do documento conforme a página aberta. */
export function usePageMeta(title: string | undefined, language: Language) {
  useEffect(() => {
    document.documentElement.lang = language === "en" ? "en" : "pt-BR";
    document.title = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — ${language === "en" ? "Multidisciplinary Designer & UX" : "Designer Multidisciplinar & UX"}`;
  }, [title, language]);
}

/** Traduz o marcador de período em andamento ("atual") para o inglês. */
export function localizeYear(year: string, language: Language) {
  return language === "en" ? year.replace(/\batual\b/i, "present") : year;
}

/** Copia texto para a área de transferência; devolve false se o navegador bloquear. */
export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Alternativa para navegadores sem permissão para a API de área de transferência.
    try {
      const field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(field);
      return copied;
    } catch {
      return false;
    }
  }
}

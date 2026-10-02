import { useLocation } from "wouter";
import { sitePath } from "@/lib/sitePath";

export default function GlitchcastAppPage() {
  const [location] = useLocation();
  const language = location.startsWith("/en/") ? "en" : "pt";
  const copy = language === "en" ? {
    tag: "UX Design / Glitchcast",
    title: "Glitchcast App",
    intro: "A podcast app concept that extends the Glitchcast identity into a focused listening experience.",
    back: "← Back to UX Design",
    overview: "The Glitchcast App project translates the podcast brand into a digital product, balancing discovery, listening and community around a clear, familiar interface.",
    problemTitle: "Context and challenge",
    problem: "Design a space where listeners can discover episodes, continue listening and explore the Glitch404 group universe without losing the energy of the original identity.",
    processTitle: "UX approach",
    process: "The proposal organizes the experience around a simple listening flow: discover, choose, listen and return. Content hierarchy, category labels and clear actions reduce friction between the podcast and its audience.",
    interfaceTitle: "Interface direction",
    interface: "Purple, yellow and electric-blue accents carry the Glitchcast visual language into the product, while modular cards and direct navigation keep the interface easy to scan.",
    tools: ["Figma", "UX research", "Information architecture", "UI design"],
    note: "UX project presented in Cecília Rodrigues’ portfolio",
  } : {
    tag: "UX Design / Glitchcast",
    title: "Glitchcast App",
    intro: "Um conceito de aplicativo de podcast que leva a identidade Glitchcast para uma experiência de escuta focada.",
    back: "← Voltar para UX Design",
    overview: "O projeto Glitchcast App traduz a marca do podcast para um produto digital, equilibrando descoberta, escuta e comunidade em uma interface clara e familiar.",
    problemTitle: "Contexto e desafio",
    problem: "Criar um espaço em que ouvintes possam descobrir episódios, continuar escutando e explorar o universo do grupo Glitch404 sem perder a energia da identidade original.",
    processTitle: "Abordagem de UX",
    process: "A proposta organiza a experiência em um fluxo simples de escuta: descobrir, escolher, ouvir e voltar. Hierarquia de conteúdo, categorias e ações diretas reduzem o atrito entre o podcast e seu público.",
    interfaceTitle: "Direção de interface",
    interface: "Acentos roxos, amarelos e azuis levam a linguagem visual do Glitchcast para o produto, enquanto cards modulares e navegação direta deixam a interface fácil de percorrer.",
    tools: ["Figma", "Pesquisa UX", "Arquitetura da informação", "UI design"],
    note: "Projeto de UX apresentado no portfólio de Cecília Rodrigues",
  };

  return <div className="original-project-page"><header><nav className="nav"><a href={sitePath(language === "en" ? "/en" : "/")} className="logo">CECÍLIA<span>·</span>RODRIGUES</a><div className="nav-links"><a href={sitePath(language === "en" ? "/en#sobre" : "/#sobre")}>{language === "en" ? "About" : "Sobre"}</a><a href={sitePath(language === "en" ? "/en#conhecimentos" : "/#conhecimentos")}>{language === "en" ? "Knowledge" : "Conhecimentos"}</a><a href={sitePath(language === "en" ? "/en#trabalhos" : "/#trabalhos")}>{language === "en" ? "Work" : "Trabalhos"}</a><a href={sitePath(language === "en" ? "/en#contato" : "/#contato")}>{language === "en" ? "Contact" : "Contato"}</a><a className="plain-language" href={sitePath(language === "en" ? "/projetos/ux/glitchcast-app" : "/en/projects/ux/glitchcast-app")}>{language === "en" ? "PT" : "EN"}</a></div></nav></header><main><section className="page-hero"><div className="wrap"><div className="eyebrow mono">{copy.tag}</div><h1>{copy.title}</h1><p>{copy.intro}</p><a className="back-link" href={sitePath(language === "en" ? "/en/projects/ux" : "/projetos/ux")}>{copy.back}</a></div></section><section><div className="wrap"><article className="project-detail glitchcast-app-case"><div className="project-index">01 / 01<br /><br />2021</div><div><h2>{copy.title}</h2><p>{copy.overview}</p><div className="project-tools">{copy.tools.map((tool) => <span className="project-tool" key={tool}>{tool}</span>)}</div><div className="detail-block"><h3>{copy.problemTitle}</h3><p>{copy.problem}</p></div><div className="detail-block"><h3>{copy.processTitle}</h3><p>{copy.process}</p></div><div className="detail-block"><h3>{copy.interfaceTitle}</h3><p>{copy.interface}</p></div><div className="detail-note">{copy.note}</div></div></article></div></section></main><footer><div className="wrap">© 2026 Cecília Rodrigues</div></footer></div>;
}

import { ArrowLeft, ArrowUpRight, X } from "lucide-react";
import SiteContact from "@/components/SiteContact";
import ThemeToggle from "@/components/ThemeToggle";
import { useLocation, useRoute } from "wouter";
import { useEffect, useState } from "react";
import { sitePath } from "@/lib/sitePath";

type Language = "pt" | "en";
type CaseSection = {
  id: string;
  label: string;
  title: string;
  text: string;
  media?: { src: string; alt: string }[];
};
type CaseProject = {
  slug: string;
  title: string;
  year: string;
  intro: string;
  labels: string[];
  sections: CaseSection[];
  cta?: { label: string; href: string };
};

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/portfolio/${filename}`;

const cases: Record<Language, CaseProject[]> = {
  pt: [
    {
      slug: "glitchcast",
      title: "Glitchcast",
      year: "2021",
      intro: "Identidade visual, conteúdo e aplicativo para o podcast do grupo Glitch404.",
      labels: ["Identidade visual", "Branding", "Mídias sociais", "Ilustrações", "Aplicativo"],
      sections: [
        { id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Identidade desenvolvida para o podcast Glitchcast, com símbolo, lettering, paleta vibrante e variações para diferentes fundos.", media: [{ src: asset("glitchcast-logo-aplicacoes.png"), alt: "Aplicações do logotipo Glitchcast" }, { src: asset("glitchcast-sistema-cores.png"), alt: "Paleta de cores e versões do logotipo Glitchcast" }] },
        { id: "branding", label: "Branding", title: "Branding", text: "O sistema de marca organiza os elementos visuais do Glitchcast e cria reconhecimento em diferentes pontos de contato.", media: [{ src: asset("glitchcast-produtos.png"), alt: "Aplicações da identidade Glitchcast em produtos" }] },
        { id: "midias-sociais", label: "Mídias sociais", title: "Mídias sociais", text: "Peças de comunicação para episódios, conteúdos e divulgação do podcast nas redes sociais.", media: [{ src: asset("glitchcast-midias-sociais.png"), alt: "Peças de mídias sociais do Glitchcast" }] },
        { id: "ilustracoes", label: "Ilustrações", title: "Ilustrações e key visuals", text: "Exploração dos elementos principais da identidade em composições que apresentam o universo visual do podcast.", media: [{ src: asset("glitchcast-chamada_c2fe0fb9.png"), alt: "Key visual do Glitchcast" }] },
        { id: "aplicativo", label: "Aplicativo", title: "Aplicativo Glitchcast", text: "Conceito de aplicativo de podcast que traduz a identidade visual para uma experiência digital de escuta, descoberta e comunidade." },
      ],
      cta: { label: "Ver estudo completo do aplicativo →", href: "/projetos/ux/glitchcast-app" },
    },
    {
      slug: "bogused",
      title: "Bogused",
      year: "2020",
      intro: "Direção visual de jogo, interface e produção de assets para personagens e cenários.",
      labels: ["Branding", "Interface", "Assets", "Personagens", "Cenários"],
      sections: [
        { id: "branding", label: "Branding", title: "Direção visual", text: "Bogused é um projeto de jogo com uma direção visual própria, construída a partir de uma atmosfera sombria e personagens expressivos." },
        { id: "interface", label: "Interface", title: "Interface do jogo", text: "Tela de seleção que organiza os personagens e traduz a narrativa de Bogused em uma experiência visual de jogo.", media: [{ src: asset("bogused-interface-game.png"), alt: "Interface do jogo Bogused" }, { src: asset("bogused-selection-screen.png"), alt: "Tela de seleção de personagens de Bogused" }] },
        { id: "personagens", label: "Personagens", title: "Design de personagens", text: "Estudos de personagens desenvolvidos para dar personalidade e coerência ao universo do jogo.", media: [{ src: asset("personagens-prancha_d84c54c1.png"), alt: "Estudos de personagens de Bogused" }] },
        { id: "cenarios", label: "Cenários", title: "Design de cenários", text: "Elementos e ilustrações de cenário que constroem a atmosfera do jogo.", media: [{ src: asset("arvore_0deab038.jpg"), alt: "Cenário de árvore de Bogused" }, { src: asset("forca_15b587a0.png"), alt: "Elemento de cenário de Bogused" }] },
      ],
    },
    {
      slug: "museus",
      title: "Projeto Museus",
      year: "2025",
      intro: "Aplicativo desenvolvido como catálogo cultural dos Museus da Cidade de Salvador.",
      labels: ["UX Design", "UI Design", "Pesquisa", "Arquitetura"],
      sections: [
        { id: "ux-design", label: "UX Design", title: "Experiência e jornada", text: "Aplicativo pensado para reunir museus, exposições, obras e artistas em uma experiência de descoberta cultural." },
        { id: "ui-design", label: "UI Design", title: "Fluxos e telas", text: "Uma interface editorial para percorrer conteúdos culturais com clareza.", media: [{ src: asset("museus/homepage.png"), alt: "Homepage do aplicativo Museus" }, { src: asset("museus/menu.png"), alt: "Menu do aplicativo Museus" }, { src: asset("museus/obras-de-arte.png"), alt: "Lista de obras do aplicativo Museus" }, { src: asset("museus/agenda.png"), alt: "Agenda cultural do aplicativo Museus" }] },
        { id: "pesquisa", label: "Pesquisa", title: "Pesquisa e arquitetura", text: "Organização dos conteúdos e fluxos para facilitar a descoberta de museus, exposições, obras e artistas.", media: [{ src: asset("museus/digitalizado.jpg"), alt: "Visão geral do projeto Museus" }] },
      ],
    },
    {
      slug: "mercado-da-rua",
      title: "App Mercado da Rua",
      year: "2025",
      intro: "Marketplace regional que conecta moradores a mercados, hortifrutis e mercearias do próprio bairro.",
      labels: ["UX Design", "UI Design", "Pesquisa"],
      sections: [{ id: "ux-design", label: "UX Design", title: "Experiência do produto", text: "Pesquisa, arquitetura e interface para tornar a compra local mais simples e próxima." }, { id: "ui-design", label: "UI Design", title: "Interface", text: "Uma experiência digital clara para encontrar produtos, comparar opções e comprar no comércio do bairro." }, { id: "pesquisa", label: "Pesquisa", title: "Pesquisa", text: "Mapeamento das necessidades de moradores e comerciantes para orientar a solução." }],
    },
    {
      slug: "site-aliez",
      title: "Site Aliez",
      year: "2025",
      intro: "Site para contratar artistas, com foco em descoberta, portfólio e contato.",
      labels: ["UX Design", "Web design"],
      sections: [{ id: "ux-design", label: "UX Design", title: "Arquitetura e jornada", text: "Estrutura para aproximar pessoas interessadas em contratar artistas dos portfólios certos." }, { id: "web-design", label: "Web design", title: "Interface web", text: "Direção de interface para apresentar artistas e facilitar o início de uma contratação." }],
    },
    {
      slug: "ksi-consultas",
      title: "KSI Consultas",
      year: "2018–2021",
      intro: "Construção de marca, papelaria e gerenciamento de mídias sociais para uma empresa de consultas especializadas.",
      labels: ["Branding", "Papelaria", "Mídias sociais"],
      sections: [{ id: "branding", label: "Branding", title: "Identidade de marca", text: "Construção da identidade visual para comunicar confiança, clareza e especialização." }, { id: "papelaria", label: "Papelaria", title: "Papelaria", text: "Aplicações da identidade nos materiais de comunicação da empresa." }, { id: "midias-sociais", label: "Mídias sociais", title: "Conteúdo para redes sociais", text: "Criação e gestão de conteúdo para aproximar a marca do público.", media: [{ src: asset("ksi-redes-sociais.png"), alt: "Presença digital e redes sociais da KSI Consultas" }, { src: asset("ksi-posts.png"), alt: "Peças para redes sociais da KSI Consultas" }] }],
    },
    {
      slug: "in9-midia",
      title: "In9 Mídia",
      year: "2021–2026",
      intro: "Gestão de redes sociais e campanhas de Google Ads para empresa de software e sinalização digital.",
      labels: ["Mídias sociais", "Google Ads"],
      sections: [{ id: "midias-sociais", label: "Mídias sociais", title: "Conteúdo para redes sociais", text: "Peças de comunicação para apresentar as soluções digitais e os serviços da In9 Mídia.", media: [{ src: asset("in9-posts.png"), alt: "Publicações para redes sociais da In9 Mídia" }, { src: asset("in9-posts-2.png"), alt: "Segunda seleção de publicações da In9 Mídia" }] }, { id: "google-ads", label: "Google Ads", title: "Campanhas e materiais digitais", text: "Materiais de divulgação das soluções de sinalização e comunicação digital.", media: [{ src: asset("in9-panfletos.png"), alt: "Materiais digitais de divulgação da In9 Mídia" }] }, { id: "templates-dooh", label: "Templates DOOH", title: "Templates para mídia DOOH", text: "Modelos visuais para exibição de ofertas, notícias e conteúdos em telas de mídia digital out of home.", media: [{ src: asset("in9-dooh-templates-1.png"), alt: "Template promocional para telas DOOH" }, { src: asset("in9-dooh-templates-2.png"), alt: "Variações de templates para telas DOOH" }, { src: asset("in9-dooh-templates-3.png"), alt: "Templates informativos e editoriais para telas DOOH" }] }, { id: "plataforma", label: "Plataforma digital", title: "Experiência da plataforma", text: "Telas de acesso, cadastro e navegação da plataforma digital da In9 Mídia.", media: [{ src: asset("in9-splashscreen.png"), alt: "Tela inicial do aplicativo NeoNews Mobile" }, { src: asset("in9-login.png"), alt: "Tela de acesso do aplicativo NeoNews Mobile" }, { src: asset("in9-cadastro.png"), alt: "Tela de cadastro do aplicativo NeoNews Mobile" }, { src: asset("in9-main.png"), alt: "Painel principal da plataforma In9 Mídia" }] }, { id: "materiais-institucionais", label: "Materiais institucionais", title: "Apresentação das soluções", text: "Materiais de apoio que explicam os serviços, os fluxos e as aplicações da plataforma.", media: [{ src: asset("in9-midiakit.png"), alt: "Mídia kit das soluções In9 Mídia" }, { src: asset("in9-diagramas.png"), alt: "Diagramas das soluções de sinalização digital" }] }],
    },
    {
      slug: "recomendaria",
      title: "Recomendaria",
      year: "2019",
      intro: "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.",
      labels: ["Branding", "Naming"],
      sections: [{ id: "branding", label: "Branding", title: "Identidade visual", text: "Desenvolvimento de uma marca para uma plataforma baseada em confiança e indicação profissional.", media: [{ src: asset("recomendaria-logo-icone.jpg"), alt: "Símbolo da marca Recomendaria" }, { src: asset("recomendaria-logo-completa.jpg"), alt: "Logotipo completo da Recomendaria" }] }, { id: "naming", label: "Naming", title: "Naming", text: "Nome pensado para comunicar recomendação, proximidade e credibilidade." }],
    },
    {
      slug: "sempre-vitta",
      title: "Sempre Vitta",
      year: "2017",
      intro: "Identidade visual para uma marca ligada à natureza, ao cuidado e à vitalidade.",
      labels: ["Identidade visual"],
      sections: [{ id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Construção de uma linguagem orgânica e acolhedora para Sempre Vitta, apresentada a partir da relação entre natureza, cuidado e vitalidade.", media: ["semprevittalogo1.png", "semprevittalogo2.png", "semprevittapost1.png", "semprevittapost2.png", "semprevittapost3.png", "semprevittapost4.png", "semprevitta-t-shirt.png", "semprevitta-tote-bag.png", "semprevitta-bag-of-gojiberries.png"].map((name) => ({ src: asset(`sempre-vitta/${name}`), alt: "Identidade visual Sempre Vitta" })) }],
    },
    {
      slug: "lcr-marcenaria",
      title: "LCR Marcenaria",
      year: "2018",
      intro: "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.",
      labels: ["Identidade visual"],
      sections: [{ id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Marca desenvolvida para a LCR Marcenaria, combinando as iniciais do nome com uma presença direta e artesanal.", media: [{ src: asset("lcr-logo.png"), alt: "Logotipo LCR Marcenaria" }, { src: asset("lcr-cores.png"), alt: "Cores da identidade visual da LCR Marcenaria" }, { src: asset("lcr-logo-variantes.png"), alt: "Variações do logotipo LCR Marcenaria" }] }],
    },
    {
      slug: "lilaz",
      title: "Lilaz",
      year: "2018",
      intro: "Identidade e embalagens para um pequeno negócio de decorações personalizadas.",
      labels: ["Identidade visual", "Embalagem"],
      sections: [{ id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Uma identidade delicada e reconhecível para um negócio de decorações personalizadas." }, { id: "embalagem", label: "Embalagem", title: "Embalagem", text: "Aplicações pensadas para levar a identidade ao momento de entrega e experiência do produto." }],
    },
    {
      slug: "e-ai-man-jogo",
      title: "E aí man jogo",
      year: "2016",
      intro: "Jogo 2D de aventura, plataforma e puzzle com narrativa sobre amizade e pertencimento.",
      labels: ["Game design", "Level design", "Ilustração"],
      sections: [{ id: "game-design", label: "Game design", title: "Game design", text: "Concepção de uma experiência de aventura, plataforma e puzzle voltada para crianças e adolescentes.", media: ["4902471380885416658.jpg", "4913456056097680289.jpg", "5093963279465385165.jpg", "5093963279465385166.jpg", "5093963279465385167.jpg", "5093963279465385168.jpg", "5186085272784317298.jpg", "IMG_20230405_105554_995.jpg"].map((name) => ({ src: asset(`eaiman/${name}`), alt: "Imagens do jogo E aí man" })) }, { id: "level-design", label: "Level design", title: "Level design", text: "Estruturação de fases e desafios para acompanhar a progressão da narrativa." }, { id: "ilustracao", label: "Ilustração", title: "Ilustração", text: "Direção visual para personagens, cenários e situações da história.", media: ["eaiman-grupo.jpg", "eaiman-jana.jpg", "eaiman-juca.jpg", "eaiman-lea.jpg", "eaiman-luketa.jpg", "eaiman-tuca.jpg"].map((name) => ({ src: asset(`eaiman/${name}`), alt: "Personagens do jogo E aí man" })) }],
    },
  ],
  en: [],
};

const englishCopy: Record<string, { intro: string; sections: { label: string; title: string; text: string }[] }> = {
  glitchcast: { intro: "Visual identity, content and app concept for the Glitch404 group podcast.", sections: [{ label: "Visual identity", title: "Visual identity", text: "Identity developed for the Glitchcast podcast, with symbol, lettering, vibrant palette and variations for different backgrounds." }, { label: "Branding", title: "Branding", text: "The brand system organizes Glitchcast's visual elements and creates recognition across different touchpoints." }, { label: "Social media", title: "Social media", text: "Communication pieces for episodes, content and podcast promotion across social platforms." }, { label: "Illustrations", title: "Illustrations and key visuals", text: "Exploration of the identity's main elements in compositions that present the podcast's visual universe." }, { label: "App", title: "Glitchcast app", text: "Podcast app concept translating the visual identity into a digital listening, discovery and community experience." }] },
  bogused: { intro: "Game art direction, interface and visual asset production for characters and environments.", sections: [{ label: "Branding", title: "Visual direction", text: "Bogused is a game project with its own visual direction, built from a dark atmosphere and expressive characters." }, { label: "Interface", title: "Game interface", text: "A selection screen that organizes the characters and translates Bogused's narrative into a game experience." }, { label: "Assets", title: "Visual assets", text: "Production of elements for the game experience, including characters, environments and wooden structures." }, { label: "Characters", title: "Character design", text: "Character studies developed to give personality and coherence to the game universe." }, { label: "Environments", title: "Environment design", text: "Environment elements and illustrations that build the game's atmosphere." }] },
  museus: { intro: "An app developed as a cultural catalogue for the Museums of Salvador.", sections: [{ label: "UX Design", title: "Experience and journey", text: "An app designed to bring museums, exhibitions, artworks and artists together in a cultural discovery experience." }, { label: "UI Design", title: "Flows and screens", text: "An editorial interface for navigating cultural content with clarity." }, { label: "Research", title: "Research and architecture", text: "Content and flow organization to make it easier to discover museums, exhibitions, artworks and artists." }] },
  "mercado-da-rua": { intro: "A regional marketplace connecting residents with neighborhood markets and grocery stores.", sections: [{ label: "UX Design", title: "Product experience", text: "Research, architecture and interface design to make local shopping simpler and closer." }, { label: "UI Design", title: "Interface", text: "A clear digital experience for finding products, comparing options and shopping at neighborhood stores." }, { label: "Research", title: "Research", text: "Mapping residents' and shopkeepers' needs to guide the solution." }] },
  "site-aliez": { intro: "Website for hiring artists, focused on discovery, portfolios and contact.", sections: [{ label: "UX Design", title: "Architecture and journey", text: "A structure that connects people looking to hire artists with the right portfolios." }, { label: "Web design", title: "Web interface", text: "Interface direction for presenting artists and making it easier to start a booking." }] },
  "ksi-consultas": { intro: "Brand identity, stationery and social media management for a specialized healthcare company.", sections: [{ id: "branding", label: "Branding", title: "Brand identity", text: "Brand identity designed to communicate trust, clarity and expertise." }, { id: "papelaria", label: "Stationery", title: "Stationery", text: "Identity applications across the company communication materials." }, { id: "midias-sociais", label: "Social media", title: "Social media content", text: "Content creation and management to bring the brand closer to its audience.", media: [{ src: asset("ksi-redes-sociais.png"), alt: "KSI Consultas digital presence and social media" }, { src: asset("ksi-posts.png"), alt: "KSI Consultas social media posts" }] }] },
  "in9-midia": { intro: "Social media management and Google Ads campaigns for a software and digital signage company.", sections: [{ id: "midias-sociais", label: "Social media", title: "Social media content", text: "Communication pieces presenting In9 Mídia digital products and services.", media: [{ src: asset("in9-posts.png"), alt: "In9 Mídia social media posts" }, { src: asset("in9-posts-2.png"), alt: "Additional In9 Mídia social media posts" }] }, { id: "google-ads", label: "Google Ads", title: "Campaigns and digital materials", text: "Promotional materials for digital signage and communication solutions.", media: [{ src: asset("in9-panfletos.png"), alt: "In9 Mídia digital promotional materials" }] }, { id: "templates-dooh", label: "DOOH templates", title: "Templates for DOOH media", text: "Visual templates for offers, news and content shown on digital out of home displays.", media: [{ src: asset("in9-dooh-templates-1.png"), alt: "Promotional template for DOOH displays" }, { src: asset("in9-dooh-templates-2.png"), alt: "DOOH template variations" }, { src: asset("in9-dooh-templates-3.png"), alt: "Informational and editorial DOOH templates" }] }, { id: "plataforma", label: "Digital platform", title: "Platform experience", text: "Login, sign up and navigation screens from the In9 Mídia digital platform.", media: [{ src: asset("in9-splashscreen.png"), alt: "NeoNews Mobile splash screen" }, { src: asset("in9-login.png"), alt: "NeoNews Mobile login screen" }, { src: asset("in9-cadastro.png"), alt: "NeoNews Mobile sign up screen" }, { src: asset("in9-main.png"), alt: "In9 Mídia platform home screen" }] }, { id: "materiais-institucionais", label: "Company materials", title: "Solution presentation", text: "Supporting materials explaining the platform services, flows and applications.", media: [{ src: asset("in9-midiakit.png"), alt: "In9 Mídia solutions media kit" }, { src: asset("in9-diagramas.png"), alt: "Digital signage solution diagrams" }] }] },
  recomendaria: { intro: "Naming and identity for a professional referral platform, from logo to app.", sections: [{ id: "branding", label: "Branding", title: "Brand identity", text: "Building a brand for a platform based on professional trust and referrals.", media: [{ src: asset("recomendaria-logo-icone.jpg"), alt: "Recomendaria symbol" }, { src: asset("recomendaria-logo-completa.jpg"), alt: "Complete Recomendaria logo" }] }, { id: "naming", label: "Naming", title: "Naming", text: "A name designed to communicate recommendation, closeness and credibility." }] },
  "sempre-vitta": { intro: "Visual identity for a brand connected to nature, care and vitality.", sections: [{ label: "Visual identity", title: "Visual identity", text: "An organic and welcoming visual language for Sempre Vitta, built around the relationship between nature, care and vitality." }] },
  "lcr-marcenaria": { intro: "Brand identity and workshop signage inspired by raw wood textures.", sections: [{ label: "Visual identity", title: "Visual identity", text: "Identity developed for LCR Marcenaria, combining the initials of the name with a direct, handcrafted presence." }] },
  lilaz: { intro: "Identity and packaging for a small custom decoration business.", sections: [{ label: "Visual identity", title: "Visual identity", text: "A delicate and recognizable identity for a custom decoration business." }, { label: "Packaging", title: "Packaging", text: "Applications designed to carry the identity into the delivery and product experience." }] },
  "e-ai-man-jogo": { intro: "A 2D adventure, platform and puzzle game about friendship and belonging.", sections: [{ label: "Game design", title: "Game design", text: "Conception of an adventure, platform and puzzle experience for children and teenagers." }, { label: "Level design", title: "Level design", text: "Structuring levels and challenges to support the narrative progression." }, { label: "Illustration", title: "Illustration", text: "Visual direction for the characters, environments and situations in the story." }] },
};

cases.en = cases.pt.map((project) => {
  const copy = englishCopy[project.slug];
  return {
    ...project,
    intro: copy?.intro || project.intro,
    labels: copy ? copy.sections.map((section) => section.label) : project.labels,
    sections: project.sections.map((section, index) => ({ ...section, ...(copy?.sections[index] || {}) })),
    cta: project.cta ? { label: "View the full app study →", href: "/en/projects/ux/glitchcast-app" } : undefined,
  };
});

export default function CasePage() {
  const [enlargedMedia, setEnlargedMedia] = useState<{ src: string; alt: string } | null>(null);
  const [location, navigate] = useLocation();
  const [enMatch, enParams] = useRoute("/en/cases/:slug");
  const [, ptParams] = useRoute("/cases/:slug");
  const language: Language = enMatch || location.startsWith("/en/") ? "en" : "pt";
  const slug = enParams?.slug || ptParams?.slug || "glitchcast";
  const project = cases[language].find((item) => item.slug === slug) || cases[language][0];
  const homePath = language === "en" ? "/en" : "/";
  const switchPath = language === "en" ? `/cases/${project.slug}` : `/en/cases/${project.slug}`;
  const ctaHref = project.cta ? sitePath(language === "en" ? "/en/projects/ux/glitchcast-app" : project.cta.href) : undefined;

  useEffect(() => {
    if (!enlargedMedia) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setEnlargedMedia(null); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [enlargedMedia]);

  // Evita exibir o mesmo arquivo de imagem mais de uma vez dentro do mesmo case.
  // A primeira ocorrência é mantida; imagens de projetos diferentes não são afetadas.
  const seenMedia = new Set<string>();
  const sectionsWithUniqueMedia = project.sections.map((section) => ({
    ...section,
    media: section.media?.filter((media) => {
      if (seenMedia.has(media.src)) return false;
      seenMedia.add(media.src);
      return true;
    }),
  }));

  return <div className="original-project-page case-page"><header><nav className="nav"><a href={sitePath(homePath)} className="logo">CECÍLIA<span>·</span>RODRIGUES</a><div className="nav-links"><a href={sitePath(`${homePath}#sobre`)}>{language === "en" ? "About" : "Sobre"}</a><a href={sitePath(`${homePath}#trabalhos`)}>{language === "en" ? "Work" : "Trabalhos"}</a><a href={sitePath(`${homePath}#contato`)}>{language === "en" ? "Contact" : "Contato"}</a><ThemeToggle language={language} /><button className="plain-language" onClick={() => navigate(switchPath)}>{language === "en" ? "PT" : "EN"}</button></div></nav></header><main><section className="case-hero"><div className="wrap"><div className="eyebrow mono">{language === "en" ? "Project case" : "Case de projeto"}</div><h1>{project.title}</h1><p>{project.intro}</p><div className="case-meta"><span>{project.year}</span><span>{language === "en" ? "Selected work" : "Trabalho selecionado"}</span></div></div></section><section className="case-navigation"><div className="wrap"><div className="case-labels" aria-label={language === "en" ? "Project areas" : "Áreas do projeto"}>{project.labels.map((label, index) => <a key={label} href={`#${project.sections[index]?.id || project.sections[0].id}`} className="case-label">{label} <ArrowUpRight size={13} /></a>)}</div></div></section><section><div className="wrap case-sections">{sectionsWithUniqueMedia.map((section, index) => <article className="case-section" id={section.id} key={`${project.slug}-${section.id}`}><div className="case-section-index">{String(index + 1).padStart(2, "0")} / {String(project.sections.length).padStart(2, "0")}</div><div className="case-section-content"><div className="case-section-heading"><span className="case-section-label">{section.label}</span><h2>{section.title}</h2></div><p>{section.text}</p>{section.media && section.media.length > 0 && <div className="case-media-grid">{section.media.map((media) => <figure key={media.src}><button className="case-image-zoom" type="button" onClick={() => setEnlargedMedia(media)} aria-label={language === "en" ? `Enlarge ${media.alt}` : `Ampliar ${media.alt}`}><img src={media.src} alt={media.alt} loading="lazy" /></button></figure>)}</div>}</div></article>)}{ctaHref && <a className="case-cta" href={ctaHref}>{project.cta?.label} <ArrowUpRight size={17} /></a>}</div></section><section className="case-project-nav"><div className="wrap"><div className="case-project-nav-heading"><span className="case-section-label">{language === "en" ? "Explore more" : "Continue explorando"}</span><h2>{language === "en" ? "Other projects" : "Outros projetos"}</h2></div><nav className="case-project-links" aria-label={language === "en" ? "Other project cases" : "Outros cases de projeto"}>{cases[language].filter((otherCase) => otherCase.slug !== project.slug).map((otherCase) => <a className="case-project-link" key={otherCase.slug} href={sitePath(language === "en" ? `/en/cases/${otherCase.slug}` : `/cases/${otherCase.slug}`)}>{otherCase.title} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</nav></div></section><SiteContact language={language} /></main><footer><div className="wrap">© 2026 Cecília Rodrigues</div></footer>{enlargedMedia && <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={language === "en" ? "Enlarged project image" : "Imagem ampliada do projeto"} onMouseDown={(event) => { if (event.target === event.currentTarget) setEnlargedMedia(null); }}><button className="case-lightbox-back" type="button" onClick={() => setEnlargedMedia(null)}><ArrowLeft size={18} />{language === "en" ? "Back" : "Voltar"}</button><button className="case-lightbox-close" type="button" onClick={() => setEnlargedMedia(null)} aria-label={language === "en" ? "Close enlarged image" : "Fechar imagem ampliada"}><X size={22} /></button><img src={enlargedMedia.src} alt={enlargedMedia.alt} /><p>{enlargedMedia.alt}</p></div>}</div>;
}

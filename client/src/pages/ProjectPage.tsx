// Páginas de trabalhos no formato original: uma página por categoria, lista linear e linguagem de portfólio.
import { ArrowLeft } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useState } from "react";
import { sitePath } from "@/lib/sitePath";

type Category = "graphic" | "ux" | "illustration" | "marketing";
const portfolioAsset = (filename: string) => `${import.meta.env.BASE_URL}assets/portfolio/${filename}`;
type Project = { id: string; title: string; year: string; text: string; tools: string[]; details?: { title: string; text?: string; media?: string; alt?: string }[] };
type PageCopy = { title: string; intro: string; tag: string; back: string; projects: Project[] };

const pages: Record<Category, { pt: PageCopy; en: PageCopy }> = {
  graphic: {
    pt: { title: "Branding", tag: "Projetos por categoria", intro: "Marcas, sistemas, embalagens e peças gráficas para transformar ideias em presença visual.", back: "← Voltar ao portfólio", projects: [
      { id: "glitchcast", title: "Glitchcast", year: "2021", text: "Identidade visual desenvolvida em 2021 para o podcast do grupo Glitch404, com sistema de marca, lettering e variações de aplicação.", tools: ["Illustrator", "Photoshop", "Branding", "UX"], details: [{ title: "Sistema visual", text: "Desenvolvimento da identidade do Glitchcast a partir do símbolo do microfone, das formas do coelho e de uma paleta vibrante com variações para diferentes fundos.", media: portfolioAsset("ProjetoGlitchcast_0baff893.png"), alt: "Prancha do sistema visual do podcast Glitchcast" }, { title: "Paleta e variações", text: "Definição das cores, versões do logotipo e combinações para diferentes contextos de aplicação.", media: portfolioAsset("glitchcast-sistema-cores.png"), alt: "Paleta de cores e versões do logotipo Glitchcast" }, { title: "Aplicações do logotipo", text: "Variações do símbolo e da assinatura visual para manter reconhecimento em diferentes formatos.", media: portfolioAsset("glitchcast-logo-aplicacoes.png"), alt: "Aplicações do logotipo Glitchcast" }, { title: "Mídias sociais", text: "Peças de comunicação para episódios, conteúdos e divulgação do podcast nas redes sociais.", media: portfolioAsset("glitchcast-midias-sociais.png"), alt: "Peças de mídias sociais do Glitchcast" }, { title: "Aplicações em produtos", text: "Mockups que apresentam a identidade em produtos e materiais de divulgação.", media: portfolioAsset("glitchcast-produtos.png"), alt: "Aplicações do Glitchcast em copo e roupas" }, { title: "Key visuals", text: "Exploração dos elementos principais da identidade em composições que apresentam o universo visual do podcast e suas possibilidades de aplicação.", media: portfolioAsset("glitchcast-chamada_c2fe0fb9.png"), alt: "Key visual do podcast Glitchcast com identidade roxa, amarela e azul" }, { title: "Produtos", text: "Aplicações da identidade em produtos e materiais de divulgação, como camisetas, canecas, adesivos, ecobags e outros itens para criar presença de marca além do podcast." }] },
      { id: "ksi-identidade", title: "KSI Consultas", year: "2026", text: "Construção de marca, papelaria e mídias sociais para uma empresa de consultas especializadas.", tools: ["Illustrator", "Identidade visual", "Papelaria", "Mídias sociais"] },
      { id: "recomendaria", title: "Recomendaria", year: "2026", text: "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.", tools: ["Illustrator", "Figma", "Naming"] },
      { id: "lcr", title: "LCR Marcenaria", year: "2025", text: "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.", tools: ["Illustrator", "Identidade visual", "Sinalização"] },
      { id: "lilaz", title: "Lilaz", year: "2025", text: "Identidade e embalagens para um pequeno negócio de decorações personalizadas.", tools: ["Illustrator", "Photoshop", "Embalagem"] },
    ] },
    en: { title: "Branding", tag: "Projects by category", intro: "Brands, systems, packaging and graphic pieces that turn ideas into visual presence.", back: "← Back to portfolio", projects: [
      { id: "glitchcast", title: "Glitchcast", year: "2021", text: "Visual identity developed in 2021 for the Glitch404 group podcast, with a brand system, lettering and application variations.", tools: ["Illustrator", "Photoshop", "Branding", "UX"], details: [{ title: "Visual system", text: "Development of the Glitchcast identity from the microphone symbol, rabbit forms and a vibrant palette with variations for different backgrounds.", media: portfolioAsset("ProjetoGlitchcast_0baff893.png"), alt: "Glitchcast visual system board" }, { title: "Palette and variations", text: "Definition of colors, logo versions and combinations for different application contexts.", media: portfolioAsset("glitchcast-sistema-cores.png"), alt: "Glitchcast color palette and logo versions" }, { title: "Logo applications", text: "Symbol and signature variations designed to preserve recognition across formats.", media: portfolioAsset("glitchcast-logo-aplicacoes.png"), alt: "Glitchcast logo applications" }, { title: "Social media", text: "Communication pieces for episodes, content and podcast promotion across social platforms.", media: portfolioAsset("glitchcast-midias-sociais.png"), alt: "Glitchcast social media pieces" }, { title: "Product applications", text: "Mockups presenting the identity on products and promotional materials.", media: portfolioAsset("glitchcast-produtos.png"), alt: "Glitchcast applications on a cup and clothing" }, { title: "Key visuals", text: "Exploration of the identity’s main elements in compositions that present the podcast’s visual universe and its application possibilities.", media: portfolioAsset("glitchcast-chamada_c2fe0fb9.png"), alt: "Glitchcast podcast key visual in purple, yellow and blue" }, { title: "Products", text: "Applications of the identity across merchandise and promotional materials, including T-shirts, mugs, stickers, tote bags and other items that extend the brand beyond the podcast." }] },
      { id: "ksi-identidade", title: "KSI Consultas", year: "2026", text: "Brand identity, stationery and social media management for a specialized healthcare company.", tools: ["Illustrator", "Visual identity", "Stationery", "Social media"] },
      { id: "recomendaria", title: "Recomendaria", year: "2026", text: "Naming and identity for a professional referral platform, from logo to app.", tools: ["Illustrator", "Figma", "Naming"] },
      { id: "lcr", title: "LCR Marcenaria", year: "2025", text: "Brand identity and workshop signage inspired by raw wood textures.", tools: ["Illustrator", "Visual identity", "Signage"] },
      { id: "lilaz", title: "Lilaz", year: "2025", text: "Identity and packaging for a small custom decoration business.", tools: ["Illustrator", "Photoshop", "Packaging"] },
    ] },
  },
  ux: {
    pt: { title: "UX Design", tag: "Projetos por categoria", intro: "Pesquisa, arquitetura e interfaces desenhadas para tornar produtos digitais mais claros e fáceis de usar.", back: "← Voltar ao portfólio", projects: [
      { id: "mercado-da-rua", title: "App Mercado da Rua", year: "2025", text: "Marketplace regional que conecta moradores a mercados, hortifrutis e mercearias do próprio bairro.", tools: ["Figma", "Pesquisa", "UX / UI"] }, { id: "glitchcast-app", title: "Glitchcast App", year: "2021", text: "Conceito de aplicativo de podcast para transformar a identidade Glitchcast em uma experiência digital de escuta.", tools: ["Figma", "Pesquisa UX", "UI design"] },
      { id: "proposta-valor", title: "Projeto museus", year: "2025", text: "App desenvolvido como catálogo cultural dos Museus da Cidade de Salvador", tools: ["Pesquisa", "Jornada do usuário", "Figma"], details: [
        { title: "Visão geral", text: "Aplicativo pensado para reunir museus, exposições, obras e artistas em uma experiência de descoberta cultural.", media: portfolioAsset("museus/digitalizado.jpg"), alt: "Visão geral do projeto Museus" },
        { title: "Cadastro", media: portfolioAsset("museus/cadastro.png"), alt: "Tela de cadastro do aplicativo Museus" },
        { title: "Cadastro alternativo", media: portfolioAsset("museus/cadastro-alternativo.png"), alt: "Variação da tela de cadastro do aplicativo Museus" },
        { title: "Homepage", media: portfolioAsset("museus/homepage.png"), alt: "Homepage do aplicativo Museus" },
        { title: "Menu", media: portfolioAsset("museus/menu.png"), alt: "Menu de navegação do aplicativo Museus" },
        { title: "Obras de arte", media: portfolioAsset("museus/obras-de-arte.png"), alt: "Lista de obras de arte do aplicativo Museus" },
        { title: "Sobre o artista", media: portfolioAsset("museus/sobre-artista.png"), alt: "Tela sobre o artista no aplicativo Museus" },
        { title: "Sobre a exposição", media: portfolioAsset("museus/sobre-exposicao.png"), alt: "Tela sobre a exposição no aplicativo Museus" },
        { title: "Sobre o museu", media: portfolioAsset("museus/sobre-museu.png"), alt: "Tela sobre o museu no aplicativo Museus" },
        { title: "Lista de exposições", media: portfolioAsset("museus/lista-exposicoes.png"), alt: "Lista de exposições do aplicativo Museus" },
        { title: "Lista de museus", media: portfolioAsset("museus/lista-museus.png"), alt: "Lista de museus do aplicativo Museus" },
        { title: "Lista de artistas", media: portfolioAsset("museus/lista-artistas.png"), alt: "Lista de artistas do aplicativo Museus" },
        { title: "Lista de obras", media: portfolioAsset("museus/lista-obras.png"), alt: "Lista de obras do aplicativo Museus" },
        { title: "Agenda", media: portfolioAsset("museus/agenda.png"), alt: "Agenda cultural do aplicativo Museus" },
      ] },
      { id: "arquitetura", title: "Arquitetura do produto — UX / app", year: "2025", text: "Organização de categorias, busca, loja e pedido em uma navegação simples para uso cotidiano.", tools: ["Figma", "Fluxo de navegação", "Protótipo"] },
      { id: "monetizacao", title: "Modelo de monetização", year: "2025", text: "Exploração de caminhos de receita para equilibrar acesso do usuário e viabilidade dos pequenos negócios.", tools: ["Pesquisa", "Produto", "Estratégia"] },
    ] },
    en: { title: "UX Design", tag: "Projects by category", intro: "Research, architecture and interfaces designed to make digital products clearer and easier to use.", back: "← Back to portfolio", projects: [
      { id: "mercado-da-rua", title: "Mercado da Rua app", year: "2025", text: "A regional marketplace connecting residents with neighborhood markets and grocery stores.", tools: ["Figma", "Research", "UX / UI"] }, { id: "glitchcast-app", title: "Glitchcast App", year: "2021", text: "Podcast app concept translating the Glitchcast identity into a focused digital listening experience.", tools: ["Figma", "UX research", "UI design"] },
      { id: "proposta-valor", title: "Museums project", year: "2025", text: "App developed as a cultural catalogue for the Museums of Salvador.", tools: ["Research", "User journey", "Figma"], details: [
        { title: "Overview", text: "An app designed to bring museums, exhibitions, artworks and artists together in a cultural discovery experience.", media: portfolioAsset("museus/digitalizado.jpg"), alt: "Overview of the Museums project" },
        { title: "Sign up", media: portfolioAsset("museus/cadastro.png"), alt: "Sign up screen of the Museums app" },
        { title: "Alternative sign up", media: portfolioAsset("museus/cadastro-alternativo.png"), alt: "Alternative sign up screen of the Museums app" },
        { title: "Homepage", media: portfolioAsset("museus/homepage.png"), alt: "Homepage of the Museums app" },
        { title: "Menu", media: portfolioAsset("museus/menu.png"), alt: "Navigation menu of the Museums app" },
        { title: "Artworks", media: portfolioAsset("museus/obras-de-arte.png"), alt: "Artworks list in the Museums app" },
        { title: "About the artist", media: portfolioAsset("museus/sobre-artista.png"), alt: "About the artist screen in the Museums app" },
        { title: "About the exhibition", media: portfolioAsset("museus/sobre-exposicao.png"), alt: "About the exhibition screen in the Museums app" },
        { title: "About the museum", media: portfolioAsset("museus/sobre-museu.png"), alt: "About the museum screen in the Museums app" },
        { title: "Exhibitions list", media: portfolioAsset("museus/lista-exposicoes.png"), alt: "Exhibitions list in the Museums app" },
        { title: "Museums list", media: portfolioAsset("museus/lista-museus.png"), alt: "Museums list in the Museums app" },
        { title: "Artists list", media: portfolioAsset("museus/lista-artistas.png"), alt: "Artists list in the Museums app" },
        { title: "Artworks list", media: portfolioAsset("museus/lista-obras.png"), alt: "Artworks list in the Museums app" },
        { title: "Agenda", media: portfolioAsset("museus/agenda.png"), alt: "Cultural agenda in the Museums app" },
      ] },
      { id: "arquitetura", title: "Product architecture — UX / app", year: "2025", text: "Categories, search, stores and orders organized into a simple everyday navigation.", tools: ["Figma", "Navigation flow", "Prototype"] },
      { id: "monetizacao", title: "Monetization model", year: "2025", text: "Revenue paths explored to balance user access and the viability of small businesses.", tools: ["Research", "Product", "Strategy"] },
    ] },
  },
  illustration: {
    pt: { title: "Conteúdo visual", tag: "Projetos por categoria", intro: "Projetos de conteúdo visual desenvolvidos para transformar ideias em imagens memoráveis.", back: "← Voltar ao portfólio", projects: [
      { id: "bogused", title: "Bogused — Assets", year: "2020", text: "Produção de assets visuais para o jogo Bogused, com foco na criação de personagens, cenários e elementos de interface.", tools: ["Branding", "UI design", "Assets"], details: [
        { title: "Apresentação do jogo", text: "Bogused é um projeto de jogo com uma direção visual própria. Fiquei responsável por desenvolver personagens, cenários e interface, criando um conjunto coerente de elementos para a experiência.", media: portfolioAsset("personagens-prancha_d84c54c1.png"), alt: "Prancha de personagens do jogo Bogused" },
        { title: "Design de personagens", media: portfolioAsset("personagens-prancha_d84c54c1.png"), alt: "Estudos de personagens do jogo Bogused" },
        { title: "Design de cenário", media: portfolioAsset("arvore_0deab038.jpg"), alt: "Ilustração de árvore para o cenário de Bogused" },
        { title: "Elementos de cenário", media: portfolioAsset("forca_15b587a0.png"), alt: "Estrutura de madeira criada para o cenário" },
        { title: "Design de interface", media: portfolioAsset("select_d037a441.png"), alt: "Tela de seleção do jogo Bogused" },
      ] },
      { id: "e-ai-man", title: "E aí man jogo", year: "2020", text: "Jogo 2D de aventura, plataforma e puzzle voltado para crianças e adolescentes. Na história, Luketa atravessa diferentes espaços da comunidade para encontrar seu melhor amigo Tuca.", tools: ["Game design", "Level design", "Ilustração"], details: [{ title: "Apresentação do jogo", text: "O projeto combina progressão por fases, exploração lateral, combate, pequenos enigmas e uma narrativa sobre amizade, colaboração e pertencimento, ambientada em cenários inspirados em comunidades brasileiras." }] },
    ] },
    en: { title: "Visual content", tag: "Projects by category", intro: "Visual content projects developed to turn ideas into memorable images.", back: "← Back to portfolio", projects: [
      { id: "bogused", title: "Bogused — Assets", year: "2020", text: "Visual assets for the Bogused game, focused on characters, environments and interface elements.", tools: ["Branding", "UI design", "Assets"], details: [
        { title: "Game presentation", text: "Bogused is a game project with its own visual direction. I developed characters, environments and interface, creating a coherent set of elements for the game experience.", media: portfolioAsset("personagens-prancha_d84c54c1.png"), alt: "Bogused game character board" },
        { title: "Character design", media: portfolioAsset("personagens-prancha_d84c54c1.png"), alt: "Bogused character studies" },
        { title: "Environment design", media: portfolioAsset("arvore_0deab038.jpg"), alt: "Tree illustration for the Bogused environment" },
        { title: "Environment elements", media: portfolioAsset("forca_15b587a0.png"), alt: "Wooden structure created for the environment" },
        { title: "Interface design", media: portfolioAsset("select_d037a441.png"), alt: "Bogused game selection screen" },
      ] },
      { id: "e-ai-man", title: "E aí man jogo", year: "2020", text: "A 2D adventure, platform and puzzle game for children and teenagers. Luketa crosses different spaces in the community to find his best friend Tuca.", tools: ["Game design", "Level design", "Illustration"], details: [{ title: "Game presentation", text: "The project combines level progression, side-scrolling exploration, combat, small puzzles and a story about friendship, collaboration and belonging in Brazilian-inspired communities." }] },
    ] },
  },
  marketing: {
    pt: { title: "Marketing", tag: "Projetos por categoria", intro: "Campanhas, conteúdos e presença digital para aproximar marcas de suas pessoas.", back: "← Voltar ao portfólio", projects: [
      { id: "site-aliez", title: "Site Aliez", year: "2024", text: "Site para contratar artistas.", tools: ["Figma", "UX / UI", "Web design"] },
      { id: "in9", title: "In9 Mídia", year: "2021–2026", text: "Gestão de redes sociais e campanhas de Google Ads para empresa de software e sinalização digital.", tools: ["Canva", "Adobe Express", "Google Ads"] },
    ] },
    en: { title: "Marketing", tag: "Projects by category", intro: "Campaigns, content and digital presence to bring brands closer to their people.", back: "← Back to portfolio", projects: [
      { id: "site-aliez", title: "Site Aliez", year: "2024", text: "Website for hiring artists.", tools: ["Figma", "UX / UI", "Web design"] },
      { id: "in9", title: "In9 Mídia", year: "2021–2026", text: "Social media management and Google Ads campaigns for a software and digital signage company.", tools: ["Canva", "Adobe Express", "Google Ads"] },
    ] },
  },
};

const normalizeCategory = (value: string): Category => ({ grafico: "graphic", graphic: "graphic", ux: "ux", ilustracao: "illustration", illustration: "illustration", marketing: "marketing" } as Record<string, Category>)[value] || "graphic";

function ProductCarousel({ language }: { language: "pt" | "en" }) {
  const products = language === "pt" ? [
    { title: "Camiseta", text: "Mockup de camiseta com a assinatura visual do Glitchcast.", media: portfolioAsset("glitchcast-tshirt-mockup_d6a9501d.png"), alt: "Mockup de camiseta preta do Glitchcast" },
    { title: "Caneca", text: "Mockup de caneca com a identidade do podcast.", media: portfolioAsset("glitchcast-mug-mockup_505ebf47.png"), alt: "Mockup de caneca branca do Glitchcast" },
    { title: "Moletom", text: "Aplicação da identidade em um moletom roxo, apresentada em um contexto de uso cotidiano.", media: portfolioAsset("glitchcast-purple-hoodie-reference_69a0911b.png"), alt: "Pessoa usando moletom roxo com a identidade do Glitchcast" },
    { title: "Adesivos", text: "Conjunto de adesivos recortados para levar a identidade do podcast para diferentes superfícies.", media: portfolioAsset("glitchcast-sticker-mockup_085b7c62.png"), alt: "Conjunto de adesivos do Glitchcast" },
    { title: "Ecobag", text: "Ecobag de algodão com a assinatura visual do Glitchcast.", media: portfolioAsset("glitchcast-tote-bag-mockup_43dc74cf.png"), alt: "Ecobag de algodão com a identidade do Glitchcast" },
    { title: "Boné", text: "Boné roxo com o símbolo do Glitchcast bordado.", media: portfolioAsset("glitchcast-cap-mockup_e5a4ad9a.png"), alt: "Boné roxo com o símbolo do Glitchcast" },
    { title: "Caderno", text: "Caderno com capa roxa e a assinatura visual do Glitchcast.", media: portfolioAsset("glitchcast-notebook-mockup_1a4bf8aa.png"), alt: "Caderno roxo com a identidade do Glitchcast" },
  ] : [
    { title: "T-shirt", text: "T-shirt mockup featuring the Glitchcast visual signature.", media: portfolioAsset("glitchcast-tshirt-mockup_d6a9501d.png"), alt: "Black Glitchcast T-shirt mockup" },
    { title: "Mug", text: "Mug mockup featuring the podcast identity.", media: portfolioAsset("glitchcast-mug-mockup_505ebf47.png"), alt: "White Glitchcast mug mockup" },
    { title: "Hoodie", text: "The identity applied to a purple hoodie, shown in an everyday use context.", media: portfolioAsset("glitchcast-purple-hoodie-reference_69a0911b.png"), alt: "Person wearing a purple hoodie with the Glitchcast identity" },
    { title: "Stickers", text: "A set of die-cut stickers that brings the podcast identity to different surfaces.", media: portfolioAsset("glitchcast-sticker-mockup_085b7c62.png"), alt: "Set of Glitchcast stickers" },
    { title: "Tote bag", text: "Cotton tote bag featuring the Glitchcast visual signature.", media: portfolioAsset("glitchcast-tote-bag-mockup_43dc74cf.png"), alt: "Cotton tote bag with the Glitchcast identity" },
    { title: "Cap", text: "Purple cap with the Glitchcast emblem embroidered on the front.", media: portfolioAsset("glitchcast-cap-mockup_e5a4ad9a.png"), alt: "Purple cap with the Glitchcast emblem" },
    { title: "Notebook", text: "Notebook with a purple cover and the Glitchcast visual signature.", media: portfolioAsset("glitchcast-notebook-mockup_1a4bf8aa.png"), alt: "Purple notebook with the Glitchcast identity" },
  ];
  const perPage = 3;
  const pageCount = Math.ceil(products.length / perPage);
  const [page, setPage] = useState(0);
  const [zoomed, setZoomed] = useState<number | null>(null);
  const visibleProducts = products.slice(page * perPage, page * perPage + perPage);
  const selected = zoomed === null ? null : products[zoomed];
  const move = (direction: number) => setPage((value) => (value + direction + pageCount) % pageCount);
  return <div className="products-grid-gallery" aria-label={language === "pt" ? "Galeria de produtos Glitchcast" : "Glitchcast products gallery"}>
    <div className="products-grid-head"><div><h3>{language === "pt" ? "Galeria de produtos" : "Product gallery"}</h3><p>{language === "pt" ? "Aplicações da identidade em uma seleção de produtos." : "Identity applications across a selection of products."}</p></div><div className="products-grid-controls"><span className="products-grid-count">{String(page + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span><button type="button" onClick={() => move(-1)} aria-label={language === "pt" ? "Produtos anteriores" : "Previous products"}>←</button><button type="button" onClick={() => move(1)} aria-label={language === "pt" ? "Próximos produtos" : "Next products"}>→</button></div></div>
    <div className="products-grid">{visibleProducts.map((product, localIndex) => { const index = page * perPage + localIndex; return <article className="products-grid-card" key={product.title}><div className="products-grid-image"><img src={product.media} alt={product.alt} loading="lazy" /><button type="button" className="products-grid-zoom" onClick={() => setZoomed(index)} aria-label={language === "pt" ? `Ampliar imagem de ${product.title}` : `Enlarge ${product.title} image`}>+</button></div><h4>{product.title}</h4><p>{product.text}</p></article>; })}</div>
    <a className="glitchcast-app-cta" href={sitePath(language === "en" ? "/en/projects/ux/glitchcast-app" : "/projetos/ux/glitchcast-app")}>{language === "pt" ? "Ver o projeto Glitchcast App →" : "View the Glitchcast App project →"}</a>
    {selected && <div className="products-lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setZoomed(null)}><button type="button" className="products-lightbox-close" onClick={() => setZoomed(null)} aria-label={language === "pt" ? "Fechar imagem ampliada" : "Close enlarged image"}>×</button><img src={selected.media} alt={selected.alt} onClick={(event) => event.stopPropagation()} /></div>}
  </div>;
}

export default function ProjectPage() {
  const [location, navigate] = useLocation();
  const [enMatch, enParams] = useRoute("/en/projects/:category");
  const [, ptParams] = useRoute("/projetos/:category");
  const language = enMatch || location.startsWith("/en/") ? "en" : "pt";
  const category = normalizeCategory((enParams?.category || ptParams?.category || "graphic") as string);
  const copy = pages[category][language];
  const homePath = language === "en" ? "/en" : "/";
  const switchPath = language === "en" ? `/projetos/${category === "graphic" ? "grafico" : category === "illustration" ? "ilustracao" : category}` : `/en/projects/${category}`;

  return <div className="original-project-page"><header><nav className="nav"><a href={sitePath(homePath)} className="logo">CECÍLIA<span>·</span>RODRIGUES</a><div className="nav-links"><a href={sitePath(`${homePath}#sobre`)}>{language === "en" ? "About" : "Sobre"}</a><a href={sitePath(`${homePath}#conhecimentos`)}>{language === "en" ? "Knowledge" : "Conhecimentos"}</a><a href={sitePath(`${homePath}#trabalhos`)}>{language === "en" ? "Work" : "Trabalhos"}</a><a href={sitePath(`${homePath}#contato`)}>{language === "en" ? "Contact" : "Contato"}</a><button className="plain-language" onClick={() => navigate(switchPath)}>{language === "en" ? "PT" : "EN"}</button></div></nav></header><main><section className="page-hero"><div className="wrap"><div className="eyebrow mono">{copy.tag}</div><h1>{copy.title}</h1><p>{copy.intro}</p><a className="back-link" href={sitePath(`${homePath}#trabalhos`)}>{copy.back}</a></div></section><section><div className="wrap"><div className="project-list">{copy.projects.map((project, index) => <article className="project-detail" id={project.id} key={project.id}><div className="project-index">{String(index + 1).padStart(2, "0")} / {String(copy.projects.length).padStart(2, "0")}<br /><br />{project.year}</div><div><h2>{project.title}</h2><p>{project.text}</p><div className="project-tools">{project.tools.map((tool) => <span className="project-tool" key={tool}>{tool}</span>)}</div>{project.details?.map((detail, detailIndex) => <div className="detail-block" key={`${project.id}-${detail.title}`}><h3>{detail.title}</h3>{detail.text && <p>{detail.text}</p>}{detail.media && <img src={detail.media} alt={detail.alt || ""} loading="lazy" />}{detailIndex === 0 && project.details && project.details.length > 1 && <div className="detail-gallery" />}</div>)}{project.id === "glitchcast" && <ProductCarousel language={language} />}<div className="detail-note">{language === "en" ? "Project presented in Cecília Rodrigues’ portfolio" : "Projeto apresentado no portfólio de Cecília Rodrigues"}</div></div></article>)}</div></div></section>{category === "graphic" && <section className="wrap" style={{ paddingBottom: "100px" }}><a className="back-link" href={sitePath(language === "en" ? "/en/projects/ux/glitchcast-app" : "/projetos/ux/glitchcast-app")}>{language === "en" ? "View the Glitchcast App UX project →" : "Ver o projeto UX do Glitchcast App →"}</a></section>}</main><footer><div className="wrap">© 2026 Cecília Rodrigues</div></footer></div>;
}

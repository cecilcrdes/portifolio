// Páginas de trabalhos no formato original: uma página por categoria, lista linear e linguagem de portfólio.
import { ArrowLeft } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useState } from "react";

type Category = "graphic" | "ux" | "illustration" | "marketing";
const portfolioAsset = (filename: string) => `${import.meta.env.BASE_URL}assets/portfolio/${filename}`;
type Project = { id: string; title: string; year: string; text: string; tools: string[]; details?: { title: string; text?: string; media?: string; alt?: string }[] };
type PageCopy = { title: string; intro: string; tag: string; back: string; projects: Project[] };

const pages: Record<Category, { pt: PageCopy; en: PageCopy }> = {
  graphic: {
    pt: { title: "Branding", tag: "Projetos por categoria", intro: "Marcas, sistemas, embalagens e peças gráficas para transformar ideias em presença visual.", back: "← Voltar ao portfólio", projects: [
      { id: "glitchcast", title: "Glitchcast", year: "2021", text: "Identidade visual desenvolvida em 2021 para o podcast do grupo Glitch404, com sistema de marca, lettering e variações de aplicação.", tools: ["Illustrator", "Photoshop", "Branding"], details: [{ title: "Sistema visual", text: "Desenvolvimento da identidade do Glitchcast a partir do símbolo do microfone, das formas do coelho e de uma paleta vibrante com variações para diferentes fundos.", media: portfolioAsset("ProjetoGlitchcast_0baff893.png"), alt: "Prancha do sistema visual do podcast Glitchcast" }, { title: "Key visuals", text: "Exploração dos elementos principais da identidade em composições que apresentam o universo visual do podcast e suas possibilidades de aplicação.", media: portfolioAsset("glitchcast-chamada_c2fe0fb9.png"), alt: "Key visual do podcast Glitchcast com identidade roxa, amarela e azul" }, { title: "Produtos", text: "Aplicações da identidade em produtos e materiais de divulgação, como camisetas, canecas, adesivos, ecobags e outros itens para criar presença de marca além do podcast." }] },
      { id: "vira-lata", title: "Festival Vira-Lata", year: "2023", text: "Sistema de cartazes serigrafados para um festival de música independente, com tipografia recortada à mão.", tools: ["Illustrator", "Photoshop", "Cartaz"] },
      { id: "ksi-identidade", title: "KSI Consultas", year: "2026", text: "Marca e papelaria para uma empresa de consultas especializadas, com foco em tecnologia.", tools: ["Illustrator", "Identidade visual", "Papelaria"] },
      { id: "recomendaria", title: "Recomendaria", year: "2026", text: "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.", tools: ["Illustrator", "Figma", "Naming"] },
      { id: "lcr", title: "LCR Marcenaria", year: "2025", text: "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.", tools: ["Illustrator", "Identidade visual", "Sinalização"] },
      { id: "lilaz", title: "Lilaz", year: "2025", text: "Identidade e embalagens para um pequeno negócio de decorações personalizadas.", tools: ["Illustrator", "Photoshop", "Embalagem"] },
    ] },
    en: { title: "Branding", tag: "Projects by category", intro: "Brands, systems, packaging and graphic pieces that turn ideas into visual presence.", back: "← Back to portfolio", projects: [
      { id: "glitchcast", title: "Glitchcast", year: "2021", text: "Visual identity developed in 2021 for the Glitch404 group podcast, with a brand system, lettering and application variations.", tools: ["Illustrator", "Photoshop", "Branding"], details: [{ title: "Visual system", text: "Development of the Glitchcast identity from the microphone symbol, rabbit forms and a vibrant palette with variations for different backgrounds.", media: portfolioAsset("ProjetoGlitchcast_0baff893.png"), alt: "Glitchcast visual system board" }, { title: "Key visuals", text: "Exploration of the identity’s main elements in compositions that present the podcast’s visual universe and its application possibilities.", media: portfolioAsset("glitchcast-chamada_c2fe0fb9.png"), alt: "Glitchcast podcast key visual in purple, yellow and blue" }, { title: "Products", text: "Applications of the identity across merchandise and promotional materials, including T-shirts, mugs, stickers, tote bags and other items that extend the brand beyond the podcast." }] },
      { id: "vira-lata", title: "Vira-Lata Festival", year: "2023", text: "A screen-printed poster system for an independent music festival, with hand-cut typography.", tools: ["Illustrator", "Photoshop", "Poster"] },
      { id: "ksi-identidade", title: "KSI Consultas", year: "2026", text: "Brand identity and stationery for a technology-focused specialized consultation company.", tools: ["Illustrator", "Visual identity", "Stationery"] },
      { id: "recomendaria", title: "Recomendaria", year: "2026", text: "Naming and identity for a professional referral platform, from logo to app.", tools: ["Illustrator", "Figma", "Naming"] },
      { id: "lcr", title: "LCR Marcenaria", year: "2025", text: "Brand identity and workshop signage inspired by raw wood textures.", tools: ["Illustrator", "Visual identity", "Signage"] },
      { id: "lilaz", title: "Lilaz", year: "2025", text: "Identity and packaging for a small custom decoration business.", tools: ["Illustrator", "Photoshop", "Packaging"] },
    ] },
  },
  ux: {
    pt: { title: "UX Design", tag: "Projetos por categoria", intro: "Pesquisa, arquitetura e interfaces desenhadas para tornar produtos digitais mais claros e fáceis de usar.", back: "← Voltar ao portfólio", projects: [
      { id: "mercado-da-rua", title: "App Mercado da Rua", year: "2025", text: "Marketplace regional que conecta moradores a mercados, hortifrutis e mercearias do próprio bairro.", tools: ["Figma", "Pesquisa", "UX / UI"] }, { id: "glitchcast-app", title: "Glitchcast App", year: "2021", text: "Conceito de aplicativo de podcast para transformar a identidade Glitchcast em uma experiência digital de escuta.", tools: ["Figma", "Pesquisa UX", "UI design"] },
      { id: "proposta-valor", title: "Projeto museus", year: "2025", text: "App desenvolvido como catálogo cultural dos Museus da Cidade de Salvador", tools: ["Pesquisa", "Jornada do usuário", "Figma"] },
      { id: "arquitetura", title: "Arquitetura do produto — UX / app", year: "2025", text: "Organização de categorias, busca, loja e pedido em uma navegação simples para uso cotidiano.", tools: ["Figma", "Fluxo de navegação", "Protótipo"] },
      { id: "monetizacao", title: "Modelo de monetização", year: "2025", text: "Exploração de caminhos de receita para equilibrar acesso do usuário e viabilidade dos pequenos negócios.", tools: ["Pesquisa", "Produto", "Estratégia"] },
      { id: "loja-verde", title: "Checkout — Loja Verde", year: "2024", text: "Simplificação do carrinho e pagamento de um marketplace de produtos sustentáveis, com testes A/B em cada etapa.", tools: ["Figma", "UX / UI", "Testes"] },
    ] },
    en: { title: "UX Design", tag: "Projects by category", intro: "Research, architecture and interfaces designed to make digital products clearer and easier to use.", back: "← Back to portfolio", projects: [
      { id: "mercado-da-rua", title: "Mercado da Rua app", year: "2025", text: "A regional marketplace connecting residents with neighborhood markets and grocery stores.", tools: ["Figma", "Research", "UX / UI"] }, { id: "glitchcast-app", title: "Glitchcast App", year: "2021", text: "Podcast app concept translating the Glitchcast identity into a focused digital listening experience.", tools: ["Figma", "UX research", "UI design"] },
      { id: "proposta-valor", title: "Value proposition and positioning", year: "2025", text: "Audience, needs and differentiators defined to guide the first version of the product.", tools: ["Research", "User journey", "Figma"] },
      { id: "arquitetura", title: "Product architecture — UX / app", year: "2025", text: "Categories, search, stores and orders organized into a simple everyday navigation.", tools: ["Figma", "Navigation flow", "Prototype"] },
      { id: "monetizacao", title: "Monetization model", year: "2025", text: "Revenue paths explored to balance user access and the viability of small businesses.", tools: ["Research", "Product", "Strategy"] },
      { id: "loja-verde", title: "Checkout — Loja Verde", year: "2024", text: "A simpler cart and payment experience for a sustainable products marketplace, tested at each step.", tools: ["Figma", "UX / UI", "Testing"] },
    ] },
  },
  illustration: {
    pt: { title: "Conteúdo visual", tag: "Projetos por categoria", intro: "Projetos de conteúdo visual desenvolvidos para transformar ideias em imagens memoráveis.", back: "← Voltar ao portfólio", projects: [
      { id: "bogused", title: "Bogused — Assets", year: "2020", text: "Produção de assets visuais para o jogo Bogused, com foco na criação de personagens, cenários e elementos de interface.", tools: ["Photoshop", "Illustrator", "Concept art"], details: [
        { title: "Apresentação do jogo", text: "Bogused é um projeto de jogo com uma direção visual própria. Fiquei responsável por desenvolver personagens, cenários e interface, criando um conjunto coerente de elementos para a experiência.", media: portfolioAsset("personagens-prancha_d84c54c1.png"), alt: "Prancha de personagens do jogo Bogused" },
        { title: "Design de personagens", media: portfolioAsset("personagens-prancha_d84c54c1.png"), alt: "Estudos de personagens do jogo Bogused" },
        { title: "Design de cenário", media: portfolioAsset("arvore_0deab038.jpg"), alt: "Ilustração de árvore para o cenário de Bogused" },
        { title: "Elementos de cenário", media: portfolioAsset("forca_15b587a0.png"), alt: "Estrutura de madeira criada para o cenário" },
        { title: "Design de interface", media: portfolioAsset("select_d037a441.png"), alt: "Tela de seleção do jogo Bogused" },
      ] },
      { id: "e-ai-man", title: "E aí man jogo", year: "2020", text: "Jogo 2D de aventura, plataforma e puzzle voltado para crianças e adolescentes. Na história, Luketa atravessa diferentes espaços da comunidade para encontrar seu melhor amigo Tuca.", tools: ["Game design", "Level design", "Ilustração"], details: [{ title: "Apresentação do jogo", text: "O projeto combina progressão por fases, exploração lateral, combate, pequenos enigmas e uma narrativa sobre amizade, colaboração e pertencimento, ambientada em cenários inspirados em comunidades brasileiras." }] },
    ] },
    en: { title: "Visual content", tag: "Projects by category", intro: "Visual content projects developed to turn ideas into memorable images.", back: "← Back to portfolio", projects: [
      { id: "bogused", title: "Bogused — Assets", year: "2020", text: "Visual assets for the Bogused game, focused on characters, environments and interface elements.", tools: ["Photoshop", "Illustrator", "Concept art"], details: [
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
      { id: "trilha", title: "Trilha Selvagem", year: "2024", text: "Direção de arte e conteúdo para o lançamento de uma linha de mochilas, com peças para redes e ponto de venda.", tools: ["Canva", "Adobe Express", "Photoshop"] },
      { id: "bloom", title: "Marca Bloom", year: "2023", text: "Calendário editorial e peças mensais para redes sociais de uma marca de cosméticos naturais.", tools: ["Canva", "CapCut", "Adobe Express"] },
      { id: "ksi-marketing", title: "KSI Consultas", year: "2018–2021", text: "Gerenciamento de redes sociais e construção de marca para uma clínica de consultas especializadas.", tools: ["Canva", "Photoshop"] },
      { id: "in9", title: "In9 Mídia", year: "2021–2026", text: "Gestão de redes sociais e campanhas de Google Ads para empresa de software e sinalização digital.", tools: ["Canva", "Adobe Express", "Google Ads"] },
    ] },
    en: { title: "Marketing", tag: "Projects by category", intro: "Campaigns, content and digital presence to bring brands closer to their people.", back: "← Back to portfolio", projects: [
      { id: "trilha", title: "Trilha Selvagem", year: "2024", text: "Art direction and content for the launch of a new backpack line, across social and retail.", tools: ["Canva", "Adobe Express", "Photoshop"] },
      { id: "bloom", title: "Bloom Brand", year: "2023", text: "Editorial calendar and monthly social assets for a natural cosmetics brand.", tools: ["Canva", "CapCut", "Adobe Express"] },
      { id: "ksi-marketing", title: "KSI Consultas", year: "2018–2021", text: "Social media management and brand building for a specialized healthcare clinic.", tools: ["Canva", "Photoshop"] },
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
    <a className="glitchcast-app-cta" href={language === "en" ? "/en/projects/ux/glitchcast-app" : "/projetos/ux/glitchcast-app"}>{language === "pt" ? "Ver o projeto Glitchcast App →" : "View the Glitchcast App project →"}</a>
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

  return <div className="original-project-page"><header><nav className="nav"><a href={homePath} className="logo">CECÍLIA<span>·</span>RODRIGUES</a><div className="nav-links"><a href={`${homePath}#sobre`}>{language === "en" ? "About" : "Sobre"}</a><a href={`${homePath}#conhecimentos`}>{language === "en" ? "Knowledge" : "Conhecimentos"}</a><a href={`${homePath}#trabalhos`}>{language === "en" ? "Work" : "Trabalhos"}</a><a href={`${homePath}#contato`}>{language === "en" ? "Contact" : "Contato"}</a><button className="plain-language" onClick={() => navigate(switchPath)}>{language === "en" ? "PT" : "EN"}</button></div></nav></header><main><section className="page-hero"><div className="wrap"><div className="eyebrow mono">{copy.tag}</div><h1>{copy.title}</h1><p>{copy.intro}</p><a className="back-link" href={homePath + "#trabalhos"}>{copy.back}</a></div></section><section><div className="wrap"><div className="project-list">{copy.projects.map((project, index) => <article className="project-detail" id={project.id} key={project.id}><div className="project-index">{String(index + 1).padStart(2, "0")} / {String(copy.projects.length).padStart(2, "0")}<br /><br />{project.year}</div><div><h2>{project.title}</h2><p>{project.text}</p><div className="project-tools">{project.tools.map((tool) => <span className="project-tool" key={tool}>{tool}</span>)}</div>{project.details?.map((detail, detailIndex) => <div className="detail-block" key={`${project.id}-${detail.title}`}><h3>{detail.title}</h3>{detail.text && <p>{detail.text}</p>}{detail.media && <img src={detail.media} alt={detail.alt || ""} loading="lazy" />}{detailIndex === 0 && project.details && project.details.length > 1 && <div className="detail-gallery" />}</div>)}{project.id === "glitchcast" && <ProductCarousel language={language} />}<div className="detail-note">{language === "en" ? "Project presented in Cecília Rodrigues’ portfolio" : "Projeto apresentado no portfólio de Cecília Rodrigues"}</div></div></article>)}</div></div></section>{category === "graphic" && <section className="wrap" style={{ paddingBottom: "100px" }}><a className="back-link" href={language === "en" ? "/en/projects/ux/glitchcast-app" : "/projetos/ux/glitchcast-app"}>{language === "en" ? "View the Glitchcast App UX project →" : "Ver o projeto UX do Glitchcast App →"}</a></section>}</main><footer><div className="wrap">© 2026 Cecília Rodrigues</div></footer></div>;
}

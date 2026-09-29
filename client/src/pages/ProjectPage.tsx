// Páginas de trabalhos no formato original: uma página por categoria, lista linear e linguagem de portfólio.
import { ArrowLeft } from "lucide-react";
import { useLocation, useRoute } from "wouter";

type Category = "graphic" | "ux" | "illustration" | "marketing";
type Project = { id: string; title: string; year: string; text: string; tools: string[]; details?: { title: string; text?: string; media?: string; alt?: string }[] };
type PageCopy = { title: string; intro: string; tag: string; back: string; projects: Project[] };

const pages: Record<Category, { pt: PageCopy; en: PageCopy }> = {
  graphic: {
    pt: { title: "Branding", tag: "Projetos por categoria", intro: "Marcas, sistemas, embalagens e peças gráficas para transformar ideias em presença visual.", back: "← Voltar ao portfólio", projects: [
      { id: "glitchcast", title: "Glitchcast", year: "2021", text: "Identidade visual desenvolvida em 2021 para o podcast do grupo Glitch404, com sistema de marca, lettering e variações de aplicação.", tools: ["Illustrator", "Photoshop", "Branding"], details: [{ title: "Sistema visual", text: "Desenvolvimento da identidade do Glitchcast a partir do símbolo do microfone, das formas do coelho e de uma paleta vibrante com variações para diferentes fundos." }, { title: "Key visuals", text: "Exploração dos elementos principais da identidade em composições que apresentam o universo visual do podcast e suas possibilidades de aplicação.", media: "/manus-storage/ProjetoGlitchcast_0baff893.png", alt: "Variações da identidade visual do podcast Glitchcast" }, { title: "Produtos", text: "Aplicações da identidade em produtos e materiais de divulgação, como camisetas, canecas, adesivos, ecobags e outros itens para criar presença de marca além do podcast." }] },
      { id: "vira-lata", title: "Festival Vira-Lata", year: "2023", text: "Sistema de cartazes serigrafados para um festival de música independente, com tipografia recortada à mão.", tools: ["Illustrator", "Photoshop", "Cartaz"] },
      { id: "ksi-identidade", title: "KSI Consultas", year: "2026", text: "Marca e papelaria para uma empresa de consultas especializadas, com foco em tecnologia.", tools: ["Illustrator", "Identidade visual", "Papelaria"] },
      { id: "recomendaria", title: "Recomendaria", year: "2026", text: "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.", tools: ["Illustrator", "Figma", "Naming"] },
      { id: "lcr", title: "LCR Marcenaria", year: "2025", text: "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.", tools: ["Illustrator", "Identidade visual", "Sinalização"] },
      { id: "lilaz", title: "Lilaz", year: "2025", text: "Identidade e embalagens para um pequeno negócio de decorações personalizadas.", tools: ["Illustrator", "Photoshop", "Embalagem"] },
    ] },
    en: { title: "Branding", tag: "Projects by category", intro: "Brands, systems, packaging and graphic pieces that turn ideas into visual presence.", back: "← Back to portfolio", projects: [
      { id: "glitchcast", title: "Glitchcast", year: "2021", text: "Visual identity developed in 2021 for the Glitch404 group podcast, with a brand system, lettering and application variations.", tools: ["Illustrator", "Photoshop", "Branding"], details: [{ title: "Visual system", text: "Development of the Glitchcast identity from the microphone symbol, rabbit forms and a vibrant palette with variations for different backgrounds." }, { title: "Key visuals", text: "Exploration of the identity’s main elements in compositions that present the podcast’s visual universe and its application possibilities.", media: "/manus-storage/ProjetoGlitchcast_0baff893.png", alt: "Glitchcast podcast visual identity variations" }, { title: "Products", text: "Applications of the identity across merchandise and promotional materials, including T-shirts, mugs, stickers, tote bags and other items that extend the brand beyond the podcast." }] },
      { id: "vira-lata", title: "Vira-Lata Festival", year: "2023", text: "A screen-printed poster system for an independent music festival, with hand-cut typography.", tools: ["Illustrator", "Photoshop", "Poster"] },
      { id: "ksi-identidade", title: "KSI Consultas", year: "2026", text: "Brand identity and stationery for a technology-focused specialized consultation company.", tools: ["Illustrator", "Visual identity", "Stationery"] },
      { id: "recomendaria", title: "Recomendaria", year: "2026", text: "Naming and identity for a professional referral platform, from logo to app.", tools: ["Illustrator", "Figma", "Naming"] },
      { id: "lcr", title: "LCR Marcenaria", year: "2025", text: "Brand identity and workshop signage inspired by raw wood textures.", tools: ["Illustrator", "Visual identity", "Signage"] },
      { id: "lilaz", title: "Lilaz", year: "2025", text: "Identity and packaging for a small custom decoration business.", tools: ["Illustrator", "Photoshop", "Packaging"] },
    ] },
  },
  ux: {
    pt: { title: "UX Design", tag: "Projetos por categoria", intro: "Pesquisa, arquitetura e interfaces desenhadas para tornar produtos digitais mais claros e fáceis de usar.", back: "← Voltar ao portfólio", projects: [
      { id: "mercado-da-rua", title: "App Mercado da Rua", year: "2025", text: "Marketplace regional que conecta moradores a mercados, hortifrutis e mercearias do próprio bairro.", tools: ["Figma", "Pesquisa", "UX / UI"] },
      { id: "proposta-valor", title: "Proposta de valor e posicionamento", year: "2025", text: "Definição de públicos, necessidades e diferenciais para orientar a primeira versão do produto.", tools: ["Pesquisa", "Jornada do usuário", "Figma"] },
      { id: "arquitetura", title: "Arquitetura do produto — UX / app", year: "2025", text: "Organização de categorias, busca, loja e pedido em uma navegação simples para uso cotidiano.", tools: ["Figma", "Fluxo de navegação", "Protótipo"] },
      { id: "monetizacao", title: "Modelo de monetização", year: "2025", text: "Exploração de caminhos de receita para equilibrar acesso do usuário e viabilidade dos pequenos negócios.", tools: ["Pesquisa", "Produto", "Estratégia"] },
      { id: "loja-verde", title: "Checkout — Loja Verde", year: "2024", text: "Simplificação do carrinho e pagamento de um marketplace de produtos sustentáveis, com testes A/B em cada etapa.", tools: ["Figma", "UX / UI", "Testes"] },
    ] },
    en: { title: "UX Design", tag: "Projects by category", intro: "Research, architecture and interfaces designed to make digital products clearer and easier to use.", back: "← Back to portfolio", projects: [
      { id: "mercado-da-rua", title: "Mercado da Rua app", year: "2025", text: "A regional marketplace connecting residents with neighborhood markets and grocery stores.", tools: ["Figma", "Research", "UX / UI"] },
      { id: "proposta-valor", title: "Value proposition and positioning", year: "2025", text: "Audience, needs and differentiators defined to guide the first version of the product.", tools: ["Research", "User journey", "Figma"] },
      { id: "arquitetura", title: "Product architecture — UX / app", year: "2025", text: "Categories, search, stores and orders organized into a simple everyday navigation.", tools: ["Figma", "Navigation flow", "Prototype"] },
      { id: "monetizacao", title: "Monetization model", year: "2025", text: "Revenue paths explored to balance user access and the viability of small businesses.", tools: ["Research", "Product", "Strategy"] },
      { id: "loja-verde", title: "Checkout — Loja Verde", year: "2024", text: "A simpler cart and payment experience for a sustainable products marketplace, tested at each step.", tools: ["Figma", "UX / UI", "Testing"] },
    ] },
  },
  illustration: {
    pt: { title: "Conteúdo visual", tag: "Projetos por categoria", intro: "Projetos de conteúdo visual desenvolvidos para transformar ideias em imagens memoráveis.", back: "← Voltar ao portfólio", projects: [
      { id: "bogused", title: "Bogused — Assets", year: "2020", text: "Produção de assets visuais para o jogo Bogused, com foco na criação de personagens, cenários e elementos de interface.", tools: ["Photoshop", "Illustrator", "Concept art"], details: [
        { title: "Apresentação do jogo", text: "Bogused é um projeto de jogo com uma direção visual própria. Fiquei responsável por desenvolver personagens, cenários e interface, criando um conjunto coerente de elementos para a experiência.", media: "/manus-storage/personagens-prancha_d84c54c1.png", alt: "Prancha de personagens do jogo Bogused" },
        { title: "Design de personagens", media: "/manus-storage/personagens-prancha_d84c54c1.png", alt: "Estudos de personagens do jogo Bogused" },
        { title: "Design de cenário", media: "/manus-storage/arvore_0deab038.jpg", alt: "Ilustração de árvore para o cenário de Bogused" },
        { title: "Elementos de cenário", media: "/manus-storage/forca_15b587a0.png", alt: "Estrutura de madeira criada para o cenário" },
        { title: "Design de interface", media: "/manus-storage/select_d037a441.png", alt: "Tela de seleção do jogo Bogused" },
      ] },
      { id: "e-ai-man", title: "E aí man jogo", year: "2020", text: "Jogo 2D de aventura, plataforma e puzzle voltado para crianças e adolescentes. Na história, Luketa atravessa diferentes espaços da comunidade para encontrar seu melhor amigo Tuca.", tools: ["Game design", "Level design", "Ilustração"], details: [{ title: "Apresentação do jogo", text: "O projeto combina progressão por fases, exploração lateral, combate, pequenos enigmas e uma narrativa sobre amizade, colaboração e pertencimento, ambientada em cenários inspirados em comunidades brasileiras." }] },
    ] },
    en: { title: "Visual content", tag: "Projects by category", intro: "Visual content projects developed to turn ideas into memorable images.", back: "← Back to portfolio", projects: [
      { id: "bogused", title: "Bogused — Assets", year: "2020", text: "Visual assets for the Bogused game, focused on characters, environments and interface elements.", tools: ["Photoshop", "Illustrator", "Concept art"], details: [
        { title: "Game presentation", text: "Bogused is a game project with its own visual direction. I developed characters, environments and interface, creating a coherent set of elements for the game experience.", media: "/manus-storage/personagens-prancha_d84c54c1.png", alt: "Bogused game character board" },
        { title: "Character design", media: "/manus-storage/personagens-prancha_d84c54c1.png", alt: "Bogused character studies" },
        { title: "Environment design", media: "/manus-storage/arvore_0deab038.jpg", alt: "Tree illustration for the Bogused environment" },
        { title: "Environment elements", media: "/manus-storage/forca_15b587a0.png", alt: "Wooden structure created for the environment" },
        { title: "Interface design", media: "/manus-storage/select_d037a441.png", alt: "Bogused game selection screen" },
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

export default function ProjectPage() {
  const [location, navigate] = useLocation();
  const [enMatch, enParams] = useRoute("/en/projects/:category");
  const [, ptParams] = useRoute("/projetos/:category");
  const language = enMatch || location.startsWith("/en/") ? "en" : "pt";
  const category = normalizeCategory((enParams?.category || ptParams?.category || "graphic") as string);
  const copy = pages[category][language];
  const homePath = language === "en" ? "/en" : "/";
  const switchPath = language === "en" ? `/projetos/${category === "graphic" ? "grafico" : category === "illustration" ? "ilustracao" : category}` : `/en/projects/${category}`;

  return <div className="original-project-page"><header><nav className="nav"><a href={homePath} className="logo">CECÍLIA<span>·</span>RODRIGUES</a><div className="nav-links"><a href={`${homePath}#sobre`}>{language === "en" ? "About" : "Sobre"}</a><a href={`${homePath}#conhecimentos`}>{language === "en" ? "Knowledge" : "Conhecimentos"}</a><a href={`${homePath}#trabalhos`}>{language === "en" ? "Work" : "Trabalhos"}</a><a href={`${homePath}#contato`}>{language === "en" ? "Contact" : "Contato"}</a><button className="plain-language" onClick={() => navigate(switchPath)}>{language === "en" ? "PT" : "EN"}</button></div></nav></header><main><section className="page-hero"><div className="wrap"><div className="eyebrow mono">{copy.tag}</div><h1>{copy.title}</h1><p>{copy.intro}</p><a className="back-link" href={homePath + "#trabalhos"}>{copy.back}</a></div></section><section><div className="wrap"><div className="project-list">{copy.projects.map((project, index) => <article className="project-detail" id={project.id} key={project.id}><div className="project-index">{String(index + 1).padStart(2, "0")} / {String(copy.projects.length).padStart(2, "0")}<br /><br />{project.year}</div><div><h2>{project.title}</h2><p>{project.text}</p><div className="project-tools">{project.tools.map((tool) => <span className="project-tool" key={tool}>{tool}</span>)}</div>{project.details?.map((detail, detailIndex) => <div className="detail-block" key={`${project.id}-${detail.title}`}><h3>{detail.title}</h3>{detail.text && <p>{detail.text}</p>}{detail.media && <img src={detail.media} alt={detail.alt || ""} loading="lazy" />}{detailIndex === 0 && project.details && project.details.length > 1 && <div className="detail-gallery" />}</div>)}<div className="detail-note">{language === "en" ? "Project presented in Cecília Rodrigues’ portfolio" : "Projeto apresentado no portfólio de Cecília Rodrigues"}</div></div></article>)}</div></div></section>{category === "graphic" && <section className="wrap" style={{ paddingBottom: "100px" }}><a className="back-link" href={language === "en" ? "/en/projects/ux" : "/projetos/ux"}>{language === "en" ? "View the podcast app UX project →" : "Ver o projeto de UX do aplicativo do podcast →"}</a></section>}</main><footer><div className="wrap">© 2026 Cecília Rodrigues</div></footer></div>;
}

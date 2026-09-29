// Portfólio original: direção gráfica expressiva, papel claro, cores pontuais e navegação PT/EN.
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const colors = ["#f0c23a", "#2b3eff", "#ff5a2e", "#2e9e4e", "#f0c23a"];

const projectData = {
  pt: [
    ["ilustracao", "Conteúdo visual", "2020", "Bogused — Assets", "Produção de assets para o jogo Bogused, incluindo design de personagens, cenário e interface.", "#2b3eff"],
    ["ux", "Marketplace regional — UX Design", "2025", "App Mercado da Rua", "Marketplace regional que conecta moradores a mercados, hortifrutis e mercearias do próprio bairro.", "#ff5a2e"],
    ["grafico", "Identidade visual", "—", "Glitchcast", "Identidade visual para um podcast, com sistema de marca, lettering e variações de aplicação.", "#a45bea"],
    ["marketing", "Campanha — Lançamento", "2024", "Trilha Selvagem", "Direção de arte e conteúdo para o lançamento de uma linha de mochilas, com peças para redes e ponto de venda.", "#2e9e4e"],
    ["ux", "E-commerce", "2024", "Checkout — Loja Verde", "Simplificação do carrinho e pagamento de um marketplace de produtos sustentáveis, com testes A/B em cada etapa.", "#2b3eff"],
    ["ilustracao", "Aventura — plataforma 2D", "2020", "E aí man jogo", "Jogo 2D de aventura e plataforma em que Luketa atravessa a comunidade para encontrar seu amigo desaparecido.", "#ff5a2e"],
    ["grafico", "Cartazes — Festival", "2023", "Festival Vira-Lata", "Sistema de cartazes serigrafados para um festival de música independente, com tipografia recortada à mão.", "#f0c23a"],
    ["marketing", "Conteúdo social", "2023", "Marca Bloom", "Calendário editorial e peças mensais para redes sociais de uma marca de cosméticos naturais.", "#2e9e4e"],
    ["marketing", "Redes sociais & branding", "2018–2021", "KSI Consultas", "Gerenciamento de redes sociais e construção de marca para uma clínica de consultas especializadas.", "#ff5a2e"],
    ["marketing", "Redes sociais & Google Ads", "2021–2026", "In9 Mídia", "Gestão de redes sociais e campanhas de Google Ads para empresa de software e sinalização digital.", "#f0c23a"],
    ["grafico", "Identidade visual", "2026", "KSI Consultas", "Marca e papelaria para uma empresa de consultas especializadas, com foco em tecnologia.", "#2b3eff"],
    ["grafico", "Identidade visual", "2026", "Recomendaria", "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.", "#ff5a2e"],
    ["grafico", "Identidade visual", "2025", "LCR Marcenaria", "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.", "#f0c23a"],
    ["grafico", "Identidade visual", "2025", "Lilaz", "Identidade e embalagens para um pequeno negócio de decorações personalizadas.", "#2e9e4e"],
  ],
  en: [
    ["illustration", "Visual content", "2020", "Bogused — Assets", "Assets for the Bogused game, including character, environment and interface design.", "#2b3eff"],
    ["ux", "Regional marketplace — UX Design", "2025", "Mercado da Rua App", "A regional marketplace connecting residents with neighborhood markets and grocery stores.", "#ff5a2e"],
    ["graphic", "Branding", "—", "Glitchcast", "Visual identity for a podcast, with a brand system, lettering and application variations.", "#a45bea"],
    ["marketing", "Launch campaign", "2024", "Trilha Selvagem", "Art direction and content for the launch of a new backpack line, across social and retail.", "#2e9e4e"],
    ["ux", "E-commerce", "2024", "Checkout — Loja Verde", "A simpler cart and payment experience for a sustainable products marketplace, tested at each step.", "#2b3eff"],
    ["illustration", "2D adventure platformer", "2020", "E aí man jogo", "A 2D adventure game where Luketa crosses the community to find his missing friend.", "#ff5a2e"],
    ["graphic", "Festival posters", "2023", "Festival Vira-Lata", "A screen-printed poster system for an independent music festival, with hand-cut typography.", "#f0c23a"],
    ["marketing", "Social content", "2023", "Marca Bloom", "Editorial calendar and monthly social assets for a natural cosmetics brand.", "#2e9e4e"],
    ["marketing", "Social media & branding", "2018–2021", "KSI Consultas", "Social media management and brand building for a specialized healthcare clinic.", "#ff5a2e"],
    ["marketing", "Social media & Google Ads", "2021–2026", "In9 Mídia", "Social media management and Google Ads campaigns for a software and digital signage company.", "#f0c23a"],
    ["graphic", "Visual identity", "2026", "KSI Consultas", "Brand identity and stationery for a technology-focused specialized consultation company.", "#2b3eff"],
    ["graphic", "Visual identity", "2026", "Recomendaria", "Naming and identity for a professional referral platform, from logo to app.", "#ff5a2e"],
    ["graphic", "Visual identity", "2025", "LCR Marcenaria", "Brand identity and workshop signage inspired by raw wood textures.", "#f0c23a"],
    ["graphic", "Visual identity", "2025", "Lilaz", "Identity and packaging for a small custom decoration business.", "#2e9e4e"],
  ],
};

const content = {
  pt: {
    nav: ["Sobre", "Conhecimentos", "Trabalhos", "Contato"], heroEyebrow: "Designer", heroWords: ["essencial", "conteúdo visual", "UX design", "branding", "marketing"], heroTitle: ["Organizando ideias e", "dando forma ao"], heroSub: <>Sou <strong>Cecília Rodrigues</strong>, e trabalho na fronteira entre imagem, interface e mensagem. Ilustro capas, desenho fluxos de produto, construo identidades visuais e escrevo campanhas — sempre partindo da mesma pergunta: <strong>o que essa marca precisa dizer, e qual é o jeito mais direto de dizer isso?</strong></>, heroPrimary: "Ver trabalhos", heroSecondary: "Iniciar um projeto", stamps: ["Conteúdo Visual", "UX Design", "Branding", "Marketing"], aboutTag: "Quem faz", aboutTitle: "Sobre", about: [<><strong>Formada em Desenho Industrial com habilitação em Programação Visual (UFBA)</strong> e <strong>Especialista em Design de Jogos Digitais (UNEB)</strong>, construí minha trajetória entre a imagem e a interface.</>, <>Atuação contínua desde 2013 em projetos corporativos, Digital Signage e UI, somada à ilustração editorial, identidade visual e campanhas de marketing — sempre partindo da mesma pergunta: o que essa marca precisa dizer, e qual é o jeito mais direto de dizer isso?</>], skills: [["Conteúdo Visual", "Nanquim / digital"], ["UX & pesquisa", "Figma / testes com usuário"], ["Identidade & branding", "Sistemas de marca"], ["Marketing & conteúdo", "Campanhas / redes"]], knowledgeTag: "Ferramentas e competências", knowledgeTitle: "Conhecimentos e habilidades", knowledgeDescription: "Ferramentas e áreas de conhecimento que orientam meu trabalho.", tools: [["Conteúdo visual", "Photoshop · Illustrator · Animate"], ["Design de interfaces", "Figma · Testes com usuário"], ["Conteúdo para redes", "Canva · Express · CapCut"], ["Identidade visual", "Illustrator · Photoshop · Sistemas"], ["Ilustração digital", "Photoshop · Illustrator"], ["Game design & level design", "Game design · Level design"]], workTag: "Seleção 2023 — 2026", workTitle: "Trabalhos", workDescription: "Projetos de capa de revista a identidade de marca. Filtre por área.", filters: [["todos", "Todos"], ["ilustracao", "Conteúdo visual"], ["ux", "UX Design"], ["grafico", "Branding"], ["marketing", "Marketing"]], contactTag: "Vamos conversar", contactTitle: "Contato", availability: "Abertura de agenda para novos projetos em setembro de 2026", networks: "Redes", availabilityLabel: "Disponibilidade", footer: "Portfólio Cecília Rodrigues", seeProject: "Ver projeto" },
  en: {
    nav: ["About", "Knowledge", "Work", "Contact"], heroEyebrow: "Designer", heroWords: ["the essential", "visual content", "UX design", "branding", "marketing"], heroTitle: ["Organizing ideas and", "giving shape to"], heroSub: <>I’m <strong>Cecília Rodrigues</strong>, working at the edge of image, interface and message. I illustrate covers, design product flows, build visual identities and write campaigns — always starting with the same question: <strong>what does this brand need to say, and what is the clearest way to say it?</strong></>, heroPrimary: "See work", heroSecondary: "Start a project", stamps: ["Visual Content", "UX Design", "Branding", "Marketing"], aboutTag: "The designer", aboutTitle: "About", about: [<><strong>With a degree in Industrial Design and Visual Programming (UFBA)</strong> and a <strong>specialization in Digital Game Design (UNEB)</strong>, I built my practice between image and interface.</>, <>Working continuously since 2013 across corporate projects, Digital Signage and UI, alongside editorial illustration, visual identity and marketing campaigns — always starting with the same question: what does this brand need to say, and what is the clearest way to say it?</>], skills: [["Visual content", "Ink / digital"], ["UX & research", "Figma / user testing"], ["Identity & branding", "Brand systems"], ["Marketing & content", "Campaigns / social"]], knowledgeTag: "Tools and skills", knowledgeTitle: "Knowledge and skills", knowledgeDescription: "Tools and areas of knowledge that guide my work.", tools: [["Visual content", "Photoshop · Illustrator · Animate"], ["Interface design", "Figma · User testing"], ["Social content", "Canva · Express · CapCut"], ["Visual identity", "Illustrator · Photoshop · Systems"], ["Digital illustration", "Photoshop · Illustrator"], ["Game design & level design", "Game design · Level design"]], workTag: "Selection 2023 — 2026", workTitle: "Work", workDescription: "Projects ranging from magazine covers to brand identity. Filter by area.", filters: [["todos", "All"], ["illustration", "Visual content"], ["ux", "UX Design"], ["graphic", "Branding"], ["marketing", "Marketing"]], contactTag: "Let’s talk", contactTitle: "Contact", availability: "Open for new projects in September 2026", networks: "Networks", availabilityLabel: "Availability", footer: "Cecília Rodrigues Portfolio", seeProject: "See project" },
};

type Language = "pt" | "en";

function Stamp({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) { return <span className={`stamp stamp-${tone}`}>{children}</span>; }

export default function Home() {
  const [location, navigate] = useLocation();
  const language: Language = location === "/en" ? "en" : "pt";
  const copy = content[language];
  const projects = projectData[language];
  const [activeFilter, setActiveFilter] = useState("todos");
  const [wordIndex, setWordIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => { setActiveFilter("todos"); setWordIndex(0); }, [language]);
  useEffect(() => { const timer = window.setInterval(() => setWordIndex((value) => (value + 1) % copy.heroWords.length), 2300); return () => window.clearInterval(timer); }, [copy.heroWords.length]);
  const displayed = activeFilter === "todos" ? projects : projects.filter(([category]) => category === activeFilter);
  const workPath = (category: string) => {
    const normalized = category === "illustration" ? "illustration" : category === "graphic" ? "graphic" : category;
    return language === "en" ? `/en/projects/${normalized}` : `/projetos/${normalized === "graphic" ? "grafico" : normalized === "illustration" ? "ilustracao" : normalized}`;
  };
  const jump = () => setMenuOpen(false);
  const switchLanguage = () => { setMenuOpen(false); navigate(language === "pt" ? "/en" : "/"); };

  return <div className="portfolio-page">
    <header className="top-header"><nav className="nav-wrap"><a className="old-logo" href={language === "en" ? "/en" : "/"}>CECÍLIA<span>·</span>RODRIGUES</a><div className={`old-nav ${menuOpen ? "open" : ""}`}>{copy.nav.map((item, index) => <a href={["#sobre", "#conhecimentos", "#trabalhos", "#contato"][index]} onClick={jump} key={item}>{item}</a>)}</div><div className="nav-tools"><span className="availability"><i /> {language === "pt" ? "Disponível p/ projetos" : "Available for projects"}</span><button className="lang-switch" onClick={switchLanguage} aria-label={language === "pt" ? "Switch to English" : "Mudar para português"}>{language === "pt" ? "EN" : "PT"}</button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div></nav></header>

    <main id="top">
      <section className="old-hero section-wrap"><div className="hero-copy"><p className="old-eyebrow"><span /> {copy.heroEyebrow}</p><h1>{copy.heroTitle[0]}<br />{copy.heroTitle[1]} <span className="cycle-word" style={{ background: colors[wordIndex] }}>{copy.heroWords[wordIndex]}</span>.</h1><p className="hero-sub">{copy.heroSub}</p><div className="hero-buttons"><a className="old-button filled" href="#trabalhos">{copy.heroPrimary} <ArrowDown size={16} /></a><a className="old-button outlined" href="#contato">{copy.heroSecondary} <ArrowUpRight size={16} /></a></div><div className="stamp-row">{copy.stamps.map((stamp, index) => <Stamp tone={["blue", "orange", "ink", "green"][index]} key={stamp}>{stamp}</Stamp>)}</div></div><div className="hero-mark" aria-hidden="true"><div className="mark-ring" /><div className="mark-cross" /><b>{language === "pt" ? <>forma<br />função<br />mensagem</> : <>form<br />function<br />message</>}</b></div></section>

      <div className="torn-divider" />
      <section id="sobre" className="old-section paper-white section-wrap"><SectionTitle index="01" tag={copy.aboutTag} title={copy.aboutTitle} /><div className="about-copy">{copy.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}<div className="skills-list">{copy.skills.map(([a, b]) => <div className="skill-line" key={a}><span>{a}</span><small>{b}</small></div>)}</div></div></section>

      <section id="conhecimentos" className="old-section section-wrap"><SectionTitle index="02" tag={copy.knowledgeTag} title={copy.knowledgeTitle} description={copy.knowledgeDescription} /><div className="knowledge-list">{copy.tools.map(([a, b]) => <div className="knowledge-line" key={a}><span>{a}</span><small>{b}</small></div>)}</div></section>

      <section id="trabalhos" className="old-section section-wrap"><SectionTitle index="03" tag={copy.workTag} title={copy.workTitle} description={copy.workDescription} /><div className="filters">{copy.filters.map(([value, label]) => <button className={activeFilter === value ? "active" : ""} key={value} onClick={() => setActiveFilter(value)}>{label}</button>)}</div><div className="work-grid">{displayed.map(([category, label, year, title, description, color]) => <article className="work-card" key={title + year}><div className="work-top"><span>{label}</span><small>{year}</small></div><h3>{title}</h3><p>{description}</p><a href={workPath(category)}>{copy.seeProject} <ArrowUpRight size={14} /></a><div className="work-swatch" style={{ background: color }} /></article>)}</div></section>

      <section className="client-band"><div className="marquee"><span>Ellomidia Comunicação</span><span>Calangos Comunicação</span><span>Fintech Aria</span><span>Mercadinho da Rua</span><span>Museus App</span><span>Revista Sputnik</span><span>Festival Vira-Lata</span><span>KSI Consultas</span><span>Recomendaria</span><span>LCR Marcenaria</span><span>Lilaz</span><span>Ellomidia Comunicação</span><span>Calangos Comunicação</span><span>Fintech Aria</span><span>Mercadinho da Rua</span><span>Museus App</span></div></section>

      <section id="contato" className="contact-section old-section"><div className="section-wrap"><SectionTitle index="04" tag={copy.contactTag} title={copy.contactTitle} light /><a className="contact-email" href="mailto:ceciliacrdes@gmail.com">ceciliacrdes@gmail.com <ArrowUpRight size={20} /></a><div className="contact-details"><div><small>{copy.networks}</small><a href="#" onClick={(event) => event.preventDefault()}>LinkedIn</a></div><div><small>{copy.availabilityLabel}</small><p>{copy.availability}</p></div></div></div></section>
    </main>
    <footer className="old-footer"><div className="section-wrap"><span>© 2026 Cecília Rodrigues</span><span>{copy.footer}</span></div></footer>
  </div>;
}

function SectionTitle({ index, tag, title, description, light = false }: { index: string; tag: string; title: string; description?: string; light?: boolean }) { return <div className={`section-title ${light ? "light" : ""}`}><div><p className="title-tag">{index} / {tag}</p><h2>{title}</h2></div>{description && <p className="title-description">{description}</p>}</div>; }

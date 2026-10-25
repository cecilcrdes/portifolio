// Portfólio Cecília Rodrigues — Direção gráfica expressiva, destaques visuais, navegação bilíngue e foco em 12+ anos de mercado.
import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Download, FileText, Mail, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useLocation } from "wouter";
import { sitePath } from "@/lib/sitePath";

const colors = ["#f0c23a", "#2b3eff", "#ff5a2e", "#2e9e4e", "#a45bea"];

const asset = (filename: string) => `${import.meta.env.BASE_URL}assets/portfolio/${filename}`;

type FeaturedProject = {
  slug: string;
  title: string;
  year: string;
  category: { pt: string; en: string };
  description: { pt: string; en: string };
  image: string;
  tags: string[];
};

const featuredProjects: FeaturedProject[] = [
  {
    slug: "in9-midia",
    title: "In9 Mídia",
    year: "2014 — Presente",
    category: { pt: "Digital Signage · UI Design · DOOH · Marketing", en: "Digital Signage · UI Design · DOOH · Marketing" },
    description: {
      pt: "Mais de 10 anos de atuação contínua liderando a criação de templates dinâmicos para Digital Signage (DOOH), wireframes de interfaces para apps e plataformas corporativas, além de gestão de campanhas de Google Ads.",
      en: "Over 10 years of continuous role leading dynamic templates for Digital Signage (DOOH), app and software interface wireframes, and corporate Google Ads campaigns.",
    },
    image: asset("in9/templatesin9.png"),
    tags: ["Digital Signage", "DOOH", "UI Wireframes", "Google Ads", "Redes Sociais"],
  },
  {
    slug: "museus",
    title: "Projeto Museus",
    year: "2025",
    category: { pt: "UX Design · UI Design · Pesquisa · Arquitetura", en: "UX Design · UI Design · Research · Architecture" },
    description: {
      pt: "Aplicativo desenvolvido como catálogo cultural dos Museus da Cidade de Salvador. Pesquisa com usuários, mapeamento de jornadas e interface editorial de alta fidelidade para facilitar a descoberta de exposições e acervos.",
      en: "Cultural catalog app for the Museums of Salvador. In-depth user research, journey mapping, and a refined editorial interface designed for cultural discovery.",
    },
    image: asset("museus/mockups-museus-tamanho-real.png"),
    tags: ["UX Research", "Figma", "UI Design", "Arquitetura da Informação", "Cultura"],
  },
  {
    slug: "ksi-consultas",
    title: "KSI Consultas",
    year: "2018–2021",
    category: { pt: "Identidade Visual · Papelaria · Redes Sociais · Web", en: "Visual Identity · Stationery · Social Media · Web" },
    description: {
      pt: "Construção de marca completa, papelaria física e institucional, estratégia contínua de conteúdo para redes sociais e reestruturação web para empresa de consultas médicas especializadas.",
      en: "Comprehensive brand identity system, corporate stationery, social media content strategy, and website restructuring for a specialized healthcare clinic.",
    },
    image: asset("ksi/ksiposts.png"),
    tags: ["Identidade de Marca", "Papelaria", "Mídias Sociais", "Design Gráfico"],
  },
  {
    slug: "e-ai-man-jogo",
    title: "E aí Man (Jogo)",
    year: "2020",
    category: { pt: "UI de Jogo · Level Design · Concept Art · Personagens", en: "Game UI · Level Design · Concept Art · Characters" },
    description: {
      pt: "Jogo 2D de aventura, plataforma e puzzle ambientado em uma comunidade brasileira. Desenvolvimento conceitual completo: interfaces de jogo (menus, HUD), level design de fases e ilustração de personagens.",
      en: "A 2D adventure and puzzle platformer set in a Brazilian community. Complete visual development: in-game UI (menus, HUD), level design progression, and character concept art.",
    },
    image: asset("eaiman/eaiman-grupo.jpg"),
    tags: ["Game UI", "Level Design", "Ilustração", "Construct 2", "Narrativa"],
  },
];

type ArchiveProject = {
  category: "ux" | "grafico" | "ilustracao" | "marketing";
  label: { pt: string; en: string };
  year: string;
  title: string;
  description: { pt: string; en: string };
  slug: string;
  image: string;
};

const archiveProjects: ArchiveProject[] = [
  {
    category: "grafico",
    label: { pt: "Identidade visual · Branding · Ilustrações · App", en: "Visual identity · Branding · Illustrations · App" },
    year: "2021",
    title: "Glitchcast",
    description: {
      pt: "Identidade visual, sistema de marca, produtos e conceito de aplicativo para o podcast do grupo Glitch404.",
      en: "Visual identity, brand system, merchandise and app concept for the Glitch404 group podcast.",
    },
    slug: "glitchcast",
    image: asset("glitchcast/Projeto Glitchcast2.png"),
  },
  {
    category: "ilustracao",
    label: { pt: "Branding · Interface · Assets · Cenários", en: "Branding · Interface · Assets · Environments" },
    year: "2020",
    title: "Bogused",
    description: {
      pt: "Direção visual do jogo, interface sombria e produção de assets visuais para personagens e cenários.",
      en: "Game art direction, dark interface design, and asset production for characters and environments.",
    },
    slug: "bogused",
    image: asset("bogused/bogused interface.png"),
  },
  {
    category: "ux",
    label: { pt: "UX Design · UX Research · UI Design", en: "UX Design · UX Research · UI Design" },
    year: "2023",
    title: "Rosalune",
    description: {
      pt: "Projeto de UX e arquitetura de informação para um e-commerce de moda alternativa.",
      en: "UX design and information architecture for an alternative fashion e-commerce website.",
    },
    slug: "rosalune",
    image: asset("rosalune/4936291903289273529.jpg"),
  },
  {
    category: "grafico",
    label: { pt: "Branding · Naming", en: "Branding · Naming" },
    year: "2019",
    title: "Recomendaria",
    description: {
      pt: "Naming e identidade de marca para plataforma colaborativa de recomendações profissionais.",
      en: "Naming and brand identity for a professional referral and networking platform.",
    },
    slug: "recomendaria",
    image: asset("recomendaria/recomendaria logo completa.jpg"),
  },
  {
    category: "grafico",
    label: { pt: "Identidade visual · Embalagem", en: "Visual identity · Packaging" },
    year: "2017",
    title: "Sempre Vitta",
    description: {
      pt: "Identidade visual acolhedora e embalagens para marca ligada à alimentação natural e vitalidade.",
      en: "Organic visual language and packaging system for a health and vitality food brand.",
    },
    slug: "sempre-vitta",
    image: asset("sempre-vitta/semprevittalogo1.png"),
  },
  {
    category: "grafico",
    label: { pt: "Identidade visual · Sinalização", en: "Visual identity · Signage" },
    year: "2018",
    title: "LCR Marcenaria",
    description: {
      pt: "Marca e sinalização rústica para marcenaria artesanal, inspirada nas texturas da madeira bruta.",
      en: "Brand identity and rustic workshop signage inspired by raw timber textures.",
    },
    slug: "lcr-marcenaria",
    image: asset("lcr/lcrlogo.png"),
  },
  {
    category: "grafico",
    label: { pt: "Identidade visual · Embalagem", en: "Visual identity · Packaging" },
    year: "2018",
    title: "Lilaz",
    description: {
      pt: "Identidade e embalagens personalizadas para atelier de decorações afetivas.",
      en: "Delicate identity and custom packaging for a boutique decoration studio.",
    },
    slug: "lilaz",
    image: asset("lilaz/lilazcaderno.png"),
  },
  {
    category: "ilustracao",
    label: { pt: "Ilustração Editorial · Design de Capa", en: "Editorial Illustration · Cover Design" },
    year: "2023",
    title: "Os Periquitos",
    description: {
      pt: "Capa e ilustrações digitais para o livro de Rodrigo Reis em comemoração aos 200 anos da Independência da Bahia.",
      en: "Cover and digital illustrations for Rodrigo Reis’s book commemorating the 200th anniversary of Bahia’s Independence.",
    },
    slug: "os-periquitos",
    image: asset("osperiquitos/capa.jpg"),
  },
];

const content = {
  pt: {
    nav: ["Sobre", "Conhecimentos", "Destaques", "Outros Trabalhos", "Contato"],
    heroEyebrow: "Designer Multidisciplinar · 12+ anos de mercado",
    heroWords: ["essencial", "produto digital", "UX design", "branding", "universo visual"],
    heroTitle: ["Organizando ideias e", "dando forma ao"],
    heroSub: (
      <>
        Sou <strong>Cecília Rodrigues</strong>, bacharel pela <strong>UFBA</strong> e especialista pela <strong>UNEB</strong>.
        Atuo na fronteira entre produto digital, identidades de marca, ilustração e comunicação visual — unindo método, consistência e visão estética para marcas, jogos e experiências digitais.
      </>
    ),
    heroPrimary: "Ver destaques",
    heroCv: "Baixar CV (PDF)",
    heroContact: "Falar comigo",
    stamps: ["12+ Anos de Carreira", "UX & UI Design", "Digital Signage", "Branding & Arte"],
    aboutTag: "Quem faz",
    aboutTitle: "Sobre",
    about: [
      <>
        <strong>Bacharel em Desenho Industrial com habilitação em Programação Visual (UFBA)</strong> e <strong>Especialista em Design de Jogos Digitais (UNEB)</strong>, com pós-graduações em Design Digital e Desenvolvimento Web (UniAlphaville).
      </>,
      <>
        Atuação contínua desde <strong>2014 na In9 Mídia</strong> como Designer Gráfico e UI Designer, liderando templates para Digital Signage (DOOH), wireframes de aplicativos e campanhas corporativas. Essa bagagem soma-se a mais de uma década de projetos de branding, ilustração editorial, game art e marketing digital — sempre partindo da premissa de comunicar com clareza, relevância e alto impacto visual.
      </>,
    ],
    skills: [
      ["UX & UI Design", "Figma / Testes / Wireframes"],
      ["Digital Signage & DOOH", "Templates dinâmicos / Animação"],
      ["Identidade & Branding", "Sistemas de marca / Papelaria"],
      ["Ilustração & Game Art", "Personagens / UI / Level Design"],
    ],
    knowledgeTag: "Ferramentas e competências",
    knowledgeTitle: "Conhecimentos e habilidades",
    knowledgeDescription: "Ferramentas e áreas de especialização que orientam meu trabalho.",
    tools: [
      ["Design de Interfaces (UI/UX)", "Figma · Wireframing · Testes de Usuário · Prototipagem"],
      ["Digital Signage & DOOH", "Templates para telas · NeoNews · Animação digital"],
      ["Suíte Criativa Adobe", "Photoshop · Illustrator · After Effects · Premiere · Animate"],
      ["Branding & Identidade", "Sistemas de Marca · Manual de Identidade · Papelaria"],
      ["Game Design & Game Art", "UI de Jogo · Level Design · Design de Personagens · Construct"],
      ["Conteúdo & Redes", "Google Ads · Campanhas · CapCut · Canva · Criação Multimídia"],
    ],
    featuredTag: "Seleção Principal",
    featuredTitle: "Projetos em Destaque",
    featuredDescription: "Projetos de maior impacto técnico e estratégico em produto digital, Digital Signage, branding e jogos.",
    workTag: "Arquivo Selecionado",
    workTitle: "Outros Trabalhos",
    workDescription: "Projetos de identidade visual, ilustração, embalagem e interfaces. Filtre por área.",
    filters: [
      ["todos", "Todos"],
      ["ux", "UX Design"],
      ["grafico", "Branding"],
      ["ilustracao", "Conteúdo visual"],
    ],
    contactTag: "Vamos conversar",
    contactTitle: "Contato",
    footer: "Portfólio Cecília Rodrigues",
    seeProject: "Ver projeto completo",
  },
  en: {
    nav: ["About", "Knowledge", "Featured", "Other Works", "Contact"],
    heroEyebrow: "Multidisciplinary Designer · 12+ years of experience",
    heroWords: ["the essential", "digital product", "UX design", "branding", "visual universe"],
    heroTitle: ["Organizing ideas and", "giving shape to"],
    heroSub: (
      <>
        I’m <strong>Cecília Rodrigues</strong>, holding a bachelor's degree from <strong>UFBA</strong> and a specialization from <strong>UNEB</strong>.
        Working across digital products, brand identities, illustration, and visual communication — bringing method, consistency, and artistic craft to brands, games, and interfaces.
      </>
    ),
    heroPrimary: "See featured",
    heroCv: "Download CV (PDF)",
    heroContact: "Get in touch",
    stamps: ["12+ Years Experience", "UX & UI Design", "Digital Signage", "Branding & Art"],
    aboutTag: "The designer",
    aboutTitle: "About",
    about: [
      <>
        <strong>Bachelor in Industrial Design and Visual Communication (UFBA)</strong> and <strong>Specialist in Digital Game Design (UNEB)</strong>, with postgraduate studies in Digital Design and Web Development (UniAlphaville).
      </>,
      <>
        Working continuously since <strong>2014 at In9 Mídia</strong> as Graphic and UI Designer, developing Digital Signage (DOOH) templates, app interface wireframes, and corporate campaigns. Combined with over a decade of branding systems, editorial illustration, game art, and digital marketing — focused on clear messaging and high visual impact.
      </>,
    ],
    skills: [
      ["UX & UI Design", "Figma / User Testing / Wireframes"],
      ["Digital Signage & DOOH", "Dynamic templates / Animation"],
      ["Identity & Branding", "Brand systems / Stationery"],
      ["Illustration & Game Art", "Characters / Game UI / Level Design"],
    ],
    knowledgeTag: "Tools and skills",
    knowledgeTitle: "Knowledge and skills",
    knowledgeDescription: "Key tools and core competencies guiding my work.",
    tools: [
      ["Interface Design (UI/UX)", "Figma · Wireframing · User Testing · Prototyping"],
      ["Digital Signage & DOOH", "Display templates · NeoNews · Motion graphics"],
      ["Adobe Creative Cloud", "Photoshop · Illustrator · After Effects · Premiere · Animate"],
      ["Branding & Identity", "Brand Systems · Guidelines · Corporate Stationery"],
      ["Game Design & Game Art", "Game UI · Level Design · Character Design · Construct"],
      ["Content & Marketing", "Google Ads · Social Campaigns · CapCut · Multimedia"],
    ],
    featuredTag: "Core Selection",
    featuredTitle: "Featured Projects",
    featuredDescription: "Strategic and high-impact projects across digital products, Digital Signage, branding, and game design.",
    workTag: "Selected Archive",
    workTitle: "Other Works",
    workDescription: "Visual identities, illustrations, packaging, and digital interfaces. Filter by area.",
    filters: [
      ["todos", "All"],
      ["ux", "UX Design"],
      ["grafico", "Branding"],
      ["ilustracao", "Visual content"],
    ],
    contactTag: "Let's talk",
    contactTitle: "Contact",
    footer: "Cecília Rodrigues Portfolio",
    seeProject: "View full case",
  },
};

type Language = "pt" | "en";

function Stamp({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`stamp stamp-${tone}`}>{children}</span>;
}

export default function Home() {
  const [location, navigate] = useLocation();
  const language: Language = location === "/en" ? "en" : "pt";
  const copy = content[language];
  const [activeFilter, setActiveFilter] = useState("todos");
  const [wordIndex, setWordIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const email = "ceciliacrdes@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2200);
  };

  useEffect(() => {
    setActiveFilter("todos");
    setWordIndex(0);
  }, [language]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIndex((value) => (value + 1) % copy.heroWords.length);
    }, 2300);
    return () => window.clearInterval(timer);
  }, [copy.heroWords.length]);

  const displayedArchive =
    activeFilter === "todos"
      ? archiveProjects
      : archiveProjects.filter((project) => project.category === activeFilter);

  const casePath = (slug: string) => (language === "en" ? `/en/cases/${slug}` : `/cases/${slug}`);
  const jump = () => setMenuOpen(false);
  const switchLanguage = () => {
    setMenuOpen(false);
    navigate(language === "pt" ? "/en" : "/");
  };

  return (
    <div className="portfolio-page">
      <header className="top-header">
        <nav className="nav-wrap">
          <a className="old-logo" href={sitePath(language === "en" ? "/en" : "/")}>
            CECÍLIA<span>·</span>RODRIGUES
          </a>
          <div className={`old-nav ${menuOpen ? "open" : ""}`}>
            {copy.nav.map((item, index) => (
              <a
                href={["#sobre", "#conhecimentos", "#destaques", "#trabalhos", "#contato"][index]}
                onClick={jump}
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
          <div className="nav-tools">
            <ThemeToggle language={language} />
            <span className="availability">
              <i /> {language === "pt" ? "Disponível p/ projetos" : "Available for projects"}
            </span>
            <button
              className="lang-switch"
              onClick={switchLanguage}
              aria-label={language === "pt" ? "Switch to English" : "Mudar para português"}
            >
              {language === "pt" ? "EN" : "PT"}
            </button>
            <button
              className="menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="top">
        {/* HERO SECTION */}
        <section className="old-hero section-wrap">
          <div className="hero-copy">
            <p className="old-eyebrow">
              <span /> {copy.heroEyebrow}
            </p>
            <h1>
              {copy.heroTitle[0]}
              <br />
              {copy.heroTitle[1]}{" "}
              <span className="cycle-word" style={{ background: colors[wordIndex] }}>
                {copy.heroWords[wordIndex]}.
              </span>
            </h1>
            <p className="hero-sub">{copy.heroSub}</p>

            <div className="hero-buttons">
              <a className="old-button filled" href="#destaques">
                {copy.heroPrimary} <ArrowDown size={16} />
              </a>
              <a
                className="old-button cv-btn"
                href={sitePath("/curriculo-cecilia-rodrigues.pdf")}
                target="_blank"
                rel="noreferrer noopener"
                download="Curriculo-Cecilia-Rodrigues.pdf"
              >
                <Download size={16} /> {copy.heroCv}
              </a>
              <a className="old-button outlined" href="#contato">
                {copy.heroContact}
              </a>
            </div>

            <div className="stamp-row">
              {copy.stamps.map((stamp, index) => (
                <Stamp tone={["blue", "orange", "ink", "green"][index]} key={stamp}>
                  {stamp}
                </Stamp>
              ))}
            </div>
          </div>
        </section>

        <div className="torn-divider" />

        {/* 01: SOBRE */}
        <section id="sobre" className="old-section paper-white section-wrap">
          <SectionTitle index="01" tag={copy.aboutTag} title={copy.aboutTitle} />
          <div className="about-copy">
            {copy.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
            <div className="skills-list">
              {copy.skills.map(([a, b]) => (
                <div className="skill-line" key={a}>
                  <span>{a}</span>
                  <small>{b}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02: CONHECIMENTOS */}
        <section id="conhecimentos" className="old-section section-wrap">
          <SectionTitle
            index="02"
            tag={copy.knowledgeTag}
            title={copy.knowledgeTitle}
            description={copy.knowledgeDescription}
          />
          <div className="knowledge-list">
            {copy.tools.map(([a, b]) => (
              <div className="knowledge-line" key={a}>
                <span>{a}</span>
                <small>{b}</small>
              </div>
            ))}
          </div>
        </section>

        {/* 03: PROJETOS EM DESTAQUE (4 CHAVES) */}
        <section id="destaques" className="old-section section-wrap featured-section">
          <SectionTitle
            index="03"
            tag={copy.featuredTag}
            title={copy.featuredTitle}
            description={copy.featuredDescription}
          />

          <div className="featured-grid">
            {featuredProjects.map((project) => (
              <article className="featured-card" key={project.slug}>
                <div className="featured-card-media">
                  <img src={project.image} alt={project.title} loading="lazy" />
                </div>
                <div className="featured-card-content">
                  <div className="featured-card-meta">
                    <span>{project.category[language]}</span>
                    <small>{project.year}</small>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description[language]}</p>
                  <div className="featured-card-tags">
                    {project.tags.map((tag) => (
                      <span className="featured-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a className="featured-card-btn" href={sitePath(casePath(project.slug))}>
                    <span>{copy.seeProject}</span>
                    <ArrowUpRight size={15} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 04: DEMAIS TRABALHOS (ARQUIVO SELECIONADO) */}
        <section id="trabalhos" className="old-section section-wrap">
          <SectionTitle
            index="04"
            tag={copy.workTag}
            title={copy.workTitle}
            description={copy.workDescription}
          />

          <div className="filters">
            {copy.filters.map(([value, label]) => (
              <button
                className={activeFilter === value ? "active" : ""}
                key={value}
                onClick={() => setActiveFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="work-grid">
            {displayedArchive.map((item) => (
              <article className="work-card" key={item.slug}>
                <div className="work-card-thumb">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="work-top">
                  <span>{item.label[language]}</span>
                  <small>{item.year}</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description[language]}</p>
                <a href={sitePath(casePath(item.slug))}>
                  {copy.seeProject} <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* 05: CONTATO & CONVERSÃO */}
        <section id="contato" className="contact-section old-section">
          <div className="section-wrap">
            <SectionTitle index="05" tag={copy.contactTag} title={copy.contactTitle} light />

            <div className="site-contact-grid">
              {/* E-mail com cópia */}
              <div className="contact-card-box">
                <span className="contact-box-label">
                  {language === "en" ? "Direct Email" : "E-mail Profissional"}
                </span>
                <div className="contact-box-actions">
                  <a className="contact-action-btn primary" href={`mailto:${email}`}>
                    <Mail size={16} /> {email}
                  </a>
                  <button
                    type="button"
                    className="contact-copy-btn"
                    onClick={handleCopyEmail}
                    aria-label={language === "en" ? "Copy email" : "Copiar e-mail"}
                  >
                    {emailCopied ? <Check size={16} /> : <Copy size={16} />}
                    <span>{emailCopied ? (language === "en" ? "Copied!" : "Copiado!") : (language === "en" ? "Copy" : "Copiar")}</span>
                  </button>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="contact-card-box">
                <span className="contact-box-label">WhatsApp</span>
                <div className="contact-box-actions">
                  <a
                    className="contact-action-btn"
                    href="https://wa.me/message/QJQFEXDTZAW2B1"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {language === "en" ? "Chat on WhatsApp" : "Falar pelo WhatsApp"}{" "}
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              {/* Currículo em PDF */}
              <div className="contact-card-box">
                <span className="contact-box-label">
                  {language === "en" ? "Curriculum Vitae" : "Currículo Oficial"}
                </span>
                <div className="contact-box-actions">
                  <a
                    className="contact-action-btn cv-btn"
                    href={sitePath("/curriculo-cecilia-rodrigues.pdf")}
                    target="_blank"
                    rel="noreferrer noopener"
                    download="Curriculo-Cecilia-Rodrigues.pdf"
                  >
                    <FileText size={16} /> {language === "en" ? "Download CV (PDF)" : "Baixar Currículo (PDF)"}{" "}
                    <Download size={15} />
                  </a>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="contact-card-box">
                <span className="contact-box-label">
                  {language === "en" ? "Professional Network" : "Rede Profissional"}
                </span>
                <div className="contact-box-actions">
                  <a
                    className="contact-action-btn"
                    href="https://www.linkedin.com/in/cec%C3%ADlia-rodrigues-a3528334/"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    LinkedIn <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="old-footer">
        <div className="section-wrap">
          <span>© 2026 Cecília Cunha Rodrigues</span>
          <span>{copy.footer}</span>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({
  index,
  tag,
  title,
  description,
  light = false,
}: {
  index: string;
  tag: string;
  title: string;
  description?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-title ${light ? "light" : ""}`}>
      <div>
        <p className="title-tag">
          {index} / {tag}
        </p>
        <h2>{title}</h2>
      </div>
      {description && <p className="title-description">{description}</p>}
    </div>
  );
}

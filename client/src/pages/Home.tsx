// Direção editorial de estúdio: assimetria, respiro, marfim, grafite e azul-cobalto.
import { useState } from "react";
import { ArrowUpRight, Menu, X, ArrowDown } from "lucide-react";

const projects = [
  { title: "Bogused — Assets", category: "Conteúdo visual", year: "2020", type: "visual", description: "O desafio era criar um universo visual reconhecível; a contribuição foi organizar personagens, cenário e interface em uma linguagem única.", image: "/manus-storage/personagens-prancha_d84c54c1.png", href: "#trabalhos" },
  { title: "Mercado da Rua", category: "UX Design", year: "2025", type: "ux", description: "A proposta precisava aproximar moradores e comércios locais; a contribuição foi transformar essa intenção em um fluxo simples de descoberta e compra.", image: "/manus-storage/arvore_0deab038.jpg", href: "#trabalhos" },
  { title: "Café Formiga", category: "Identidade visual", year: "2024", type: "grafico", description: "Uma torrefadora de bairro precisava de presença própria; a contribuição foi construir uma identidade que leva o gesto artesanal para a embalagem e a loja.", image: "/manus-storage/lcr_5c68185f.png", href: "#trabalhos" },
  { title: "Trilha Selvagem", category: "Campanha", year: "2024", type: "marketing", description: "O lançamento precisava ganhar consistência em vários pontos de contato; a contribuição foi criar uma direção de arte capaz de circular entre redes e ponto de venda.", image: "/manus-storage/forca_15b587a0.png", href: "#trabalhos" },
  { title: "Recomendaria", category: "Identidade visual", year: "2026", type: "grafico", description: "A plataforma precisava ser lembrada e indicada; a contribuição foi alinhar naming, símbolo e sistema visual para tornar a proposta mais clara.", image: "/manus-storage/ksi_559c26b1.jpg", href: "#trabalhos" },
  { title: "KSI Consultas", category: "Marketing", year: "2018–2021", type: "marketing", description: "A comunicação precisava transmitir confiança sem perder proximidade; a contribuição foi organizar presença digital e conteúdo em uma rotina consistente.", image: "/manus-storage/personagens-prancha_d84c54c1.png", href: "#trabalhos" },
];

const filters = [
  ["all", "Todos"], ["visual", "Conteúdo visual"], ["ux", "UX Design"], ["grafico", "Design gráfico"], ["marketing", "Marketing"],
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = filter === "all" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a href="#inicio" className="wordmark" aria-label="Cecília Rodrigues, início"><span className="monogram" aria-hidden="true">CR</span><span>CECÍLIA</span><i /> <b>RODRIGUES</b></a>
        <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
          <a href="#sobre" onClick={() => setMenuOpen(false)}>Sobre</a>
          <a href="#trabalhos" onClick={() => setMenuOpen(false)}>Trabalhos</a>
          <a href="#processo" onClick={() => setMenuOpen(false)}>Processo</a>
          <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
        </nav>
        <div className="header-actions">
          <span className="availability"><span /> disponível para projetos</span>
          <button className="menu-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>

      <main id="inicio">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> portfólio · 2026</p>
            <h1>Ideias com <em>forma,</em><br /> função e intenção.</h1>
            <p className="hero-intro">Sou Cecília Rodrigues, designer multidisciplinar. Transformo problemas complexos em imagens, interfaces e sistemas visuais que fazem sentido.</p>
            <div className="hero-actions"><a className="button button-dark" href="#trabalhos">Explorar trabalhos <ArrowDown size={16} /></a><a className="text-link" href="mailto:ceciliacrdes@gmail.com">Vamos conversar <ArrowUpRight size={16} /></a></div>
          </div>
          <div className="hero-art"><div className="hero-art-label">01 / direção visual</div><img src="/manus-storage/portfolio-hero-editorial_722d1790.png" alt="Composição editorial com papéis e elementos de design" /><div className="hero-art-caption">imagem, interface<br />e mensagem</div></div>
        </section>

        <section className="discipline-strip"><div className="container strip-inner"><span>Atuação</span><div className="strip-list"><span>Conteúdo visual</span><span>UX Design</span><span>Design gráfico</span><span>Marketing</span></div><span className="strip-mark">✳</span></div></section>

        <section id="sobre" className="about section-pad"><div className="section-index">02 <span>/</span> sobre</div><div className="about-layout"><div className="about-heading"><p className="eyebrow">quem faz</p><h2>Clareza também<br /><em>é uma forma</em><br />de cuidado.</h2></div><div className="about-body"><p className="lead">Meu trabalho acontece na fronteira entre imagem, interface e mensagem — onde uma ideia deixa de ser só intenção e começa a ganhar direção.</p><p>Sou formada em Desenho Industrial com habilitação em Programação Visual (UFBA) e especialista em Design de Jogos Digitais (UNEB). Desde 2013, atuo em projetos corporativos, Digital Signage, UI, ilustração editorial, identidade visual e campanhas.</p><a className="text-link" href="#processo">Conheça meu processo <ArrowUpRight size={16} /></a></div></div></section>

        <section id="trabalhos" className="work-section section-pad"><div className="section-index">03 <span>/</span> seleção</div><div className="work-heading"><div><p className="eyebrow">projetos escolhidos</p><h2>Trabalhos que<br /><em>encontraram forma.</em></h2></div><p className="work-note">Uma seleção de projetos em diferentes escalas — da primeira pergunta ao último detalhe.</p></div><div className="filter-row" role="group" aria-label="Filtrar projetos">{filters.map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div><div className="project-grid">{visibleProjects.map((project, index) => <article className={`project-card project-${index % 3}`} key={project.title}><a href={project.href} className="project-image"><img src={project.image} alt={`Projeto ${project.title}`} /><span className="project-arrow"><ArrowUpRight size={19} /></span></a><div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.description}</p></article>)}</div></section>

        <section id="processo" className="process section-pad"><div className="section-index">04 <span>/</span> processo</div><div className="process-layout"><div><p className="eyebrow">como eu trabalho</p><h2>Do ruído<br />ao <em>essencial.</em></h2></div><div className="process-list"><div className="process-item"><span>01</span><div><h3>Entender</h3><p>Antes da solução, vem a pergunta certa. Investigo contexto, objetivos e pessoas.</p></div></div><div className="process-item"><span>02</span><div><h3>Organizar</h3><p>Dou estrutura ao que está disperso: ideias, fluxos, referências e possibilidades.</p></div></div><div className="process-item"><span>03</span><div><h3>Construir</h3><p>Transformo direção em linguagem visual consistente, testável e pronta para existir.</p></div></div></div></div></section>

        <section id="contato" className="contact section-pad"><div className="section-index light">05 <span>/</span> contato</div><div className="contact-layout"><div><p className="eyebrow light-eyebrow">vamos conversar</p><h2>Tem uma ideia<br />pedindo <em>forma?</em></h2></div><div className="contact-side"><p>Se você está começando um projeto ou tentando dar clareza a algo que já existe, me escreva.</p><a className="email-link" href="mailto:ceciliacrdes@gmail.com">ceciliacrdes@gmail.com <ArrowUpRight size={20} /></a><div className="contact-foot"><span>Salvador · Brasil</span><span>agenda aberta para 2026</span></div></div></div></section>
      </main>
      <footer><div className="container footer-inner"><span>© 2026 Cecília Rodrigues</span><span>design com intenção <b>✳</b></span><a href="#inicio">voltar ao topo ↑</a></div></footer>
    </div>
  );
}

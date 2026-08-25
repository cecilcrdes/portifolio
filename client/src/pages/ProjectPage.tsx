// Páginas de trabalho: preservar a linguagem gráfica original e organizar cada área como uma seleção editorial navegável.
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useLocation, useRoute } from "wouter";

const groups = {
  graphic: {
    pt: { title: "Design Gráfico", tag: "Identidades, sistemas e matéria", intro: "Marcas que precisam ser reconhecidas antes mesmo de serem lidas. Aqui entram identidades visuais, embalagens, cartazes e sistemas que fazem a ideia ganhar presença.", items: [
      { title: "Café Formiga", year: "2024", text: "Marca, embalagens e sinalização de loja para uma torrefadora de bairro, a partir do desenho da formiga-fio.", note: "Uma identidade construída para sair do rótulo e ocupar a loja.", color: "#f0c23a", media: "/manus-storage/lcr_5c68185f.png" },
      { title: "Festival Vira-Lata", year: "2023", text: "Sistema de cartazes serigrafados para um festival de música independente, com tipografia recortada à mão.", note: "A linguagem precisava parecer feita à mão, mesmo quando aplicada em série.", color: "#ff5a2e", media: "/manus-storage/forca_15b587a0.png" },
      { title: "KSI Consultas", year: "2026", text: "Marca e papelaria para uma empresa de consultas especializadas, com foco em tecnologia.", note: "Clareza e confiança traduzidas em um sistema modular.", color: "#2b3eff", media: "/manus-storage/ksis_09ca61c5.png" },
      { title: "Recomendaria", year: "2026", text: "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.", note: "Uma marca criada para tornar a recomendação mais fácil de lembrar.", color: "#ff5a2e", media: "/manus-storage/lcr_5c68185f.png" },
      { title: "LCR Marcenaria", year: "2025", text: "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.", note: "O desenho parte da matéria-prima e volta para a fachada.", color: "#f0c23a", media: "/manus-storage/lcr_5c68185f.png" },
      { title: "Lilaz", year: "2025", text: "Identidade e embalagens para um pequeno negócio de decorações personalizadas.", note: "Um sistema leve para uma marca que cresce peça por peça.", color: "#2e9e4e", media: "/manus-storage/semprev_2caf5662.png" },
    ] },
    en: { title: "Graphic Design", tag: "Identities, systems and matter", intro: "Brands that need to be recognized before they are even read. This selection brings together visual identities, packaging, posters and systems that give ideas a physical presence.", items: [
      { title: "Café Formiga", year: "2024", text: "Branding, packaging and store signage for a neighborhood coffee roaster, built from a thread-ant drawing.", note: "An identity designed to leave the label and inhabit the shop.", color: "#f0c23a", media: "/manus-storage/lcr_5c68185f.png" },
      { title: "Vira-Lata Festival", year: "2023", text: "A screen-printed poster system for an independent music festival, with hand-cut typography.", note: "The language had to feel handmade, even when applied as a series.", color: "#ff5a2e", media: "/manus-storage/forca_15b587a0.png" },
      { title: "KSI Consultas", year: "2026", text: "Brand identity and stationery for a technology-focused specialized consultation company.", note: "Clarity and trust translated into a modular system.", color: "#2b3eff", media: "/manus-storage/ksis_09ca61c5.png" },
      { title: "Recomendaria", year: "2026", text: "Naming and identity for a professional referral platform, from logo to app.", note: "A brand designed to make referrals easier to remember.", color: "#ff5a2e", media: "/manus-storage/lcr_5c68185f.png" },
      { title: "LCR Marcenaria", year: "2025", text: "Brand identity and workshop signage inspired by raw wood textures.", note: "The drawing starts with the material and returns to the storefront.", color: "#f0c23a", media: "/manus-storage/lcr_5c68185f.png" },
      { title: "Lilaz", year: "2025", text: "Identity and packaging for a small custom decoration business.", note: "A light system for a brand that grows one piece at a time.", color: "#2e9e4e", media: "/manus-storage/semprev_2caf5662.png" },
    ] },
  },
  ux: {
    pt: { title: "UX Design", tag: "Pesquisa, fluxo e produto", intro: "Interfaces pensadas a partir do que as pessoas precisam fazer — e não apenas do que a tela pode mostrar. Cada projeto aproxima problema, estrutura e uso.", items: [
      { title: "App Mercado da Rua", year: "2025", text: "Marketplace regional que conecta moradores a mercados, hortifrutis e mercearias do próprio bairro.", note: "O trabalho começou pela proposta de valor e terminou em um fluxo de compra mais direto.", color: "#ff5a2e", media: "/manus-storage/Cadastro_b90037ad.png" },
      { title: "Proposta de valor e posicionamento", year: "2025", text: "Definição de públicos, necessidades e diferenciais para orientar a primeira versão do produto.", note: "Antes da interface, a pergunta era: por que alguém voltaria a usar este serviço?", color: "#2b3eff", media: "/manus-storage/Slide 16_9 - 5_027d0f41.png" },
      { title: "Arquitetura do produto", year: "2025", text: "Organização de categorias, busca, loja e pedido em uma navegação simples para uso cotidiano.", note: "Menos caminhos concorrendo entre si; mais clareza em cada decisão.", color: "#f0c23a", media: "/manus-storage/Login_906ab292.png" },
      { title: "Checkout — Loja Verde", year: "2024", text: "Simplificação do carrinho e pagamento de um marketplace de produtos sustentáveis, com testes A/B em cada etapa.", note: "O checkout foi tratado como parte da experiência, não como a última tela.", color: "#2e9e4e", media: "/manus-storage/Slide 16_9 - 6_9d13ca59.png" },
      { title: "Modelo de monetização", year: "2025", text: "Exploração de caminhos de receita para equilibrar acesso do usuário e viabilidade dos pequenos negócios.", note: "A solução precisava funcionar para quem compra e para quem vende.", color: "#ff5a2e", media: "/manus-storage/Slide 16_9 - 7_c227acf8.png" },
    ] },
    en: { title: "UX Design", tag: "Research, flow and product", intro: "Interfaces shaped around what people need to do — not only what a screen can display. Each project brings problem, structure and use closer together.", items: [
      { title: "Mercado da Rua app", year: "2025", text: "A regional marketplace connecting residents with neighborhood markets and grocery stores.", note: "The work started with the value proposition and ended in a more direct shopping flow.", color: "#ff5a2e", media: "/manus-storage/Cadastro_b90037ad.png" },
      { title: "Value proposition and positioning", year: "2025", text: "Audience, needs and differentiators defined to guide the first version of the product.", note: "Before the interface, the question was: why would someone come back to this service?", color: "#2b3eff", media: "/manus-storage/Slide 16_9 - 5_027d0f41.png" },
      { title: "Product architecture", year: "2025", text: "Categories, search, stores and orders organized into a simple everyday navigation.", note: "Fewer competing paths; more clarity in each decision.", color: "#f0c23a", media: "/manus-storage/Login_906ab292.png" },
      { title: "Checkout — Loja Verde", year: "2024", text: "A simpler cart and payment experience for a sustainable products marketplace, tested at each step.", note: "Checkout was treated as part of the experience, not the final screen.", color: "#2e9e4e", media: "/manus-storage/Slide 16_9 - 6_9d13ca59.png" },
      { title: "Monetization model", year: "2025", text: "Revenue paths explored to balance user access and the viability of small businesses.", note: "The solution had to work for both buyers and sellers.", color: "#ff5a2e", media: "/manus-storage/Slide 16_9 - 7_c227acf8.png" },
    ] },
  },
  illustration: {
    pt: { title: "Conteúdo visual", tag: "Imagem, personagem e mundo", intro: "Ilustração para explicar, ambientar e criar memória. Os projetos abaixo atravessam jogos, personagens, cenários e interfaces sem separar forma de narrativa.", items: [
      { title: "Bogused — Assets", year: "2020", text: "Produção de assets para o jogo Bogused, incluindo design de personagens, cenário e interface.", note: "Uma linguagem visual para um universo que precisava ser reconhecido em qualquer tela.", color: "#2b3eff", media: "/manus-storage/personagens-prancha_d84c54c1.png" },
      { title: "Design de personagens", year: "2020", text: "Prancha de personagens e variações para estabelecer silhueta, personalidade e leitura em jogo.", note: "Cada personagem precisava funcionar como forma antes de funcionar como detalhe.", color: "#ff5a2e", media: "/manus-storage/personagens-prancha_d84c54c1.png" },
      { title: "Design de cenário", year: "2020", text: "Ambientes e elementos de cena para criar ritmo, obstáculos e pontos de orientação.", note: "O cenário conta parte da história mesmo quando ninguém está falando.", color: "#2e9e4e", media: "/manus-storage/arvore_0deab038.jpg" },
      { title: "Design de interface", year: "2020", text: "Telas e elementos de interface integrados à direção de arte do jogo.", note: "A interface acompanha o mundo em vez de interrompê-lo.", color: "#f0c23a", media: "/manus-storage/select_d037a441.png" },
      { title: "E aí man jogo", year: "2020", text: "Jogo 2D de aventura e plataforma em que Luketa atravessa a comunidade para encontrar seu amigo desaparecido.", note: "Uma aventura de ritmo simples, guiada por espaço, personagem e descoberta.", color: "#ff5a2e", media: "/manus-storage/main_4fa233b8.png" },
    ] },
    en: { title: "Visual content", tag: "Image, character and world", intro: "Illustration to explain, set a scene and create memory. These projects move through games, characters, environments and interfaces without separating form from narrative.", items: [
      { title: "Bogused — Assets", year: "2020", text: "Assets for the Bogused game, including character, environment and interface design.", note: "A visual language for a universe that needed to be recognizable on every screen.", color: "#2b3eff", media: "/manus-storage/personagens-prancha_d84c54c1.png" },
      { title: "Character design", year: "2020", text: "Character boards and variations to establish silhouette, personality and readability in-game.", note: "Each character had to work as a shape before working as a detail.", color: "#ff5a2e", media: "/manus-storage/personagens-prancha_d84c54c1.png" },
      { title: "Environment design", year: "2020", text: "Environments and scene elements to create rhythm, obstacles and points of orientation.", note: "The environment tells part of the story even when no one is speaking.", color: "#2e9e4e", media: "/manus-storage/arvore_0deab038.jpg" },
      { title: "Interface design", year: "2020", text: "Screens and interface elements integrated into the game’s art direction.", note: "The interface belongs to the world instead of interrupting it.", color: "#f0c23a", media: "/manus-storage/select_d037a441.png" },
      { title: "E aí man jogo", year: "2020", text: "A 2D adventure game where Luketa crosses the community to find his missing friend.", note: "A simple-paced adventure led by space, character and discovery.", color: "#ff5a2e", media: "/manus-storage/main_4fa233b8.png" },
    ] },
  },
  marketing: {
    pt: { title: "Marketing", tag: "Mensagem, campanha e presença", intro: "Conteúdo que encontra a marca no lugar onde as pessoas já estão. Da direção de arte ao calendário editorial, cada peça precisa ter uma função clara.", items: [
      { title: "Trilha Selvagem", year: "2024", text: "Direção de arte e conteúdo para o lançamento de uma linha de mochilas, com peças para redes e ponto de venda.", note: "Uma campanha que precisava carregar o espírito de aventura em diferentes formatos.", color: "#2e9e4e", media: "/manus-storage/trader_348b61a3.jpg" },
      { title: "Marca Bloom", year: "2023", text: "Calendário editorial e peças mensais para redes sociais de uma marca de cosméticos naturais.", note: "Consistência sem repetição: uma rotina de conteúdo com espaço para respirar.", color: "#f0c23a", media: "/manus-storage/semprev_2caf5662.png" },
      { title: "KSI Consultas", year: "2018–2021", text: "Gerenciamento de redes sociais e construção de marca para uma clínica de consultas especializadas.", note: "Informação técnica traduzida em uma presença mais próxima.", color: "#ff5a2e", media: "/manus-storage/socialksi_e281dd1f.png" },
      { title: "In9 Mídia", year: "2021–2026", text: "Gestão de redes sociais e campanhas de Google Ads para empresa de software e sinalização digital.", note: "A comunicação comercial precisa ser compreendida antes de ser clicada.", color: "#2b3eff", media: "/manus-storage/ksis_09ca61c5.png" },
    ] },
    en: { title: "Marketing", tag: "Message, campaign and presence", intro: "Content that meets a brand where people already are. From art direction to editorial calendars, every piece needs a clear function.", items: [
      { title: "Trilha Selvagem", year: "2024", text: "Art direction and content for the launch of a new backpack line, across social and retail.", note: "A campaign that needed to carry an adventurous spirit across different formats.", color: "#2e9e4e", media: "/manus-storage/trader_348b61a3.jpg" },
      { title: "Bloom Brand", year: "2023", text: "Editorial calendar and monthly social assets for a natural cosmetics brand.", note: "Consistency without repetition: a content routine with room to breathe.", color: "#f0c23a", media: "/manus-storage/semprev_2caf5662.png" },
      { title: "KSI Consultas", year: "2018–2021", text: "Social media management and brand building for a specialized healthcare clinic.", note: "Technical information translated into a more approachable presence.", color: "#ff5a2e", media: "/manus-storage/socialksi_e281dd1f.png" },
      { title: "In9 Mídia", year: "2021–2026", text: "Social media management and Google Ads campaigns for a software and digital signage company.", note: "Commercial communication needs to be understood before it is clicked.", color: "#2b3eff", media: "/manus-storage/ksis_09ca61c5.png" },
    ] },
  },
} as const;

type GroupKey = keyof typeof groups;

export default function ProjectPage() {
  const [location, navigate] = useLocation();
  const [enMatch, enParams] = useRoute("/en/projects/:category");
  const [, ptParams] = useRoute("/projetos/:category");
  const language = enMatch || location.startsWith("/en/") ? "en" : "pt";
  const rawCategory = (enParams?.category || ptParams?.category || "graphic") as string;
  const category = ({ grafico: "graphic", graphic: "graphic", ux: "ux", ilustracao: "illustration", illustration: "illustration", marketing: "marketing" } as Record<string, GroupKey>)[rawCategory] || "graphic";
  const data = groups[category][language];
  const homePath = language === "en" ? "/en" : "/";
  const categoryPath = language === "en" ? `/en/projects/${category}` : `/projetos/${category === "graphic" ? "grafico" : category === "illustration" ? "ilustracao" : category}`;
  const goHome = () => navigate(homePath);
  const switchLanguage = () => navigate(language === "en" ? `/projetos/${category === "graphic" ? "grafico" : category === "illustration" ? "ilustracao" : category}` : `/en/projects/${category}`);

  return <div className="project-page"><header className="top-header"><nav className="nav-wrap"><a className="old-logo" href={homePath}>CECÍLIA<span>·</span>RODRIGUES</a><div className="project-nav"><button onClick={goHome}><ArrowLeft size={14} /> {language === "en" ? "Back to portfolio" : "Voltar ao portfólio"}</button><button className="lang-switch" onClick={switchLanguage}>{language === "en" ? "PT" : "EN"}</button></div></nav></header><main>
    <section className="project-hero section-wrap"><p className="old-eyebrow"><span /> {language === "en" ? "Selected projects" : "Projetos selecionados"}</p><div className="project-hero-grid"><div><h1>{data.title}</h1><p>{data.intro}</p></div><div className="project-hero-mark"><span>{category === "ux" ? "UX" : category === "illustration" ? "IMG" : data.title.slice(0, 3).toUpperCase()}</span><i /></div></div><div className="project-tagline"><span>0{Object.keys(groups).indexOf(category) + 1}</span><b>{data.tag}</b><span>{data.items.length} {language === "en" ? "projects" : "projetos"}</span></div></section>
    <section className="project-index section-wrap"><p>{language === "en" ? "In this selection" : "Nesta seleção"}</p><div>{data.items.map((item, index) => <a href={`#project-${index}`} key={item.title}><span>0{index + 1}</span>{item.title}</a>)}</div></section>
    <section className="project-list section-wrap">{data.items.map((item, index) => <article className="project-feature" id={`project-${index}`} key={item.title}><div className="project-feature-head"><span className="title-tag">0{index + 1} / {item.year}</span><h2>{item.title}</h2><a href="#contato" onClick={(event) => { event.preventDefault(); navigate(`${homePath}#contato`); }}>{language === "en" ? "Start a conversation" : "Iniciar conversa"} <ArrowUpRight size={15} /></a></div><div className="project-feature-body"><div className="project-poster" style={{ background: item.color }}><img src={item.media} alt="" /><span>{item.title}</span></div><div className="project-feature-copy"><p className="project-lead">{item.text}</p><p>{item.note}</p><div className="project-rule" /><small>{language === "en" ? "Role" : "Atuação"}<br />{data.title}</small></div></div></article>)}</section>
    <section id="contato" className="project-cta"><div className="section-wrap"><p className="title-tag">04 / {language === "en" ? "Next project" : "Próximo projeto"}</p><h2>{language === "en" ? <>Have a brief?<br /><em>Let’s make it clear.</em></> : <>Tem um briefing?<br /><em>Vamos dar forma.</em></>}</h2><a className="old-button filled" href="mailto:ceciliacrdes@gmail.com">ceciliacrdes@gmail.com <ArrowUpRight size={16} /></a></div></section>
  </main><footer className="old-footer"><div className="section-wrap"><span>© 2026 Cecília Rodrigues</span><button onClick={goHome}>{language === "en" ? "Back to portfolio" : "Voltar ao portfólio"}</button></div></footer></div>;
}

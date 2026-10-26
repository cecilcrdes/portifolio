import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import SiteContact from "@/components/SiteContact";
import ThemeToggle from "@/components/ThemeToggle";
import { useLocation, useRoute } from "wouter";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { sitePath } from "@/lib/sitePath";
import { getMuseumsMockups } from "@/lib/museumsMockups";

type Language = "pt" | "en";
type CaseSection = {
  id: string;
  label: string;
  title: string;
  text: string;
  media?: { src: string; alt: string }[];
  videos?: { src: string; title: string }[];
  content?: ReactNode;
  carousel?: boolean;
  insightGroups?: { eyebrow: string; title: string; intro: string; items: { title: string; text: string }[] }[];
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

function MuseumJourneyCarousel({ media, onEnlarge }: { media: NonNullable<CaseSection["media"]>; onEnlarge: (media: { src: string; alt: string }) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.82, behavior: "smooth" });
  };
  return <div className="museum-journey-carousel">
    <div className="museum-journey-controls">
      <button type="button" onClick={() => scroll(-1)} aria-label="Jornadas anteriores"><ChevronLeft size={20} /></button>
      <button type="button" onClick={() => scroll(1)} aria-label="Próximas jornadas"><ChevronRight size={20} /></button>
    </div>
    <div className="museum-journey-track" ref={trackRef}>
      {media.map((item) => <figure key={item.src}><button className="case-image-zoom" type="button" onClick={() => onEnlarge(item)} aria-label={`Ampliar ${item.alt}`}><img src={item.src} alt={item.alt} loading="lazy" /></button><figcaption>{item.alt}</figcaption></figure>)}
    </div>
  </div>;
}

function MuseumArchitecture({ language }: { language: Language }) {
  const english = language === "en";
  const groups = english ? [
    { title: "Museums", description: "Information, location, hours and accessibility.", items: ["Museum directory", "Museum details", "Location and directions", "Opening hours", "Tickets and free admission", "Accessibility", "Photos and general information"] },
    { title: "Exhibitions", description: "Schedule, dates, themes and participating artists.", items: ["Featured exhibitions", "Exhibition carousel", "Upcoming exhibitions", "Themes and categories", "Participating artists", "Dates and locations", "Search filters"] },
    { title: "Artworks", description: "Images, descriptions and historical information.", items: ["Artwork gallery", "Artwork details", "Historical context", "Museum and exhibition", "Related artist", "Technique and period", "High quality images"] },
    { title: "Artists", description: "Biographies and related artworks.", items: ["Artist directory", "Artist profile", "Biography", "Related artworks", "Exhibitions they take part in", "Timeline", "Links and references"] },
    { title: "Cultural agenda", description: "Events, workshops and educational activities.", items: ["Featured events", "Workshops and activities", "Educational visits", "Talks and gatherings", "Dates and locations", "Activity type filters", "Registration and information"] },
    { title: "Favorites", description: "Saved museums and content.", items: ["Saved museums", "Saved exhibitions", "Saved artworks", "Saved artists", "Saved events", "Custom lists", "Sync across devices"] },
  ] : [
    { title: "Museus", description: "Informações, localização, horários e acessibilidade.", items: ["Lista de museus", "Detalhes do museu", "Localização e rotas", "Horários de funcionamento", "Ingressos e gratuidades", "Acessibilidade", "Fotos e informações gerais"] },
    { title: "Exposições", description: "Programação, datas, temas e artistas.", items: ["Exposições em destaque", "Exposições em cartaz", "Próximas exposições", "Temas e categorias", "Artistas participantes", "Datas e locais", "Filtros de busca"] },
    { title: "Obras", description: "Imagens, descrições e informações históricas.", items: ["Galeria de obras", "Detalhes da obra", "Contexto histórico", "Museu e exposição", "Artista relacionado", "Técnica e período", "Imagens em alta qualidade"] },
    { title: "Artistas", description: "Biografias e obras relacionadas.", items: ["Lista de artistas", "Perfil do artista", "Biografia", "Obras relacionadas", "Exposições em que participa", "Linha do tempo", "Links e referências"] },
    { title: "Agenda cultural", description: "Eventos, oficinas e atividades educativas.", items: ["Eventos em destaque", "Oficinas e atividades", "Visitas educativas", "Palestras e encontros", "Datas e locais", "Filtros por tipo de atividade", "Inscrição e informações"] },
    { title: "Favoritos", description: "Museus e conteúdos salvos.", items: ["Museus salvos", "Exposições salvas", "Obras salvas", "Artistas salvos", "Eventos salvos", "Listas personalizadas", "Sincronização entre dispositivos"] },
  ];
  return <div className="museum-architecture">
    <div className="museum-architecture-heading"><div><span>{english ? "Information architecture" : "Arquitetura da informação"}</span><h3>{english ? "Content organization" : "Organização do conteúdo"}</h3><p>{english ? "The app structure supports the discovery of museums, exhibitions, artworks and artists, bringing practical information and cultural content together." : "A estrutura do aplicativo foi pensada para facilitar a descoberta de museus, exposições, obras e artistas, reunindo informações práticas e conteúdos culturais em um só lugar."}</p></div><aside><span>{english ? "Principle" : "Princípio"}</span><p>{english ? "Simple navigation, integrated content and inclusive access." : "Navegação simples, conteúdo integrado e acesso inclusivo."}</p></aside></div>
    <div className="museum-architecture-home"><strong>{english ? "Home" : "Início"}</strong><span>{english ? "Overview and highlights" : "Visão geral e destaques"}</span></div>
    <div className="museum-architecture-grid">{groups.map((group) => <article key={group.title}><h4>{group.title}</h4><p>{group.description}</p><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
  </div>;
}


function KsiBrandStory({ language }: { language: Language }) {
  const english = language === "en";
  return <>
    {english ? <>
      <p>KSI Consultas specializes in database lookup solutions, information analysis, and services related to debt collection and credit recovery.</p>
      <p>My work began with social media management and digital communication materials. During this period, the company began repositioning its brand, creating an opportunity for me to expand my involvement and develop its new visual identity.</p>
      <p>The challenge was to <strong>modernize the brand and build a more consistent, professional visual language</strong> aligned with the company's sector. The client's main requirement was to retain red as the corporate color, ensuring continuity and brand recognition.</p>
    </> : <>
      <p>A KSI Consultas é uma empresa especializada em soluções de consulta a bancos de dados, análise de informações e serviços relacionados à cobrança e recuperação de crédito.</p>
      <p>Minha atuação começou com o gerenciamento das redes sociais e a criação de materiais de comunicação digital. Durante esse período, a empresa iniciou um processo de reposicionamento de marca, criando a oportunidade de ampliar minha participação no projeto e assumir o desenvolvimento de sua nova identidade visual.</p>
      <p>O desafio era <strong>modernizar a marca e construir uma comunicação visual mais consistente e profissional</strong>, alinhada ao segmento de atuação da empresa. A principal diretriz do cliente foi preservar o vermelho como cor institucional, garantindo continuidade e reconhecimento da marca.</p>
    </>}
    <div className="ksi-brand-process">
      <figure><img src={asset("ksi/Esboços KSI.png")} alt={english ? "KSI Consultas logo sketches and visual explorations" : "Esboços e explorações visuais do logotipo KSI Consultas"} loading="lazy" /></figure>
      <div>{english ? <>
        <p>With this direction in mind, I developed studies and visual explorations to redesign the logo, seeking a solution that balanced modernity, legibility and personality. The work also involved updating the visual identity and applying it across different communication materials.</p>
        <p>The project extended beyond creating graphic pieces, involving decisions about brand identity, visual consistency, and adapting communication to the needs of the business.</p>
      </> : <>
        <p>A partir dessa premissa, desenvolvi estudos e explorações visuais para a reformulação do logotipo, buscando uma solução que equilibrasse modernidade, legibilidade e personalidade. O trabalho também envolveu a atualização da identidade visual e sua aplicação em diferentes materiais de comunicação.</p>
        <p>O projeto representa uma atuação que foi além da criação de peças gráficas, envolvendo decisões de identidade de marca, consistência visual e adaptação da comunicação às necessidades do negócio.</p>
      </>}</div>
    </div>
  </>;
}

function OsPeriquitosStory({ language }: { language: Language }) {
  if (language === "en") return <>
    <p><strong>2023 | Editorial Illustration • Cover Design • Concept Art • Visual Storytelling</strong></p>
    <h3>About the project</h3>
    <p>Developed in partnership with writer and advertising professional <strong>Rodrigo Reis</strong>, <em>Os Periquitos</em> is an editorial illustration project created to commemorate the <strong>200th anniversary of Bahia’s Independence</strong>, celebrated on July 2, 2023.</p>
    <p>The project aimed to bring significant figures and events from the struggle for Bahia’s independence to life through digital illustration, honoring the state’s historical memory and cultural identity.</p>
    <h3>The creative challenge</h3>
    <p>The main challenge was to translate historical figures into expressive visual representations, balancing period references with a contemporary aesthetic that could engage different audiences.</p>
    <p>The figures portrayed include <strong>Maria Quitéria, Joana Angélica, Maria Felipa and members of the Periquitos Battalion</strong>, all central to the story of Bahia’s Independence.</p>
    <h3>Development and visual direction</h3>
    <p>I was responsible for <strong>creating the book’s cover and digital illustrations</strong>, developing the characters, their expressions, costumes, compositions and atmospheres.</p>
    <p>The visual approach explored vibrant colors, dramatic lighting, expressive brushwork and dynamic framing to convey the courage, resistance and intensity of these historical events.</p>
    <p>The cover’s palette of greens, yellows and warm tones reinforces the project’s visual identity, while the prominent characters establish an immediate connection with the book’s narrative world.</p>
    <h3>Outcome</h3>
    <p>The result is a collection of illustrations combining <strong>artistic expression, visual storytelling and historical references</strong>, contributing to a more immersive reading experience.</p>
    <p>Beyond depicting characters, the project demonstrates how editorial illustration can serve as a communication tool, bringing audiences closer to historical events and celebrating Brazilian culture.</p>
    <hr />
    <p><strong>My role:</strong> Digital illustration, cover design, character creation and characterization, visual composition, and development of a graphic language.</p>
    <p><strong>Client:</strong> Rodrigo Reis</p>
    <p><strong>Year:</strong> 2023</p>
  </>;
  return <>
    <p><strong>2023 | Ilustração Editorial • Design de Capa • Concept Art • Narrativa Visual</strong></p>
    <h3>Sobre o projeto</h3>
    <p>Desenvolvido em parceria com o escritor e publicitário <strong>Rodrigo Reis</strong>, <em>Os Periquitos</em> é um projeto de ilustração editorial criado em comemoração aos <strong>200 anos da Independência da Bahia</strong>, celebrados em 2 de julho de 2023.</p>
    <p>O projeto teve como objetivo dar vida, por meio da ilustração digital, a personagens e acontecimentos marcantes da luta pela independência baiana, valorizando a memória histórica e a identidade cultural do estado.</p>
    <h3>O desafio criativo</h3>
    <p>O principal desafio foi traduzir personagens históricos em representações visuais expressivas, equilibrando referências de época com uma estética contemporânea, capaz de despertar o interesse de diferentes públicos.</p>
    <p>Entre as figuras retratadas estão <strong>Maria Quitéria, Joana Angélica, Maria Felipa e os integrantes do Batalhão dos Periquitos</strong>, personagens fundamentais para a construção da narrativa sobre a Independência da Bahia.</p>
    <h3>Desenvolvimento e direção visual</h3>
    <p>Fui responsável pela <strong>criação da capa e das ilustrações digitais do livro</strong>, trabalhando a caracterização dos personagens, suas expressões, figurinos, composições e atmosferas.</p>
    <p>A abordagem visual explorou cores vibrantes, iluminação dramática, pinceladas expressivas e enquadramentos dinâmicos, buscando transmitir a coragem, a resistência e a intensidade dos acontecimentos históricos.</p>
    <p>Na composição da capa, a escolha de uma paleta marcada por verdes, amarelos e tons quentes reforça a identidade visual do projeto, enquanto o protagonismo dos personagens estabelece uma conexão imediata com o universo narrativo da obra.</p>
    <h3>Resultado</h3>
    <p>O resultado é uma coleção de ilustrações que combina <strong>expressividade artística, storytelling visual e referências históricas</strong>, contribuindo para uma experiência de leitura mais imersiva.</p>
    <p>Mais do que representar personagens, o projeto demonstra como a ilustração editorial pode atuar como uma ferramenta de comunicação, aproximando o público de acontecimentos históricos e valorizando a cultura brasileira.</p>
    <hr />
    <p><strong>Minha atuação:</strong> Ilustração digital, design de capa, criação e caracterização de personagens, composição visual e desenvolvimento de linguagem gráfica.</p>
    <p><strong>Cliente:</strong> Rodrigo Reis</p>
    <p><strong>Ano:</strong> 2023</p>
  </>;
}

const cases: Record<Language, CaseProject[]> = {
  pt: [
    {
      slug: "glitchcast",
      title: "Glitchcast",
      year: "2021",
      intro: "Identidade visual, conteúdo e aplicativo para o podcast do grupo Glitch404.",
      labels: ["Identidade visual", "Branding", "Mídias sociais", "Ilustrações", "Aplicativo"],
      sections: [
        { id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Identidade desenvolvida para o podcast Glitchcast, com símbolo, lettering, paleta vibrante e variações para diferentes fundos.", media: [{ src: asset("glitchcast/glitchcasthood.png"), alt: "Identidade visual do Glitchcast" }, { src: asset("glitchcast/Projeto Glitchcast1.png"), alt: "Identidade visual do Glitchcast" }, { src: asset("glitchcast/Projeto Glitchcast2.png"), alt: "Identidade visual do Glitchcast" }] },
        { id: "branding", label: "Branding", title: "Branding", text: "O sistema de marca organiza os elementos visuais do Glitchcast e cria reconhecimento em diferentes pontos de contato.", media: [{ src: asset("glitchcast/Projeto Glitchcast4.png"), alt: "Aplicações da identidade Glitchcast em produtos" }] },
        { id: "midias-sociais", label: "Mídias sociais", title: "Mídias sociais", text: "Peças de comunicação para episódios, conteúdos e divulgação do podcast nas redes sociais.", media: [{ src: asset("glitchcast/Projeto Glitchcast3.png"), alt: "Peças de mídias sociais do Glitchcast" }] },
        { id: "ilustracoes", label: "Ilustrações", title: "Ilustrações e key visuals", text: "Exploração dos elementos principais da identidade em composições que apresentam o universo visual do podcast." },
        { id: "aplicativo", label: "Aplicativo", title: "Aplicativo Glitchcast", text: "Conceito de aplicativo de podcast que traduz a identidade visual para uma experiência digital de escuta, descoberta e comunidade." },
      ],
      cta: { label: "Ver estudo completo do aplicativo →", href: "/projetos/ux/glitchcast-app" },
    },
    {
      slug: "bogused",
      title: "Bogused",
      year: "2020",
      intro: "Direção visual de jogo, interface e produção de assets para personagens e cenários.",
      labels: ["Branding", "Interface", "Personagens", "Cenários"],
      sections: [
        { id: "branding", label: "Branding", title: "Direção visual", text: "Bogused é um projeto de jogo com uma direção visual própria, construída a partir de uma atmosfera sombria e personagens expressivos.", media: [{ src: asset("bogused/direçãodearte.jpg"), alt: "Direção de arte do jogo Bogused" }] },
        { id: "interface", label: "Interface", title: "Interface do jogo", text: "Tela de seleção que organiza os personagens e traduz a narrativa de Bogused em uma experiência visual de jogo.", media: [{ src: asset("bogused/bogused interface.png"), alt: "Interface do jogo Bogused" }] },
        { id: "personagens", label: "Personagens", title: "Design de personagens", text: "Estudos de personagens desenvolvidos para dar personalidade e coerência ao universo do jogo.", media: [] },
        { id: "cenarios", label: "Cenários", title: "Design de cenários", text: "Elementos e ilustrações de cenário que constroem a atmosfera do jogo.", media: [{ src: asset("bogused/bogusedcenariosepia 1.png"), alt: "Cenário do jogo Bogused" }] },
      ],
    },
    {
      slug: "museus",
      title: "Projeto Museus",
      year: "2025",
      intro: "Primeiro grande projeto de UX Design da designer — desenvolvido como catálogo cultural para os Museus da Cidade de Salvador.",
      labels: ["UX Design", "Pesquisa e arquitetura", "UI Design", "Mockup de alta fidelidade", "Aplicação em tamanho real"],
      sections: [
        { id: "ux-design", label: "UX Design", title: "Experiência e jornada", text: "", content: <><p>Mais do que indicar museus, exposições, obras e artistas, o projeto busca facilitar o acesso à cultura e ao patrimônio histórico de Salvador.</p><p>Para compreender os diferentes contextos de visitação, foram desenvolvidas sete personas hipotéticas, representando públicos com necessidades, interesses e condições de acesso distintos.</p><p>O mapeamento de suas jornadas permitiu explorar dificuldades relacionadas à descoberta de espaços culturais, ao planejamento das visitas, à mobilidade e à acessibilidade.</p><p>A partir dessa análise, foram identificadas oportunidades para tornar a experiência cultural mais simples, inclusiva e acessível.</p></>, carousel: true, media: [{ src: asset("museus/jornada-dona-lucia.png"), alt: "Jornada cultural da persona Dona Lúcia" }, { src: asset("museus/jornada-rafael-santos.png"), alt: "Jornada cultural da persona Rafael Santos" }, { src: asset("museus/jornada-juliana-santos.png"), alt: "Jornada da persona Juliana Santos" }, { src: asset("museus/jornada-camila-ferreira.png"), alt: "Jornada de acessibilidade da persona Camila Ferreira" }, { src: asset("museus/jornada-marcos-almeida.png"), alt: "Mapa da jornada da persona Marcos Almeida" }], insightGroups: [{ eyebrow: "Principais dores", title: "O que as jornadas revelaram?", intro: "A análise das jornadas dos sete perfis de usuários mostrou desafios recorrentes que dificultam o acesso e a experiência nos museus de Salvador.", items: [{ title: "Informações dispersas", text: "Os usuários precisam consultar diferentes fontes para encontrar dados sobre museus, horários, ingressos e exposições." }, { title: "Planejamento da visita", text: "Há insegurança sobre transporte, tempo de deslocamento, custos e como organizar roteiros de acordo com o interesse e a disponibilidade." }, { title: "Acessibilidade e inclusão", text: "Faltam informações claras sobre acessibilidade física, sensorial e comunicacional, o que limita a autonomia de parte dos visitantes." }, { title: "Atividades e conteúdos", text: "É difícil encontrar informações sobre exposições, eventos e atividades educativas adequadas a diferentes interesses e faixas etárias." }, { title: "Custos e benefícios", text: "Os usuários têm dúvidas sobre valores, gratuidade, meia-entrada e benefícios para estudantes, professores e grupos." }, { title: "Orientação no local", text: "Há dificuldade para encontrar informações sobre a estrutura do museu, como serviços, banheiros, áreas de descanso e sinalização interna." }, { title: "Descoberta e relevância", text: "Os usuários sentem falta de recomendações personalizadas e de um canal para acompanhar novas exposições e eventos." }, { title: "Registro e compartilhamento", text: "Muitos usuários gostariam de salvar suas visitas, criar listas de favoritos e compartilhar experiências, mas não encontram esses recursos de forma simples." }] }, { eyebrow: "Possibilidades para o app", title: "Como o app pode ajudar?", intro: "A partir das necessidades e dificuldades identificadas nas jornadas dos sete perfis de usuários, foram definidas oportunidades para orientar as funcionalidades do aplicativo.", items: [{ title: "Informações centralizadas", text: "Reunir em um único lugar dados confiáveis sobre museus, exposições, horários, ingressos e serviços." }, { title: "Planejamento da visita", text: "Oferecer mapas, rotas de transporte público, tempo de deslocamento e sugestões de roteiros de acordo com o interesse e a disponibilidade do usuário." }, { title: "Acessibilidade detalhada", text: "Disponibilizar informações claras sobre acessibilidade física, sensorial e comunicacional, ajudando o usuário a planejar sua visita com autonomia e segurança." }, { title: "Exposições e eventos atualizados", text: "Divulgar a programação de exposições, eventos, oficinas e atividades educativas, com filtros por tema, faixa etária e tipo de atividade." }, { title: "Filtros de ingresso e benefícios", text: "Indicar valores, gratuidade, meia-entrada e benefícios para estudantes, professores, grupos e outros públicos específicos." }, { title: "Informações sobre a estrutura do museu", text: "Apresentar detalhes sobre banheiros, áreas de descanso, alimentação, guarda-volumes e outros serviços, facilitando a orientação no local." }, { title: "Recomendações personalizadas", text: "Sugerir museus, exposições e roteiros de acordo com os interesses do usuário, como história, arte contemporânea, atividades para crianças ou eventos gratuitos." }, { title: "Favoritos e compartilhamento", text: "Permitir salvar museus e eventos de interesse, criar listas de visitas e compartilhar recomendações com amigos, familiares ou grupos da escola ou faculdade." }] }] },
        { id: "pesquisa", label: "Pesquisa", title: "Pesquisa e arquitetura", text: "", content: <><p>A análise exploratória das jornadas revelou a necessidade de centralizar informações culturais e simplificar o acesso a conteúdos relevantes para diferentes perfis de visitantes.</p><p>Com base nessas necessidades, foram propostas categorias e caminhos de navegação que conectam museus, exposições, obras, artistas e atividades culturais.</p><p>A arquitetura da informação foi pensada para facilitar a descoberta de conteúdos, a consulta de informações práticas e o planejamento de visitas.</p><p>O objetivo é permitir que cada usuário encontre o que procura de maneira intuitiva, independentemente de sua familiaridade com a cidade ou com os espaços culturais.</p></>, media: [{ src: asset("museus/Digitalizado_20250208-1607.jpg"), alt: "Visão geral do projeto Museus" }] },
        { id: "ui-design", label: "UI Design", title: "Fluxos e telas", text: "Uma interface editorial para percorrer conteúdos culturais com clareza.", media: [{ src: asset("museus/2-Homepage.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/2.1 Menu.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/3-Obras de arte.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/11-Agenda.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/1-Cadastro.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/1.3 - Cadastro.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/9-Lista de Artistas.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/7-Lista de Exposições.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/8-Lista de Museus.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/10-Lista de Obras.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/4-Sobre o artista.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/5-Sobre a exposição.png"), alt: "Tela do aplicativo Museus" }, { src: asset("museus/6-Sobre o museu.png"), alt: "Tela do aplicativo Museus" }] },
        { id: "mockup-alta-fidelidade", label: "Alta fidelidade", title: "Mockup de alta fidelidade", text: "Telas em alta fidelidade do aplicativo Museus, com cores, imagens e detalhes da interface.", media: getMuseumsMockups("pt") },
        { id: "mockup-tamanho-real", label: "Aplicação em tamanho real", title: "Mockups em tamanho real", text: "Visualização ampliada das principais telas do aplicativo Museus.", media: [{ src: asset("museus/mockups-museus-tamanho-real.png"), alt: "Cinco telas do aplicativo Museus apresentadas em mockups de smartphones" }] },
      ],
    },
    {
      slug: "ksi-consultas",
      title: "KSI Consultas",
      year: "2018–2021",
      intro: "Construção de marca, papelaria e gerenciamento de mídias sociais para uma empresa de consultas especializadas.",
      labels: ["Branding", "Papelaria", "Mídias sociais"],
      sections: [{ id: "branding", label: "Branding", title: "Identidade de marca", text: "", content: <KsiBrandStory language="pt" />, media: [{ src: asset("ksi/ksilogo1.png"), alt: "Identidade de marca e aplicação do logotipo KSI Consultas" }, { src: asset("ksi/ksilogo2.png"), alt: "Identidade de marca e aplicação do logotipo KSI Consultas" }] }, { id: "papelaria", label: "Papelaria", title: "Papelaria", text: "Aplicações da identidade nos materiais de comunicação da empresa.", media: [{ src: asset("ksi/KSI Consultas pasta corporativa.png"), alt: "Papelaria e materiais corporativos da KSI Consultas" }, { src: asset("ksi/KSI Consultas timbrado.png"), alt: "Papelaria e materiais corporativos da KSI Consultas" }, { src: asset("ksi/Crachás corporativos KSI Consultas em vermelho.png"), alt: "Papelaria e materiais corporativos da KSI Consultas" }] }, { id: "midias-sociais", label: "Mídias sociais", title: "Conteúdo para redes sociais", text: "Criação e gestão de conteúdo para aproximar a marca do público.", media: [{ src: asset("ksi/landing page.jpg"), alt: "Material de comunicação da KSI Consultas" }, { src: asset("ksi/ksi-midiassociais.png"), alt: "Material de comunicação da KSI Consultas" }, { src: asset("ksi/ksiposdestaq.jpg"), alt: "Material de comunicação da KSI Consultas" }, { src: asset("ksi/ksiposdestaq2.jpg"), alt: "Material de comunicação da KSI Consultas" }, { src: asset("ksi/ksipost.png"), alt: "Material de comunicação da KSI Consultas" }, { src: asset("ksi/ksiposts.png"), alt: "Material de comunicação da KSI Consultas" }] }],
    },
    {
      slug: "in9-midia",
      title: "In9 Mídia",
      year: "2014 — atualmente",
      intro: "Atuação contínua desde 2014 em design gráfico e UI na In9 Mídia, conectando a identidade da empresa às soluções de sinalização digital, produtos, campanhas e comunicação com clientes.",
      labels: ["Identidade e mascotes", "Apresentações e soluções", "Templates do sistema", "Conteúdos e formatos", "Lançamentos: produtos e aplicativos", "Lançamentos: templates DOOH", "Campanhas e eventos", "Vídeos"],
      sections: [
        { id: "identidade-e-mascotes", label: "Identidade e mascotes", title: "Identidade visual e personagens da marca", text: "Materiais da identidade visual da In9 Mídia e desenvolvimento dos mascotes Ivo e Ivone.", media: [{ src: asset("in9/guia-completo-portfolio.jpg"), alt: "Guia de identidade visual da In9 Mídia com logotipos, paletas, tipografia e aplicações dos mascotes" }, { src: asset("in9/avatars1.jpg"), alt: "Estudos de poses dos mascotes Ivo e Ivone" }, { src: asset("in9/avatars2.jpg"), alt: "Apresentação dos mascotes Ivo e Ivone" }] },
        { id: "apresentacoes-e-solucoes", label: "Apresentações e soluções", title: "Materiais institucionais e soluções", text: "Apresentações da empresa e de suas soluções de sinalização digital, incluindo Video Wall e SGA.", media: [{ src: asset("in9/in9diagramas.png"), alt: "Diagrama das soluções e do fluxo de sinalização digital da In9 Mídia" }, { src: asset("in9/in9midiakit.png"), alt: "Mídia kit com apresentação das soluções digitais da In9 Mídia" }, { src: asset("in9/in9panfletos.png"), alt: "Panfletos institucionais da In9 Mídia" }, { src: asset("in9/mockup-caderno-in9midia.png"), alt: "Caderno institucional com identidade da In9 Mídia" }, { src: asset("in9/mockup-caderno-video-wall-v2.png"), alt: "Material de apresentação do Video Wall" }, { src: asset("in9/sga-lojas-portfolio-v2.png"), alt: "Apresentação do sistema SGA para lojas" }, { src: asset("in9/video-wall-portfolio-grade.png"), alt: "Apresentação do produto Video Wall" }] },
        { id: "templates-do-sistema", label: "Templates do sistema", title: "Modelos para os sistemas In9", text: "Templates e interfaces de cardápio digital e sinalização, organizados conforme a pasta institucional do projeto.", media: [{ src: asset("in9/burgertown-cardapios-portfolio.png"), alt: "Aplicações de cardápio digital para o produto BurgerTown" }, { src: asset("in9/templatesin9.png"), alt: "Coleção de templates de conteúdo para sinalização digital" }, { src: asset("in9/templatesin92.png"), alt: "Variações de templates para telas de sinalização digital" }, { src: asset("in9/templatesin93.png"), alt: "Novos modelos de templates para sinalização digital" }, { src: asset("in9/Mockup de Monitores com Clima e Finanças (1).png"), alt: "Templates informativos de clima e finanças exibidos em monitores" }, { src: asset("in9/Mockup de Telas Meteorológicas e Notícias.png"), alt: "Templates de notícias e informações meteorológicas para telas" }] },
        { id: "conteudos-e-formatos", label: "Conteúdos e formatos", title: "Conteúdos para redes sociais", text: "Peças e formatos digitais que apresentam produtos, serviços e novidades da In9 Mídia.", media: [{ src: asset("in9/carrossel-grade.jpg"), alt: "Carrossel de conteúdo para redes sociais" }, { src: asset("in9/in9posts.png"), alt: "Publicações para redes sociais da In9 Mídia" }, { src: asset("in9/in9posts2.png"), alt: "Variações de publicações para redes sociais da In9 Mídia" }, { src: asset("in9/postsmidiadooh.jpg"), alt: "Publicações sobre mídia DOOH" }, { src: asset("in9/solucoes-in9-grade.jpg"), alt: "Conteúdo sobre soluções da In9 Mídia para canais digitais" }] },
        { id: "lancamentos-produtos", label: "Lançamentos: produtos e aplicativos", title: "Lançamentos de produtos e aplicativos", text: "Materiais de lançamento do NeoNews Studio e de soluções digitais para diferentes negócios.", media: [{ src: asset("in9/neonews-prototipo-portfolio.jpg"), alt: "Protótipo do aplicativo NeoNews Studio em dispositivos móveis" }] },
        { id: "lancamentos-templates-dooh", label: "Lançamentos: templates DOOH", title: "Lançamentos de templates DOOH", text: "Peças de lançamento de templates esportivos e sazonais para telas de sinalização digital.", media: [{ src: asset("in9/copa-2022-portfolio.jpg"), alt: "Apresentação de templates de campeonato para sinalização digital" }, { src: asset("in9/copam.png"), alt: "Templates de placar e classificação da Copa América 2024" }, { src: asset("in9/copamail.png"), alt: "Peças de lançamento dos templates da Copa América" }, { src: asset("in9/eurocop.png"), alt: "Templates de jogos e classificação da Eurocopa 2024" }, { src: asset("in9/groupcamp.png"), alt: "Composição de templates para campanhas esportivas" }, { src: asset("in9/Prancheta 1.png"), alt: "Estudo de templates para sinalização digital" }, { src: asset("in9/Prancheta 5.png"), alt: "Variação de templates para sinalização digital" }, { src: asset("in9/Prancheta 6.png"), alt: "Variação de templates para sinalização digital" }] },
        { id: "campanhas-eventos", label: "Campanhas e eventos", title: "Campanhas, anúncios e datas especiais", text: "Campanhas de divulgação, anúncios e conteúdos sazonais para promover produtos e conversar com diferentes públicos em canais digitais.", media: [{ src: asset("in9/apresentacao_portfolio_ads_banner.png"), alt: "Apresentação de campanhas e formatos de anúncios da In9 Mídia" }, { src: asset("in9/Mockup de Black Friday no Instagram e Laptop.png"), alt: "Campanha de Black Friday aplicada no Instagram e em um notebook" }, { src: asset("in9/portfolio_ads.png"), alt: "Peças de anúncios digitais criadas para a In9 Mídia" }, { src: asset("in9/campanhas.jpg"), alt: "Campanha promocional da In9 Mídia" }, { src: asset("in9/copa-2022-portfolio.png"), alt: "Campanha de comunicação relacionada à Copa do Mundo" }, { src: asset("in9/datas1.jpg"), alt: "Campanha para data comemorativa" }] },
        { id: "videos", label: "Vídeos", title: "Vídeos de produtos e comunicação", text: "Vídeos de apresentação e divulgação das soluções, dos produtos e dos serviços da In9 Mídia.", videos: [{ src: asset("in9/In9midiaMkt.mp4"), title: "Apresentação institucional da In9 Mídia" }, { src: asset("in9/novoneonews.mp4"), title: "Apresentação do NeoNews Studio" }, { src: asset("in9/in9sga.mp4"), title: "Apresentação do sistema SGA" }, { src: asset("in9/menuboards.mp4"), title: "Apresentação de cardápios digitais" }, { src: asset("in9/covid19vid (1).mp4"), title: "Campanha de orientação sobre a COVID-19" }, { src: asset("in9/webinar.mp4"), title: "Webinar da In9 Mídia" }] },
      ],
    },
    {
      slug: "os-periquitos",
      title: "Os Periquitos",
      year: "2023",
      intro: "Ilustração editorial e literatura histórica em comemoração aos 200 anos da Independência da Bahia.",
      labels: ["Apresentação"],
      sections: [{ id: "identidade-visual", label: "Apresentação", title: "Os Periquitos — Ilustração Editorial e Literatura Histórica", text: "", content: <OsPeriquitosStory language="pt" />, media: [{ src: asset("osperiquitos/5093963279465385104.jpg"), alt: "Projeto Os Periquitos" }, { src: asset("osperiquitos/5093963279465385127.jpg"), alt: "Projeto Os Periquitos" }, { src: asset("osperiquitos/5093963279465385128.jpg"), alt: "Projeto Os Periquitos" }, { src: asset("osperiquitos/5093963279465385129.jpg"), alt: "Projeto Os Periquitos" }] }],
    },
    {
      slug: "rosalune",
      title: "Rosalune",
      year: "2023",
      intro: "Projeto de UX para um site de loja de moda alternativa.",
      labels: ["UX Design", "Pesquisa", "UI Design"],
      sections: [{ id: "ux-design", label: "UX Design", title: "Experiência do site", text: "Projeto de UX que organiza a navegação e a apresentação de produtos de uma loja de moda alternativa.", media: [{ src: asset("rosalune/4936291903289273529.jpg"), alt: "Projeto Rosalune" }, { src: asset("rosalune/4936291903289273530.jpg"), alt: "Projeto Rosalune" }, { src: asset("rosalune/4936291903289273531.jpg"), alt: "Projeto Rosalune" }, { src: asset("rosalune/4936291903289273532.jpg"), alt: "Projeto Rosalune" }] }],
    },
    {
      slug: "recomendaria",
      title: "Recomendaria",
      year: "2019",
      intro: "Naming e identidade para uma plataforma de indicações entre profissionais, do logotipo ao aplicativo.",
      labels: ["Branding", "Naming"],
      sections: [{ id: "branding", label: "Branding", title: "Identidade visual", text: "Desenvolvimento de uma marca para uma plataforma baseada em confiança e indicação profissional.", media: [{ src: asset("recomendaria/recomendaria logo.jpg"), alt: "Aplicação da identidade Recomendaria" }, { src: asset("recomendaria/recomendaria logo completa.jpg"), alt: "Aplicação da identidade Recomendaria" }, { src: asset("recomendaria/recomendaria.jpg"), alt: "Aplicação da identidade Recomendaria" }] }, { id: "naming", label: "Naming", title: "Naming", text: "Nome pensado para comunicar recomendação, proximidade e credibilidade." }],
    },
    {
      slug: "sempre-vitta",
      title: "Sempre Vitta",
      year: "2017",
      intro: "Identidade visual para uma marca ligada à natureza, ao cuidado e à vitalidade.",
      labels: ["Identidade visual"],
      sections: [{ id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Construção de uma linguagem orgânica e acolhedora para Sempre Vitta, apresentada a partir da relação entre natureza, cuidado e vitalidade.", media: [{ src: asset("sempre-vitta/semprevittalogo1.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevittalogo2.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevittapost1.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevittapost2.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevittapost3.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevittapost4.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevitta-t-shirt.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevitta-tote-bag.png"), alt: "Identidade visual Sempre Vitta" }, { src: asset("sempre-vitta/semprevitta-bag-of-gojiberries.png"), alt: "Identidade visual Sempre Vitta" }] }],
    },
    {
      slug: "lcr-marcenaria",
      title: "LCR Marcenaria",
      year: "2018",
      intro: "Marca e sinalização de oficina para uma marcenaria artesanal, inspirada nas texturas da madeira bruta.",
      labels: ["Identidade visual"],
      sections: [{ id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Marca desenvolvida para a LCR Marcenaria, combinando as iniciais do nome com uma presença direta e artesanal.", media: [{ src: asset("lcr/lcrlogo.png"), alt: "Identidade e aplicações da LCR Marcenaria" }, { src: asset("lcr/lcrcores.png"), alt: "Identidade e aplicações da LCR Marcenaria" }, { src: asset("lcr/lecrlogovariantes.png"), alt: "Identidade e aplicações da LCR Marcenaria" }, { src: asset("lcr/lcraplicações.png"), alt: "Identidade e aplicações da LCR Marcenaria" }, { src: asset("lcr/Dad hat mockup of close up shot of model wearing white hat.png"), alt: "Identidade e aplicações da LCR Marcenaria" }, { src: asset("lcr/Nova conversa.png"), alt: "Identidade e aplicações da LCR Marcenaria" }] }],
    },
    {
      slug: "lilaz",
      title: "Lilaz",
      year: "2018",
      intro: "Identidade e embalagens para um pequeno negócio de decorações personalizadas.",
      labels: ["Identidade visual", "Embalagem"],
      sections: [{ id: "identidade-visual", label: "Identidade visual", title: "Identidade visual", text: "Uma identidade delicada e reconhecível para um negócio de decorações personalizadas.", media: [{ src: asset("lilaz/lilazcaderno.png"), alt: "Aplicação da identidade visual Lilaz" }, { src: asset("lilaz/lilazsacola.png"), alt: "Aplicação da identidade visual Lilaz" }, { src: asset("lilaz/lilazxicra.png"), alt: "Aplicação da identidade visual Lilaz" }] }, { id: "embalagem", label: "Embalagem", title: "Embalagem", text: "Aplicações pensadas para levar a identidade ao momento de entrega e experiência do produto." }],
    },
    {
      slug: "e-ai-man-jogo",
      title: "E aí man jogo",
      year: "2020",
      intro: "Jogo 2D de aventura, plataforma e puzzle com narrativa sobre amizade e pertencimento.",
      labels: ["Game Design", "Level Design", "Assets", "Telas de jogo", "Arte conceitual", "Gameplay"],
      sections: [
        { id: "game-design", label: "Game Design", title: "E aí Man — Game Design", text: "", content: <><p><strong>Gênero:</strong> Aventura, plataforma 2D e puzzle<br /><strong>Ano:</strong> 2020<br /><strong>Categoria:</strong> Game Design, Game Art e Design de Personagens</p><p><em>E aí Man</em> é um jogo de aventura e plataforma 2D que acompanha Luketa, um garoto de 12 anos que parte em busca de seu melhor amigo desaparecido durante uma gincana na comunidade onde vivem.</p><p>Ambientado em uma comunidade brasileira, o jogo combina exploração, combate e resolução de puzzles em fases inspiradas no cotidiano urbano. Ao longo da jornada, o jogador enfrenta equipes rivais, coleta itens, supera obstáculos e utiliza materiais recicláveis para criar e aprimorar equipamentos.</p><p>O projeto contempla a construção da narrativa, a concepção de personagens e cenários, o planejamento das mecânicas de gameplay, a progressão de dificuldade e a estruturação das interfaces e dos fluxos de jogo. A direção visual busca representar a identidade cultural dos ambientes e personagens por meio de uma estética 2D inspirada na cultura urbana, no hip-hop e nas relações de amizade.</p><p><strong>Minha contribuição:</strong> desenvolvimento conceitual e visual do jogo, com foco em Game Design, Game Art, criação de personagens e ambientação, conforme as etapas desenvolvidas no projeto.</p><p><strong>Ferramenta:</strong> Construct 2.</p><p><em>Projeto desenvolvido em colaboração com Geisa França e Tiana Duarte.</em></p></> },
        { id: "level-design", label: "Level Design", title: "Level Design", text: "Fases e mapas que estruturam a exploração e a progressão do jogo.", media: [{ src: asset("eaiman/leveldesign.jpg"), alt: "Visão geral do level design de E aí Man" }, { src: asset("eaiman/level1.png"), alt: "Level design do jogo E aí Man" }, { src: asset("eaiman/level2.png"), alt: "Level design do jogo E aí Man" }, { src: asset("eaiman/level3.png"), alt: "Level design do jogo E aí Man" }] },
        { id: "assets", label: "Assets", title: "Assets do jogo", text: "Assets de personagens e elementos visuais preparados para o gameplay.", media: [{ src: asset("eaiman/assets-player.jpg"), alt: "Asset do jogo E aí Man" }, { src: asset("eaiman/assets-enemy1.jpg"), alt: "Asset do jogo E aí Man" }, { src: asset("eaiman/assets-enemy2.jpg"), alt: "Asset do jogo E aí Man" }, { src: asset("eaiman/assets4.jpg"), alt: "Asset do jogo E aí Man" }] },
        { id: "telas-de-jogo", label: "Telas de jogo", title: "Telas de jogo", text: "Interfaces e telas do jogo, incluindo HUD, início, conquistas e créditos.", media: [{ src: asset("eaiman/HUD_GAMEPLAY.png"), alt: "Tela de gameplay em alta resolução do jogo E aí Man" }, { src: asset("eaiman/hud gameplyapc.jpg"), alt: "Tela do jogo E aí Man" }, { src: asset("eaiman/HUD_GAMEPLAYmobile.png"), alt: "Tela do jogo E aí Man" }, { src: asset("eaiman/telainicio.png"), alt: "Tela do jogo E aí Man" }, { src: asset("eaiman/tela2.png"), alt: "Tela do jogo E aí Man" }, { src: asset("eaiman/telaachievments.png"), alt: "Tela do jogo E aí Man" }, { src: asset("eaiman/telacreditos.png"), alt: "Tela do jogo E aí Man" }] },
        { id: "arte-conceitual", label: "Arte conceitual", title: "Arte conceitual", text: "Estudos visuais de personagens e do universo do jogo.", media: [{ src: asset("eaiman/conceito-player.png"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/conceeito2-enemy1.png"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/conceito3-enemy2.png"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/conceito4.png"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/5093963279465385166.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/5186085272784317298.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/eaiman-grupo.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/eaiman-jana.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/eaiman-juca.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/eaiman-lea.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/eaiman-luketa.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }, { src: asset("eaiman/eaiman-tuca.jpg"), alt: "Arte conceitual de personagem do jogo E aí Man" }] },
        { id: "gameplay", label: "Gameplay", title: "Vídeos de gameplay", text: "Pré-visualizações do jogo executadas no Construct 2.", videos: [{ src: asset("eaiman/E ai Man (Construct 2 preview) 02_12_2016 14_47_09 (1).mp4"), title: "E aí Man — Gameplay 1" }, { src: asset("eaiman/E ai Man (Construct 2 preview) 03_12_2016 12_54_09.mp4"), title: "E aí Man — Gameplay 2" }] },
      ],
    },
  ],
  en: [],
};

type CaseSectionCopy = Pick<CaseSection, "label" | "title" | "text"> & Partial<Pick<CaseSection, "id" | "content" | "insightGroups">>;

const englishCopy: Record<string, { intro: string; sections: CaseSectionCopy[] }> = {
  glitchcast: { intro: "Visual identity, content and app concept for the Glitch404 group podcast.", sections: [{ label: "Visual identity", title: "Visual identity", text: "Identity developed for the Glitchcast podcast, with symbol, lettering, vibrant palette and variations for different backgrounds." }, { label: "Branding", title: "Branding", text: "The brand system organizes Glitchcast's visual elements and creates recognition across different touchpoints." }, { label: "Social media", title: "Social media", text: "Communication pieces for episodes, content and podcast promotion across social platforms." }, { label: "Illustrations", title: "Illustrations and key visuals", text: "Exploration of the identity's main elements in compositions that present the podcast's visual universe." }, { label: "App", title: "Glitchcast app", text: "Podcast app concept translating the visual identity into a digital listening, discovery and community experience." }] },
  bogused: { intro: "Game art direction, interface and visual asset production for characters and environments.", sections: [{ label: "Branding", title: "Visual direction", text: "Bogused is a game project with its own visual direction, built from a dark atmosphere and expressive characters." }, { label: "Interface", title: "Game interface", text: "A selection screen that organizes the characters and translates Bogused's narrative into a game experience." },  { label: "Characters", title: "Character design", text: "Character studies developed to give personality and coherence to the game universe." }, { label: "Environments", title: "Environment design", text: "Environment elements and illustrations that build the game's atmosphere." }] },
  museus: { intro: "First major UX Design project — developed as a cultural catalogue app for the Museums of Salvador.", sections: [{ label: "UX Design", title: "Experience and journey", text: "An app designed to bring museums, exhibitions, artworks and artists together in a cultural discovery experience." }, { label: "Research", title: "Research and architecture", text: "Content and flow organization to make it easier to discover museums, exhibitions, artworks and artists." }, { label: "UI Design", title: "Flows and screens", text: "An editorial interface for navigating cultural content with clarity." }, { label: "High fidelity", title: "High-fidelity mockups", text: "High-fidelity screens of the Museums app, showing colors, imagery and interface details." }] },
  "ksi-consultas": { intro: "Brand identity, stationery and social media management for a database lookup and credit recovery company.", sections: [{ id: "branding", label: "Branding", title: "Brand identity", text: "", content: <KsiBrandStory language="en" /> }, { id: "papelaria", label: "Stationery", title: "Stationery", text: "Identity applications across the company communication materials." }, { id: "midias-sociais", label: "Social media", title: "Social media content", text: "Content creation and management to bring the brand closer to its audience." }] },
  "in9-midia": { intro: "Ongoing work since 2014 in graphic and UI design at In9 Mídia, connecting the company identity with digital signage solutions, products, campaigns and customer communications.", sections: [{ id: "institucional", label: "Company identity", title: "Identity, mascots and brand presentation", text: "Materials presenting In9 Mídia's visual identity, mascots and the solutions offered by the company." }, { id: "produtos-aplicativos", label: "Products and apps", title: "Digital experiences for different businesses", text: "Product presentations from In9 Mídia, including the NeoNews Studio app, a store management system and digital menu solutions." }, { id: "templates-dooh", label: "DOOH templates", title: "Templates for digital signage", text: "Layouts for news, scoreboards, offers and other content displayed on digital screens, adapted to the DOOH format." }, { id: "redes-sociais", label: "Social media", title: "Social media content", text: "Content pieces and digital formats presenting In9 Mídia products, services and news." }, { id: "campanhas-eventos", label: "Campaigns and events", title: "Campaigns, ads and special dates", text: "Promotional campaigns, ads and seasonal content for products and audiences across digital channels." }, { id: "videos", label: "Videos", title: "Product and communication videos", text: "Videos introducing and promoting In9 Mídia solutions, products and services." }] },
  rosalune: { intro: "UX project for an alternative fashion store website.", sections: [{ label: "UX Design", title: "Website experience", text: "A UX project shaping navigation and product presentation for an alternative fashion store." }] },
  "os-periquitos": { intro: "Editorial illustration and historical literature commemorating the 200th anniversary of Bahia’s Independence.", sections: [{ label: "Presentation", title: "Os Periquitos — Editorial Illustration and Historical Literature", text: "", content: <OsPeriquitosStory language="en" /> }] },
  recomendaria: { intro: "Naming and identity for a professional referral platform, from logo to app.", sections: [{ id: "branding", label: "Branding", title: "Brand identity", text: "Building a brand for a platform based on professional trust and referrals." }, { id: "naming", label: "Naming", title: "Naming", text: "A name designed to communicate recommendation, closeness and credibility." }] },
  "sempre-vitta": { intro: "Visual identity for a brand connected to nature, care and vitality.", sections: [{ label: "Visual identity", title: "Visual identity", text: "An organic and welcoming visual language for Sempre Vitta, built around the relationship between nature, care and vitality." }] },
  "lcr-marcenaria": { intro: "Brand identity and workshop signage inspired by raw wood textures.", sections: [{ label: "Visual identity", title: "Visual identity", text: "Identity developed for LCR Marcenaria, combining the initials of the name with a direct, handcrafted presence." }] },
  lilaz: { intro: "Identity and packaging for a small custom decoration business.", sections: [{ label: "Visual identity", title: "Visual identity", text: "A delicate and recognizable identity for a custom decoration business." }, { label: "Packaging", title: "Packaging", text: "Applications designed to carry the identity into the delivery and product experience." }] },
  "e-ai-man-jogo": { intro: "A 2D adventure platformer and puzzle game about friendship and belonging.", sections: [{ label: "Game Design", title: "E aí Man — Game Design", text: "", content: <><p><strong>Genre:</strong> 2D adventure platformer and puzzle game<br /><strong>Year:</strong> 2020<br /><strong>Category:</strong> Game Design, Game Art and Character Design</p><p><em>E aí Man</em> is a 2D adventure platformer starring Luketa, a 12-year-old boy who sets out to find his best friend after he goes missing during a community field day.</p><p>Set in a Brazilian community, the game combines exploration, combat and puzzle-solving across levels inspired by everyday urban life. Along the way, players face rival teams, collect items, overcome obstacles, and use recyclable materials to craft and upgrade equipment.</p><p>The project brings together narrative development, character and environment design, gameplay mechanics, difficulty progression, and the structure of the game's interfaces and flows. Its visual direction represents the cultural identity of its settings and characters through a 2D aesthetic inspired by urban culture, hip-hop and friendship.</p><p><strong>My contribution:</strong> Conceptual and visual development of the game, with a focus on Game Design, Game Art, character creation and world-building, across the project's development stages.</p><p><strong>Tool:</strong> Construct 2.</p><p><em>Project developed in collaboration with Geisa França and Tiana Duarte.</em></p></> }, { label: "Level Design", title: "Level Design", text: "Levels and maps structure the game's exploration and progression." }, { label: "Assets", title: "Game assets", text: "Character and visual assets prepared for gameplay." }, { label: "Game screens", title: "Game screens", text: "Interfaces and screens, including the HUD, title screen, achievements and credits." }, { label: "Concept art", title: "Concept art", text: "Visual studies of the characters and the game world." }, { label: "Gameplay", title: "Gameplay videos", text: "Previews of the game running in Construct 2." }] },
};

englishCopy["in9-midia"].sections = [
  { label: "Identity and mascots", title: "Visual identity and brand characters", text: "In9 Mídia visual identity materials and the development of mascots Ivo and Ivone." },
  { label: "Presentations and solutions", title: "Company and solution presentations", text: "Presentations of the company and its digital signage solutions, including Video Wall and SGA." },
  { label: "System templates", title: "Templates for In9 systems", text: "Templates and interfaces for digital menus and signage, grouped according to the project's institutional folder." },
  { label: "Content and formats", title: "Social media content", text: "Digital pieces and formats presenting In9 Mídia products, services and news." },
  { label: "Product and app launches", title: "Product and app launches", text: "Launch materials for NeoNews Studio and digital solutions for different businesses." },
  { label: "DOOH template launches", title: "DOOH template launches", text: "Launch pieces for sports and seasonal templates for digital signage screens." },
  { label: "Campaigns and events", title: "Campaigns, ads and special dates", text: "Promotional campaigns, ads and seasonal content for products and audiences across digital channels." },
  { label: "Videos", title: "Product and communication videos", text: "Videos introducing and promoting In9 Mídia solutions, products and services." },
];

englishCopy.museus.sections[0].text = "";
englishCopy.museus.sections[1].text = "";
englishCopy.museus.sections[1].content = <><p>Exploratory journey analysis revealed the need to centralize cultural information and simplify access to relevant content for different visitor profiles.</p><p>Based on these needs, categories and navigation paths were proposed to connect museums, exhibitions, artworks, artists and cultural activities.</p><p>The information architecture was designed to support content discovery, access to practical information and visit planning.</p><p>The goal is to help each user find what they need intuitively, regardless of how familiar they are with the city or its cultural spaces.</p></>;

englishCopy.museus.sections[0].content = <><p>Beyond showcasing museums, exhibitions, artworks and artists, the project aims to make Salvador’s culture and historical heritage more accessible.</p><p>To understand different visiting contexts, seven hypothetical personas were developed to represent audiences with distinct needs, interests and access conditions.</p><p>Mapping their journeys helped explore challenges related to discovering cultural spaces, planning visits, mobility and accessibility.</p><p>This analysis revealed opportunities to make the cultural experience simpler, more inclusive and more accessible.</p></>;

englishCopy.museus.sections.push({ label: "Actual-size mockups", title: "Mockups at actual size", text: "An enlarged view of the main screens of the Museums app." });
englishCopy.museus.sections[0].insightGroups = [
  { eyebrow: "Main pain points", title: "What did the journeys reveal?", intro: "Analysis of the journeys of seven user profiles revealed recurring challenges that make access and visits to Salvador's museums harder.", items: [{ title: "Scattered information", text: "Users need to consult different sources to find museum details, opening hours, tickets and exhibitions." }, { title: "Planning a visit", text: "Visitors are unsure about transport, travel time, costs and how to plan routes around their interests and availability." }, { title: "Accessibility and inclusion", text: "Clear information about physical, sensory and communication accessibility is missing, limiting some visitors' independence." }, { title: "Activities and content", text: "It is hard to find exhibitions, events and educational activities suited to different interests and age groups." }, { title: "Costs and benefits", text: "Users have questions about prices, free admission, discounted tickets and benefits for students, teachers and groups." }, { title: "On-site orientation", text: "Visitors struggle to find details about facilities such as services, restrooms, rest areas and indoor signage." }, { title: "Discovery and relevance", text: "Users want personalized recommendations and a way to follow new exhibitions and events." }, { title: "Saving and sharing", text: "Many users want to save visits, create favorites lists and share experiences, but cannot find simple tools for it." }] },
  { eyebrow: "App opportunities", title: "How can the app help?", intro: "Needs and difficulties identified across the seven user profiles informed opportunities to guide the app's features.", items: [{ title: "Centralized information", text: "Bring reliable information about museums, exhibitions, hours, tickets and services together in one place." }, { title: "Visit planning", text: "Offer maps, public transit routes, travel times and itinerary suggestions based on each user's interests and availability." }, { title: "Detailed accessibility", text: "Provide clear details about physical, sensory and communication accessibility so users can plan independently and safely." }, { title: "Updated exhibitions and events", text: "Share exhibitions, events, workshops and educational activities, with filters by topic, age group and activity type." }, { title: "Ticket and benefit filters", text: "Show prices, free admission, discounts and benefits for students, teachers, groups and other audiences." }, { title: "Museum facilities", text: "Present details about restrooms, rest areas, food, lockers and other services to help visitors find their way." }, { title: "Personalized recommendations", text: "Suggest museums, exhibitions and itineraries based on interests such as history, contemporary art, children's activities or free events." }, { title: "Favorites and sharing", text: "Let people save museums and events, build visit lists and share recommendations with friends, family or school groups." }] },
];

cases.en = cases.pt.map((project) => {
  const copy = englishCopy[project.slug];
  return {
    ...project,
    intro: copy?.intro || project.intro,
    labels: copy ? copy.sections.map((section) => section.label) : project.labels,
    sections: project.sections.map((section, index) => ({
      ...section,
      ...(copy?.sections[index] || {}),
      // Both languages use the same gallery and section anchor.
      id: section.id,
      media: section.media,
      videos: section.videos,
    })),
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
  const isMuseumsCase = project.slug === "museus";

  return <div className="original-project-page case-page"><header><nav className="nav"><a href={sitePath(homePath)} className="logo">CECÍLIA<span>·</span>RODRIGUES</a><div className="nav-links"><a href={sitePath(`${homePath}#sobre`)}>{language === "en" ? "About" : "Sobre"}</a><a href={sitePath(`${homePath}#trabalhos`)}>{language === "en" ? "Work" : "Trabalhos"}</a><a href={sitePath(`${homePath}#contato`)}>{language === "en" ? "Contact" : "Contato"}</a><ThemeToggle language={language} /><button className="plain-language" onClick={() => navigate(switchPath)}>{language === "en" ? "PT" : "EN"}</button></div></nav></header><main><section className="case-hero"><div className="wrap"><div className="eyebrow mono">{language === "en" ? "Project case" : "Case de projeto"}</div><h1>{project.title}</h1><p>{project.intro}</p><div className="case-meta"><span>{project.year}</span><span>{language === "en" ? "Selected work" : "Trabalho selecionado"}</span></div></div></section><section className="case-navigation"><div className="wrap"><div className="case-labels" aria-label={language === "en" ? "Project areas" : "Áreas do projeto"}>{project.labels.map((label, index) => <a key={label} href={`#${project.sections[index]?.id || project.sections[0].id}`} className="case-label">{label} <ArrowUpRight size={13} /></a>)}</div></div></section><section><div className="wrap case-sections">{sectionsWithUniqueMedia.map((section, index) => <article className="case-section" id={section.id} key={`${project.slug}-${section.id}`}><div className="case-section-index">{String(index + 1).padStart(2, "0")} / {String(project.sections.length).padStart(2, "0")}</div><div className="case-section-content"><div className="case-section-heading"><span className="case-section-label">{section.label}</span><h2>{section.title}</h2></div>{section.content ? <div className="case-richtext">{section.content}</div> : section.text && <p>{section.text}</p>}{isMuseumsCase && section.id === "pesquisa" && <MuseumArchitecture language={language} />}{section.carousel && section.media ? <MuseumJourneyCarousel media={section.media} onEnlarge={setEnlargedMedia} /> : section.media && section.media.length > 0 && isMuseumsCase && (section.id === "pesquisa" || section.id === "mockup-alta-fidelidade" || section.id === "ui-design") ? <div className={`museum-screen-gallery case-museum-gallery ${section.id === "pesquisa" ? "museum-lowfi-case-gallery" : "museum-highfi-case-gallery"}`}>{[0, 1, 2].map((columnIndex) => <div className={`museum-screen-gallery-column museum-screen-gallery-column-${columnIndex}`} key={columnIndex}>{section.media!.filter((_, mediaIndex) => mediaIndex % 3 === columnIndex).map((media) => <figure className="museum-screen-gallery-item" key={media.src}><button className="case-image-zoom" type="button" onClick={() => setEnlargedMedia(media)} aria-label={language === "en" ? `Enlarge ${media.alt}` : `Ampliar ${media.alt}`}><img src={media.src} alt={media.alt} loading="lazy" /></button></figure>)}</div>)}</div> : section.media && section.media.length > 0 && <div className="case-media-grid">{section.media.map((media) => <figure key={media.src}><button className="case-image-zoom" type="button" onClick={() => setEnlargedMedia(media)} aria-label={language === "en" ? `Enlarge ${media.alt}` : `Ampliar ${media.alt}`}><img src={media.src} alt={media.alt} loading="lazy" /></button></figure>)}</div>}{section.videos && <div className="case-video-list">{section.videos.map((video) => <figure key={video.src}><video controls muted playsInline preload="metadata" aria-label={video.title}><source src={video.src} type="video/mp4" />{language === "en" ? "Your browser does not support embedded video." : "Seu navegador não oferece suporte a vídeo incorporado."}</video><figcaption>{video.title}</figcaption></figure>)}</div>}{section.insightGroups && <div className="museum-insight-groups">{section.insightGroups.map((group) => <section className="museum-insight-group" key={group.eyebrow}><span className="museum-insight-eyebrow">{group.eyebrow}</span><h3>{group.title}</h3><p>{group.intro}</p><div className="museum-insight-grid">{group.items.map((item, itemIndex) => <article key={item.title}><span>{String(itemIndex + 1).padStart(2, "0")}</span><h4>{item.title}</h4><i /><p>{item.text}</p></article>)}</div></section>)}</div>}</div></article>)}{ctaHref && <a className="case-cta" href={ctaHref}>{project.cta?.label} <ArrowUpRight size={17} /></a>}</div></section><section className="case-project-nav"><div className="wrap"><div className="case-project-nav-heading"><span className="case-section-label">{language === "en" ? "Explore more" : "Continue explorando"}</span><h2>{language === "en" ? "Other projects" : "Outros projetos"}</h2></div><nav className="case-project-links" aria-label={language === "en" ? "Other project cases" : "Outros cases de projeto"}>{cases[language].filter((otherCase) => otherCase.slug !== project.slug).map((otherCase) => <a className="case-project-link" key={otherCase.slug} href={sitePath(language === "en" ? `/en/cases/${otherCase.slug}` : `/cases/${otherCase.slug}`)}>{otherCase.title} <ArrowUpRight size={13} aria-hidden="true" /></a>)}</nav></div></section><SiteContact language={language} /></main><footer><div className="wrap">© 2026 Cecília Rodrigues</div></footer>{enlargedMedia && <div className="case-lightbox" role="dialog" aria-modal="true" aria-label={language === "en" ? "Enlarged project image" : "Imagem ampliada do projeto"} onMouseDown={(event) => { if (event.target === event.currentTarget) setEnlargedMedia(null); }}><button className="case-lightbox-back" type="button" onClick={() => setEnlargedMedia(null)}><ArrowLeft size={18} />{language === "en" ? "Back" : "Voltar"}</button><button className="case-lightbox-close" type="button" onClick={() => setEnlargedMedia(null)} aria-label={language === "en" ? "Close enlarged image" : "Fechar imagem ampliada"}><X size={22} /></button><img src={enlargedMedia.src} alt={enlargedMedia.alt} /><p>{enlargedMedia.alt}</p></div>}</div>;
}

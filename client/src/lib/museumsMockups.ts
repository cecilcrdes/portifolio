const mockups = [
  { filename: "1-Cadastroalta.png", pt: "Cadastro", en: "Sign up" },
  { filename: "2-Homepagealta.png", pt: "Página inicial", en: "Home screen" },
  { filename: "3-Obras de artelancamentosalta.png", pt: "Obras de arte e lançamentos", en: "Artworks and new releases" },
  { filename: "4-Sobre o artistaalta.png", pt: "Sobre o artista", en: "About the artist" },
  { filename: "5-Sobre a exposiçãoalta.png", pt: "Sobre a exposição", en: "About the exhibition" },
  { filename: "6-Sobre o museualta.png", pt: "Sobre o museu", en: "About the museum" },
  { filename: "7-Lista de Exposiçõesalta.png", pt: "Lista de exposições", en: "Exhibition list" },
];

export const getMuseumsMockups = (language: "pt" | "en") => mockups.map((mockup) => ({
  src: `${import.meta.env.BASE_URL}assets/portfolio/museus/${mockup.filename}`,
  alt: language === "pt"
    ? `Mockup de alta fidelidade do aplicativo Museus — ${mockup.pt}`
    : `Museums app high-fidelity mockup — ${mockup.en}`,
}));

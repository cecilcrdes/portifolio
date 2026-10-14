import { ArrowUpRight } from "lucide-react";

type SiteContactProps = { language: "pt" | "en" };

export default function SiteContact({ language }: SiteContactProps) {
  const isEnglish = language === "en";
  return <section className="site-contact-section">
    <div className="wrap site-contact-wrap">
      <p className="site-contact-tag">04 / {isEnglish ? "LET'S TALK" : "VAMOS CONVERSAR"}</p>
      <h2>{isEnglish ? "Contact" : "Contato"}</h2>
      <a className="site-contact-whatsapp" href="https://wa.me/message/QJQFEXDTZAW2B1" target="_blank" rel="noreferrer noopener">
        {isEnglish ? "Chat on WhatsApp" : "Falar pelo WhatsApp"} <ArrowUpRight size={18} />
      </a>
      <div className="site-contact-network">
        <small>{isEnglish ? "Networks" : "Redes"}</small>
        <a href="https://www.linkedin.com/in/cec%C3%ADlia-rodrigues-a3528334/" target="_blank" rel="noreferrer noopener">LinkedIn <ArrowUpRight size={14} /></a>
      </div>
    </div>
  </section>;
}

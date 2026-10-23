import { ArrowUpRight, Check, Copy, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { sitePath } from "@/lib/sitePath";

type SiteContactProps = { language: "pt" | "en" };

export default function SiteContact({ language }: SiteContactProps) {
  const isEnglish = language === "en";
  const [copied, setCopied] = useState(false);
  const email = "ceciliacrdes@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="site-contact-section" id="contato">
      <div className="wrap site-contact-wrap">
        <p className="site-contact-tag">04 / {isEnglish ? "LET'S TALK" : "VAMOS CONVERSAR"}</p>
        <h2>{isEnglish ? "Contact" : "Contato"}</h2>

        <div className="site-contact-grid">
          {/* Email Direto com Cópia */}
          <div className="contact-card-box">
            <span className="contact-box-label">{isEnglish ? "Direct Email" : "E-mail Direto"}</span>
            <div className="contact-box-actions">
              <a className="contact-action-btn primary" href={`mailto:${email}`}>
                <Mail size={16} /> {email}
              </a>
              <button
                type="button"
                className="contact-copy-btn"
                onClick={handleCopy}
                aria-label={isEnglish ? "Copy email address" : "Copiar endereço de e-mail"}
                title={isEnglish ? "Copy email" : "Copiar e-mail"}
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                <span>{copied ? (isEnglish ? "Copied!" : "Copiado!") : (isEnglish ? "Copy" : "Copiar")}</span>
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
                {isEnglish ? "Chat on WhatsApp" : "Falar pelo WhatsApp"} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Currículo em PDF */}
          <div className="contact-card-box">
            <span className="contact-box-label">{isEnglish ? "Resume / CV" : "Currículo (PDF)"}</span>
            <div className="contact-box-actions">
              <a
                className="contact-action-btn cv-btn"
                href={sitePath("/curriculo-cecilia-rodrigues.pdf")}
                target="_blank"
                rel="noreferrer noopener"
                download="Curriculo-Cecilia-Rodrigues.pdf"
              >
                <FileText size={16} /> {isEnglish ? "Download CV (PDF)" : "Baixar Currículo (PDF)"} <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Redes Profissionais */}
          <div className="contact-card-box">
            <span className="contact-box-label">{isEnglish ? "Networks" : "Redes"}</span>
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
  );
}

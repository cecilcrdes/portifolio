import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

type ThemeToggleProps = { language?: "pt" | "en" };

export default function ThemeToggle({ language = "pt" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const label = theme === "dark"
    ? (language === "en" ? "Switch to light theme" : "Ativar tema claro")
    : (language === "en" ? "Switch to dark theme" : "Ativar tema escuro");
  const Icon = theme === "dark" ? Sun : Moon;

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={label} title={label}>
      <Icon size={16} aria-hidden="true" />
    </button>
  );
}

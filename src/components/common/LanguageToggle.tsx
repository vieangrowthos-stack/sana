import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={cn("flex items-center gap-1 text-sm", className)}>
      <button
        onClick={() => setLanguage("en")}
        className={cn(
          "px-2 py-1 rounded-md transition-colors duration-200",
          language === "en"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-muted-foreground/50">|</span>
      <button
        onClick={() => setLanguage("ja")}
        className={cn(
          "px-2 py-1 rounded-md transition-colors duration-200 font-japanese",
          language === "ja"
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-label="日本語に切り替え"
      >
        日本語
      </button>
    </div>
  );
}

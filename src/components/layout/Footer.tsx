import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, Mail } from "lucide-react";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { cn } from "@/lib/utils";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export function Footer() {
  const { t, isJapanese } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent/30 border-t border-border">
      <div className="container mx-auto px-6 py-16">
        <AnimatedSection className="max-w-2xl mx-auto text-center">
          {/* Bio */}
          <p
            className={cn(
              "text-muted-foreground text-lg leading-relaxed mb-8",
              isJapanese && "font-japanese"
            )}
          >
            {t(translations.footer.bio)}
          </p>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-background/50 text-muted-foreground hover:text-primary hover:bg-background transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <p className={cn(
            "text-sm text-muted-foreground",
            isJapanese && "font-japanese"
          )}>
            © {currentYear} Portfolio. {t(translations.footer.copyright)}.
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}

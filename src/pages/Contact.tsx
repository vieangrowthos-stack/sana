import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Mail, Instagram, Send, ArrowRight } from "lucide-react";

// ─── Replace with your Formspree form ID ───
// 1. Go to https://formspree.io → create account → New Form
// 2. Copy the form ID from the endpoint URL (e.g. "xpwzgkla")
// 3. Paste it below
const FORMSPREE_ID = "YOUR_FORMSPREE_ID";

export default function Contact() {
  const { t, isJapanese } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (FORMSPREE_ID === "YOUR_FORMSPREE_ID") {
      alert("Please set your Formspree ID in Contact.tsx");
      return;
    }
    setStatus("sending");
    try {
      const data = new FormData(e.currentTarget);
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        formRef.current?.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageLayout>
      <section className="min-h-screen py-16 md:py-0 px-6 md:px-0 flex items-stretch">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row">

          {/* ── Left Panel ── */}
          <AnimatedSection className="md:w-5/12 flex flex-col justify-center py-16 md:py-24 md:pr-16 md:border-r border-border">

            {/* Vertical label */}
            <div className="hidden md:flex items-center gap-3 mb-12">
              <div className="w-8 h-px bg-primary" />
              <p className="text-xs tracking-[0.25em] uppercase text-primary font-medium">
                {t({ en: "Contact", ja: "お問い合わせ" })}
              </p>
            </div>

            <h1 className={cn(
              "font-display text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6",
              isJapanese && "font-japanese"
            )}>
              {t({
                en: "Let's create something beautiful together.",
                ja: "一緒に美しいものを作りましょう。",
              })}
            </h1>

            <p className={cn(
              "text-muted-foreground leading-relaxed mb-10 max-w-xs",
              isJapanese && "font-japanese"
            )}>
              {t({
                en: "Whether it's a collaboration, a question, or just to say hello — I'd love to hear from you.",
                ja: "コラボレーション、質問、または単なる挨拶でも、ぜひご連絡ください。",
              })}
            </p>

            {/* Contact links */}
            <div className="space-y-4">
              <a
                href="mailto:viean.growthos@gmail.com"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <span>viean.growthos@gmail.com</span>
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>

              <a
                href="https://instagram.com/photographer"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/5 transition-all">
                  <Instagram className="w-3.5 h-3.5" />
                </span>
                <span>@sana.photographs</span>
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </a>
            </div>

            {/* Decorative quote */}
            <div className="mt-12 pt-10 border-t border-border">
              <p className={cn(
                "font-display text-sm italic text-muted-foreground/60 leading-relaxed",
                isJapanese && "font-japanese"
              )}>
                {t({
                  en: "\"Time waits for no one.\"",
                  ja: "「時間は誰も待ってくれない。」",
                })}
              </p>
              <p className="text-xs text-muted-foreground/40 mt-1">— The Girl Who Leapt Through Time</p>
            </div>
          </AnimatedSection>

          {/* ── Right Panel — Form ── */}
          <AnimatedSection delay={0.15} className="md:w-7/12 flex flex-col justify-center py-16 md:py-24 md:pl-16">

            <AnimatePresence mode="wait">
              {status === "sent" ? (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-start gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                    >
                      <Send className="w-6 h-6 text-primary" />
                    </motion.div>
                  </div>
                  <div>
                    <h2 className={cn(
                      "font-display text-3xl font-semibold mb-3",
                      isJapanese && "font-japanese"
                    )}>
                      {t({ en: "Message sent!", ja: "送信しました！" })}
                    </h2>
                    <p className={cn("text-muted-foreground", isJapanese && "font-japanese")}>
                      {t({
                        en: "Thank you for reaching out. I'll get back to you soon.",
                        ja: "ご連絡ありがとうございます。近日中にご返信します。",
                      })}
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm text-primary hover:underline underline-offset-4"
                  >
                    {t({ en: "Send another message →", ja: "別のメッセージを送る →" })}
                  </button>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.form
                  key="form"
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Name */}
                  <div className="relative">
                    <motion.label
                      htmlFor="name"
                      animate={{
                        y: focused === "name" ? -20 : 0,
                        fontSize: focused === "name" ? "11px" : "14px",
                        color: focused === "name" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                      }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute left-0 top-2 pointer-events-none tracking-wide",
                        isJapanese && "font-japanese"
                      )}
                    >
                      {t(translations.contact.name)}
                    </motion.label>
                    <input
                      id="name"
                      name="name"
                      required
                      onFocus={() => setFocused("name")}
                      onBlur={(e) => !e.target.value && setFocused(null)}
                      className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none pt-6 pb-2 text-foreground text-sm transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <motion.label
                      htmlFor="email"
                      animate={{
                        y: focused === "email" ? -20 : 0,
                        fontSize: focused === "email" ? "11px" : "14px",
                        color: focused === "email" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                      }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute left-0 top-2 pointer-events-none tracking-wide",
                        isJapanese && "font-japanese"
                      )}
                    >
                      {t(translations.contact.email)}
                    </motion.label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      onFocus={() => setFocused("email")}
                      onBlur={(e) => !e.target.value && setFocused(null)}
                      className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none pt-6 pb-2 text-foreground text-sm transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <motion.label
                      htmlFor="message"
                      animate={{
                        y: focused === "message" ? -20 : 0,
                        fontSize: focused === "message" ? "11px" : "14px",
                        color: focused === "message" ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                      }}
                      transition={{ duration: 0.15 }}
                      className={cn(
                        "absolute left-0 top-2 pointer-events-none tracking-wide",
                        isJapanese && "font-japanese"
                      )}
                    >
                      {t(translations.contact.message)}
                    </motion.label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      onFocus={() => setFocused("message")}
                      onBlur={(e) => !e.target.value && setFocused(null)}
                      className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none pt-6 pb-2 text-foreground text-sm resize-none transition-colors"
                    />
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-destructive text-sm">
                      {t({
                        en: "Something went wrong. Please try again or email me directly.",
                        ja: "エラーが発生しました。もう一度試すか、直接メールしてください。",
                      })}
                    </p>
                  )}

                  {/* Submit */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={status === "sending"}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "group flex items-center gap-3 text-sm font-medium transition-colors",
                        status === "sending"
                          ? "text-muted-foreground cursor-not-allowed"
                          : "text-foreground hover:text-primary"
                      )}
                    >
                      <span className="w-10 h-10 rounded-full border border-current flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all">
                        {status === "sending" ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </span>
                      <span className={cn(isJapanese && "font-japanese")}>
                        {status === "sending"
                          ? t({ en: "Sending…", ja: "送信中…" })
                          : t(translations.contact.send)}
                      </span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>

        </div>
      </section>
    </PageLayout>
  );
}
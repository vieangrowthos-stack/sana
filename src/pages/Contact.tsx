import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Mail, Instagram, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const { t, isJapanese } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to Firebase or email service
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <AnimatedSection className="mb-12 text-center">
            <h1 className={cn(
              "font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4",
              isJapanese && "font-japanese"
            )}>
              {t(translations.contact.title)}
            </h1>
            <p className={cn(
              "text-lg text-muted-foreground",
              isJapanese && "font-japanese"
            )}>
              {t(translations.contact.subtitle)}
            </p>
          </AnimatedSection>

          {/* Social links */}
          <AnimatedSection delay={0.1} className="mb-10">
            <div className="flex justify-center gap-4">
              <a
                href="mailto:hello@example.com"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors text-sm"
              >
                <Mail className="w-4 h-4" /> hello@example.com
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-accent-foreground hover:bg-accent/80 transition-colors text-sm"
              >
                <Instagram className="w-4 h-4" /> @photographer
              </a>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <Card>
              <CardContent className="pt-6">
                {submitted ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className={cn(
                      "text-lg font-medium",
                      isJapanese && "font-japanese"
                    )}>
                      {t(translations.contact.sent)}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className={cn(isJapanese && "font-japanese")}>
                        {t(translations.contact.name)}
                      </Label>
                      <Input
                        id="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className={cn(isJapanese && "font-japanese")}>
                        {t(translations.contact.email)}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className={cn(isJapanese && "font-japanese")}>
                        {t(translations.contact.message)}
                      </Label>
                      <Textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      <span className={cn(isJapanese && "font-japanese")}>
                        {t(translations.contact.send)}
                      </span>
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}

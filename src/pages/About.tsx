import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { mockJourneyEntries } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Camera, Award, Globe, Heart } from "lucide-react";

const stats = [
  { icon: Camera, label: { en: "Photos Taken", ja: "撮影枚数" }, value: "10,000+" },
  { icon: Award, label: { en: "Awards", ja: "受賞" }, value: "12" },
  { icon: Globe, label: { en: "Countries", ja: "訪問国" }, value: "25+" },
  { icon: Heart, label: { en: "Happy Clients", ja: "お客様" }, value: "200+" },
];

export default function About() {
  const { t, isJapanese } = useLanguage();

  return (
    <PageLayout>
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <AnimatedSection className="mb-16 text-center">
            <h1 className={cn(
              "font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4",
              isJapanese && "font-japanese"
            )}>
              {t(translations.about.title)}
            </h1>
            <p className={cn(
              "text-lg text-muted-foreground",
              isJapanese && "font-japanese"
            )}>
              {t(translations.about.subtitle)}
            </p>
          </AnimatedSection>

          {/* Bio */}
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600"
                  alt="Photographer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-4">
                <h2 className={cn("font-display text-2xl font-semibold", isJapanese && "font-japanese")}>
                  {t({ en: "Hello, I'm a Photographer", ja: "こんにちは、フォトグラファーです" })}
                </h2>
                <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                  {t({
                    en: "I've been passionate about photography for over 5 years, capturing the beauty of landscapes, wildlife, and everyday moments. My journey started with a simple point-and-shoot camera and evolved into a full-time creative pursuit.",
                    ja: "5年以上写真に情熱を注いでおり、風景、野生動物、日常の美しい瞬間を捉えています。シンプルなカメラから始まり、フルタイムのクリエイティブな仕事に発展しました。"
                  })}
                </p>
                <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                  {t({
                    en: "I specialize in landscape and wildlife photography, but I also love capturing portraits, food, and travel moments. Each photo tells a unique story.",
                    ja: "風景や野生動物の写真を専門としていますが、ポートレート、料理、旅行の瞬間を撮ることも大好きです。"
                  })}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.2} className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.value} className="text-center p-6 rounded-xl bg-accent/30">
                  <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-semibold font-display mb-1">{stat.value}</div>
                  <div className={cn("text-sm text-muted-foreground", isJapanese && "font-japanese")}>
                    {t(stat.label)}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Timeline / History */}
          <AnimatedSection delay={0.3}>
            <h2 className={cn(
              "font-display text-2xl md:text-3xl font-semibold mb-8 text-center",
              isJapanese && "font-japanese"
            )}>
              {t({ en: "My Journey", ja: "私のジャーニー" })}
            </h2>
            <div className="space-y-8">
              {mockJourneyEntries.map((entry, index) => (
                <div
                  key={entry.id}
                  className={cn(
                    "flex gap-6 items-start",
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse md:flex-row"
                  )}
                >
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-lg font-semibold font-display text-primary">{entry.date}</span>
                  </div>
                  <div className="w-px bg-border flex-shrink-0 self-stretch" />
                  <div className="flex-1 pb-8">
                    <h3 className={cn(
                      "text-lg font-semibold mb-2",
                      isJapanese && "font-japanese"
                    )}>
                      {t(entry.title)}
                    </h3>
                    <p className={cn(
                      "text-muted-foreground leading-relaxed",
                      isJapanese && "font-japanese"
                    )}>
                      {t(entry.content)}
                    </p>
                    {entry.mediaUrl && (
                      <img
                        src={entry.mediaUrl}
                        alt={t(entry.title)}
                        className="mt-4 rounded-lg w-full max-w-sm object-cover aspect-video"
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PageLayout>
  );
}

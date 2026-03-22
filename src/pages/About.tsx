import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { Camera, Film, MapPin, Heart } from "lucide-react";

const stats = [
  { icon: MapPin, label: { en: "Based In", ja: "拠点" }, value: "Kyoto" },
  { icon: Film, label: { en: "Studying", ja: "専攻" }, value: "Film" },
  { icon: Camera, label: { en: "From", ja: "出身" }, value: "India" },
  { icon: Heart, label: { en: "Loves", ja: "好き" }, value: "Japan" },
];

const journeyEntries = [
  {
    id: "j1",
    year: "Now",
    title: { en: "Film Student at Kyoto University of Arts", ja: "京都芸術大学映画専攻" },
    content: {
      en: "Living my dream — studying film in the city I've always wanted to call home. Kyoto's quiet temples, narrow alleys, and changing seasons give me something new to capture every single day.",
      ja: "夢を生きています。ずっと住みたかった街で映画を学んでいます。京都の静かな寺院、細い路地、移ろう季節が毎日新しい何かを与えてくれます。",
    },
  },
  {
    id: "j2",
    year: "Teen",
    title: { en: "Fascination with Japan Begins", ja: "日本への魅了が始まる" },
    content: {
      en: "From the beginning of my teenage years, Japan captured my imagination — its culture, its cinema, its aesthetics. I knew then that I had to find my way here.",
      ja: "十代の頃から、日本の文化、映画、美学に魅了されました。いつかここに来なければと思っていました。",
    },
  },
  {
    id: "j3",
    year: "Always",
    title: { en: "The Camera as an Extension of the Eye", ja: "目の延長としてのカメラ" },
    content: {
      en: "I don't trust memories — they blur, fade, and disappear. The camera freezes the subject forever. It is a timeless object that makes the clock stand still.",
      ja: "記憶は信用できません。ぼやけて、薄れて、消えてしまう。カメラは被写体を永遠に凍らせます。時計を止める、タイムレスな道具です。",
    },
  },
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
            <p className={cn("text-lg text-muted-foreground", isJapanese && "font-japanese")}>
              {t(translations.about.subtitle)}
            </p>
          </AnimatedSection>

          {/* Bio */}
          <AnimatedSection delay={0.1} className="mb-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600"
                  alt="Sana Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-5">
                <h2 className={cn("font-display text-2xl font-semibold", isJapanese && "font-japanese")}>
                  {t({ en: "Hello, I'm Sana Sharma", ja: "こんにちは、サナ・シャルマです" })}
                </h2>
                <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                  {t({
                    en: "An Indian studying film at the Kyoto University of Arts. Since the beginning of my teenage years I have been fascinated with Japan and had always wanted to live here. I hope to begin my film journey in Japan.",
                    ja: "京都芸術大学で映画を学んでいるインド人です。十代の頃から日本に魅了され、ずっとここに住みたいと思っていました。日本で映画の旅を始めたいと思っています。",
                  })}
                </p>
                <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                  {t({
                    en: "Our eyes take in information, register all the data and store it into our memories. But I don't trust it — memories can be forgotten, blurry and hazy. The camera is an extension of the human eye. A timeless object that makes the clock stand still, freezing the subject forever.",
                    ja: "私たちの目は情報を取り込み、データを記録し、記憶に保存します。でも私はそれを信用しません。記憶は忘れられ、ぼやけてしまいます。カメラは人間の目の延長です。被写体を永遠に凍らせる、タイムレスな道具です。",
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

          {/* Philosophy */}
          <AnimatedSection delay={0.25} className="mb-16">
            <div className="rounded-2xl bg-accent/20 border border-border p-8 md:p-10 space-y-5">
              <h2 className={cn(
                "font-display text-2xl font-semibold text-center mb-6",
                isJapanese && "font-japanese"
              )}>
                {t({ en: "Why I Photograph", ja: "なぜ撮影するのか" })}
              </h2>
              <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                {t({
                  en: "The experience I have gained affects the way I perceive my surroundings. There are things that only I can see, because it's me — Sana. The same goes for everyone. I choose to capture with the medium of the camera to show my perception. I want to show the world the way my eyes see it.",
                  ja: "私が積んできた経験は、周囲の世界の見方に影響を与えます。私にしか見えないものがある。なぜなら、それは私、サナだから。それは誰でも同じです。私はカメラという媒体を使って、自分の知覚を表現することを選びました。",
                })}
              </p>
              <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                {t({
                  en: "I want to share what I see so I am not forgotten. To be forgotten from this vibrant world is scary, lonely. I document everything so that people remember me even if I am no longer here. We continue living only because others' memories haven't forgotten about us.",
                  ja: "忘れられないように、見たものを共有したい。この活気ある世界から忘れられることは、怖くて、孤独なことです。私がいなくなっても人々が覚えていてくれるよう、すべてを記録しています。",
                })}
              </p>
              <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                {t({
                  en: "The things that my eyes have seen, see and will see — guided by my heart and mind — will be a testimony. A proof that I was here. That I will continue to be here, perhaps not physically, but in my pieces, my essence, soul unforgotten.",
                  ja: "私の目が見てきたもの、見ているもの、見るであろうもの。心と精神に導かれたそれらは、証言となるでしょう。私がここにいたという証明。肉体ではなくても、作品の中に、魂の中に、存在し続けるために。",
                })}
              </p>

              {/* Quote */}
              <div className="pt-4 border-t border-border">
                <blockquote className={cn(
                  "font-display text-xl md:text-2xl italic text-center text-primary font-medium",
                  isJapanese && "font-japanese"
                )}>
                  {t({
                    en: "\"Time waits for no one.\"",
                    ja: "「時間は誰も待ってくれない。」",
                  })}
                </blockquote>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  — The Girl Who Leapt Through Time (2006)
                </p>
                <p className={cn(
                  "text-center text-sm text-muted-foreground mt-3 italic",
                  isJapanese && "font-japanese"
                )}>
                  {t({
                    en: "Absolutely agree. Time is linear, fleeting, a race. Let's all have a good long race with no regrets.",
                    ja: "まったく同意します。時間は線形で、はかなく、競争です。後悔のない長いレースをしましょう。",
                  })}
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Journey Timeline */}
          <AnimatedSection delay={0.3}>
            <h2 className={cn(
              "font-display text-2xl md:text-3xl font-semibold mb-10 text-center",
              isJapanese && "font-japanese"
            )}>
              {t({ en: "My Journey", ja: "私のジャーニー" })}
            </h2>
            <div className="space-y-8">
              {journeyEntries.map((entry) => (
                <div key={entry.id} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-16 text-center pt-1">
                    <span className="text-base font-semibold font-display text-primary">{entry.year}</span>
                  </div>
                  <div className="w-px bg-border flex-shrink-0 self-stretch" />
                  <div className="flex-1 pb-8">
                    <h3 className={cn("text-lg font-semibold mb-2", isJapanese && "font-japanese")}>
                      {t(entry.title)}
                    </h3>
                    <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                      {t(entry.content)}
                    </p>
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
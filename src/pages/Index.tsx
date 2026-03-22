import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/common/AnimatedSection";
import { useLanguage, translations, CATEGORIES, Category } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { mockBlogPosts, BlogPost as BlogPostType } from "@/data/blogData";

/* ── Category card data with Japan-fitting images ── */
const categoryCards: { key: Category; image: string }[] = [
  { key: "landscape",  image: "https://res.cloudinary.com/dnqfkxmd4/image/upload/v1773862321/1B2A2563_lqfsez.jpg" },
  { key: "wildlife",   image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600" },
  { key: "nightscene", image: "https://res.cloudinary.com/dnqfkxmd4/image/upload/v1769851553/1B2A6859_tcytjt.jpg" },
  { key: "food",       image: "https://res.cloudinary.com/dnqfkxmd4/image/upload/v1769851553/1B2A6859_tcytjt.jpg" },
  { key: "travel",     image: "https://res.cloudinary.com/dnqfkxmd4/image/upload/v1774173517/1B2A2883-2_h5ffsh.jpg" },
  { key: "portrait",   image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600" },
  { key: "tuffy",      image: "https://res.cloudinary.com/dnqfkxmd4/image/upload/v1774173398/1B2A5366_qbboki.jpg" },
];

/* ── Fetch latest 3 blogs from Firestore, fallback to mock ── */
function useFeaturedBlogs() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setPosts(snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              title:   { en: data.title_en || "",   ja: data.title_ja   || data.title_en   || "" },
              excerpt: { en: data.excerpt_en || "",  ja: data.excerpt_ja || data.excerpt_en || "" },
              body:    { en: data.body_en || "",     ja: data.body_ja    || data.body_en    || "" },
              coverUrl:    data.coverUrl    || "",
              publishedAt: data.publishedAt || "",
            } as BlogPostType;
          }));
        } else {
          setPosts(mockBlogPosts.slice(0, 3));
        }
      } catch {
        setPosts(mockBlogPosts.slice(0, 3));
      }
    };
    fetch();
  }, []);

  return posts;
}

export default function Index() {
  const { t, isJapanese } = useLanguage();
  const featuredPosts = useFeaturedBlogs();

  return (
    <PageLayout>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070"
            alt="Kyoto Japan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a1a]/95 via-[#0d0a1a]/75 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <AnimatedSection delay={0.1}>
            <p className="text-white/60 text-sm md:text-base mb-4 tracking-[0.2em] uppercase font-light">
              {t({ en: "Kyoto, Japan  ·  Film & Photography", ja: "京都・日本 ・ 映画と写真" })}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <h1 className={cn(
              "font-display text-7xl md:text-9xl lg:text-[150px] font-bold leading-none tracking-tight text-white",
              isJapanese && "font-japanese"
            )}>
              SANA
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.35}>
            <p className={cn(
              "text-white/75 max-w-lg mt-6 text-lg md:text-xl leading-relaxed",
              isJapanese && "font-japanese"
            )}>
              {t({
                en: "Film student capturing Japan through her lens.",
                ja: "レンズを通して日本を捉える映画学生。",
              })}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.45}>
            <div className="flex gap-4 mt-8 flex-wrap">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 group">
                <Link to="/gallery">
                  {t({ en: "View Portfolio", ja: "ポートフォリオを見る" })}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
                <Link to="/about">
                  {t({ en: "About Me", ja: "私について" })}
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll hint */}
        <AnimatedSection delay={0.8} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/40"
          >
            <div className="w-px h-8 bg-white/30" />
            <p className="text-xs tracking-widest uppercase">Scroll</p>
          </motion.div>
        </AnimatedSection>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section className="py-24 px-6 bg-accent/10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <AnimatedSection>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=700"
                  alt="Sana Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="space-y-5">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium">
                {t({ en: "About Me", ja: "私について" })}
              </p>
              <h2 className={cn(
                "font-display text-3xl md:text-4xl font-semibold leading-tight",
                isJapanese && "font-japanese"
              )}>
                {t({
                  en: "An Indian in Kyoto, documenting the world one frame at a time.",
                  ja: "京都に住むインド人として、一枚一枚世界を記録しています。",
                })}
              </h2>
              <p className={cn("text-muted-foreground leading-relaxed", isJapanese && "font-japanese")}>
                {t({
                  en: "I'm Sana Sharma — a film student at the Kyoto University of Arts. Since my teenage years, Japan captured my imagination. I believe the camera is an extension of the human eye: a timeless object that freezes the subject forever.",
                  ja: "サナ・シャルマです。京都芸術大学の映画学生。十代の頃から日本に魅了されてきました。カメラは人間の目の延長だと信じています。被写体を永遠に凍らせる、タイムレスな道具です。",
                })}
              </p>
              <blockquote className={cn(
                "border-l-2 border-primary pl-4 text-sm italic text-muted-foreground",
                isJapanese && "font-japanese"
              )}>
                {t({
                  en: "\"I want to share what I see so I am not forgotten.\"",
                  ja: "「忘れられないように、見たものを共有したい。」",
                })}
              </blockquote>
              <Button asChild variant="outline" className="group mt-2">
                <Link to="/about">
                  {t({ en: "Read My Story", ja: "私のストーリーを読む" })}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ── FEATURED CATEGORIES ── */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">
              {t({ en: "Portfolio", ja: "ポートフォリオ" })}
            </p>
            <h2 className={cn(
              "font-display text-3xl md:text-4xl font-semibold",
              isJapanese && "font-japanese"
            )}>
              {t(translations.home.featuredWork)}
            </h2>
          </AnimatedSection>

          <AnimatedContainer
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
            staggerDelay={0.07}
          >
            {categoryCards.map((card) => (
              <AnimatedItem key={card.key}>
                <Link to={`/gallery?category=${card.key}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer"
                  >
                    <img
                      src={card.image}
                      alt={t(translations.gallery[card.key])}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className={cn(
                        "text-white text-sm md:text-base font-semibold",
                        isJapanese && "font-japanese"
                      )}>
                        {t(translations.gallery[card.key])}
                      </h3>
                    </div>
                  </motion.div>
                </Link>
              </AnimatedItem>
            ))}
          </AnimatedContainer>

          <AnimatedSection delay={0.4} className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="group">
              <Link to="/gallery">
                <span className={cn(isJapanese && "font-japanese")}>
                  {t(translations.home.exploreAll)}
                </span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURED BLOG ── */}
      {featuredPosts.length > 0 && (
        <section className="py-24 px-6 bg-accent/10">
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection className="mb-12 text-center">
              <p className="text-xs tracking-[0.2em] uppercase text-primary font-medium mb-3">
                {t({ en: "Latest Writing", ja: "最新の記事" })}
              </p>
              <h2 className={cn(
                "font-display text-3xl md:text-4xl font-semibold",
                isJapanese && "font-japanese"
              )}>
                {t({ en: "From the Blog", ja: "ブログから" })}
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <Link to={`/blog/${post.id}`} className="group block h-full">
                    <div className="rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.coverUrl}
                          alt={t(post.title)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(post.publishedAt).toLocaleDateString(
                            isJapanese ? "ja-JP" : "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
                        <h3 className={cn(
                          "text-base font-semibold mb-2 group-hover:text-primary transition-colors leading-snug",
                          isJapanese && "font-japanese"
                        )}>
                          {t(post.title)}
                        </h3>
                        <p className={cn(
                          "text-sm text-muted-foreground line-clamp-2 flex-1",
                          isJapanese && "font-japanese"
                        )}>
                          {t(post.excerpt)}
                        </p>
                        <p className="text-xs text-primary mt-3 font-medium group-hover:underline">
                          {t({ en: "Read more →", ja: "続きを読む →" })}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4} className="mt-10 text-center">
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/blog">
                  <span className={cn(isJapanese && "font-japanese")}>
                    {t({ en: "View All Posts", ja: "すべての記事を見る" })}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </AnimatedSection>
          </div>
        </section>
      )}

    </PageLayout>
  );
}
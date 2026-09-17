import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/common/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { mockBlogPosts, BlogPost as BlogPostType } from "@/data/blogData";
import { mockMediaItems } from "@/data/mockData";

interface GalleryPhoto {
  id: string;
  url: string;
}

/* ── Fetch latest 7 photos from Firestore Gallery ── */
function useHomeGalleryPhotos() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const q = query(collection(db, "media"), orderBy("createdAt", "desc"), limit(7));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setPhotos(snap.docs.map((d) => ({
            id: d.id,
            url: d.data().imageUrl || "",
          })));
        } else {
          setPhotos(mockMediaItems.slice(0, 7).map(item => ({ id: item.id, url: item.url })));
        }
      } catch {
        setPhotos(mockMediaItems.slice(0, 7).map(item => ({ id: item.id, url: item.url })));
      }
    };
    fetchPhotos();
  }, []);

  return photos;
}

/* ── Fetch latest 3 blogs from Firestore ── */
function useFeaturedBlogs() {
  const [posts, setPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(3));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setPosts(snap.docs.map((d) => {
            const data = d.data();
            return {
              id: d.id,
              title:       { en: data.title_en   || "", ja: data.title_ja   || data.title_en   || "" },
              excerpt:     { en: data.excerpt_en  || "", ja: data.excerpt_ja || data.excerpt_en || "" },
              body:        { en: data.body_en     || "", ja: data.body_ja    || data.body_en    || "" },
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
    fetchPosts();
  }, []);

  return posts;
}

export default function Index() {
  const { t, isJapanese } = useLanguage();
  const GalleryPhotos = useHomeGalleryPhotos();
  const featuredPosts = useFeaturedBlogs();

  const row1 = GalleryPhotos.slice(0, 4); // First 4 photos
  const row2 = GalleryPhotos.slice(4);    // Remaining photos (up to 3) centered below

  return (
    <PageLayout>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="bg.jpg"
            alt="Kyoto Japan"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a1a]/95 via-[#0d0a1a]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <AnimatedSection delay={0.1}>
            <p className="text-white/50 text-xs md:text-sm mb-5 tracking-[0.3em] uppercase font-light">
              {t({ en: "Kyoto, Japan  ·  Film & Photography", ja: "京都・日本 ・ 映画と写真" })}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <h1 className={cn(
              "font-display text-8xl md:text-[120px] lg:text-[160px] font-bold leading-none tracking-tight text-white",
              isJapanese && "font-japanese"
            )}>
              SANA
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.32}>
            <p className={cn(
              "text-white/70 max-w-md mt-6 text-base md:text-lg leading-relaxed font-light",
              isJapanese && "font-japanese"
            )}>
              {t({
                en: "Film student capturing Japan through her lens.",
                ja: "レンズを通して日本を捉える映画学生。",
              })}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.44}>
            <div className="flex gap-3 mt-8 flex-wrap">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90 group rounded-full px-8">
                <Link to="/Gallery">
                  {t({ en: "View Portfolio", ja: "ポートフォリオを見る" })}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline"
                className="border-white/25 text-white hover:bg-white/10 bg-transparent rounded-full px-8">
                <Link to="/about">
                  {t({ en: "About Me", ja: "私について" })}
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
            <p className="text-[10px] tracking-[0.3em] uppercase">scroll</p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════ ABOUT INTRO ══════════════════════ */}
      <section className="py-28 px-6 bg-accent/10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            <AnimatedSection>
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted shadow-2xl">
                  <img
                    src="/image.png"
                    alt="Sana Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl border-2 border-primary/20 -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="space-y-6">
              <p className="text-xs tracking-[0.25em] uppercase text-primary font-medium">
                {t({ en: "About Me", ja: "私について" })}
              </p>
              <h2 className={cn(
                "font-display text-3xl md:text-4xl font-semibold leading-[1.2]",
                isJapanese && "font-japanese"
              )}>
                {t({
                  en: "An Indian in Kyoto, documenting the world one frame at a time.",
                  ja: "京都に住むインド人として、一枚一枚世界を記録しています。",
                })}
              </h2>
              <p className={cn("text-muted-foreground leading-relaxed text-[15px]", isJapanese && "font-japanese")}>
                {t({
                  en: "I'm Sana Sharma — a film student at the Kyoto University of Arts. Since my teenage years, Japan captured my imagination. I believe the camera is an extension of the human eye: a timeless object that freezes the subject forever.",
                  ja: "サナ・シャルマです。京都芸術大学の映画学生。十代の頃から日本に魅了されてきました。カメラは人間の目の延長だと信じています。",
                })}
              </p>
              <blockquote className={cn(
                "border-l-2 border-primary/50 pl-5 text-sm italic text-muted-foreground py-1",
                isJapanese && "font-japanese"
              )}>
                {t({
                  en: "\"I want to share what I see so I am not forgotten.\"",
                  ja: "「忘れられないように、見たものを共有したい。」",
                })}
              </blockquote>
              <Button asChild variant="outline" className="group rounded-full">
                <Link to="/about">
                  {t({ en: "Read My Story", ja: "私のストーリーを読む" })}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
              </Button>
            </AnimatedSection>

          </div>
        </div>
      </section>

      {/* ══════════════════════ FEATURED Gallery PREVIEW ══════════════════════ */}
      <section className="py-28 px-6">
        <div className="container mx-auto max-w-7xl">

          <AnimatedSection className="mb-14 text-center">
            <p className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-3">
              {t({ en: "Portfolio", ja: "ポートフォリオ" })}
            </p>
            <h2 className={cn(
              "font-display text-3xl md:text-4xl font-semibold",
              isJapanese && "font-japanese"
            )}>
              {t({ en: "Featured Work", ja: "注目の作品" })}
            </h2>
          </AnimatedSection>

          {/* Row 1 — 4 cards */}
          <AnimatedContainer
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-4 md:mb-5"
            staggerDelay={0.07}
          >
            {row1.map((photo) => (
              <AnimatedItem key={photo.id}>
                <Link to="/Gallery" className="block">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 bg-muted"
                  >
                    <img
                      src={photo.url}
                      alt="Gallery preview"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </motion.div>
                </Link>
              </AnimatedItem>
            ))}
          </AnimatedContainer>

          {/* Row 2 — up to 3 cards centered */}
          {row2.length > 0 && (
            <AnimatedContainer
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 md:w-3/4 mx-auto"
              staggerDelay={0.07}
            >
              {row2.map((photo) => (
                <AnimatedItem key={photo.id}>
                  <Link to="/Gallery" className="block">
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300 bg-muted"
                    >
                      <img
                        src={photo.url}
                        alt="Gallery preview"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </motion.div>
                  </Link>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          )}

          <AnimatedSection delay={0.4} className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="group rounded-full px-8">
              <Link to="/Gallery">
                <span className={cn(isJapanese && "font-japanese")}>
                  {t({ en: "Explore All", ja: "すべて見る" })}
                </span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════ FEATURED BLOG ══════════════════════ */}
      {featuredPosts.length > 0 && (
        <section className="py-28 px-6 bg-accent/10">
          <div className="container mx-auto max-w-6xl">

            <AnimatedSection className="mb-14 text-center">
              <p className="text-xs tracking-[0.25em] uppercase text-primary font-medium mb-3">
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
                    <div className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.coverUrl}
                          alt={t(post.title)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-xs text-muted-foreground mb-2 tracking-wide">
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
                        <p className="text-xs text-primary mt-4 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          {t({ en: "Read more", ja: "続きを読む" })}
                          <ArrowRight className="w-3 h-3" />
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.4} className="mt-12 text-center">
              <Button asChild variant="outline" size="lg" className="group rounded-full px-8">
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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations } from "@/contexts/LanguageContext";
import { mockBlogPosts, BlogPost } from "@/data/blogData";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { cn } from "@/lib/utils";

// Converts a Firestore blog doc into the BlogPost shape used by the UI
function firestoreToPost(id: string, data: any): BlogPost {
  return {
    id,
    title: { en: data.title_en || "", ja: data.title_ja || data.title_en || "" },
    excerpt: { en: data.excerpt_en || "", ja: data.excerpt_ja || data.excerpt_en || "" },
    body: { en: data.body_en || "", ja: data.body_ja || data.body_en || "" },
    coverUrl: data.coverUrl || "",
    publishedAt: data.publishedAt || "",
  };
}

export default function Blogs() {
  const { t, isJapanese } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setPosts(snap.docs.map((d) => firestoreToPost(d.id, d.data())));
        } else {
          // fallback to mock data during development
          setPosts(mockBlogPosts);
        }
      } catch {
        // if Firebase not configured, use mock
        setPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PageLayout>
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h1 className={cn(
              "text-4xl md:text-5xl font-display font-semibold mb-4",
              isJapanese && "font-japanese"
            )}>
              {t({ en: "Blog", ja: "ブログ" })}
            </h1>
            <p className={cn(
              "text-muted-foreground text-lg max-w-xl mx-auto",
              isJapanese && "font-japanese"
            )}>
              {t({ en: "Stories, tips, and behind-the-scenes from my photography journey.", ja: "写真の旅からのストーリー、ヒント、舞台裏。" })}
            </p>
          </AnimatedSection>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-muted animate-pulse h-72" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <AnimatedSection key={post.id} delay={index * 0.1}>
                  <Link to={`/blog/${post.id}`} className="group block">
                    <div className="rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.coverUrl}
                          alt={t(post.title)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-muted-foreground mb-2">
                          {new Date(post.publishedAt).toLocaleDateString(isJapanese ? "ja-JP" : "en-US", {
                            year: "numeric", month: "long", day: "numeric",
                          })}
                        </p>
                        <h2 className={cn(
                          "text-lg font-semibold mb-2 group-hover:text-primary transition-colors",
                          isJapanese && "font-japanese"
                        )}>
                          {t(post.title)}
                        </h2>
                        <p className={cn(
                          "text-sm text-muted-foreground line-clamp-2",
                          isJapanese && "font-japanese"
                        )}>
                          {t(post.excerpt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
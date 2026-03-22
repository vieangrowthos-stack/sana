import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockBlogPosts, BlogPost as BlogPostType } from "@/data/blogData";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { cn } from "@/lib/utils";

function firestoreToPost(id: string, data: any): BlogPostType {
  return {
    id,
    title: { en: data.title_en || "", ja: data.title_ja || data.title_en || "" },
    excerpt: { en: data.excerpt_en || "", ja: data.excerpt_ja || data.excerpt_en || "" },
    body: { en: data.body_en || "", ja: data.body_ja || data.body_en || "" },
    coverUrl: data.coverUrl || "",
    publishedAt: data.publishedAt || "",
  };
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const { t, isJapanese } = useLanguage();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        // Try Firestore first
        const ref = doc(db, "blogs", id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPost(firestoreToPost(snap.id, snap.data()));
        } else {
          // Fallback to mock data
          const mock = mockBlogPosts.find((p) => p.id === id);
          setPost(mock || null);
        }
      } catch {
        // Firebase not configured — use mock
        const mock = mockBlogPosts.find((p) => p.id === id);
        setPost(mock || null);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <PageLayout>
        <div className="py-20 px-6">
          <div className="container mx-auto max-w-3xl space-y-4">
            <div className="w-full aspect-[21/9] bg-muted animate-pulse rounded-xl" />
            <div className="h-8 bg-muted animate-pulse rounded w-2/3" />
            <div className="h-4 bg-muted animate-pulse rounded w-full" />
            <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <section className="py-20 px-6 text-center">
          <h1 className="text-2xl font-semibold mb-4">Post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">← Back to Blog</Link>
        </section>
      </PageLayout>
    );
  }

  const bodyText = t(post.body);
  const paragraphs = bodyText.split("\n\n").filter(Boolean);

  return (
    <PageLayout>
      <article className="pb-20">
        {/* Cover Image */}
        <AnimatedSection>
          <div className="w-full aspect-[21/9] max-h-[480px] overflow-hidden">
            <img
              src={post.coverUrl}
              alt={t(post.title)}
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>

        {/* Content */}
        <div className="container mx-auto max-w-3xl px-6 mt-10">
          <AnimatedSection delay={0.1}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t({ en: "Back to Blog", ja: "ブログに戻る" })}
            </Link>

            <p className="text-sm text-muted-foreground mb-3">
              {new Date(post.publishedAt).toLocaleDateString(isJapanese ? "ja-JP" : "en-US", {
                year: "numeric", month: "long", day: "numeric",
              })}
            </p>

            <h1 className={cn(
              "text-3xl md:text-4xl font-display font-semibold mb-8",
              isJapanese && "font-japanese"
            )}>
              {t(post.title)}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className={cn("prose prose-lg max-w-none", isJapanese && "font-japanese")}>
              {paragraphs.map((p, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed mb-5">{p}</p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </article>
    </PageLayout>
  );
}
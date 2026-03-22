import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations, Category } from "@/contexts/LanguageContext";
import { mockMediaItems } from "@/data/mockData";
import { MediaItem } from "@/components/gallery/MediaCard";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { cn } from "@/lib/utils";

// Convert a Firestore media doc into the MediaItem shape GalleryGrid expects
function firestoreToMediaItem(id: string, data: any): MediaItem {
  return {
    id,
    url: data.imageUrl || "",
    type: data.type || "photo",
    category: data.category || "landscape",
    caption: data.caption || { en: data.title || "", ja: data.title || "" },
  };
}

export default function Gallery() {
  const { t, isJapanese } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;

  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        if (!snap.empty) {
          setItems(snap.docs.map((d) => firestoreToMediaItem(d.id, d.data())));
        } else {
          // Firestore is empty — fall back to mock data during development
          setItems(mockMediaItems);
        }
      } catch {
        // Firebase not configured yet — use mock data
        setItems(mockMediaItems);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);

  return (
    <PageLayout>
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto">
          <AnimatedSection className="mb-12 md:mb-16 text-center">
            <h1 className={cn(
              "font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4",
              isJapanese && "font-japanese"
            )}>
              {t(translations.gallery.title)}
            </h1>
          </AnimatedSection>

          {loading ? (
            /* Skeleton grid while loading */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[3/4] rounded-xl bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <GalleryGrid
              items={items}
              showFilters
              initialCategory={categoryParam || "all"}
            />
          )}
        </div>
      </section>
    </PageLayout>
  );
}
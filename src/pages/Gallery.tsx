import { useSearchParams } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations, Category } from "@/contexts/LanguageContext";
import { mockMediaItems } from "@/data/mockData";
import { cn } from "@/lib/utils";

export default function Gallery() {
  const { t, isJapanese } = useLanguage();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") as Category | null;

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

          <GalleryGrid 
            items={mockMediaItems} 
            showFilters 
            initialCategory={categoryParam || "all"} 
          />
        </div>
      </section>
    </PageLayout>
  );
}

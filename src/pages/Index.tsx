import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/common/AnimatedSection";
import { useLanguage, translations, CATEGORIES, Category } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categoryCards: { key: Category; icon: string; image: string }[] = [
  { key: "landscape", icon: "🏔️", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600" },
  { key: "wildlife", icon: "🦁", image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=600" },
  { key: "nightscene", icon: "🌙", image: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=600" },
  { key: "food", icon: "🍽️", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600" },
  { key: "travel", icon: "✈️", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600" },
  { key: "portrait", icon: "👤", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600" },
  { key: "tuffy", icon: "🐕", image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600" },
];

export default function Index() {
  const { t, isJapanese } = useLanguage();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-transparent to-transparent" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <AnimatedSection delay={0.1}>
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-primary/10">
                <Camera className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className={cn(
              "font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-6",
              isJapanese && "font-japanese"
            )}>
              {t(translations.home.greeting)}
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <p className={cn(
              "text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto",
              isJapanese && "font-japanese"
            )}>
              {t(translations.home.subtitle)}
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <Button asChild size="lg" className="group">
              <Link to="/gallery">
                <span className={cn(isJapanese && "font-japanese")}>
                  {t(translations.home.viewGallery)}
                </span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <AnimatedSection className="mb-12 text-center">
            <h2 className={cn(
              "font-display text-2xl md:text-3xl font-semibold mb-4",
              isJapanese && "font-japanese"
            )}>
              {t(translations.home.featuredWork)}
            </h2>
          </AnimatedSection>

          <AnimatedContainer 
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" 
            staggerDelay={0.08}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-2xl mb-1 block">{card.icon}</span>
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

          <AnimatedSection delay={0.5} className="mt-12 text-center">
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
    </PageLayout>
  );
}

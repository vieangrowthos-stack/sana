import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MediaCard, MediaItem } from "./MediaCard";
import { Lightbox } from "./Lightbox";
import { useLanguage, translations, Category, CATEGORIES } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

type FilterCategory = "all" | Category;

interface GalleryGridProps {
  items: MediaItem[];
  showFilters?: boolean;
  initialCategory?: FilterCategory;
}

const categoryLabels: Record<FilterCategory, { en: string; ja: string }> = {
  all: translations.gallery.all,
  landscape: translations.gallery.landscape,
  wildlife: translations.gallery.wildlife,
  nightscene: translations.gallery.nightscene,
  food: translations.gallery.food,
  travel: translations.gallery.travel,
  portrait: translations.gallery.portrait,
  tuffy: translations.gallery.tuffy,
};

export function GalleryGrid({ items, showFilters = true, initialCategory = "all" }: GalleryGridProps) {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>(initialCategory);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const { t, isJapanese } = useLanguage();

  const filteredItems = activeCategory === "all"
    ? items
    : items.filter((item) => item.category === activeCategory);

  const selectedIndex = selectedItem 
    ? filteredItems.findIndex(item => item.id === selectedItem.id)
    : -1;

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedItem(filteredItems[selectedIndex - 1]);
    }
  };

  const handleNext = () => {
    if (selectedIndex < filteredItems.length - 1) {
      setSelectedItem(filteredItems[selectedIndex + 1]);
    }
  };

  const allCategories: FilterCategory[] = ["all", ...CATEGORIES];

  return (
    <div className="space-y-8">
      {/* Category Filters */}
      {showFilters && (
        <div className="flex flex-wrap justify-center gap-2">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                isJapanese && "font-japanese",
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              {t(categoryLabels[cat])}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <MediaCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
              aspectRatio={index % 5 === 0 ? "portrait" : index % 3 === 0 ? "video" : "square"}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrevious={selectedIndex > 0 ? handlePrevious : undefined}
        onNext={selectedIndex < filteredItems.length - 1 ? handleNext : undefined}
      />
    </div>
  );
}

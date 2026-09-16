// src/components/gallery/GalleryGrid.tsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MediaCard, MediaItem } from "./MediaCard";
import { Lightbox } from "./Lightbox";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface GalleryGridProps {
  items: MediaItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const { t, isJapanese } = useLanguage();

  const selectedIndex = selectedItem
    ? items.findIndex((item) => item.id === selectedItem.id)
    : -1;

  const handlePrevious = () => {
    if (selectedIndex > 0) setSelectedItem(items[selectedIndex - 1]);
  };

  const handleNext = () => {
    if (selectedIndex < items.length - 1) setSelectedItem(items[selectedIndex + 1]);
  };

  return (
    <div className="space-y-8">
      {/* Uniform Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="text-center py-20 text-muted-foreground">
          <p className={cn("text-lg", isJapanese && "font-japanese")}>
            {t({ en: "No photos in the gallery yet.", ja: "ギャラリーにまだ写真がありません。" })}
          </p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onPrevious={selectedIndex > 0 ? handlePrevious : undefined}
        onNext={selectedIndex < items.length - 1 ? handleNext : undefined}
      />
    </div>
  );
}
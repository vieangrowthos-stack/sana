// src/components/Gallery/MediaCard.tsx
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { BilingualText, useLanguage } from "@/contexts/LanguageContext";

export interface MediaItem {
  id: string;
  url: string;
  type: "photo" | "video";
  category: string;
  caption: BilingualText;
  thumbnailUrl?: string;
}

interface MediaCardProps {
  item: MediaItem;
  onClick?: () => void;
}

export function MediaCard({ item, onClick }: MediaCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover="hover"
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-muted mb-4 break-inside-avoid"
    >
      {/* Natural aspect ratio wrapper for masonry grid */}
      <div className="w-full overflow-hidden">
        {item.type === "photo" ? (
          <img
            src={item.url}
            alt={t(item.caption)}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <>
            <img
              src={item.thumbnailUrl || item.url}
              alt={t(item.caption)}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 text-foreground ml-0.5" />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Subtle hover overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-black/10 pointer-events-none rounded-xl"
      />
    </motion.div>
  );
}
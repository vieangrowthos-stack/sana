import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
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
  aspectRatio?: "square" | "video" | "portrait";
}

export function MediaCard({ 
  item, 
  onClick,
  aspectRatio = "square",
}: MediaCardProps) {
  const { t, isJapanese } = useLanguage();

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover="hover"
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-muted"
    >
      <div className={cn(aspectClasses[aspectRatio], "relative")}>
        {item.type === "photo" ? (
          <img
            src={item.url}
            alt={t(item.caption)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        ) : (
          <>
            <img
              src={item.thumbnailUrl || item.url}
              alt={t(item.caption)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="w-6 h-6 text-foreground ml-0.5" />
              </div>
            </div>
          </>
        )}

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1 },
          }}
          className="absolute inset-0 bg-gradient-to-t from-gallery-overlay/70 via-gallery-overlay/20 to-transparent"
        />

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          variants={{
            hover: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 p-4"
        >
          <p className={cn(
            "text-gallery-caption text-sm font-medium",
            isJapanese && "font-japanese"
          )}>
            {t(item.caption)}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

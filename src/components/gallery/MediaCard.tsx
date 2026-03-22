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
}

export function MediaCard({ item, onClick }: MediaCardProps) {
  const { t, isJapanese } = useLanguage();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover="hover"
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-xl bg-muted"
    >
      {/* 
        aspect-[4/3] gives every card the exact same height.
        The image uses object-cover to fill it cleanly — no blank space ever.
        Change to aspect-square or aspect-video if you prefer those proportions.
      */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        {item.type === "photo" ? (
          <img
            src={item.url}
            alt={t(item.caption)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <>
            <img
              src={item.thumbnailUrl || item.url}
              alt={t(item.caption)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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

      {/* Gradient overlay on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        variants={{ hover: { opacity: 1 } }}
        transition={{ duration: 0.25 }}
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none rounded-xl"
      />

      {/* Caption on hover */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        variants={{ hover: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none"
      >
        <p className={cn(
          "text-white text-sm font-medium drop-shadow-sm",
          isJapanese && "font-japanese"
        )}>
          {t(item.caption)}
        </p>
      </motion.div>
    </motion.div>
  );
}
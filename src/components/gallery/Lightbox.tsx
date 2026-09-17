// src/components/Gallery/Lightbox.tsx
import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaItem } from "@/components/Gallery/MediaCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { overlayVariants, lightboxContentVariants } from "@/styles/animations";

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function Lightbox({ item, onClose, onPrevious, onNext }: LightboxProps) {
  const { t } = useLanguage();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && onPrevious) onPrevious();
    if (e.key === "ArrowRight" && onNext) onNext();
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, handleKeyDown]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          variants={overlayVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-Gallery-overlay/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-Gallery-caption" />
          </button>

          {/* Navigation Arrows */}
          {onPrevious && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6 text-Gallery-caption" />
            </button>
          )}

          {onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-background/10 hover:bg-background/20 transition-colors z-10"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6 text-Gallery-caption" />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={item.id}
            variants={lightboxContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "photo" ? (
              <img
                src={item.url}
                alt={t(item.caption)}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            ) : (
              <video
                src={item.url}
                controls
                autoPlay
                className="max-w-full max-h-[85vh] rounded-lg"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
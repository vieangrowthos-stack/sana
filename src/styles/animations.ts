// Framer Motion animation variants for consistent, premium feel
// Philosophy: No bounce, no dramatic zooms, no fast motion

import type { Variants, Transition } from "framer-motion";

const easeOut: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const easeIn: [number, number, number, number] = [0.55, 0.06, 0.68, 0.19];

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInTransition: Transition = { duration: 0.4, ease: easeOut };

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const fadeUpTransition: Transition = { duration: 0.5, ease: easeOut };

export const fadeDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleInTransition: Transition = { duration: 0.3, ease: easeOut };

// Gentle scale for hover effects (max 1.02 as per design philosophy)
export const gentleScale: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
};

// Stagger children animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
  },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const pageTransition: Transition = { 
  duration: 0.4, 
  ease: easeOut,
};

// Lightbox overlay
export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// Lightbox content
export const lightboxContentVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

// Caption fade for gallery cards
export const captionVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0 },
};

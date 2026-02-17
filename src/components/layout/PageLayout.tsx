import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { pageVariants, pageTransition } from "@/styles/animations";
import { cn } from "@/lib/utils";

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  showFooter?: boolean;
}

export function PageLayout({ 
  children, 
  className,
  showFooter = true,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <motion.main
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        className={cn("flex-1 pt-20", className)}
      >
        {children}
      </motion.main>
      {showFooter && <Footer />}
    </div>
  );
}

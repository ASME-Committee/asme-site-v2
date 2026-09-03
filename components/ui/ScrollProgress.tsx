"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Thin gradient bar at the top of the page that fills as the user scrolls.
 * Spring-eased so it feels weightless rather than mechanical.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-px bg-brand-gradient"
    />
  );
}

import { useEffect } from "react";
import { motion } from "framer-motion";
import YellowFlower from "./YellowFlower";

const PETAL_COUNT = 8;

/**
 * Transición entre el intro y la experiencia principal: una flor crece
 * en el centro, brotan pétalos y la iluminación pasa de noche a día.
 */
export default function BloomTransition({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      initial={{ backgroundColor: "#1a1408" }}
      animate={{ backgroundColor: "#fdf9ee" }}
      transition={{ duration: 3, ease: "easeInOut" }}
    >
      <div className="relative flex items-center justify-center">
        {Array.from({ length: PETAL_COUNT }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-3 w-2 rounded-full bg-pastel-yellow"
            style={{ transformOrigin: "50% 140%" }}
            initial={{ opacity: 0, scale: 0, rotate: (360 / PETAL_COUNT) * i }}
            animate={{ opacity: [0, 1, 0.9], scale: [0, 1.1, 1] }}
            transition={{ duration: 1.2, delay: 0.9 + i * 0.07, ease: "easeOut" }}
          />
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        >
          <YellowFlower variant="sunflower" size={96} />
        </motion.div>
      </div>
    </motion.div>
  );
}

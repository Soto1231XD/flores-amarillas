import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import FlowerBackground from "../components/FlowerBackground";
import { config } from "../data/config";

export default function Welcome() {
  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-warm-white px-6 text-center">
      <FlowerBackground seed={4} count={5} />

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 font-sans text-xs uppercase tracking-[0.3em] text-gold"
      >
        {config.date}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="relative z-10 mt-4 max-w-md text-balance font-serif-display text-3xl italic leading-snug text-ink sm:text-4xl"
      >
        {config.mainMessage}
      </motion.h1>

      <motion.div
        className="absolute bottom-10 z-10 flex flex-col items-center gap-1 text-gold/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 1.2 },
          y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
      >
        <span className="font-sans text-[11px] uppercase tracking-[0.2em]">
          Desliza hacia abajo
        </span>
        <ChevronDown size={20} aria-hidden="true" />
      </motion.div>
    </section>
  );
}

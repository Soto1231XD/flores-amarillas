import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Bouquet from "../components/Bouquet";
import FloatingPetals from "../components/FloatingPetals";
import { config } from "../data/config";

const CLOSING_BOUQUET = [
  "sunflower",
  "tulip",
  "sunflower",
  "tulip",
  "sunflower",
  "tulip",
  "sunflower",
  "tulip",
  "sunflower",
  "tulip",
  "sunflower",
  "tulip",
];

export default function FinalSurprise() {
  const [showCapture, setShowCapture] = useState(false);

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center gap-8 overflow-hidden bg-gradient-to-b from-warm-white via-cream to-night px-6 py-28 text-center">
      <FloatingPetals density={16} />

      <Bouquet flowers={CLOSING_BOUQUET} wrapped />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center gap-3"
      >
        <p className="font-serif-display text-2xl italic text-ink sm:text-3xl">
          Feliz {config.date}.
        </p>
        <p className="font-serif-display text-lg italic text-ink-soft">
          {config.closingWhisper}
        </p>
        <p className="font-serif-display text-lg italic text-ink-soft">
          {config.closingResolution}
        </p>
        <p className="mt-2 font-serif-display text-2xl italic text-gold">
          Son para ti. 💛
        </p>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => setShowCapture(true)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="mt-4 rounded-full border border-cream/20 px-6 py-2.5 font-sans text-xs tracking-wide text-cream/80 transition hover:border-cream/40 hover:text-cream"
      >
        Guardar este momento
      </motion.button>

      <AnimatePresence>
        {showCapture && (
          <CaptureCard onClose={() => setShowCapture(false)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function CaptureCard({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-night/95 px-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex aspect-[9/16] w-full max-w-[340px] flex-col items-center justify-center gap-8 rounded-2xl border border-gold-soft/25 bg-gradient-to-b from-cream to-cream-deep px-8 py-10"
      >
        <span className="font-sans text-xs uppercase tracking-[0.35em] text-gold">
          {config.date}
        </span>
        <Bouquet flowers={CLOSING_BOUQUET} wrapped />
        <p className="text-balance font-serif-display text-xl italic leading-snug text-ink">
          Feliz {config.date}. Son para ti. 💛
        </p>
      </motion.div>

      <button
        type="button"
        onClick={onClose}
        className="font-sans text-xs tracking-wide text-cream/60 transition hover:text-cream"
      >
        Toca para cerrar
      </button>
    </motion.div>
  );
}

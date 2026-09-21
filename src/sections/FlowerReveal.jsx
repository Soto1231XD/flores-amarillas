import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import YellowFlower from "../components/YellowFlower";
import { config } from "../data/config";

const PLANTS = [
  { id: 0, variant: "sunflower", stagger: 0 },
  { id: 1, variant: "tulip", stagger: 0.25 },
  { id: 2, variant: "sunflower", stagger: 0.5 },
];

const STEM_DURATION = 0.9;
const LEAF_DELAY = 0.5;
const BLOOM_DELAY = 1.3;
const LAST_BLOOM_DELAY = BLOOM_DELAY + PLANTS[PLANTS.length - 1].stagger;

export default function FlowerReveal() {
  const [planted, setPlanted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handlePlant = () => {
    setPlanted(true);
    setTimeout(() => setShowMessage(true), (LAST_BLOOM_DELAY + 0.9) * 1000);
  };

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center gap-10 bg-warm-white px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="font-serif-display text-2xl italic text-ink-soft sm:text-3xl"
      >
        {planted ? "Han florecido." : "Todavía no han florecido."}
      </motion.p>

      <div className="flex items-end justify-center gap-2 sm:gap-4">
        {PLANTS.map((plant) => (
          <Plant key={plant.id} planted={planted} variant={plant.variant} stagger={plant.stagger} />
        ))}
      </div>

      {!planted && (
        <motion.button
          type="button"
          onClick={handlePlant}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="rounded-full border border-gold-soft/40 bg-gradient-to-b from-sunflower-soft to-gold px-7 py-3 font-sans text-sm font-medium tracking-wide text-ink shadow-[0_0_25px_-10px_rgba(244,180,0,0.55)]"
        >
          Plantar las flores
        </motion.button>
      )}

      <AnimatePresence>
        {showMessage && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-sm text-balance font-serif-display text-lg italic text-ink-soft"
          >
            {config.firstFlowerMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}

/**
 * Maceta + tallo + hojas dibujados en un único SVG (mismo sistema de
 * coordenadas) para que las hojas queden siempre ancladas al tallo,
 * sin importar el tamaño con el que se renderice.
 */
function Plant({ planted, variant, stagger = 0 }) {
  const bloomDelay = BLOOM_DELAY + stagger;
  const leafDelay = LEAF_DELAY + stagger;
  const stemDelay = stagger;

  return (
    <div className="relative aspect-[120/220] w-20 shrink-0 sm:w-24">
      <svg
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 120 220"
        aria-hidden="true"
      >
        {/* Maceta */}
        <path d="M14 160 L106 160 L92 216 L28 216 Z" fill="#C9982C" opacity="0.85" />
        <rect x="6" y="150" width="108" height="14" rx="4" fill="#B07F23" />

        {/* Tallo */}
        <AnimatePresence>
          {planted && (
            <motion.path
              d="M60 150 L60 40"
              stroke="#6B7A4F"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: STEM_DURATION, delay: stemDelay, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Hojas, ancladas exactamente sobre el tallo (x=60) */}
        <AnimatePresence>
          {planted && (
            <>
              <motion.path
                d="M60 118 C 40 113 30 128 18 131 C 30 139 46 131 60 118 Z"
                fill="#6B7A4F"
                style={{ transformOrigin: "60px 118px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: leafDelay, ease: "easeOut" }}
              />
              <motion.path
                d="M60 92 C 80 87 92 100 102 94 C 90 104 72 102 60 92 Z"
                fill="#6B7A4F"
                style={{ transformOrigin: "60px 92px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: leafDelay + 0.15, ease: "easeOut" }}
              />
            </>
          )}
        </AnimatePresence>
      </svg>

      {/* Flor, anclada a la punta del tallo (60, 40) */}
      <AnimatePresence>
        {planted && (
          <motion.div
            className="absolute"
            style={{ left: "50%", top: "18%" }}
            initial={{ opacity: 0, scale: 0, x: "-50%", y: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.8, delay: bloomDelay, ease: "easeOut" }}
          >
            <YellowFlower variant={variant} size={56} sway />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

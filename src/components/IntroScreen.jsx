import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "../data/config";

const STEPS = [
  { text: config.date, delay: 900, hold: 3200 },
  { text: "Dicen que hoy se regalan flores amarillas...", delay: 300, hold: 4600 },
  { text: "...así que tengo algo para ti.", delay: 300, hold: 3800 },
];

/**
 * Pantalla inicial cinemática: revela frases una a una y termina
 * mostrando el botón que da paso a la experiencia principal.
 */
export default function IntroScreen({ onDiscover }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (stepIndex >= STEPS.length) {
      const timer = setTimeout(() => setShowButton(true), 500);
      return () => clearTimeout(timer);
    }
    const { hold } = STEPS[stepIndex];
    const timer = setTimeout(() => setStepIndex((i) => i + 1), hold);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const current = STEPS[stepIndex];

  return (
    <div className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-night px-6 text-center">
      <AmbientGlow />

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-10">
        <AnimatePresence mode="wait">
          {current && (
            <motion.p
              key={stepIndex}
              initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: current.delay / 1000 }}
              className={
                stepIndex === 0
                  ? "font-serif-display text-4xl italic tracking-wide text-pastel-yellow sm:text-5xl"
                  : "font-serif-display text-2xl text-cream/90 sm:text-3xl"
              }
            >
              {current.text}
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.button
              type="button"
              onClick={onDiscover}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-gold-soft/40 bg-gradient-to-b from-sunflower-soft to-gold px-8 py-3 font-sans text-sm font-medium tracking-wide text-ink shadow-[0_0_30px_-8px_rgba(244,180,0,0.6)]"
              aria-label="Descubrir la experiencia"
            >
              Descubrir 💛
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sunflower/10 blur-[100px]"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(244,180,0,0.08),transparent_60%)]" />
    </div>
  );
}

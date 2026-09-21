import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import YellowFlower from "../components/YellowFlower";
import Bouquet from "../components/Bouquet";

const AVAILABLE = [
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
  "sunflower",
  "tulip",
];

const MIN_SELECTION = 12;

export default function VirtualBouquet() {
  const [selected, setSelected] = useState([]);
  const [usedIndexes, setUsedIndexes] = useState(() => new Set());

  const complete = selected.length >= MIN_SELECTION;

  const handlePick = (variant, index) => {
    if (usedIndexes.has(index) || complete) return;
    setUsedIndexes((prev) => new Set(prev).add(index));
    setSelected((prev) => [...prev, variant]);
  };

  return (
    <section className="relative flex min-h-svh w-full flex-col items-center justify-center gap-10 bg-gradient-to-b from-cream-deep to-warm-white px-6 py-24 text-center">
      <div className="flex flex-col items-center gap-2">
        <h2 className="font-serif-display text-2xl italic text-ink sm:text-3xl">
          Pero una sola flor se me hizo poquito...
        </h2>
        {!complete && (
          <p className="font-sans text-sm text-ink-soft/70">
            Elige algunas para armar el ramo.
          </p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!complete ? (
          <motion.div
            key="picker"
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {AVAILABLE.map((variant, i) => {
              const used = usedIndexes.has(i);
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => handlePick(variant, i)}
                  disabled={used}
                  aria-label={`Añadir flor al ramo`}
                  animate={used ? { opacity: 0.25, scale: 0.85 } : { opacity: 1, scale: 1 }}
                  whileHover={!used ? { scale: 1.08, y: -4 } : undefined}
                  whileTap={!used ? { scale: 0.9 } : undefined}
                  transition={{ duration: 0.3 }}
                  className="rounded-full p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-sunflower disabled:cursor-default"
                >
                  <YellowFlower variant={variant} size={56} sway={!used} />
                </motion.button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="bouquet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif-display text-xl italic text-gold"
            >
              Ahora sí...
            </motion.p>

            <Bouquet flowers={selected} wrapped />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-serif-display text-2xl italic text-ink"
            >
              Estas son para ti 💛
            </motion.p>

            <motion.div
              className="mt-4 flex flex-col items-center gap-1 text-gold/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 1.4 },
                y: { duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
              }}
            >
              <span className="font-sans text-[11px] uppercase tracking-[0.2em]">
                Sigue deslizando, falta más
              </span>
              <ChevronDown size={20} aria-hidden="true" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

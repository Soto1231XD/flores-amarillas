import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FinalLetter({ letter, senderName }) {
  const [open, setOpen] = useState(false);
  const paragraphs = letter.split("\n\n").map((p) => p.trim()).filter(Boolean);

  return (
    <div className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-10 px-6">
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="envelope"
            className="flex flex-col items-center gap-8"
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.5 }}
          >
            <Envelope />
            <motion.button
              type="button"
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-gold-soft/40 bg-gradient-to-b from-sunflower-soft to-gold px-7 py-3 font-sans text-sm font-medium tracking-wide text-ink shadow-[0_0_25px_-10px_rgba(244,180,0,0.55)]"
            >
              Hay algo más...
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-lg rounded-sm border border-gold-soft/25 bg-warm-white px-7 py-10 shadow-[0_25px_60px_-18px_rgba(42,33,20,0.35)] sm:px-10 sm:py-12"
          >
            <div className="flex flex-col gap-5">
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                  className="font-serif-display text-lg italic leading-relaxed text-ink sm:text-xl"
                >
                  {p}
                </motion.p>
              ))}
              {senderName && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.15 + paragraphs.length * 0.15 }}
                  className="mt-2 self-end font-serif-display text-base italic text-gold"
                >
                  — {senderName}
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Envelope() {
  return (
    <motion.svg
      width="140"
      height="100"
      viewBox="0 0 140 100"
      aria-hidden="true"
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="4" y="12" width="132" height="84" rx="6" fill="#F7EFD9" stroke="#E0B95F" strokeWidth="2" />
      <path d="M4 16 L70 66 L136 16" stroke="#C9982C" strokeWidth="2" fill="none" />
      <circle cx="70" cy="40" r="9" fill="#F4B400" />
    </motion.svg>
  );
}

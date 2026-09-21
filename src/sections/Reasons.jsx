import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import YellowFlower from "../components/YellowFlower";
import MessageCard from "../components/MessageCard";
import SecretMessage from "../components/SecretMessage";
import FloatingPetals from "../components/FloatingPetals";
import { messages } from "../data/messages";

const POSITIONS = [
  { top: "14%", left: "16%" },
  { top: "22%", left: "68%" },
  { top: "52%", left: "10%" },
  { top: "58%", left: "78%" },
  { top: "78%", left: "40%" },
];

const SECRET_POSITION = { top: "40%", left: "46%" };

export default function Reasons() {
  const visible = useMemo(() => messages.filter((m) => !m.secret), []);
  const secret = useMemo(() => messages.find((m) => m.secret), []);

  const [discovered, setDiscovered] = useState(() => new Set());
  const [activeMessage, setActiveMessage] = useState(null);

  const handleDiscover = (item) => {
    setDiscovered((prev) => {
      if (prev.has(item.id)) return prev;
      const next = new Set(prev);
      next.add(item.id);
      return next;
    });
    setActiveMessage(item.text);
  };

  const allFound = discovered.size === visible.length;

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-gradient-to-b from-warm-white via-cream to-cream-deep px-6 py-24">
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-3 text-center">
        <h2 className="font-serif-display text-2xl italic text-ink sm:text-3xl">
          Pequeñas razones
        </h2>
        <p className="font-sans text-sm text-ink-soft/70">
          Toca cada flor para descubrirlas.
        </p>
        <span className="mt-1 font-sans text-xs tracking-wide text-gold">
          Flores descubiertas: {discovered.size} / {visible.length}
        </span>
      </div>

      <div className="relative mx-auto mt-4 h-[420px] w-full max-w-md sm:h-[480px]">
        {visible.map((item, i) => {
          const found = discovered.has(item.id);
          const pos = POSITIONS[i % POSITIONS.length];
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleDiscover(item)}
              style={{ top: pos.top, left: pos.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              aria-label={found ? item.text : "Flor por descubrir"}
            >
              <motion.div
                animate={found ? { opacity: 0.55, scale: 0.92 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <YellowFlower variant={item.variant} size={54} sway />
              </motion.div>
            </motion.button>
          );
        })}

        {secret && (
          <SecretMessage
            tapsRequired={secret.secretUnlockAfter}
            message={secret.text}
            followUp={secret.secretFollowUp}
            style={{ top: SECRET_POSITION.top, left: SECRET_POSITION.left, transform: "translate(-50%, -50%)" }}
          />
        )}

        {allFound && <FloatingPetals density={20} intensity="burst" />}
      </div>

      <MessageCard
        open={Boolean(activeMessage)}
        message={activeMessage || ""}
        onClose={() => setActiveMessage(null)}
      />
    </section>
  );
}

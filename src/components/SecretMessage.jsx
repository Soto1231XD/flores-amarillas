import { useState } from "react";
import { motion } from "framer-motion";
import YellowFlower from "./YellowFlower";
import MessageCard from "./MessageCard";

/**
 * Easter egg: una flor visualmente casi idéntica a las demás, pero que
 * requiere varios toques para revelar un mensaje oculto. No se anuncia.
 */
export default function SecretMessage({
  tapsRequired = 4,
  message,
  followUp,
  style,
  className = "",
}) {
  const [taps, setTaps] = useState(0);
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleTap = () => {
    if (unlocked) {
      setOpen(true);
      return;
    }
    const next = taps + 1;
    setTaps(next);
    if (next >= tapsRequired) {
      setUnlocked(true);
      setOpen(true);
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={handleTap}
        className={`absolute ${className}`}
        style={style}
        whileTap={{ scale: 0.85, rotate: -8 }}
        animate={
          taps > 0 && !unlocked
            ? { scale: [1, 1.08, 1] }
            : undefined
        }
        transition={{ duration: 0.4 }}
        aria-label="Flor"
      >
        <YellowFlower variant="tulip" size={46} sway />
      </motion.button>

      <MessageCard
        open={open}
        message={`${message}\n\n${followUp}`}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

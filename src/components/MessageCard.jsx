import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

/**
 * Tarjeta modal que revela el mensaje asociado a una flor tocada.
 */
export default function MessageCard({ open, message, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="relative w-full max-w-sm rounded-2xl border border-gold-soft/30 bg-warm-white px-7 py-9 text-center shadow-[0_20px_60px_-15px_rgba(42,33,20,0.35)]"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar mensaje"
              className="absolute right-4 top-4 text-ink-soft/50 transition hover:text-ink-soft"
            >
              <X size={18} />
            </button>
            <p className="whitespace-pre-line font-serif-display text-xl italic leading-relaxed text-ink sm:text-2xl">
              {message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

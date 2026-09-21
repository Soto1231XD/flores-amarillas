import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, Volume1, Volume2, VolumeX } from "lucide-react";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import { config } from "../data/config";

export default function MusicPlayer() {
  const { hasTrack, isPlaying, toggle, volume, setVolume } = useAudioPlayer(config.song);
  const [expanded, setExpanded] = useState(false);

  if (!hasTrack) return null;

  const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full border border-gold-soft/30 bg-warm-white/90 px-3 py-2 shadow-[0_10px_30px_-12px_rgba(42,33,20,0.4)] backdrop-blur"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
    >
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-sunflower-soft text-ink transition active:scale-95"
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>

      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-label="Ajustar volumen"
        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition hover:text-ink"
      >
        <VolumeIcon size={16} />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.input
            key="volume"
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 72, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="accent-sunflower"
            aria-label="Volumen"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

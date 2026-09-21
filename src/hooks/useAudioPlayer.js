import { useEffect, useRef, useState } from "react";

const musicFiles = import.meta.glob("../assets/music/*", {
  eager: true,
  query: "?url",
  import: "default",
});

function resolveTrack(preferredName) {
  const entries = Object.entries(musicFiles);
  if (!entries.length) return null;
  if (preferredName) {
    const match = entries.find(([path]) => path.includes(preferredName));
    if (match) return match[1];
  }
  return entries[0][1];
}

/**
 * Reproductor de audio minimalista. No autorreproduce nunca — solo
 * responde a una interacción explícita del usuario (play manual).
 * Si no hay ningún archivo en src/assets/music, `track` es null y el
 * resto de la app sigue funcionando sin música.
 */
export function useAudioPlayer(preferredName) {
  const track = resolveTrack(preferredName);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!track) return undefined;
    const audio = new Audio(track);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return { hasTrack: Boolean(track), isPlaying, toggle, volume, setVolume };
}

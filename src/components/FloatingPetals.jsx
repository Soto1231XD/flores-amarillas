import { useMemo } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

const PETAL_COLORS = ["#F4B400", "#F6C445", "#FBE28A", "#E0B95F"];

function seededPetals(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: (i * 137.5) % 100,
    delay: (i * 0.37) % 4,
    duration: 8 + ((i * 5) % 7),
    size: 8 + ((i * 3) % 10),
    color: PETAL_COLORS[i % PETAL_COLORS.length],
    rotate: (i * 53) % 360,
  }));
}

/**
 * Lluvia/deriva sutil de pétalos. `density` controla cuántos pétalos
 * se renderizan; `intensity` "ambient" flota suave, "burst" cae más rápido
 * y se usa como celebración puntual (desbloqueo, cierre final).
 */
export default function FloatingPetals({
  density = 14,
  intensity = "ambient",
  className = "",
}) {
  const reducedMotion = usePrefersReducedMotion();
  const petals = useMemo(() => seededPetals(density), [density]);

  if (reducedMotion) return null;

  const isBurst = intensity === "burst";

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {petals.map((petal) => (
        <motion.span
          key={petal.id}
          className="absolute top-[-5%] rounded-full opacity-70"
          style={{
            left: `${petal.left}%`,
            width: petal.size,
            height: petal.size * 0.7,
            background: petal.color,
            borderRadius: "60% 40% 55% 45% / 60% 45% 55% 40%",
          }}
          initial={{ y: "-10%", opacity: 0, rotate: petal.rotate }}
          animate={{
            y: "115%",
            opacity: [0, 0.85, 0.85, 0],
            rotate: petal.rotate + (isBurst ? 220 : 120),
            x: isBurst ? [0, 20, -10, 0] : [0, 12, -12, 0],
          }}
          transition={{
            duration: isBurst ? petal.duration * 0.45 : petal.duration,
            delay: petal.delay,
            repeat: isBurst ? 0 : Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

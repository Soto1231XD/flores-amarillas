import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import YellowFlower from "./YellowFlower";

function layout(seed, count, avoidCenter) {
  return Array.from({ length: count }, (_, i) => {
    const n = seed + i * 17;
    const rawLeft = (n * 53) % 100;
    // Mantiene las flores fuera de la franja central donde suele vivir el texto.
    const left = avoidCenter
      ? rawLeft % 2 === 0
        ? (rawLeft % 22) + 2
        : 100 - ((rawLeft % 22) + 2)
      : rawLeft;

    return {
      id: i,
      left,
      top: (n * 31) % 100,
      size: 30 + ((n * 7) % 46),
      variant: i % 3 === 0 ? "tulip" : "sunflower",
      opacity: 0.14 + ((n * 3) % 20) / 100,
      blur: (n % 3) * 1.2,
    };
  });
}

/**
 * Capa decorativa de flores dispersas con leve parallax al hacer scroll.
 * Uso: envolver una <section relative> y colocar <FlowerBackground /> primero.
 */
export default function FlowerBackground({
  seed = 1,
  count = 6,
  parallax = 24,
  avoidCenter = true,
}) {
  const flowers = useMemo(() => layout(seed, count, avoidCenter), [seed, count, avoidCenter]);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute"
          style={{
            left: `${flower.left}%`,
            top: `${flower.top}%`,
            opacity: flower.opacity,
            filter: `blur(${flower.blur}px)`,
            y,
          }}
        >
          <YellowFlower variant={flower.variant} size={flower.size} sway />
        </motion.div>
      ))}
    </div>
  );
}

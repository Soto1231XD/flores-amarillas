import { motion } from "framer-motion";

/**
 * Flor amarilla estilizada en SVG. Dos variantes: "sunflower" (girasol)
 * y "tulip" (tulipán). Pensada para reutilizarse en fondos, interacciones
 * y composiciones (ramo, maceta, sección de mensajes).
 */
export default function YellowFlower({
  variant = "sunflower",
  size = 64,
  sway = false,
  className = "",
  style = {},
  petalColor,
  ...rest
}) {
  const Flower = variant === "tulip" ? Tulip : Sunflower;

  return (
    <motion.div
      className={className}
      style={{ width: size, height: size, ...style }}
      animate={sway ? { rotate: [-3, 3, -3] } : undefined}
      transition={
        sway ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : undefined
      }
      {...rest}
    >
      <Flower petalColor={petalColor} />
    </motion.div>
  );
}

function Sunflower({ petalColor = "#F4B400" }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <g>
        {petals.map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="22"
            rx="7"
            ry="17"
            fill={petalColor}
            transform={`rotate(${(360 / petals.length) * i} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="14" fill="#7A5A22" />
      <circle cx="50" cy="50" r="14" fill="url(#sunflower-center)" opacity="0.6" />
      <defs>
        <radialGradient id="sunflower-center">
          <stop offset="0%" stopColor="#5C4419" />
          <stop offset="100%" stopColor="#7A5A22" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function Tulip({ petalColor = "#F6C445" }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden="true">
      <path
        d="M50 97 L50 74"
        stroke="#6B7A4F"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M50 86 C38 82 31 89 26 92 C34 97 44 93 50 86Z"
        fill="#6B7A4F"
      />
      <path
        d="M50 12
           C32 12 26 30 33 44
           C25 47 23 58 30 65
           C36 70 45 68 50 61
           C55 68 64 70 70 65
           C77 58 75 47 67 44
           C74 30 68 12 50 12Z"
        fill={petalColor}
      />
      <path
        d="M50 16 C41 23 39 39 44 54 C46 59 54 59 56 54 C61 39 59 23 50 16Z"
        fill="#C9982C"
        opacity="0.35"
      />
    </svg>
  );
}

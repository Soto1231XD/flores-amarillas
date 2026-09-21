import { useId } from "react";
import { motion } from "framer-motion";
import YellowFlower from "./YellowFlower";

const POT_W = 220;
const POT_H = 132;
const POT_CX = 110;
const RIM_CY = 22;
const RIM_RX = 96;
const RIM_RY = 10;

/**
 * Path de una hojita anclada en (cx, cy), apuntando hacia la izquierda
 * (dir = -1) o la derecha (dir = 1).
 */
function leafPath(cx, cy, dir) {
  const dx = 14 * dir;
  return `M${cx} ${cy} C ${cx + dx * 0.55} ${cy - 3} ${cx + dx} ${cy + 7} ${cx + dx * 1.4} ${cy + 9} C ${cx + dx * 0.85} ${cy + 15} ${cx + dx * 0.3} ${cy + 8} ${cx} ${cy} Z`;
}

// Anillos concéntricos en forma de abanico/triángulo: la flor central es
// la más alta (foco), y las laterales descienden progresivamente. Los
// tallos son largos y quedan mayormente VISIBLES — solo su último tramo
// inferior se esconde detrás del borde del bowl.
const RINGS = [
  { proportion: 0.08, size: 64, stemHeight: 140, xRange: 0, rotateRange: 0 },
  { proportion: 0.22, size: 56, stemHeight: 115, xRange: 38, rotateRange: 12 },
  { proportion: 0.32, size: 46, stemHeight: 95, xRange: 55, rotateRange: 17 },
  { proportion: 0.38, size: 38, stemHeight: 75, xRange: 65, rotateRange: 20 },
];

// Nivel (desde la base del contenedor) al que llega el borde frontal del
// bowl — es la línea de oclusión. Los tallos arrancan muy cerca de esa
// línea (apenas 22px por debajo) para que SOLO se oculte su último
// tramo, no la mayor parte del ramo.
const RIM_LEVEL = POT_H - RIM_CY;
const STEM_BASE = RIM_LEVEL - 22;

function ringCounts(total) {
  const counts = RINGS.map((ring) => Math.round(ring.proportion * total));
  let diff = total - counts.reduce((a, b) => a + b, 0);
  let i = counts.length - 1;
  while (diff !== 0 && i >= 0) {
    if (diff > 0) {
      counts[i] += 1;
      diff -= 1;
    } else if (counts[i] > 0) {
      counts[i] -= 1;
      diff += 1;
    }
    i = i === 0 ? counts.length - 1 : i - 1;
  }
  if (counts[0] === 0 && total > 0) {
    const donor = counts.findIndex((c, idx) => idx > 0 && c > 0);
    if (donor !== -1) {
      counts[donor] -= 1;
      counts[0] += 1;
    }
  }
  return counts;
}

function layoutFlowers(flowers) {
  const total = flowers.length || 1;
  const counts = ringCounts(total);
  let cursor = 0;

  return RINGS.flatMap((ring, ringIndex) => {
    const m = counts[ringIndex];
    const ringFlowers = flowers.slice(cursor, cursor + m);
    const startIndex = cursor;
    cursor += m;

    return ringFlowers.map((variant, j) => {
      const u = m > 1 ? (j / (m - 1)) * 2 - 1 : 0; // -1..1
      return {
        key: `${ringIndex}-${j}`,
        variant,
        size: ring.size,
        stemHeight: ring.stemHeight - Math.abs(u) * ring.stemHeight * 0.12,
        offsetPx: u * ring.xRange,
        rotate: u * ring.rotateRange,
        converge: -u * 10, // el pie del tallo se inclina hacia el centro del bowl
        delay: (startIndex + j) * 0.045,
        ring: ringIndex,
      };
    });
  });
}

/**
 * Composición del ramo dentro de un bowl dorado, con oclusión real:
 * fondo del bowl → tallos → flores/hojas → frente del bowl. El frente
 * se pinta por encima de la base de los tallos para que parezca que
 * realmente entran dentro del recipiente, no que flotan sobre él.
 */
export default function Bouquet({ flowers, wrapped = false }) {
  const gradientId = useId();
  const placed = layoutFlowers(flowers).sort(
    (a, b) => a.ring - b.ring || Math.abs(b.offsetPx) - Math.abs(a.offsetPx)
  );

  return (
    <div className="relative mx-auto h-72 w-64 sm:h-80 sm:w-72">
      {/* z1 — fondo/interior del bowl, detrás de los tallos */}
      {wrapped && (
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2">
          <BowlBack idPrefix={gradientId} />
        </div>
      )}

      {/* z2 — tallos */}
      <div className="absolute inset-0 z-20">
        {placed.map(({ key, stemHeight, offsetPx, rotate, converge, delay }) => (
          <div
            key={key}
            className="absolute left-1/2"
            style={{
              bottom: STEM_BASE,
              transform: `translateX(calc(-50% + ${offsetPx}px)) rotate(${rotate}deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <motion.svg
              width="40"
              height={stemHeight}
              viewBox={`0 0 40 ${stemHeight}`}
              className="overflow-visible"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay }}
              aria-hidden="true"
            >
              <path
                d={`M${20 + converge} ${stemHeight} L20 0`}
                stroke="#5C6B41"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>
        ))}
      </div>

      {/* z3 — flores y hojas */}
      <div className="absolute inset-0 z-30">
        {placed.map(({ key, variant, size, stemHeight, offsetPx, rotate, delay }) => (
          <div
            key={key}
            className="absolute left-1/2"
            style={{
              bottom: STEM_BASE,
              transform: `translateX(calc(-50% + ${offsetPx}px)) rotate(${rotate}deg)`,
              transformOrigin: "50% 100%",
            }}
          >
            <motion.div
              className="flex flex-col items-center"
              style={{ transformOrigin: "50% 100%" }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: delay + 0.05 }}
            >
              <YellowFlower variant={variant} size={size} />
              <svg
                width="40"
                height={stemHeight}
                viewBox={`0 0 40 ${stemHeight}`}
                className="overflow-visible"
                aria-hidden="true"
              >
                <path d={leafPath(20, stemHeight * 0.68, -1)} fill="#6B7A4F" />
                <path d={leafPath(20, stemHeight * 0.4, 1)} fill="#5C6B41" />
              </svg>
            </motion.div>
          </div>
        ))}
      </div>

      {/* z4 — frente del bowl: tapa la base de los tallos */}
      {wrapped && (
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/2 z-40 -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <BowlFront idPrefix={gradientId} />
        </motion.div>
      )}
    </div>
  );
}

function potDefs(idPrefix) {
  return (
    <defs>
      <linearGradient id={`${idPrefix}-pot-body`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F2C94C" />
        <stop offset="55%" stopColor="#D8A62E" />
        <stop offset="100%" stopColor="#9C7420" />
      </linearGradient>
      <linearGradient id={`${idPrefix}-pot-rim`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBE28A" />
        <stop offset="100%" stopColor="#C9982C" />
      </linearGradient>
    </defs>
  );
}

// Mitad trasera del borde (el arco superior/lejano). Queda detrás de
// los tallos, sugiriendo la pared interior del bowl.
function BowlBack({ idPrefix }) {
  return (
    <svg width={POT_W} height={POT_H} viewBox={`0 0 ${POT_W} ${POT_H}`} aria-hidden="true">
      {potDefs(idPrefix)}
      <path
        d={`M${POT_CX - RIM_RX} ${RIM_CY} A ${RIM_RX} ${RIM_RY} 0 0 0 ${POT_CX + RIM_RX} ${RIM_CY} Z`}
        fill={`url(#${idPrefix}-pot-rim)`}
        stroke="#8B6914"
        strokeWidth="2"
      />
      <ellipse cx={POT_CX} cy={RIM_CY - 2} rx={RIM_RX * 0.75} ry={RIM_RY * 0.5} fill="#7A5510" opacity="0.35" />
    </svg>
  );
}

// Cuerpo, base y mitad delantera del borde (el arco cercano). Se pinta
// por encima de la base de los tallos, ocultándolos: esa es la
// oclusión que hace ver a las flores "dentro" del bowl.
function BowlFront({ idPrefix }) {
  return (
    <svg width={POT_W} height={POT_H} viewBox={`0 0 ${POT_W} ${POT_H}`} aria-hidden="true">
      {potDefs(idPrefix)}
      <ellipse cx="110" cy="121" rx="48" ry="9" fill="#8B6914" />
      <path
        d="M14 24
           C 2 46, 6 76, 30 98
           C 52 116, 168 116, 190 98
           C 214 76, 218 46, 206 24
           Z"
        fill={`url(#${idPrefix}-pot-body)`}
        stroke="#8B6914"
        strokeWidth="2"
      />
      <path
        d="M30 34 C 12 54, 16 76, 38 92"
        stroke="#FBE28A"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <path
        d={`M${POT_CX - RIM_RX} ${RIM_CY} A ${RIM_RX} ${RIM_RY} 0 0 1 ${POT_CX + RIM_RX} ${RIM_CY} Z`}
        fill={`url(#${idPrefix}-pot-rim)`}
        stroke="#8B6914"
        strokeWidth="2"
      />
    </svg>
  );
}

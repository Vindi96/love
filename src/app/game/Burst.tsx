import styles from "./game.module.css";

export type BurstKind = "confetti" | "hearts";

export type Particle = {
  id: string;
  kind: BurstKind;
  x: number;
  drift: number;
  delay: number;
  duration: number;
  rotate: number;
  size: number;
  color: string;
  glyph: string;
};

const COLORS = ["#ff4f7b", "#ffb703", "#8ecae6", "#c77dff", "#ff8fab", "#80ed99"];
const HEART_GLYPHS = ["❤️", "💖", "💕", "💗", "💘"];
let seq = 0;

/** Called from event handlers only, so randomness never runs during render. */
export function makeParticles(kind: BurstKind): Particle[] {
  const count = kind === "confetti" ? 80 : 24;
  return Array.from({ length: count }, () => ({
    id: `${kind}-${seq++}`,
    kind,
    x: Math.random() * 100,
    drift: (Math.random() - 0.5) * 40,
    delay: Math.random() * 0.4,
    duration: 2 + Math.random() * 1.5,
    rotate: Math.random() * 720 - 360,
    size: kind === "confetti" ? 6 + Math.random() * 6 : 18 + Math.random() * 18,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    glyph: HEART_GLYPHS[Math.floor(Math.random() * HEART_GLYPHS.length)],
  }));
}

export function Burst({ particles }: { particles: Particle[] }) {
  return (
    <div className={styles.burst} aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className={p.kind === "confetti" ? styles.confetti : styles.heartParticle}
          style={
            {
              left: `${p.x}%`,
              "--drift": `${p.drift}vw`,
              "--rot": `${p.rotate}deg`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: p.kind === "confetti" ? p.size : undefined,
              height: p.kind === "confetti" ? p.size * 0.5 : undefined,
              fontSize: p.kind === "hearts" ? p.size : undefined,
              background: p.kind === "confetti" ? p.color : undefined,
            } as React.CSSProperties
          }
        >
          {p.kind === "hearts" ? p.glyph : null}
        </span>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import { puzzle } from "../content";
import styles from "./game.module.css";
import type { BurstKind } from "./Burst";
import { LevelComplete } from "./LevelComplete";

type Props = { onCelebrate: (kind?: BurstKind) => void; onComplete: () => void };

const TILES = puzzle.size * puzzle.size;

function shuffledOrder() {
  const order = Array.from({ length: TILES }, (_, i) => i);
  do {
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
  } while (order.filter((tile, pos) => tile === pos).length > 1);
  return order;
}

export function Puzzle({ onCelebrate, onComplete }: Props) {
  // order[position] = which tile of the photo sits there.
  const [order, setOrder] = useState(shuffledOrder);
  const [selected, setSelected] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [peek, setPeek] = useState(false);
  const [phase, setPhase] = useState<"play" | "solved" | "done">("play");
  // The board takes the photo's real shape (width / height), so portrait or
  // landscape photos are sliced without stretching. Square until it loads.
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setRatio(img.naturalWidth / img.naturalHeight);
    img.src = puzzle.photo;
  }, []);

  if (phase === "done") {
    return (
      <LevelComplete level={2} message={puzzle.message} onContinue={onComplete} onShow={onCelebrate}>
        <figure className={styles.reward}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={puzzle.photo} alt="Us, all pieced together" />
          <figcaption>Solved in {moves} moves 🧩</figcaption>
        </figure>
      </LevelComplete>
    );
  }

  const tap = (pos: number) => {
    if (phase !== "play") return;
    if (selected === null) {
      setSelected(pos);
      return;
    }
    if (selected === pos) {
      setSelected(null);
      return;
    }
    const next = [...order];
    [next[selected], next[pos]] = [next[pos], next[selected]];
    setOrder(next);
    setSelected(null);
    setMoves((m) => m + 1);
    if (next.every((tile, i) => tile === i)) {
      setPhase("solved");
      onCelebrate("hearts");
      setTimeout(() => setPhase("done"), 1400);
    }
  };

  const placed = order.filter((tile, pos) => tile === pos).length;

  return (
    <section className={styles.card}>
      <p className={styles.lead}>
        Oops, I broke our photo! 🙈 Tap two pieces to swap them and put <strong>us</strong> back together.
      </p>

      <div
        className={`${styles.puzzle} ${phase === "solved" ? styles.puzzleSolved : ""}`}
        style={{
          gridTemplateColumns: `repeat(${puzzle.size}, 1fr)`,
          aspectRatio: ratio,
          width: `min(100%, calc(62svh * ${ratio}))`,
        }}
      >
        {order.map((tile, pos) => {
          const row = Math.floor(tile / puzzle.size);
          const col = tile % puzzle.size;
          const step = 100 / (puzzle.size - 1);
          return (
            <button
              key={tile}
              className={`${styles.tile} ${selected === pos ? styles.tileSelected : ""}`}
              style={{
                backgroundImage: `url(${puzzle.photo})`,
                backgroundSize: `${puzzle.size * 100}% ${puzzle.size * 100}%`,
                backgroundPosition: `${col * step}% ${row * step}%`,
              }}
              onClick={() => tap(pos)}
              aria-label={`Puzzle piece ${pos + 1}`}
            />
          );
        })}
        {peek && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.peek} src={puzzle.photo} alt="" />
        )}
      </div>

      <p className={styles.counter}>
        {placed} / {TILES} pieces in place · {moves} moves
      </p>

      <button
        className={styles.secondary}
        style={{ display: "block", margin: "0 auto" }}
        onPointerDown={() => setPeek(true)}
        onPointerUp={() => setPeek(false)}
        onPointerLeave={() => setPeek(false)}
        onContextMenu={(e) => e.preventDefault()}
      >
        👀 Hold to peek
      </button>
    </section>
  );
}

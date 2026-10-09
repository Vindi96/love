import { useState } from "react";
import Image from "next/image";
import { hiddenHearts, hiddenHeartsPhoto } from "../content";
import styles from "./game.module.css";
import type { BurstKind } from "./Burst";
import { LevelComplete } from "./LevelComplete";

type Props = { onCelebrate: (kind?: BurstKind) => void; onComplete: () => void };

export function Hearts({ onCelebrate, onComplete }: Props) {
  const [found, setFound] = useState<number[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <LevelComplete level={3} message="You found every one of them. Just like you found me. ❤️" onContinue={onComplete} onShow={onCelebrate}>
        <ul className={styles.messageList}>
          {hiddenHearts.map((h) => (
            <li key={h.message}>❤️ {h.message}</li>
          ))}
        </ul>
      </LevelComplete>
    );
  }

  const tap = (i: number) => {
    if (found.includes(i)) {
      setLast(i);
      return;
    }
    const next = [...found, i];
    setFound(next);
    setLast(i);
    onCelebrate("hearts");
    if (next.length === hiddenHearts.length) setTimeout(() => setDone(true), 1600);
  };

  return (
    <section className={styles.card}>
      <p className={styles.lead}>
        I hid <strong>{hiddenHearts.length} hearts</strong> in this photo. Find them all! 🔎
      </p>
      <div className={styles.hunt}>
        <Image src={hiddenHeartsPhoto} alt="Us" width={800} height={800} priority />
        {hiddenHearts.map((h, i) => (
          <button
            key={h.message}
            className={`${styles.hidden} ${found.includes(i) ? styles.hiddenFound : ""}`}
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
            onClick={() => tap(i)}
            aria-label={found.includes(i) ? h.message : "Hidden spot"}
          >
            ❤
          </button>
        ))}
      </div>
      <p className={styles.counter}>
        Found {found.length} / {hiddenHearts.length}
      </p>
      {last !== null && (
        <div className={`${styles.feedback} ${styles.feedbackGood}`} key={last}>
          “{hiddenHearts[last].message}” ❤️
        </div>
      )}
    </section>
  );
}

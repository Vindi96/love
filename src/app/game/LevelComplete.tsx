import { useEffect, useRef, type ReactNode } from "react";
import styles from "./game.module.css";
import type { BurstKind } from "./Burst";

type Props = {
  level: number;
  message: string;
  onContinue: () => void;
  onShow: (kind?: BurstKind) => void;
  children?: ReactNode;
};

export function LevelComplete({ level, message, onContinue, onShow, children }: Props) {
  const shown = useRef(false);
  useEffect(() => {
    if (shown.current) return;
    shown.current = true;
    onShow("confetti");
  }, [onShow]);

  return (
    <section className={`${styles.card} ${styles.center} ${styles.pop}`}>
      <div className={styles.unlock}>🔓</div>
      <h2 className={styles.complete}>LEVEL {level} COMPLETE</h2>
      <p className={styles.lead}>{message}</p>
      {children}
      <button className={styles.primary} onClick={onContinue}>
        {level < 4 ? `On to Level ${level + 1} →` : "The final door →"}
      </button>
    </section>
  );
}

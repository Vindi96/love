import { useState } from "react";
import Image from "next/image";
import { finalGallery, gift, letter, names } from "../content";
import styles from "./game.module.css";

const COMPLETED = ["Our Story", "The Puzzle", "Hidden Hearts", "The Quiz"];

export function FinalDoor({ onUnlock, onContinue }: { onUnlock: () => void; onContinue: () => void }) {
  const [unlocked, setUnlocked] = useState(false);

  if (!unlocked) {
    return (
      <section className={`${styles.card} ${styles.cardDark} ${styles.center}`}>
        <div className={styles.lock}>🔐</div>
        <h3 className={styles.complete}>FINAL SURPRISE</h3>
        <p className={styles.lead}>You&apos;ve completed:</p>
        <ul className={styles.checklist}>
          {COMPLETED.map((c, i) => (
            <li key={c} style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
              <span>✓</span> {c}
            </li>
          ))}
        </ul>
        <p className={styles.lead}>One final door remains…</p>
        <button
          className={`${styles.primary} ${styles.glow}`}
          onClick={() => {
            setUnlocked(true);
            onUnlock();
          }}
        >
          UNLOCK MY SURPRISE ❤️
        </button>
      </section>
    );
  }

  return (
    <section className={`${styles.card} ${styles.cardDark} ${styles.center}`}>
      <div className={styles.gallery}>
        {finalGallery.map((src, i) => (
          <div key={src} className={styles.polaroid} style={{ "--i": i } as React.CSSProperties}>
            <Image src={src} alt="" width={240} height={240} />
          </div>
        ))}
      </div>
      <h1 className={`${styles.title} ${styles.fadeUp}`} style={{ animationDelay: "1.6s" }}>
        Happy Birthday, <span>my love.</span> ❤️
      </h1>
      <button className={`${styles.primary} ${styles.fadeUp}`} style={{ animationDelay: "2.4s" }} onClick={onContinue}>
        Read my letter 💌
      </button>
    </section>
  );
}

export function Letter({ onContinue }: { onContinue: () => void }) {
  return (
    <section className={`${styles.paper} ${styles.pop}`}>
      <p className={styles.letterGreeting}>Dear {names.him},</p>
      <h2 className={styles.letterTitle}>{letter.greeting}</h2>
      {letter.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
      {letter.closing.map((line, i) => (
        <p key={line} className={i === 0 || i === letter.closing.length - 1 ? styles.letterBold : ""}>
          {line}
        </p>
      ))}
      <p className={styles.signature}>{letter.signature}</p>
      <figure className={styles.weddingPhoto}>
        <Image src={letter.photo} alt="Our wedding" width={500} height={500} />
      </figure>

      <div className={styles.butWait}>
        <h3>🎁 But wait…</h3>
        <p>You unlocked one final reward.</p>
        <button className={styles.primary} onClick={onContinue}>
          Claim my reward →
        </button>
      </div>
    </section>
  );
}

export function Gift({ onOpen, onRestart }: { onOpen: () => void; onRestart: () => void }) {
  const [opened, setOpened] = useState(false);

  return (
    <section className={`${styles.card} ${styles.cardDark} ${styles.center}`}>
      {!opened ? (
        <>
          <p className={styles.lead}>Tap the box to open it 👇</p>
          <button
            className={styles.giftBox}
            onClick={() => {
              setOpened(true);
              onOpen();
            }}
            aria-label="Open gift"
          >
            <span className={styles.lid} />
            <span className={styles.box} />
          </button>
        </>
      ) : (
        <div className={styles.pop}>
          <p className={styles.eyebrow}>❤️ {gift.title}</p>
          <div className={styles.giftEmoji}>{gift.emoji}</div>
          <p className={styles.giftReveal}>{gift.reveal}</p>
          <h1 className={`${styles.title} ${styles.fadeUp}`} style={{ animationDelay: "1s" }}>
            🎂 Happy Birthday <span>❤️</span>
          </h1>
          <button className={styles.secondary} onClick={onRestart}>
            ↺ Play again
          </button>
        </div>
      )}
    </section>
  );
}

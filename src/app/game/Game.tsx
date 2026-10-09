"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import { funnyQuiz, level1Reward, memoryQuiz, names, scoreVerdict, songSrc } from "../content";
import styles from "./game.module.css";
import { Burst, makeParticles, type BurstKind, type Particle } from "./Burst";
import { Quiz } from "./Quiz";
import { Puzzle } from "./Puzzle";
import { Hearts } from "./Hearts";
import { FinalDoor, Letter, Gift } from "./Finale";
import { LevelComplete } from "./LevelComplete";
import Image from "next/image";

const STAGES = ["start", "l1", "l2", "l3", "l4", "l5", "letter", "gift"] as const;
const LEVEL_TITLES = ["Do You Remember?", "Piece Us Together", "Find My Hidden Message", "How Well Do You Know Me?", "The Final Door"];

// Progress is saved in localStorage so a refresh doesn't send him back to the start.
const STORAGE_KEY = "birthday-mission-stage";
const listeners = new Set<() => void>();
let memoryStage = 0;

function readStage() {
  try {
    const saved = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isInteger(saved) && saved >= 0 && saved < STAGES.length ? saved : 0;
  } catch {
    return memoryStage;
  }
}

function writeStage(index: number) {
  memoryStage = index;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(index));
  } catch {
    // Storage unavailable (private mode etc.) — keep it in memory only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function Game() {
  const stageIndex = useSyncExternalStore(subscribe, readStage, () => 0);
  const stage = STAGES[stageIndex];
  const [particles, setParticles] = useState<Particle[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const celebrate = useCallback((kind: BurstKind = "confetti") => {
    const batch = makeParticles(kind);
    setParticles((p) => [...p, ...batch]);
    const ids = new Set(batch.map((b) => b.id));
    setTimeout(() => setParticles((p) => p.filter((x) => !ids.has(x.id))), 4000);
  }, []);

  const next = useCallback(() => {
    writeStage(Math.min(stageIndex + 1, STAGES.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [stageIndex]);

  const playSong = useCallback(() => {
    audioRef.current
      ?.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // No song file yet, or autoplay blocked — the surprise works without it.
      });
  }, []);

  const toggleSong = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) playSong();
    else {
      audio.pause();
      setPlaying(false);
    }
  };

  const restart = () => {
    audioRef.current?.pause();
    setPlaying(false);
    writeStage(0);
  };

  const levelNumber = stageIndex >= 1 && stageIndex <= 5 ? stageIndex : null;
  const dark = stage === "l5" || stage === "letter" || stage === "gift";

  return (
    <div className={`${styles.app} ${dark ? styles.dark : ""}`}>
      <FloatingHearts />

      {levelNumber && (
        <header className={styles.progress} aria-label={`Level ${levelNumber} of 5`}>
          {LEVEL_TITLES.map((title, i) => (
            <span
              key={title}
              title={title}
              className={`${styles.dot} ${i + 1 < levelNumber ? styles.dotDone : ""} ${i + 1 === levelNumber ? styles.dotActive : ""}`}
            >
              {i + 1 < levelNumber ? "✓" : i + 1 === levelNumber ? i + 1 : "🔒"}
            </span>
          ))}
        </header>
      )}

      <main className={styles.stage} key={stage}>
        {levelNumber && (
          <div className={styles.levelHead}>
            <p className={styles.eyebrow}>Level {String(levelNumber).padStart(2, "0")}</p>
            <h2 className={styles.levelTitle}>{LEVEL_TITLES[levelNumber - 1]}</h2>
          </div>
        )}

        {stage === "start" && (
          <section className={`${styles.card} ${styles.center}`}>
            <div className={styles.cake}>🎂</div>
            <h1 className={styles.title}>
              Happy Birthday, <span>{names.him} Aiya!</span> ❤️
            </h1>
            <p className={styles.lead}>You have a special birthday mission.</p>
            <p className={styles.lead}>
              There are <strong>5 levels</strong> between you and your surprise. 🔐
            </p>
            <p className={styles.lead}>Ready?</p>
            <button
              className={styles.primary}
              onClick={() => {
                celebrate("hearts");
                setTimeout(next, 700);
              }}
            >
              START MISSION →
            </button>
          </section>
        )}

        {stage === "l1" && (
          <Quiz
            questions={memoryQuiz}
            onCorrect={() => celebrate("hearts")}
            renderDone={() => (
              <LevelComplete level={1} message="You remember our story. ❤️" onContinue={next} onShow={celebrate}>
                <figure className={styles.reward}>
                  <Image src={level1Reward.photo} alt={level1Reward.caption} width={400} height={400} />
                  <figcaption>{level1Reward.caption}</figcaption>
                </figure>
              </LevelComplete>
            )}
          />
        )}

        {stage === "l2" && <Puzzle onCelebrate={celebrate} onComplete={next} />}

        {stage === "l3" && <Hearts onCelebrate={celebrate} onComplete={next} />}

        {stage === "l4" && (
          <Quiz
            questions={funnyQuiz}
            scored
            onCorrect={() => celebrate("hearts")}
            renderDone={(score) => (
              <LevelComplete level={4} message="Quiz finished!" onContinue={next} onShow={celebrate}>
                <div className={styles.score}>
                  <p>Relationship score</p>
                  <strong>{score}% ❤️</strong>
                  <p>{scoreVerdict(score)}</p>
                </div>
              </LevelComplete>
            )}
          />
        )}

        {stage === "l5" && <FinalDoor onUnlock={() => { celebrate("confetti"); celebrate("hearts"); playSong(); }} onContinue={next} />}

        {stage === "letter" && <Letter onContinue={next} />}

        {stage === "gift" && <Gift onOpen={() => { celebrate("confetti"); celebrate("confetti"); }} onRestart={restart} />}
      </main>

      <audio ref={audioRef} src={songSrc} loop preload="none" onPause={() => setPlaying(false)} />
      {dark && (
        <button className={styles.music} onClick={toggleSong} aria-label={playing ? "Pause music" : "Play music"}>
          {playing ? "🔊" : "🎵"}
        </button>
      )}

      <Burst particles={particles} />
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className={styles.floating} aria-hidden>
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} style={{ "--i": i } as React.CSSProperties}>
          {i % 3 === 0 ? "💕" : "❤"}
        </span>
      ))}
    </div>
  );
}

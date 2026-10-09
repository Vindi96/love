import { useState, type ReactNode } from "react";
import type { QuizQuestion } from "../content";
import styles from "./game.module.css";

type Props = {
  questions: QuizQuestion[];
  /** Scored: every answer moves on and counts toward a %. Otherwise wrong answers must be retried. */
  scored?: boolean;
  onCorrect: () => void;
  renderDone: (scorePercent: number) => ReactNode;
};

export function Quiz({ questions, scored = false, onCorrect, renderDone }: Props) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [correctCount, setCorrectCount] = useState(0);

  if (index >= questions.length) {
    return renderDone(Math.round((correctCount / questions.length) * 100));
  }

  const q = questions[index];
  const isRight = (i: number) => q.answer === undefined || q.answer === i;
  const solved = picked !== null && (scored || isRight(picked));

  const choose = (i: number) => {
    if (solved) return;
    setPicked(i);
    if (isRight(i)) {
      onCorrect();
      setCorrectCount((c) => c + 1);
    } else {
      setWrongPicks((w) => [...w, i]);
    }
  };

  const advance = () => {
    setIndex((n) => n + 1);
    setPicked(null);
    setWrongPicks([]);
  };

  return (
    <section className={styles.card} key={index}>
      <p className={styles.counter}>
        Question {index + 1} of {questions.length}
      </p>
      <h3 className={styles.question}>{q.question}</h3>

      <div className={styles.options}>
        {q.options.map((option, i) => {
          const state =
            picked === i && isRight(i)
              ? styles.right
              : wrongPicks.includes(i)
                ? `${styles.wrong} ${picked === i ? styles.shake : ""}`
                : "";
          return (
            <button
              key={option}
              className={`${styles.option} ${state}`}
              onClick={() => choose(i)}
              disabled={solved || (!scored && wrongPicks.includes(i))}
            >
              <span className={styles.letter}>{String.fromCharCode(65 + i)}</span>
              {option}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className={`${styles.feedback} ${isRight(picked) ? styles.feedbackGood : styles.feedbackBad}`} key={picked}>
          <strong>{isRight(picked) ? "❤️ Correct!" : "❌ Nope!"}</strong>{" "}
          {isRight(picked) ? q.correct : (q.wrong ?? "Try again!")}
        </div>
      )}

      {solved && (
        <button className={styles.primary} onClick={advance}>
          {index + 1 < questions.length ? "Next question →" : "Finish →"}
        </button>
      )}
    </section>
  );
}

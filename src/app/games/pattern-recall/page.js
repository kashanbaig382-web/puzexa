"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SYMBOLS = ["↑", "↓", "←", "→", "◆", "●"];

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function createPattern(length) {
  return Array.from(
    { length },
    () => SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]
  );
}

function mutatePattern(pattern) {
  const copy = [...pattern];

  const index = Math.floor(Math.random() * copy.length);

  let replacement;

  do {
    replacement =
      SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  } while (replacement === copy[index]);

  copy[index] = replacement;

  return copy;
}

function createRound(score = 0) {
  let length = 4;

  if (score >= 4) length = 5;
  if (score >= 8) length = 6;
  if (score >= 12) length = 7;

  const correctPattern = createPattern(length);

  const optionStrings = new Set([
    correctPattern.join(""),
  ]);

  while (optionStrings.size < 4) {
    optionStrings.add(
      mutatePattern(correctPattern).join("")
    );
  }

  return {
    pattern: correctPattern,
    options: shuffle(
      Array.from(optionStrings).map((item) =>
        Array.from(item)
      )
    ),
  };
}

export default function PatternRecallPage() {
  const [status, setStatus] = useState("idle");
  const [round, setRound] = useState(() => createRound());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(
      "puzexa-pattern-recall-best"
    );

    if (saved) {
      setBestScore(Number(saved));
    }
  }, []);

  const showRound = (nextScore = 0) => {
    const nextRound = createRound(nextScore);

    setRound(nextRound);
    setFeedback("");
    setSelected(null);
    setStatus("showing");

    const showTime = Math.max(
      1100,
      2200 - nextScore * 50
    );

    setTimeout(() => {
      setStatus("choosing");
    }, showTime);
  };

  const startGame = () => {
    setScore(0);
    showRound(0);
  };

  const handleChoice = (pattern, index) => {
    if (status !== "choosing") return;

    setSelected(index);

    const chosen = pattern.join("");
    const correct = round.pattern.join("");

    if (chosen === correct) {
      const nextScore = score + 1;

      setScore(nextScore);
      setFeedback("Perfect memory! 🔥");
      setStatus("correct");

      if (nextScore > bestScore) {
        setBestScore(nextScore);

        localStorage.setItem(
          "puzexa-pattern-recall-best",
          String(nextScore)
        );
      }

      setTimeout(() => {
        showRound(nextScore);
      }, 800);
    } else {
      setFeedback("Wrong pattern. Try the next one.");
      setStatus("wrong");

      setTimeout(() => {
        showRound(score);
      }, 1100);
    }
  };

  return (
    <main className="game-page">
      <header className="game-header">
        <Link href="/" className="logo">
          <span className="logo-mark">P</span>
          PUZEXA
        </Link>

        <Link href="/" className="back-home">
          ← Back to Games
        </Link>
      </header>

      <section className="game-intro">
        <span className="category-pill">
          🧠 Memory
        </span>

        <h1>Pattern Recall</h1>

        <p>
          Memorize the symbol pattern before it disappears, then
          choose the exact pattern you saw.
        </p>
      </section>

      <section className="pattern-recall-layout">
        <div className="pattern-recall-game">
          <div className="pattern-recall-topbar">
            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>

            <div>
              <span>Best</span>
              <strong>{bestScore}</strong>
            </div>
          </div>

          {status === "idle" && (
            <div className="pattern-recall-center">
              <span className="pattern-recall-icon">
                🧩
              </span>

              <h2>Can you remember the pattern?</h2>

              <p>
                Watch carefully. It disappears after a moment.
              </p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}

          {status === "showing" && (
            <div className="pattern-recall-center">
              <span className="pattern-recall-label">
                Memorize this pattern
              </span>

              <div className="pattern-main">
                {round.pattern.map((symbol, index) => (
                  <span key={`${symbol}-${index}`}>
                    {symbol}
                  </span>
                ))}
              </div>

              <p className="pattern-help">
                Remember the exact order...
              </p>
            </div>
          )}

          {status === "choosing" && (
            <div className="pattern-recall-center">
              <span className="pattern-recall-label">
                Which pattern did you see?
              </span>

              <div className="pattern-options">
                {round.options.map(
                  (pattern, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        handleChoice(pattern, index)
                      }
                    >
                      {pattern.map(
                        (symbol, symbolIndex) => (
                          <span
                            key={`${symbol}-${symbolIndex}`}
                          >
                            {symbol}
                          </span>
                        )
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {(status === "correct" ||
            status === "wrong") && (
            <div className="pattern-recall-center">
              <span className="pattern-recall-icon">
                {status === "correct" ? "🔥" : "👀"}
              </span>

              <h2>
                {status === "correct"
                  ? "Correct!"
                  : "Not quite"}
              </h2>

              <p>{feedback}</p>
            </div>
          )}
        </div>

        <aside className="score-panel">
          <div className="score-card">
            <span>Current Score</span>
            <strong>{score}</strong>
          </div>

          <div className="score-card best">
            <span>🏆 Best Score</span>

            <strong>
              {bestScore || "No score yet"}
            </strong>
          </div>

          <div className="score-card">
            <span>How to Play</span>

            <p>
              Memorize the symbols and their exact order. When the
              pattern disappears, choose the matching pattern from
              the four options.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
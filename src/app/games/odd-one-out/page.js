"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ROUNDS = [
  {
    items: ["●", "●", "●", "○", "●", "●"],
    answer: 3,
  },
  {
    items: ["▲", "▲", "△", "▲", "▲", "▲"],
    answer: 2,
  },
  {
    items: ["■", "■", "■", "■", "□", "■", "■", "■"],
    answer: 4,
  },
  {
    items: ["★", "★", "★", "☆", "★", "★", "★", "★"],
    answer: 3,
  },
  {
    items: ["◆", "◆", "◇", "◆", "◆", "◆", "◆", "◆", "◆"],
    answer: 2,
  },
  {
    items: ["⬢", "⬢", "⬢", "⬢", "⬡", "⬢", "⬢", "⬢", "⬢"],
    answer: 4,
  },
];

function getRandomRound(previousIndex = null) {
  let index;

  do {
    index = Math.floor(Math.random() * ROUNDS.length);
  } while (ROUNDS.length > 1 && index === previousIndex);

  return {
    ...ROUNDS[index],
    index,
  };
}

export default function OddOneOutPage() {
  const [status, setStatus] = useState("idle");
  const [round, setRound] = useState(() => getRandomRound());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-odd-one-out-best");

    if (saved) {
      setBestScore(Number(saved));
    }
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    if (timeLeft <= 0) {
      setStatus("finished");

      if (score > bestScore) {
        setBestScore(score);

        localStorage.setItem(
          "puzexa-odd-one-out-best",
          String(score)
        );
      }

      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [status, timeLeft, score, bestScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFeedback("");
    setSelectedIndex(null);
    setRound(getRandomRound());
    setStatus("playing");
  };

  const nextRound = () => {
    setRound((current) => getRandomRound(current.index));
    setSelectedIndex(null);
    setFeedback("");
  };

  const handlePick = (index) => {
    if (status !== "playing") return;

    setSelectedIndex(index);

    if (index === round.answer) {
      setScore((current) => current + 1);
      setFeedback("Correct! 🔥");

      setTimeout(() => {
        nextRound();
      }, 450);
    } else {
      setFeedback("Not that one — try again.");
    }
  };

  const gridClass = useMemo(() => {
    if (round.items.length <= 6) return "small";
    if (round.items.length <= 8) return "medium";
    return "large";
  }, [round.items.length]);

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
        <span className="category-pill">💡 Logic</span>

        <h1>Odd One Out</h1>

        <p>
          Find the symbol that is different from the rest. Think fast
          and score as many points as possible before time runs out.
        </p>
      </section>

      <section className="odd-layout">
        <div className="odd-game">
          <div className="odd-topbar">
            <div>
              <span>Time</span>
              <strong>{timeLeft}s</strong>
            </div>

            <div>
              <span>Score</span>
              <strong>{score}</strong>
            </div>
          </div>

          {status === "idle" && (
            <div className="odd-center">
              <span className="odd-main-icon">🧩</span>
              <h2>Can you spot the difference?</h2>
              <p>You have 30 seconds.</p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}

          {status === "playing" && (
            <div className="odd-center">
              <span className="odd-label">
                Find the different one
              </span>

              <div className={`odd-grid ${gridClass}`}>
                {round.items.map((item, index) => (
                  <button
                    key={`${item}-${index}`}
                    className={`odd-item ${
                      selectedIndex === index ? "selected" : ""
                    }`}
                    onClick={() => handlePick(index)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="odd-feedback">
                {feedback}
              </div>
            </div>
          )}

          {status === "finished" && (
            <div className="odd-center">
              <span className="odd-main-icon">🏁</span>

              <h2>Time&apos;s up!</h2>

              <p>
                Final score: <strong>{score}</strong>
              </p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Play Again
              </button>
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
            <strong>{bestScore || "No score yet"}</strong>
          </div>

          <div className="score-card">
            <span>How to Play</span>

            <p>
              Look carefully at the symbols and click the one that is
              different. Every correct answer gives you one point.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
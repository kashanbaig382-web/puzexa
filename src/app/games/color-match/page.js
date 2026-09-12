"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COLORS = [
  { name: "Red", value: "#ef4444" },
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Yellow", value: "#eab308" },
  { name: "Purple", value: "#a855f7" },
  { name: "Orange", value: "#f97316" },
];

function createRound() {
  const word = COLORS[Math.floor(Math.random() * COLORS.length)];

  let textColor;

  do {
    textColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  } while (textColor.name === word.name);

  return {
    word: word.name,
    correctColor: textColor,
  };
}

export default function ColorMatchPage() {
  const [status, setStatus] = useState("idle");
  const [round, setRound] = useState(createRound());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-color-match-best");

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
          "puzexa-color-match-best",
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
    setRound(createRound());
    setStatus("playing");
  };

  const handleChoice = (color) => {
    if (status !== "playing") return;

    if (color.name === round.correctColor.name) {
      setScore((current) => current + 1);
      setFeedback("Correct! 🔥");

      setTimeout(() => {
        setFeedback("");
        setRound(createRound());
      }, 350);
    } else {
      setFeedback("Wrong color");
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
          ⚡ Reaction
        </span>

        <h1>Color Match</h1>

        <p>
          Ignore what the word says. Choose the actual color of the
          text as quickly as possible.
        </p>
      </section>

      <section className="color-layout">
        <div className="color-game">
          <div className="color-topbar">
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
            <div className="color-center">
              <span className="color-main-icon">🎨</span>

              <h2>Match the color, not the word</h2>

              <p>
                You have 30 seconds. Stay focused.
              </p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}

          {status === "playing" && (
            <div className="color-center">
              <span className="color-label">
                What color is this text?
              </span>

              <div
                className="color-word"
                style={{
                  color: round.correctColor.value,
                }}
              >
                {round.word}
              </div>

              <div className="color-options">
                {COLORS.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleChoice(color)}
                  >
                    <span
                      className="color-dot"
                      style={{
                        backgroundColor: color.value,
                      }}
                    />

                    {color.name}
                  </button>
                ))}
              </div>

              <div className="color-feedback">
                {feedback}
              </div>
            </div>
          )}

          {status === "finished" && (
            <div className="color-center">
              <span className="color-main-icon">🏁</span>

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
            <strong>
              {bestScore || "No score yet"}
            </strong>
          </div>

          <div className="score-card">
            <span>How to Play</span>

            <p>
              Look at the actual color of the large word and click
              the matching color option. Ignore what the word itself
              says.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
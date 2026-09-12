"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COLORS = ["red", "blue", "green", "yellow"];

export default function SequenceMemoryPage() {
  const [sequence, setSequence] = useState([]);
  const [userStep, setUserStep] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [status, setStatus] = useState("idle");
  const [level, setLevel] = useState(0);
  const [bestLevel, setBestLevel] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-sequence-best");

    if (saved) {
      setBestLevel(Number(saved));
    }
  }, []);

  const flashSequence = async (nextSequence) => {
    setStatus("watch");
    setUserStep(0);

    await new Promise((resolve) => setTimeout(resolve, 600));

    for (const color of nextSequence) {
      setActiveColor(color);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setActiveColor(null);

      await new Promise((resolve) => setTimeout(resolve, 220));
    }

    setStatus("play");
  };

  const startGame = () => {
    const firstColor =
      COLORS[Math.floor(Math.random() * COLORS.length)];

    const firstSequence = [firstColor];

    setSequence(firstSequence);
    setLevel(1);
    setStatus("watch");

    flashSequence(firstSequence);
  };

  const nextRound = (currentSequence) => {
    const nextColor =
      COLORS[Math.floor(Math.random() * COLORS.length)];

    const nextSequence = [...currentSequence, nextColor];

    setSequence(nextSequence);
    setLevel(nextSequence.length);

    flashSequence(nextSequence);
  };

  const handleColorClick = (color) => {
    if (status !== "play") return;

    if (color !== sequence[userStep]) {
      setStatus("gameOver");

      if (level > bestLevel) {
        setBestLevel(level);

        localStorage.setItem(
          "puzexa-sequence-best",
          String(level)
        );
      }

      return;
    }

    const nextStep = userStep + 1;

    if (nextStep === sequence.length) {
      setStatus("success");

      setTimeout(() => {
        nextRound(sequence);
      }, 700);
    } else {
      setUserStep(nextStep);
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

        <h1>Sequence Memory</h1>

        <p>
          Watch the pattern carefully and repeat it in the exact
          same order. Each round adds one more step.
        </p>
      </section>

      <section className="sequence-layout">
        <div className="sequence-game-card">
          <div className="sequence-status">
            <span>Level</span>
            <strong>{level || "—"}</strong>
          </div>

          <div className="sequence-board">
            {COLORS.map((color) => (
              <button
                key={color}
                className={`sequence-pad ${color} ${
                  activeColor === color ? "active" : ""
                }`}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>

          <div className="sequence-message">
            {status === "idle" && (
              <>
                <h2>Ready?</h2>
                <p>
                  Press start and memorize the sequence.
                </p>
              </>
            )}

            {status === "watch" && (
              <>
                <h2>Watch carefully...</h2>
                <p>Remember the order.</p>
              </>
            )}

            {status === "play" && (
              <>
                <h2>Your turn</h2>
                <p>
                  Repeat the sequence in the same order.
                </p>
              </>
            )}

            {status === "success" && (
              <>
                <h2>Correct! 🔥</h2>
                <p>Next level...</p>
              </>
            )}

            {status === "gameOver" && (
              <>
                <h2>Wrong sequence 😭</h2>
                <p>You reached level {level}.</p>
              </>
            )}
          </div>

          {(status === "idle" ||
            status === "gameOver") && (
            <button
              className="game-start-btn"
              onClick={startGame}
            >
              {status === "gameOver"
                ? "Play Again"
                : "Start Game"}
            </button>
          )}
        </div>

        <aside className="score-panel">
          <div className="score-card">
            <span>Current Level</span>
            <strong>{level || "—"}</strong>
          </div>

          <div className="score-card best">
            <span>🏆 Best Level</span>
            <strong>
              {bestLevel || "No score yet"}
            </strong>
          </div>

          <div className="score-card">
            <span>How to Play</span>
            <p>
              Watch the colors flash, then click them back in the
              same order. Every successful round adds one more
              color.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
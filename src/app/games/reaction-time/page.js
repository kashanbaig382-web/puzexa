"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ReactionTimePage() {
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("Click Start to begin");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestScore, setBestScore] = useState(null);

  const startTimeRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const savedBest = localStorage.getItem("puzexa-reaction-best");

    if (savedBest) {
      setBestScore(Number(savedBest));
    }

    return () => clearTimeout(timerRef.current);
  }, []);

  const startGame = () => {
    clearTimeout(timerRef.current);

    setReactionTime(null);
    setStatus("waiting");
    setMessage("Wait for green...");

    const delay = Math.floor(Math.random() * 3000) + 2000;

    timerRef.current = setTimeout(() => {
      setStatus("ready");
      setMessage("CLICK!");
      startTimeRef.current = performance.now();
    }, delay);
  };

  const handleGameClick = () => {
    if (status === "waiting") {
      clearTimeout(timerRef.current);

      setStatus("tooSoon");
      setMessage("Too soon! 😭");
      return;
    }

    if (status === "ready") {
      const result = Math.round(
        performance.now() - startTimeRef.current
      );

      setReactionTime(result);
      setStatus("result");
      setMessage(`${result} ms`);

      if (bestScore === null || result < bestScore) {
        setBestScore(result);

        localStorage.setItem(
          "puzexa-reaction-best",
          String(result)
        );
      }
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

        <h1>Reaction Time</h1>

        <p>
          Test how fast you can react. Wait until the screen turns
          green, then click as quickly as possible.
        </p>
      </section>

      <section className="reaction-layout">
        <div
          className={`reaction-box ${status}`}
          onClick={handleGameClick}
        >
          <div className="reaction-content">
            <span className="reaction-icon">
              {status === "ready" ? "⚡" : "🎯"}
            </span>

            <h2>{message}</h2>

            {status === "idle" && (
              <button
                className="game-start-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  startGame();
                }}
              >
                Start Game
              </button>
            )}

            {(status === "result" ||
              status === "tooSoon") && (
              <button
                className="game-start-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  startGame();
                }}
              >
                Play Again
              </button>
            )}

            {status === "waiting" && (
              <p>Don&apos;t click yet...</p>
            )}

            {status === "ready" && (
              <p>Click anywhere in this box!</p>
            )}
          </div>
        </div>

        <aside className="score-panel">
          <div className="score-card">
            <span>Latest Score</span>

            <strong>
              {reactionTime
                ? `${reactionTime} ms`
                : "—"}
            </strong>
          </div>

          <div className="score-card best">
            <span>🏆 Best Score</span>

            <strong>
              {bestScore
                ? `${bestScore} ms`
                : "No score yet"}
            </strong>
          </div>

          <div className="score-card">
            <span>How to Play</span>

            <p>
              Press Start, wait for green, then click as fast as
              possible.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
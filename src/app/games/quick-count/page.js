"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function generateRound(score = 0) {
  let min = 3;
  let max = 8;

  if (score >= 5) {
    min = 5;
    max = 12;
  }

  if (score >= 10) {
    min = 7;
    max = 16;
  }

  if (score >= 15) {
    min = 10;
    max = 20;
  }

  const count =
    Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    count,
  };
}

export default function QuickCountPage() {
  const [status, setStatus] = useState("idle");
  const [round, setRound] = useState(() => generateRound());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(
      "puzexa-quick-count-best"
    );

    if (saved) {
      setBestScore(Number(saved));
    }
  }, []);

  const showRound = (nextScore = 0) => {
    const nextRound = generateRound(nextScore);

    setRound(nextRound);
    setInput("");
    setFeedback("");
    setStatus("showing");

    const showTime = Math.max(
      650,
      1400 - nextScore * 35
    );

    setTimeout(() => {
      setStatus("answering");
    }, showTime);
  };

  const startGame = () => {
    setScore(0);
    showRound(0);
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    if (!input.trim()) return;

    const answer = Number(input);

    if (answer === round.count) {
      const nextScore = score + 1;

      setScore(nextScore);
      setFeedback("Correct! 🔥");
      setStatus("correct");

      if (nextScore > bestScore) {
        setBestScore(nextScore);

        localStorage.setItem(
          "puzexa-quick-count-best",
          String(nextScore)
        );
      }

      setTimeout(() => {
        showRound(nextScore);
      }, 700);
    } else {
      setFeedback(
        `Not quite. There were ${round.count} dots.`
      );

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
          🔢 Numbers
        </span>

        <h1>Quick Count</h1>

        <p>
          Count the dots before they disappear and enter the correct
          number as fast as you can.
        </p>
      </section>

      <section className="quick-count-layout">
        <div className="quick-count-game">
          <div className="quick-count-topbar">
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
            <div className="quick-count-center">
              <span className="quick-count-icon">
                ⚡
              </span>

              <h2>How fast can you count?</h2>

              <p>
                The dots disappear faster as your score increases.
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
            <div className="quick-count-center">
              <span className="quick-count-label">
                Count quickly
              </span>

              <div className="quick-count-board">
                {Array.from({
                  length: round.count,
                }).map((_, index) => (
                  <span
                    key={index}
                    className="quick-count-dot"
                    style={{
                      "--delay": `${index * 20}ms`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {status === "answering" && (
            <div className="quick-count-center">
              <span className="quick-count-label">
                How many dots did you see?
              </span>

              <form
                className="quick-count-form"
                onSubmit={submitAnswer}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={input}
                  onChange={(event) =>
                    setInput(
                      event.target.value.replace(
                        /\D/g,
                        ""
                      )
                    )
                  }
                  placeholder="Enter number"
                  autoFocus
                />

                <button type="submit">
                  Submit →
                </button>
              </form>
            </div>
          )}

          {status === "correct" && (
            <div className="quick-count-center">
              <span className="quick-count-icon">
                🔥
              </span>

              <h2>Correct!</h2>

              <p>Get ready for the next round.</p>
            </div>
          )}

          {status === "wrong" && (
            <div className="quick-count-center">
              <span className="quick-count-icon">
                👀
              </span>

              <h2>Almost!</h2>

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
              Count the dots while they are visible. When they
              disappear, type the total number you saw. Correct
              answers increase the difficulty.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
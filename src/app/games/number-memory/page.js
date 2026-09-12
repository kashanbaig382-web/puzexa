"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function generateNumber(length) {
  let value = "";

  for (let i = 0; i < length; i++) {
    value += Math.floor(Math.random() * 10);
  }

  return value;
}

export default function NumberMemoryPage() {
  const [status, setStatus] = useState("idle");
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(0);
  const [number, setNumber] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("Press Start to begin");

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-number-memory-best");

    if (saved) {
      setBestLevel(Number(saved));
    }
  }, []);

  const showNumber = (nextLevel) => {
    const digits = nextLevel + 2;
    const nextNumber = generateNumber(digits);

    setNumber(nextNumber);
    setInput("");
    setMessage("Memorize this number");
    setStatus("showing");

    const displayTime = Math.min(1200 + digits * 250, 3200);

    setTimeout(() => {
      setStatus("input");
      setMessage("What was the number?");
    }, displayTime);
  };

  const startGame = () => {
    setLevel(1);
    showNumber(1);
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    if (!input.trim()) return;

    if (input === number) {
      const nextLevel = level + 1;

      setMessage("Correct! 🔥");
      setStatus("correct");

      setTimeout(() => {
        setLevel(nextLevel);
        showNumber(nextLevel);
      }, 700);
    } else {
      setStatus("gameOver");
      setMessage(`Correct number was ${number}`);

      if (level > bestLevel) {
        setBestLevel(level);

        localStorage.setItem(
          "puzexa-number-memory-best",
          String(level)
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
        <span className="category-pill">🧠 Memory</span>

        <h1>Number Memory</h1>

        <p>
          Memorize the number before it disappears, then type it back
          correctly. Each level adds another digit.
        </p>
      </section>

      <section className="number-memory-layout">
        <div className="number-memory-game">
          <div className="number-memory-topbar">
            <div>
              <span>Level</span>
              <strong>{level}</strong>
            </div>

            <div>
              <span>Digits</span>
              <strong>{level + 2}</strong>
            </div>
          </div>

          {status === "idle" && (
            <div className="number-memory-center">
              <span className="number-memory-icon">🔢</span>

              <h2>How many digits can you remember?</h2>

              <p>Each correct answer makes the number longer.</p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}

          {status === "showing" && (
            <div className="number-memory-center">
              <span className="number-memory-label">
                Memorize
              </span>

              <div className="memory-number">
                {number}
              </div>

              <p>It will disappear in a moment...</p>
            </div>
          )}

          {status === "input" && (
            <div className="number-memory-center">
              <span className="number-memory-label">
                {message}
              </span>

              <form
                className="number-memory-form"
                onSubmit={submitAnswer}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={input}
                  onChange={(event) =>
                    setInput(
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Type the number"
                  autoFocus
                />

                <button type="submit">
                  Submit →
                </button>
              </form>
            </div>
          )}

          {status === "correct" && (
            <div className="number-memory-center">
              <span className="number-memory-icon">🔥</span>

              <h2>Correct!</h2>

              <p>Next number is getting longer.</p>
            </div>
          )}

          {status === "gameOver" && (
            <div className="number-memory-center">
              <span className="number-memory-icon">😭</span>

              <h2>Not quite</h2>

              <p>{message}</p>

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
            <span>Current Level</span>
            <strong>{level}</strong>
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
              Memorize the displayed number. When it disappears,
              enter the exact same digits. Every successful round
              increases the difficulty.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
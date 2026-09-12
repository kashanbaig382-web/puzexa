"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function createQuestion() {
  const operators = ["+", "-", "×"];
  const operator =
    operators[Math.floor(Math.random() * operators.length)];

  let a = Math.floor(Math.random() * 20) + 1;
  let b = Math.floor(Math.random() * 20) + 1;

  if (operator === "-" && b > a) {
    [a, b] = [b, a];
  }

  if (operator === "×") {
    a = Math.floor(Math.random() * 12) + 1;
    b = Math.floor(Math.random() * 12) + 1;
  }

  let answer;

  if (operator === "+") answer = a + b;
  if (operator === "-") answer = a - b;
  if (operator === "×") answer = a * b;

  return {
    text: `${a} ${operator} ${b}`,
    answer,
  };
}

export default function SpeedMathPage() {
  const [status, setStatus] = useState("idle");
  const [question, setQuestion] = useState(createQuestion());
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-speed-math-best");

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
          "puzexa-speed-math-best",
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
    setStatus("playing");
    setScore(0);
    setTimeLeft(30);
    setInput("");
    setFeedback("");
    setQuestion(createQuestion());
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    if (status !== "playing") return;

    const numericAnswer = Number(input);

    if (input.trim() === "") return;

    if (numericAnswer === question.answer) {
      setScore((current) => current + 1);
      setFeedback("Correct! 🔥");
    } else {
      setFeedback(`Answer: ${question.answer}`);
    }

    setInput("");
    setQuestion(createQuestion());

    setTimeout(() => {
      setFeedback("");
    }, 600);
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

        <h1>Speed Math</h1>

        <p>
          Solve as many math questions as you can in 30 seconds.
          Think fast, stay accurate, and beat your best score.
        </p>
      </section>

      <section className="speed-math-layout">
        <div className="speed-math-game">
          <div className="math-topbar">
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
            <div className="math-center">
              <span className="math-icon">➗</span>
              <h2>Ready to test your speed?</h2>
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
            <div className="math-center">
              <span className="math-label">
                Solve this:
              </span>

              <h2 className="math-question">
                {question.text}
              </h2>

              <form
                className="math-form"
                onSubmit={submitAnswer}
              >
                <input
                  type="number"
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Your answer"
                  autoFocus
                />

                <button type="submit">
                  Submit →
                </button>
              </form>

              <div className="math-feedback">
                {feedback}
              </div>
            </div>
          )}

          {status === "finished" && (
            <div className="math-center">
              <span className="math-icon">🏁</span>

              <h2>Time&apos;s up!</h2>

              <p>
                You solved <strong>{score}</strong>{" "}
                questions correctly.
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
              Solve each question and press Submit. Correct answers
              add one point. Try to score as high as possible before
              the timer reaches zero.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
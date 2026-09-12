"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const WORDS = [
  { word: "planet", hint: "A world that moves around a star" },
  { word: "memory", hint: "Your ability to remember things" },
  { word: "rocket", hint: "It can travel into space" },
  { word: "puzzle", hint: "A problem designed to test thinking" },
  { word: "orange", hint: "A fruit and a color" },
  { word: "window", hint: "You can look through it" },
  { word: "camera", hint: "Used to capture photos" },
  { word: "school", hint: "A place where students learn" },
  { word: "keyboard", hint: "You use it to type" },
  { word: "browser", hint: "Software used to visit websites" },
  { word: "diamond", hint: "A valuable gemstone" },
  { word: "library", hint: "A place filled with books" },
  { word: "battery", hint: "It stores electrical energy" },
  { word: "journey", hint: "Travel from one place to another" },
  { word: "picture", hint: "Another word for an image" },
];

function scrambleWord(word) {
  const letters = word.split("");
  let scrambled = word;

  while (scrambled === word && word.length > 1) {
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    scrambled = letters.join("");
  }

  return scrambled;
}

export default function WordScramblePage() {
  const [status, setStatus] = useState("idle");
  const [currentWord, setCurrentWord] = useState(null);
  const [scrambled, setScrambled] = useState("");
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-word-scramble-best");

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
          "puzexa-word-scramble-best",
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

  const pickWord = () => {
    let nextWord;

    do {
      nextWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    } while (
      currentWord &&
      WORDS.length > 1 &&
      nextWord.word === currentWord.word
    );

    setCurrentWord(nextWord);
    setScrambled(scrambleWord(nextWord.word));
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setInput("");
    setFeedback("");
    setStatus("playing");

    const firstWord = WORDS[Math.floor(Math.random() * WORDS.length)];

    setCurrentWord(firstWord);
    setScrambled(scrambleWord(firstWord.word));
  };

  const submitAnswer = (event) => {
    event.preventDefault();

    if (!currentWord || !input.trim()) return;

    if (
      input.trim().toLowerCase() ===
      currentWord.word.toLowerCase()
    ) {
      setScore((current) => current + 1);
      setFeedback("Correct! 🔥");
      setInput("");

      setTimeout(() => {
        setFeedback("");
      }, 500);

      pickWord();
    } else {
      setFeedback("Not quite — try again.");
    }
  };

  const skipWord = () => {
    if (status !== "playing") return;

    setInput("");
    setFeedback("");
    pickWord();
  };

  const displayLetters = useMemo(
    () => scrambled.toUpperCase().split(""),
    [scrambled]
  );

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
        <span className="category-pill">🔤 Words</span>

        <h1>Word Scramble</h1>

        <p>
          Unscramble as many words as possible before the timer
          reaches zero. Use the hint when you get stuck.
        </p>
      </section>

      <section className="word-layout">
        <div className="word-game">
          <div className="word-topbar">
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
            <div className="word-center">
              <span className="word-main-icon">🔤</span>
              <h2>Ready to unscramble?</h2>
              <p>You have 60 seconds. Every correct word = 1 point.</p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}

          {status === "playing" && currentWord && (
            <div className="word-center">
              <span className="word-label">
                Unscramble this word
              </span>

              <div className="scrambled-letters">
                {displayLetters.map((letter, index) => (
                  <span key={`${letter}-${index}`}>
                    {letter}
                  </span>
                ))}
              </div>

              <div className="word-hint">
                💡 {currentWord.hint}
              </div>

              <form
                className="word-form"
                onSubmit={submitAnswer}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(event) =>
                    setInput(event.target.value)
                  }
                  placeholder="Type the word"
                  autoComplete="off"
                  autoFocus
                />

                <button type="submit">
                  Check →
                </button>
              </form>

              <button
                className="word-skip"
                onClick={skipWord}
              >
                Skip word
              </button>

              <div className="word-feedback">
                {feedback}
              </div>
            </div>
          )}

          {status === "finished" && (
            <div className="word-center">
              <span className="word-main-icon">🏁</span>
              <h2>Time&apos;s up!</h2>

              <p>
                You unscrambled <strong>{score}</strong>{" "}
                {score === 1 ? "word" : "words"}.
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
              Rearrange the displayed letters to find the hidden
              word. Type your answer and press Check. Skip a word
              if you get stuck.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
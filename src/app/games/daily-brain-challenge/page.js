"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function createSeed(text) {
  let hash = 0;

  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }

  return hash || 1;
}

function seededRandom(seed) {
  let value = seed;

  return function random() {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function shuffleWithRandom(array, random) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function buildOptions(answer, random) {
  const options = new Set([answer]);

  while (options.size < 4) {
    const offset = Math.floor(random() * 8) + 1;

    const value =
      random() > 0.5
        ? answer + offset
        : answer - offset;

    if (value >= 0 && value !== answer) {
      options.add(value);
    }
  }

  return shuffleWithRandom(Array.from(options), random);
}

function createDailyChallenge(dateKey) {
  const random = seededRandom(createSeed(dateKey));

  // ROUND 1 - QUICK MATH
  const a = Math.floor(random() * 15) + 4;
  const b = Math.floor(random() * 12) + 3;
  const mathAnswer = a + b;

  // ROUND 2 - NUMBER SEQUENCE
  const sequenceStart = Math.floor(random() * 10) + 2;
  const sequenceStep = Math.floor(random() * 5) + 2;

  const sequence = [
    sequenceStart,
    sequenceStart + sequenceStep,
    sequenceStart + sequenceStep * 2,
    sequenceStart + sequenceStep * 3,
  ];

  const sequenceAnswer =
    sequenceStart + sequenceStep * 4;

  // ROUND 3 - QUICK COUNT
  const countAnswer =
    Math.floor(random() * 8) + 7;

  // ROUND 4 - ODD ONE OUT
  const normalValue =
    Math.floor(random() * 10) + 10;

  const oddAnswer =
    normalValue + Math.floor(random() * 4) + 1;

  const oddItems = [
    normalValue,
    normalValue,
    normalValue,
    oddAnswer,
    normalValue,
    normalValue,
  ];

  const shuffledOdd = shuffleWithRandom(
    oddItems,
    random
  );

  // ROUND 5 - WORD
  const words = [
    {
      word: "BRAIN",
      clue: "The organ you use to think",
    },
    {
      word: "LOGIC",
      clue: "Reasoning used to solve problems",
    },
    {
      word: "FOCUS",
      clue: "Concentrated attention",
    },
    {
      word: "MEMORY",
      clue: "Ability to remember information",
    },
    {
      word: "PUZZLE",
      clue: "A problem designed to test thinking",
    },
  ];

  const word =
    words[Math.floor(random() * words.length)];

  const wrongWords = words
    .filter((item) => item.word !== word.word)
    .map((item) => item.word);

  return [
    {
      type: "Quick Math",
      icon: "➗",
      question: `What is ${a} + ${b}?`,
      answer: mathAnswer,
      options: buildOptions(mathAnswer, random),
    },

    {
      type: "Logic Sequence",
      icon: "🧠",
      question: `${sequence.join("  →  ")}  →  ?`,
      answer: sequenceAnswer,
      options: buildOptions(sequenceAnswer, random),
    },

    {
      type: "Quick Count",
      icon: "⚡",
      question: "How many dots are shown?",
      answer: countAnswer,
      options: buildOptions(countAnswer, random),
      dots: countAnswer,
    },

    {
      type: "Odd One Out",
      icon: "🔲",
      question: "Which number is different?",
      answer: oddAnswer,
      options: shuffledOdd,
      oddRound: true,
    },

    {
      type: "Word Challenge",
      icon: "🔤",
      question: word.clue,
      answer: word.word,
      options: shuffleWithRandom(
        [
          word.word,
          ...wrongWords.slice(0, 3),
        ],
        random
      ),
    },
  ];
}

function getYesterdayKey() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  return getLocalDateKey(date);
}

export default function DailyBrainChallengePage() {
  const [dateKey, setDateKey] = useState("");
  const [status, setStatus] = useState("loading");

  const [currentRound, setCurrentRound] =
    useState(0);

  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const [dailyBest, setDailyBest] = useState(0);
  const [streak, setStreak] = useState(0);

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const today = getLocalDateKey();

    setDateKey(today);

    const savedResult = localStorage.getItem(
      `puzexa-daily-${today}`
    );

    const streakData = JSON.parse(
      localStorage.getItem(
        "puzexa-daily-streak"
      ) || "{}"
    );

    setStreak(streakData.streak || 0);

    if (savedResult) {
      const parsed = JSON.parse(savedResult);

      setDailyBest(parsed.bestScore || parsed.score || 0);
      setStatus("completed");
    } else {
      setStatus("idle");
    }
  }, []);

  const challenge = useMemo(() => {
    if (!dateKey) return [];

    return createDailyChallenge(dateKey);
  }, [dateKey]);

  const startChallenge = () => {
    setScore(0);
    setCurrentRound(0);
    setSelected(null);
    setFeedback("");
    setStatus("playing");
  };

  const finishChallenge = (finalScore) => {
    const existing = JSON.parse(
      localStorage.getItem(
        `puzexa-daily-${dateKey}`
      ) || "{}"
    );

    const bestScore = Math.max(
      finalScore,
      existing.bestScore || 0
    );

    localStorage.setItem(
      `puzexa-daily-${dateKey}`,
      JSON.stringify({
        date: dateKey,
        score: finalScore,
        bestScore,
        completed: true,
      })
    );

    setDailyBest(bestScore);

    const streakData = JSON.parse(
      localStorage.getItem(
        "puzexa-daily-streak"
      ) || "{}"
    );

    let nextStreak = streakData.streak || 0;

    if (streakData.lastCompleted !== dateKey) {
      if (
        streakData.lastCompleted ===
        getYesterdayKey()
      ) {
        nextStreak += 1;
      } else {
        nextStreak = 1;
      }

      localStorage.setItem(
        "puzexa-daily-streak",
        JSON.stringify({
          streak: nextStreak,
          lastCompleted: dateKey,
        })
      );
    }

    setStreak(nextStreak);
    setStatus("completed");
  };

  const handleAnswer = (option) => {
    if (
      status !== "playing" ||
      selected !== null
    ) {
      return;
    }

    const round = challenge[currentRound];

    setSelected(option);

    const isCorrect = option === round.answer;

    const nextScore = isCorrect
      ? score + 1
      : score;

    if (isCorrect) {
      setScore(nextScore);
      setFeedback("Correct! 🔥");
    } else {
      setFeedback(
        `Correct answer: ${round.answer}`
      );
    }

    setTimeout(() => {
      if (
        currentRound ===
        challenge.length - 1
      ) {
        finishChallenge(nextScore);
        return;
      }

      setCurrentRound(
        (current) => current + 1
      );

      setSelected(null);
      setFeedback("");
    }, 900);
  };

  if (status === "loading") {
    return (
      <main className="game-page">
        <div className="daily-loading">
          Loading today&apos;s challenge...
        </div>
      </main>
    );
  }

  const activeRound =
    challenge[currentRound];

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
          🏆 Daily Challenge
        </span>

        <h1>Daily Brain Challenge</h1>

        <p>
          Five quick challenges. One fresh set every day.
          Complete today&apos;s challenge and keep your streak alive.
        </p>
      </section>

      <section className="daily-layout">
        <div className="daily-game">
          <div className="daily-topbar">
            <div>
              <span>Today</span>
              <strong>{dateKey}</strong>
            </div>

            <div>
              <span>🔥 Streak</span>
              <strong>{streak} days</strong>
            </div>
          </div>

          {status === "idle" && (
            <div className="daily-center">
              <span className="daily-main-icon">
                🏆
              </span>

              <h2>Today&apos;s challenge is ready</h2>

              <p>
                5 rounds mixing numbers, memory, logic and focus.
              </p>

              <button
                className="game-start-btn"
                onClick={startChallenge}
              >
                Start Today&apos;s Challenge
              </button>
            </div>
          )}

          {status === "playing" &&
            activeRound && (
              <div className="daily-center">
                <div className="daily-progress">
                  <span>
                    Round {currentRound + 1} of{" "}
                    {challenge.length}
                  </span>

                  <div className="daily-progress-track">
                    <div
                      className="daily-progress-fill"
                      style={{
                        width: `${
                          ((currentRound + 1) /
                            challenge.length) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <span className="daily-round-type">
                  {activeRound.icon}{" "}
                  {activeRound.type}
                </span>

                <h2 className="daily-question">
                  {activeRound.question}
                </h2>

                {activeRound.dots && (
                  <div className="daily-dots">
                    {Array.from({
                      length:
                        activeRound.dots,
                    }).map((_, index) => (
                      <span key={index} />
                    ))}
                  </div>
                )}

                <div
                  className={`daily-options ${
                    activeRound.oddRound
                      ? "odd-options"
                      : ""
                  }`}
                >
                  {activeRound.options.map(
                    (option, index) => {
                      const isSelected =
                        selected === option;

                      const isCorrect =
                        selected !== null &&
                        option ===
                          activeRound.answer;

                      const isWrong =
                        isSelected &&
                        option !==
                          activeRound.answer;

                      return (
                        <button
                          key={`${option}-${index}`}
                          onClick={() =>
                            handleAnswer(
                              option
                            )
                          }
                          className={`
                            ${
                              isCorrect
                                ? "correct"
                                : ""
                            }
                            ${
                              isWrong
                                ? "wrong"
                                : ""
                            }
                          `}
                        >
                          {option}
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="daily-feedback">
                  {feedback}
                </div>
              </div>
            )}

          {status === "completed" && (
            <div className="daily-center">
              <span className="daily-main-icon">
                🎉
              </span>

              <h2>Daily Challenge Complete!</h2>

              <p>
                Today&apos;s best score is{" "}
                <strong>
                  {dailyBest}/5
                </strong>
                .
              </p>

              <div className="daily-complete-stats">
                <div>
                  <span>Today&apos;s Best</span>
                  <strong>
                    {dailyBest}/5
                  </strong>
                </div>

                <div>
                  <span>🔥 Current Streak</span>
                  <strong>
                    {streak} days
                  </strong>
                </div>
              </div>

              <button
                className="game-start-btn"
                onClick={startChallenge}
              >
                Replay Today&apos;s Challenge
              </button>

              <span className="daily-return">
                Come back tomorrow for a new challenge.
              </span>
            </div>
          )}
        </div>

        <aside className="score-panel">
          <div className="score-card">
            <span>Current Score</span>
            <strong>
              {status === "completed"
                ? dailyBest
                : score}
              /5
            </strong>
          </div>

          <div className="score-card best">
            <span>🏆 Today&apos;s Best</span>

            <strong>
              {dailyBest
                ? `${dailyBest}/5`
                : "Not completed"}
            </strong>
          </div>

          <div className="score-card">
            <span>🔥 Daily Streak</span>
            <strong>
              {streak} days
            </strong>
          </div>

          <div className="score-card">
            <span>How it Works</span>

            <p>
              PUZEXA creates one fixed five-round challenge each
              day. Complete it today, then return tomorrow for a new
              challenge and continue your streak.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
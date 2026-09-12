"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function createQuestion(score = 0) {
    const difficulty = score < 5 ? 1 : score < 10 ? 2 : 3;

    const patterns =
        difficulty === 1
            ? ["add", "subtract"]
            : difficulty === 2
                ? ["add", "subtract", "multiply", "alternating"]
                : ["add", "subtract", "multiply", "alternating", "growing"];

    const type = patterns[Math.floor(Math.random() * patterns.length)];

    let sequence = [];
    let answer;

    if (type === "add") {
        const start = Math.floor(Math.random() * 20) + 1;
        const step = Math.floor(Math.random() * 8) + 2;

        sequence = [
            start,
            start + step,
            start + step * 2,
            start + step * 3,
        ];

        answer = start + step * 4;
    }

    if (type === "subtract") {
        const step = Math.floor(Math.random() * 7) + 2;
        const start = Math.floor(Math.random() * 25) + 30;

        sequence = [
            start,
            start - step,
            start - step * 2,
            start - step * 3,
        ];

        answer = start - step * 4;
    }

    if (type === "multiply") {
        const multiplier = Math.random() > 0.5 ? 2 : 3;
        const start = Math.floor(Math.random() * 4) + 1;

        sequence = [
            start,
            start * multiplier,
            start * multiplier ** 2,
            start * multiplier ** 3,
        ];

        answer = start * multiplier ** 4;
    }

    if (type === "alternating") {
        const start = Math.floor(Math.random() * 10) + 1;
        const addOne = Math.floor(Math.random() * 5) + 2;
        const addTwo = Math.floor(Math.random() * 6) + 4;

        const a = start;
        const b = a + addOne;
        const c = b + addTwo;
        const d = c + addOne;

        sequence = [a, b, c, d];
        answer = d + addTwo;
    }

    if (type === "growing") {
        const start = Math.floor(Math.random() * 6) + 1;
        const firstStep = Math.floor(Math.random() * 3) + 2;

        const a = start;
        const b = a + firstStep;
        const c = b + firstStep + 1;
        const d = c + firstStep + 2;

        sequence = [a, b, c, d];
        answer = d + firstStep + 3;
    }

    const wrongAnswers = new Set();

    while (wrongAnswers.size < 3) {
        const offset =
            Math.floor(Math.random() * 12) + 1;

        const wrong =
            Math.random() > 0.5
                ? answer + offset
                : answer - offset;

        if (
            wrong !== answer &&
            wrong >= 0
        ) {
            wrongAnswers.add(wrong);
        }
    }

    const options = shuffle([
        answer,
        ...Array.from(wrongAnswers),
    ]);

    return {
        sequence,
        answer,
        options,
    };
}

export default function LogicSequencePage() {
    const [status, setStatus] = useState("idle");
    const [question, setQuestion] = useState(() => createQuestion());
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem(
            "puzexa-logic-sequence-best"
        );

        if (saved) {
            setBestScore(Number(saved));
        }
    }, []);

    const startGame = () => {
        setScore(0);
        setStreak(0);
        setSelected(null);
        setFeedback("");
        setQuestion(createQuestion(0));
        setStatus("playing");
    };

    const nextQuestion = (nextScore) => {
        setQuestion(createQuestion(nextScore));
        setSelected(null);
        setFeedback("");
    };

    const handleAnswer = (option) => {
        if (status !== "playing" || selected !== null) return;

        setSelected(option);

        if (option === question.answer) {
            const nextScore = score + 1;
            const nextStreak = streak + 1;

            setScore(nextScore);
            setStreak(nextStreak);
            setFeedback("Correct! 🔥");

            if (nextScore > bestScore) {
                setBestScore(nextScore);

                localStorage.setItem(
                    "puzexa-logic-sequence-best",
                    String(nextScore)
                );
            }

            setTimeout(() => {
                nextQuestion(nextScore);
            }, 650);
        } else {
            setStreak(0);
            setFeedback(
                `Not quite. Correct answer: ${question.answer}`
            );

            setTimeout(() => {
                nextQuestion(score);
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
                    💡 Logic
                </span>

                <h1>Logic Sequence</h1>

                <p>
                    Find the pattern and choose the number that comes next.
                    Build your streak and beat your best score.
                </p>
            </section>

            <section className="logic-sequence-layout">
                <div className="logic-sequence-game">
                    <div className="logic-sequence-topbar">
                        <div>
                            <span>Score</span>
                            <strong>{score}</strong>
                        </div>

                        <div>
                            <span>Streak</span>
                            <strong>{streak}</strong>
                        </div>
                    </div>

                    {status === "idle" && (
                        <div className="logic-sequence-center">
                            <span className="logic-sequence-icon">
                                🧠
                            </span>

                            <h2>Can you crack the pattern?</h2>

                            <p>
                                Questions get harder as your score increases.
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
                        <div className="logic-sequence-center">
                            <span className="logic-sequence-label">
                                What comes next?
                            </span>

                            <div className="logic-sequence-numbers">
                                {question.sequence.map((number, index) => (
                                    <span key={`${number}-${index}`}>
                                        {number}
                                    </span>
                                ))}

                                <span className="question-mark">
                                    ?
                                </span>
                            </div>

                            <div className="logic-sequence-options">
                                {question.options.map((option) => {
                                    const isSelected = selected === option;
                                    const isCorrect =
                                        selected !== null &&
                                        option === question.answer;

                                    const isWrong =
                                        isSelected &&
                                        option !== question.answer;

                                    return (
                                        <button
                                            key={option}
                                            onClick={() =>
                                                handleAnswer(option)
                                            }
                                            className={`
                        ${isCorrect
                                                    ? "correct"
                                                    : ""
                                                }
                        ${isWrong
                                                    ? "wrong"
                                                    : ""
                                                }
                      `}
                                        >
                                            {option}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="logic-sequence-feedback">
                                {feedback}
                            </div>
                        </div>
                    )}
                </div>

                <aside className="score-panel">
                    <div className="score-card">
                        <span>Current Score</span>
                        <strong>{score}</strong>
                    </div>

                    <div className="score-card">
                        <span>🔥 Current Streak</span>
                        <strong>{streak}</strong>
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
                            Study the number pattern and select the value that
                            should come next. Correct answers increase your score
                            and streak.
                        </p>
                    </div>
                </aside>
            </section>
        </main>
    );
}
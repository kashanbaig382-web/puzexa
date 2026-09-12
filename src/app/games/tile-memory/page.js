"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function getGridSize(level) {
  if (level <= 2) return 3;
  if (level <= 5) return 4;
  return 5;
}

function getTargetCount(level, gridSize) {
  return Math.min(2 + level, Math.floor((gridSize * gridSize) / 2));
}

function createRound(level) {
  const gridSize = getGridSize(level);
  const totalTiles = gridSize * gridSize;
  const targetCount = getTargetCount(level, gridSize);

  const targets = new Set();

  while (targets.size < targetCount) {
    targets.add(Math.floor(Math.random() * totalTiles));
  }

  return {
    gridSize,
    totalTiles,
    targets: Array.from(targets),
  };
}

export default function TileMemoryPage() {
  const [status, setStatus] = useState("idle");
  const [level, setLevel] = useState(1);
  const [bestLevel, setBestLevel] = useState(0);
  const [round, setRound] = useState(() => createRound(1));
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState(
    "Memorize the highlighted tiles."
  );

  useEffect(() => {
    const saved = localStorage.getItem("puzexa-tile-memory-best");

    if (saved) {
      setBestLevel(Number(saved));
    }
  }, []);

  const startRound = (nextLevel) => {
    const nextRound = createRound(nextLevel);

    setRound(nextRound);
    setSelected([]);
    setMessage("Memorize the highlighted tiles.");
    setStatus("showing");

    const showTime = Math.max(900, 1700 - nextLevel * 80);

    setTimeout(() => {
      setStatus("playing");
      setMessage("Now select the tiles you remember.");
    }, showTime);
  };

  const startGame = () => {
    setLevel(1);
    startRound(1);
  };

  const handleTileClick = (index) => {
    if (status !== "playing") return;

    if (selected.includes(index)) return;

    if (!round.targets.includes(index)) {
      setStatus("gameOver");
      setMessage("Wrong tile. Game over.");

      if (level > bestLevel) {
        setBestLevel(level);

        localStorage.setItem(
          "puzexa-tile-memory-best",
          String(level)
        );
      }

      return;
    }

    const nextSelected = [...selected, index];
    setSelected(nextSelected);

    if (nextSelected.length === round.targets.length) {
      setStatus("success");
      setMessage("Perfect! 🔥");

      setTimeout(() => {
        const nextLevel = level + 1;
        setLevel(nextLevel);
        startRound(nextLevel);
      }, 750);
    }
  };

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${round.gridSize}, 1fr)`,
    }),
    [round.gridSize]
  );

  const tileIsActive = (index) => {
    if (status === "showing") {
      return round.targets.includes(index);
    }

    if (status === "playing" || status === "success") {
      return selected.includes(index);
    }

    if (status === "gameOver") {
      return round.targets.includes(index);
    }

    return false;
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

        <h1>Tile Memory</h1>

        <p>
          Memorize the highlighted tiles before they disappear, then
          select the exact same tiles from memory.
        </p>
      </section>

      <section className="tile-memory-layout">
        <div className="tile-memory-game">
          <div className="tile-memory-topbar">
            <div>
              <span>Level</span>
              <strong>{level}</strong>
            </div>

            <div>
              <span>Tiles</span>
              <strong>{round.targets.length}</strong>
            </div>
          </div>

          {status === "idle" && (
            <div className="tile-memory-center">
              <span className="tile-memory-icon">🟪</span>

              <h2>How strong is your visual memory?</h2>

              <p>
                Remember every highlighted tile and select them after
                they disappear.
              </p>

              <button
                className="game-start-btn"
                onClick={startGame}
              >
                Start Game
              </button>
            </div>
          )}

          {status !== "idle" && (
            <div className="tile-memory-center">
              <span className="tile-memory-label">
                {message}
              </span>

              <div
                className="tile-memory-grid"
                style={gridStyle}
              >
                {Array.from({
                  length: round.totalTiles,
                }).map((_, index) => {
                  const active = tileIsActive(index);

                  return (
                    <button
                      key={index}
                      className={`tile-memory-item ${
                        active ? "active" : ""
                      } ${
                        status === "gameOver" &&
                        round.targets.includes(index)
                          ? "revealed"
                          : ""
                      }`}
                      onClick={() =>
                        handleTileClick(index)
                      }
                      disabled={
                        status !== "playing"
                      }
                      aria-label={`Tile ${index + 1}`}
                    />
                  );
                })}
              </div>

              {status === "showing" && (
                <p className="tile-memory-help">
                  Memorize quickly...
                </p>
              )}

              {status === "playing" && (
                <p className="tile-memory-help">
                  Selected {selected.length} of{" "}
                  {round.targets.length}
                </p>
              )}

              {status === "success" && (
                <p className="tile-memory-success">
                  Next level...
                </p>
              )}

              {status === "gameOver" && (
                <>
                  <p className="tile-memory-error">
                    {message}
                  </p>

                  <button
                    className="game-start-btn"
                    onClick={startGame}
                  >
                    Play Again
                  </button>
                </>
              )}
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
              Watch the highlighted tiles carefully. When they
              disappear, click the exact same tiles. One wrong choice
              ends the run.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
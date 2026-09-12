"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const games = [
  {
    title: "Reaction Time",
    category: "Reaction",
    description: "Test your reflexes and click as fast as you can.",
    icon: "⚡",
    href: "/games/reaction-time",
  },
  {
    title: "Sequence Memory",
    category: "Memory",
    description: "Remember the sequence and repeat it correctly.",
    icon: "🧠",
    href: "/games/sequence-memory",
  },
  {
    title: "Speed Math",
    category: "Numbers",
    description: "Solve quick math questions before time runs out.",
    icon: "➗",
    href: "/games/speed-math",
  },
  {
    title: "Word Scramble",
    category: "Words",
    description: "Unscramble the letters and discover the word.",
    icon: "🔤",
    href: "/games/word-scramble",
  },
  {
    title: "Odd One Out",
    category: "Logic",
    description: "Spot the item that is different from the rest.",
    icon: "🔲",
    href: "/games/odd-one-out",
  },
  {
    title: "Color Match",
    category: "Reaction",
    description: "Ignore the word and identify its actual color.",
    icon: "🎨",
    href: "/games/color-match",
  },
  {
    title: "Number Memory",
    category: "Memory",
    description: "Remember increasingly longer numbers.",
    icon: "🔢",
    href: "/games/number-memory",
  },
  {
    title: "Tile Memory",
    category: "Memory",
    description: "Remember highlighted tiles and repeat the pattern.",
    icon: "🟪",
    href: "/games/tile-memory",
  },
  {
    title: "Logic Sequence",
    category: "Logic",
    description: "Find the pattern and choose what comes next.",
    icon: "💡",
    href: "/games/logic-sequence",
  },
  {
    title: "Quick Count",
    category: "Numbers",
    description: "Count the dots before they disappear.",
    icon: "👀",
    href: "/games/quick-count",
  },
  {
    title: "Pattern Recall",
    category: "Memory",
    description: "Memorize the symbols and recall the exact pattern.",
    icon: "🧩",
    href: "/games/pattern-recall",
  },
  {
    title: "Daily Brain Challenge",
    category: "Daily",
    description: "Complete five fresh brain challenges every day.",
    icon: "🏆",
    href: "/games/daily-brain-challenge",
  },
];

const categories = [
  "All",
  "Memory",
  "Logic",
  "Words",
  "Numbers",
  "Reaction",
  "Daily",
];
export default function GamesBrowser() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const categoryMatch =
        activeCategory === "All" ||
        game.category === activeCategory;

      const searchMatch =
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <main className="games-page">
      <header className="game-header">
        <Link href="/" className="logo">
          <span className="logo-mark">P</span>
          PUZEXA
        </Link>

        <Link href="/" className="back-home">
          ← Back Home
        </Link>
      </header>

      <section className="games-page-hero">
        <span className="category-pill">🎮 All Games</span>

        <h1>Pick a game. Beat your best.</h1>

        <p>
          Play quick original browser games designed to challenge
          your memory, logic, speed, numbers and focus.
        </p>
      </section>

      <section className="games-controls">
        <input
          type="search"
          placeholder="Search games..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="games-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category ? "active" : ""
              }
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="games-library">
        <div className="games-library-head">
          <div>
            <span>PUZEXA LIBRARY</span>
            <h2>
              {activeCategory === "All"
                ? "All Games"
                : `${activeCategory} Games`}
            </h2>
          </div>

          <span>
            {filteredGames.length}{" "}
            {filteredGames.length === 1 ? "game" : "games"}
          </span>
        </div>

        {filteredGames.length > 0 ? (
          <div className="games-library-grid">
            {filteredGames.map((game) => (
              <article
                className="library-game-card"
                key={game.href}
              >
                <div className="library-game-icon">
                  {game.icon}
                </div>

                <span className="library-game-category">
                  {game.category}
                </span>

                <h3>{game.title}</h3>

                <p>{game.description}</p>

                <Link
                  href={game.href}
                  className="library-play-btn"
                >
                  Play Game →
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="games-empty">
            <span>🔍</span>
            <h3>No games found</h3>
            <p>Try another search or category.</p>
          </div>
        )}
      </section>
    </main>
  );
}
import Link from "next/link";

const featuredGames = [
  {
    title: "Reaction Time",
    category: "Reaction",
    description: "Test your reflexes. Click as fast as you can!",
    icon: "⚡",
    href: "/games/reaction-time",
  },
  {
    title: "Sequence Memory",
    category: "Memory",
    description: "Remember the sequence and repeat it.",
    icon: "🧠",
    href: "/games/sequence-memory",
  },
  {
    title: "Speed Math",
    category: "Numbers",
    description: "Solve fast. Beat your best time.",
    icon: "➗",
    href: "/games/speed-math",
  },
  {
    title: "Word Scramble",
    category: "Words",
    description: "Unscramble the letters and find the word.",
    icon: "🔤",
    href: "/games/word-scramble",
  },
  {
    title: "Odd One Out",
    category: "Logic",
    description: "Find the item that doesn't belong.",
    icon: "🔲",
    href: "/games/odd-one-out",
  },
  {
    title: "Color Match",
    category: "Reaction",
    description: "Match the colors before time runs out.",
    icon: "🎨",
    href: "/games/color-match",
  },
  {
    title: "Number Memory",
    category: "Memory",
    description: "Remember the number before it disappears.",
    icon: "🔢",
    href: "/games/number-memory",
  },
  {
    title: "Tile Memory",
    category: "Memory",
    description: "Remember the highlighted tiles and repeat the pattern.",
    icon: "🟪",
    href: "/games/tile-memory",
  },
  {
    title: "Logic Sequence",
    category: "Logic",
    description: "Find the pattern and choose what comes next.",
    icon: "🧠",
    href: "/games/logic-sequence",
  },
  {
    title: "Quick Count",
    category: "Numbers",
    description: "Count the dots before they disappear.",
    icon: "⚡",
    href: "/games/quick-count",
  },
  {
    title: "Pattern Recall",
    category: "Memory",
    description: "Memorize the symbols and recall the exact pattern.",
    icon: "🧩",
    href: "/games/pattern-recall",
  },
];

const categories = [
  {
    name: "All Games",
    count: 12,
    icon: "🎮",
  },
  {
    name: "Memory",
    count: 4,
    icon: "🧠",
  },
  {
    name: "Logic",
    count: 2,
    icon: "💡",
  },
  {
    name: "Words",
    count: 1,
    icon: "🔤",
  },
  {
    name: "Numbers",
    count: 2,
    icon: "🔢",
  },
  {
    name: "Reaction",
    count: 2,
    icon: "⚡",
  },
];

export default function Home() {
  return (
    <main>
      <header className="navbar">
        <Link href="/" className="logo">
          <span className="logo-mark">P</span>
          PUZEXA
        </Link>

        <nav>
          <Link href="/">Home</Link>
          <Link href="/games">Games</Link>
          <Link href="#categories">Categories</Link>
          <Link href="#daily">Daily Challenge</Link>
          <Link href="/about">About</Link>
        </nav>

        <Link href="#games" className="nav-btn">
          Play Now
        </Link>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">PLAY • THINK • IMPROVE</span>

          <h1>
            Games for your brain.
            <span> Built for your best score.</span>
          </h1>

          <p>
            Quick, original browser games for memory, logic, words, numbers
            and reaction speed. Play, improve and beat your best.
          </p>

          <div className="hero-actions">
            <Link href="#games" className="primary-btn">
              🎮 Play Now →
            </Link>

            <Link href="#games" className="secondary-btn">
              Explore Games
            </Link>
          </div>

          <div className="hero-points">
            <span>⚡ 100% Free</span>
            <span>💻 Play on Any Device</span>
            <span>📊 Track Your Best Scores</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="brain">🧠</div>
          <span className="floating-card logic">💡 Logic</span>
          <span className="floating-card memory">🧠 Memory</span>
          <span className="floating-card reaction">⚡ Reaction</span>
          <span className="floating-card words">🔤 Words</span>
          <span className="floating-card numbers">🔢 Numbers</span>
        </div>
      </section>

      <section className="section" id="games">
        <div className="section-heading">
          <h2>⭐ Featured Games</h2>
          <Link href="/games">View All Games →</Link>
        </div>

        <div className="games-grid">
          {featuredGames.map((game) => (
            <article className="game-card" key={game.title}>
              <div className="game-icon">{game.icon}</div>
              <h3>{game.title}</h3>
              <span className="category-pill">{game.category}</span>
              <p>{game.description}</p>
              {game.href ? (
                <Link href={game.href} className="game-play-btn">
                  Play →
                </Link>
              ) : (
                <span className="game-play-btn disabled">
                  Coming Soon
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="categories">
        <div className="section-heading">
          <h2>🎮 Browse by Category</h2>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <div className="category-card" key={category.name}>
              <span>{category.icon}</span>

              <div>
                <h3>{category.name}</h3>
                <p>{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="daily-challenge" id="daily">
        <div>
          <h2>🏆 Daily Brain Challenge</h2>
          <p>A new challenge every day. Can you beat it?</p>
        </div>
        <Link
          href="/games/daily-brain-challenge"
          className="game-start-btn"
        >
          Play Daily Challenge →
        </Link>
      </section>

      <section className="benefits">
        <div>
          <strong>🎮 100% Free</strong>
          <span>No sign up required</span>
        </div>

        <div>
          <strong>💻 Play Anywhere</strong>
          <span>Desktop, tablet, mobile</span>
        </div>

        <div>
          <strong>🧠 Improve Daily</strong>
          <span>Track your best scores</span>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <div className="logo">
            <span className="logo-mark">P</span>
            PUZEXA
          </div>

          <p>Play. Think. Beat Your Best.</p>
        </div>

        <div className="footer-links">
          <Link href="/games">Games</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <p className="footer-copy">
          © 2026 PUZEXA. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
import Link from "next/link";

export const metadata = {
    title: "About PUZEXA",
    description:
        "Learn about PUZEXA, a collection of original browser games designed to challenge memory, logic, focus, numbers and reaction speed.",
    alternates: {
        canonical: "/about",
    },
};

export default function AboutPage() {
    return (
        <main className="about-page">
            <header className="game-header">
                <Link href="/" className="logo">
                    <span className="logo-mark">P</span>
                    PUZEXA
                </Link>

                <Link href="/" className="back-home">
                    ← Back Home
                </Link>
            </header>

            <section className="about-hero">
                <span className="category-pill">ABOUT PUZEXA</span>

                <h1>Quick games. Sharp thinking. Better scores.</h1>

                <p>
                    PUZEXA is a collection of original browser games built for
                    people who enjoy testing their memory, logic, focus, speed
                    and problem-solving skills.
                </p>
            </section>

            <section className="about-grid">
                <article className="about-card">
                    <span>🎮</span>
                    <h2>Play Instantly</h2>
                    <p>
                        PUZEXA games run directly in your browser. No download,
                        installation or account is required to start playing.
                    </p>
                </article>

                <article className="about-card">
                    <span>🧠</span>
                    <h2>Different Challenges</h2>
                    <p>
                        From memory and logic to numbers, words and reaction
                        speed, every game challenges a different type of skill.
                    </p>
                </article>

                <article className="about-card">
                    <span>🏆</span>
                    <h2>Beat Your Best</h2>
                    <p>
                        Many games save your best score locally in your browser,
                        giving you a simple reason to improve with every session.
                    </p>
                </article>
            </section>

            <section className="about-story">
                <div>
                    <span>WHY PUZEXA?</span>

                    <h2>Built around short, replayable challenges.</h2>

                    <p>
                        PUZEXA focuses on quick games that are easy to understand
                        but rewarding to replay. Instead of long tutorials or
                        complicated controls, each game is designed to get you
                        playing within seconds.
                    </p>

                    <p>
                        Our goal is to build a growing library of simple,
                        original browser experiences that make short breaks more
                        engaging.
                    </p>
                </div>

                <div className="about-highlight">
                    <strong>12</strong>
                    <span>Original Games</span>

                    <strong>5+</strong>
                    <span>Game Categories</span>

                    <strong>1</strong>
                    <span>Fresh Daily Challenge</span>
                </div>
            </section>

            <section className="about-cta">
                <span>READY TO PLAY?</span>

                <h2>Choose a challenge and beat your best.</h2>

                <Link href="/games" className="game-start-btn">
                    Explore All Games →
                </Link>
            </section>
        </main>
    );
}
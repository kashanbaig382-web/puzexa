import Link from "next/link";

export const metadata = {
    title: "Terms of Use | PUZEXA",
    description:
        "Read the terms of use for playing browser games and using PUZEXA.",
    alternates: {
        canonical: "/terms",
    },
};

export default function TermsPage() {
    return (
        <main className="legal-page">
            <header className="game-header">
                <Link href="/" className="logo">
                    <span className="logo-mark">P</span>
                    PUZEXA
                </Link>

                <Link href="/" className="back-home">
                    ← Back Home
                </Link>
            </header>

            <article className="legal-content">
                <span className="category-pill">LEGAL</span>

                <h1>Terms of Use</h1>

                <p className="legal-updated">
                    Last updated: September 2026
                </p>

                <section>
                    <h2>1. Use of PUZEXA</h2>
                    <p>
                        PUZEXA provides browser-based games for entertainment and
                        casual skill challenges. By using the website, you agree
                        to use it lawfully and responsibly.
                    </p>
                </section>

                <section>
                    <h2>2. Game Scores</h2>
                    <p>
                        Scores, best results and streaks may be stored locally in
                        your browser. We do not guarantee that locally stored data
                        will always remain available.
                    </p>
                </section>

                <section>
                    <h2>3. Availability</h2>
                    <p>
                        We may update, modify, remove or temporarily disable games
                        or features at any time as PUZEXA develops.
                    </p>
                </section>

                <section>
                    <h2>4. Intellectual Property</h2>
                    <p>
                        PUZEXA branding, website design, written content and
                        original game experiences may not be copied, reproduced or
                        redistributed without permission.
                    </p>
                </section>

                <section>
                    <h2>5. No Guarantees</h2>
                    <p>
                        PUZEXA games are provided for entertainment purposes.
                        Scores or game performance should not be treated as a
                        professional assessment of intelligence, memory or any
                        medical or psychological ability.
                    </p>
                </section>

                <section>
                    <h2>6. Third-Party Services</h2>
                    <p>
                        PUZEXA may use third-party hosting, analytics or
                        advertising services. Those services may have separate
                        terms and policies.
                    </p>
                </section>

                <section>
                    <h2>7. Changes to These Terms</h2>
                    <p>
                        These terms may be updated as PUZEXA grows or introduces
                        new functionality.
                    </p>
                </section>
            </article>
        </main>
    );
}
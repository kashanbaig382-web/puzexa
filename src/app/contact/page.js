import Link from "next/link";

export const metadata = {
  title: "Contact PUZEXA",
  description:
    "Contact PUZEXA for questions, feedback, bug reports or general inquiries.",
};

export default function ContactPage() {
  return (
    <main className="contact-page">
      <header className="game-header">
        <Link href="/" className="logo">
          <span className="logo-mark">P</span>
          PUZEXA
        </Link>

        <Link href="/" className="back-home">
          ← Back Home
        </Link>
      </header>

      <section className="contact-box">
        <span className="category-pill">CONTACT</span>

        <h1>Got feedback?</h1>

        <p>
          Found a bug, have a game suggestion or want to get in touch?
          We&apos;d like to hear from you.
        </p>

        <div className="contact-card">
          <span>✉️</span>

          <div>
            <h2>Email</h2>

            <p>
              Contact email will be added before public launch.
            </p>
          </div>
        </div>

        <Link href="/games" className="game-start-btn">
          Explore Games →
        </Link>
      </section>
    </main>
  );
}
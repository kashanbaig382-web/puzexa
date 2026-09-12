import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | PUZEXA",
  description:
    "Read the PUZEXA privacy policy and learn how browser data, local storage, analytics and future advertising may be handled.",
};

export default function PrivacyPolicyPage() {
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

        <h1>Privacy Policy</h1>

        <p className="legal-updated">
          Last updated: September 2026
        </p>

        <section>
          <h2>1. Information We Collect</h2>
          <p>
            PUZEXA is designed so you can play games without creating
            an account. Some game data, such as best scores, progress
            and daily challenge streaks, may be stored locally in your
            browser using localStorage.
          </p>
        </section>

        <section>
          <h2>2. Local Storage</h2>
          <p>
            PUZEXA may store game scores, best results and daily
            challenge information on your device. This information is
            stored in your browser and is not automatically submitted
            to us.
          </p>
        </section>

        <section>
          <h2>3. Analytics and Advertising</h2>
          <p>
            PUZEXA may use analytics services in the future to
            understand website traffic and improve the experience.
            Advertising services such as Google AdSense may also be
            added in the future and may use cookies or similar
            technologies according to their own policies.
          </p>
        </section>

        <section>
          <h2>4. Third-Party Services</h2>
          <p>
            Our website may use third-party services for hosting,
            analytics, advertising or other website functionality.
            These services may process information according to their
            own privacy policies.
          </p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>
            PUZEXA itself may not require cookies for basic gameplay,
            but third-party services added to the website may use
            cookies or similar technologies.
          </p>
        </section>

        <section>
          <h2>6. Children&apos;s Privacy</h2>
          <p>
            PUZEXA does not knowingly collect personal information
            from children through account registration because the
            website currently does not require user accounts.
          </p>
        </section>

        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated as PUZEXA introduces
            new features, analytics, advertising or other services.
          </p>
        </section>

        <section>
          <h2>8. Contact</h2>
          <p>
            If you have questions about this Privacy Policy, you can
            contact us through the PUZEXA Contact page.
          </p>
        </section>
      </article>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(event.currentTarget);

    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
    );

    formData.append("subject", "New PUZEXA Contact Message");
    formData.append("from_name", "PUZEXA Website");

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        event.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-group">
        <label htmlFor="name">Name</label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="email">Email</label>

        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="contact-form-group">
        <label htmlFor="message">Message</label>

        <textarea
          id="message"
          name="message"
          rows="6"
          placeholder="Tell us about a bug, suggestion or question..."
          required
        />
      </div>

      <button
        type="submit"
        className="game-start-btn contact-submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message →"}
      </button>

      {status === "success" && (
        <p className="contact-status success">
          Message sent successfully. Thanks for contacting PUZEXA.
        </p>
      )}

      {status === "error" && (
        <p className="contact-status error">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
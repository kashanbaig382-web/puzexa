"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSubmitting(true);
    setStatus("");

    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Contact Error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact Request Error:", error);
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
import { useState } from "react";
import { links } from "./content.js";
import { Arrow } from "./ui.jsx";
const CONTACT_SUBJECT = "Portfolio inquiry for Raveesh Raj Grandhi";

export default function Contact() {
  const [formState, setFormState] = useState({ status: "idle", message: "" });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("_subject", CONTACT_SUBJECT);
    setFormState({
      status: "sending",
      message: "Sending your brief securely…",
    });

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        form.reset();
        setFormState({
          status: "success",
          message:
            "Brief received. Raveesh will reply using the email you provided.",
        });
        return;
      }

      let payload = null;
      try {
        payload = await response.json();
      } catch {
        /* Formspree may return a non-JSON error */
      }
      const message = payload?.errors
        ?.map((error) => error.message)
        .filter(Boolean)
        .join(" ");
      setFormState({
        status: "error",
        message:
          message ||
          "The brief could not be sent. Please retry or use LinkedIn below.",
      });
    } catch {
      setFormState({
        status: "error",
        message:
          "The network interrupted the submission. Please retry or use LinkedIn below.",
      });
    }
  };

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-index">05 / GET IN TOUCH</div>
      <div className="contact-lead">
        <p>HIRING FOR BI OR BUSINESS ANALYSIS?</p>
        <h2 id="contact-title">Let’s talk about your team.</h2>
        <div className="contact-context">
          <p>
            Send me the role, your team’s priorities, and the best way to reach
            you. You can also contact me directly by email or LinkedIn.
          </p>
          <span>
            Open to business intelligence engineering, business analysis, and
            analytics roles across industries.
          </span>
        </div>
      </div>

      <div className="contact-form-shell">
        <div className="contact-form-head">
          <span>START A CONVERSATION</span>
          <span className="contact-status-dot">Accepting conversations</span>
        </div>

        {formState.status === "success" ? (
          <div className="contact-success" role="status">
            <span>MESSAGE RECEIVED</span>
            <strong>Thank you.</strong>
            <p>{formState.message}</p>
            <button
              type="button"
              onClick={() => setFormState({ status: "idle", message: "" })}
            >
              Send another brief <Arrow />
            </button>
          </div>
        ) : (
          <form
            action="https://formspree.io/f/mlgqdlnd"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="_subject"
              defaultValue={CONTACT_SUBJECT}
              ref={(node) => {
                if (!node) return;
                node.value = CONTACT_SUBJECT;
                node.setAttribute("value", CONTACT_SUBJECT);
              }}
            />
            <input
              className="contact-trap"
              type="text"
              name="_gotcha"
              aria-label="Leave this field empty"
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="contact-field-grid">
              <label>
                <span>
                  <i>01</i> Name
                </span>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                />
              </label>
              <label>
                <span>
                  <i>02</i> Work email
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                />
              </label>
            </div>

            <div className="contact-field-grid">
              <label>
                <span>
                  <i>03</i> Organization
                </span>
                <input
                  name="organization"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company or team"
                />
              </label>
              <label>
                <span>
                  <i>04</i> Reason
                </span>
                <select name="reason" defaultValue="" required>
                  <option value="" disabled>
                    Select one
                  </option>
                  <option>Recruiting conversation</option>
                  <option>Hiring manager introduction</option>
                  <option>Analytics collaboration</option>
                  <option>Speaking or research</option>
                  <option>Other</option>
                </select>
              </label>
            </div>

            <label className="contact-message">
              <span>
                <i>05</i> Message
              </span>
              <textarea
                name="message"
                rows="5"
                minLength="20"
                maxLength="2000"
                placeholder="Tell me about the role, your team, and what you need help with…"
                required
              />
            </label>

            <div className="contact-submit-row">
              <p>Email and LinkedIn are also available below.</p>
              <button type="submit" disabled={formState.status === "sending"}>
                <span>
                  {formState.status === "sending"
                    ? "Sending brief…"
                    : "Send message"}
                </span>
                <Arrow diagonal />
              </button>
            </div>

            {formState.message && (
              <p
                className={`contact-form-message is-${formState.status}`}
                role={formState.status === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {formState.message}
              </p>
            )}
          </form>
        )}

        <div className="contact-form-foot">
          <a href={links.email}>
            Email <Arrow diagonal />
          </a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn <Arrow diagonal />
          </a>
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub <Arrow diagonal />
          </a>
          <a href={links.resume} target="_blank" rel="noreferrer">
            Résumé <Arrow diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

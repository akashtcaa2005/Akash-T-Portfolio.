import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward, MdLocationOn, MdCode, MdShare } from "react-icons/md";
import { PROFILE } from "../data/portfolio";
import "./styles/Pages.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact | Akash T. — AI & Generative AI Engineer";
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject.";
    if (!formData.message.trim()) {
      newErrors.message = "Please write a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Valid client-side submission
      setSubmitted(true);
    }
  };

  return (
    <div className="page-container">
      <Link to="/" className="page-back-link">
        ← Back to Home
      </Link>

      <div className="page-header">
        <span className="page-tag">Get in Touch</span>
        <h1 className="page-title">
          Let's Build <span>Something Intelligent.</span>
        </h1>
        <p className="page-subtitle">
          Open to AI engineering roles, internships, research collaborations,
          and building impactful AI-powered products.
        </p>
      </div>

      <div className="contact-grid">
        {/* Info panel */}
        <div className="contact-info-panel">
          <h3>Direct Channels</h3>
          <p>
            Feel free to connect directly through GitHub or LinkedIn for the
            quickest response regarding AI engineering opportunities or research discussions.
          </p>

          <div className="contact-meta-item">
            <MdLocationOn style={{ fontSize: "22px", color: "#06b6d4", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div className="contact-meta-label">Location</div>
              <div className="contact-meta-val">{PROFILE.location}</div>
            </div>
          </div>

          <div className="contact-meta-item">
            <MdCode style={{ fontSize: "22px", color: "#7c3aed", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div className="contact-meta-label">GitHub</div>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-meta-val"
                style={{ color: "var(--accentColor)", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                github.com/akashtcaa2005 <MdArrowOutward />
              </a>
            </div>
          </div>

          <div className="contact-meta-item">
            <MdShare style={{ fontSize: "22px", color: "#3b82f6", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <div className="contact-meta-label">LinkedIn</div>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-meta-val"
                style={{ color: "var(--accentColor)", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                linkedin.com/in/akash-t-845439314 <MdArrowOutward />
              </a>
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "12px",
              padding: "20px",
              marginTop: "30px",
            }}
          >
            <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", color: "#c2a4ff" }}>
              Academic Inquiry Note
            </h4>
            <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8", lineHeight: 1.5 }}>
              For verification of university enrollment, coursework transcripts, or detailed
              capstone documentation, please connect via LinkedIn messaging.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder="Dr. Alan Turing"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Your Email *
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder="colleague@domain.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && <div className="form-error">{errors.email}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Subject *
              </label>
              <input
                id="subject"
                type="text"
                className="form-input"
                placeholder="AI Engineering Collaboration"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
              />
              {errors.subject && (
                <div className="form-error">{errors.subject}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message *
              </label>
              <textarea
                id="message"
                className="form-textarea"
                placeholder="Hi Akash, I saw your PredictX and RAG projects..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
              {errors.message && (
                <div className="form-error">{errors.message}</div>
              )}
            </div>

            <button type="submit" className="form-submit-btn">
              Send Inquiry
            </button>

            {submitted && (
              <div className="form-success-banner">
                ✓ <strong>Thank you, {formData.name}!</strong> Your inquiry has been validated locally.
                Since this client-side demo does not expose private email API keys in public bundles,
                please also feel free to reach out directly via{" "}
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#ffffff", textDecoration: "underline" }}
                >
                  LinkedIn
                </a>{" "}
                to ensure instantaneous receipt!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

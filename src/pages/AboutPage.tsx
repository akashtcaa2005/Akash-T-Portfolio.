import { useEffect } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward, MdSchool, MdPsychology, MdCode, MdSecurity } from "react-icons/md";
import { PROFILE } from "../data/portfolio";
import "./styles/Pages.css";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About | Akash T. — AI & Generative AI Engineer";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <Link to="/" className="page-back-link">
        ← Back to Home
      </Link>

      <div className="page-header">
        <span className="page-tag">Background &amp; Philosophy</span>
        <h1 className="page-title">
          About <span>Me</span>
        </h1>
        <p className="page-subtitle">
          {PROFILE.about}
        </p>
      </div>

      <div className="about-grid">
        {/* Education & Academic Timeline */}
        <div className="about-card">
          <h3>
            <MdSchool color="#7c3aed" /> Education &amp; Academics
          </h3>
          <div className="about-edu-item">
            <div className="about-edu-degree">{PROFILE.education.degree}</div>
            <div className="about-edu-inst">
              {PROFILE.education.college}
            </div>
            <div className="about-edu-period">
              {PROFILE.education.university} · {PROFILE.education.period}
            </div>
          </div>
          <p>
            <strong>Academic Performance:</strong> CGPA {PROFILE.education.cgpa}
          </p>
          <p>
            <strong>Current Status:</strong> {PROFILE.education.status}. Focusing
            coursework and capstone development on artificial intelligence,
            deep learning, data structures, and secure system architectures.
          </p>
          <div className="about-highlight-box">
            <h4>Location &amp; Availability</h4>
            <p>
              Based in {PROFILE.location}. Open to AI engineering roles,
              research collaborations, and remote opportunities.
            </p>
          </div>
        </div>

        {/* Focus & Engineering Approach */}
        <div className="about-card">
          <h3>
            <MdPsychology color="#06b6d4" /> Technical Focus &amp; Philosophy
          </h3>
          <p>
            My technical focus centers on bridging machine learning models with
            reliable, scalable software. Rather than treating AI as a black box,
            I focus on understanding the mechanics—from vector embeddings and
            attention heads to API boundaries and orchestration graphs.
          </p>
          <p>
            <strong>Core Pillars of My Work:</strong>
          </p>
          <ul style={{ paddingLeft: "20px", color: "#94a3b8", lineHeight: 1.8, margin: "0 0 16px 0" }}>
            <li>
              <strong style={{ color: "#e2d9f3" }}>Grounded Retrieval:</strong> RAG architectures designed to cite sources and minimize hallucination.
            </li>
            <li>
              <strong style={{ color: "#e2d9f3" }}>Agentic Boundaries:</strong> Multi-agent systems with explicit permissions and memory isolation.
            </li>
            <li>
              <strong style={{ color: "#e2d9f3" }}>Honest Evaluation:</strong> Rigorous validation on real datasets without inflated metrics.
            </li>
            <li>
              <strong style={{ color: "#e2d9f3" }}>Secure-by-Design:</strong> Threat modeling for prompt injection and input sanitization.
            </li>
          </ul>
        </div>

        {/* AI & Security Interests */}
        <div className="about-card">
          <h3>
            <MdSecurity color="#ef4444" /> AI Security &amp; Safety
          </h3>
          <p>
            As generative models increasingly interface with tools and databases,
            their security posture becomes paramount. I actively research and
            test safety boundaries:
          </p>
          <p>
            Investigating prompt injection, indirect instruction injection,
            untrusted document boundaries in RAG systems, and tool execution
            safeguards. I believe engineering resilient AI requires evaluating
            worst-case adversarial scenarios alongside sunny-day metrics.
          </p>
          <Link
            to="/security"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              color: "#06b6d4",
              fontSize: "14px",
              marginTop: "10px",
              textDecoration: "none",
            }}
          >
            Explore AI Security Research ↗
          </Link>
        </div>

        {/* Connect & Resume */}
        <div className="about-card">
          <h3>
            <MdCode color="#c2a4ff" /> Connect &amp; Profiles
          </h3>
          <p>
            I actively share my code, projects, and experiments across GitHub
            and LinkedIn. Connect with me to discuss AI systems, research, or
            internship opportunities.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "20px", flexWrap: "wrap" }}>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="security-btn security-btn-secondary"
            >
              GitHub Profile <MdArrowOutward />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="security-btn security-btn-secondary"
            >
              LinkedIn Profile <MdArrowOutward />
            </a>
            <Link to="/contact" className="security-btn security-btn-primary">
              Contact Me ↗
            </Link>
          </div>
          <div className="about-highlight-box" style={{ marginTop: "24px" }}>
            <h4>Resume</h4>
            <p>
              View or download my resume directly on Google Docs.
            </p>
            <a
              href={PROFILE.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="security-btn security-btn-primary"
              style={{ marginTop: "12px", display: "inline-flex" }}
            >
              View Resume <MdArrowOutward />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

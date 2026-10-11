import { Link } from "react-router-dom";
import { MdSecurity, MdArrowOutward } from "react-icons/md";
import "./styles/Career.css";

const FeaturedSecurity = () => {
  return (
    <div className="section-container" style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          background: "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(6, 182, 212, 0.04) 100%)",
          border: "1px solid rgba(124, 58, 237, 0.25)",
          borderRadius: "20px",
          padding: "48px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#06b6d4",
              border: "1px solid rgba(6, 182, 212, 0.35)",
              padding: "4px 12px",
              borderRadius: "16px",
              marginBottom: "18px",
              fontFamily: "monospace",
            }}
          >
            <MdSecurity /> CYBERSECURITY × AI SECURITY
          </div>

          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              margin: "0 0 16px 0",
              color: "#ffffff",
            }}
          >
            Securing Advanced AI &amp; LLM Systems
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: "16px",
              lineHeight: 1.6,
              maxWidth: "760px",
              margin: "0 0 28px 0",
            }}
          >
            Evaluating adversarial robustness in AI applications: prompt injection,
            untrusted document boundaries in RAG workflows, agentic tool execution
            limits, and developer security checklists.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div style={{ color: "#c2a4ff", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                Prompt Injection
              </div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>
                Direct &amp; indirect instruction hijacking defenses
              </div>
            </div>

            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div style={{ color: "#06b6d4", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                RAG Boundaries
              </div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>
                Document trust &amp; corpus poisoning mitigations
              </div>
            </div>

            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                padding: "16px",
              }}
            >
              <div style={{ color: "#06d6a0", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
                Agent Least Privilege
              </div>
              <div style={{ color: "#64748b", fontSize: "12px" }}>
                Tool authorization &amp; sandboxed execution
              </div>
            </div>
          </div>

          <Link
            to="/security"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
              color: "#ffffff",
              padding: "12px 28px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
          >
            Explore AI Security Research &amp; Checklist <MdArrowOutward />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSecurity;

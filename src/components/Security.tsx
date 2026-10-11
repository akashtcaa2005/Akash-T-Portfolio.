import "./styles/Security.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { PROFILE } from "../data/portfolio";

const CHECKLIST_ITEMS = [
  "Define trust boundaries for user input and retrieved content",
  "Test direct and indirect prompt injection",
  "Validate tool inputs and outputs",
  "Apply least-privilege tool permissions",
  "Require authorization for sensitive actions",
  "Keep secrets out of prompts, logs, and frontend bundles",
  "Protect sensitive data and enforce server-side access control",
  "Validate model outputs before passing them to other systems",
  "Test failure cases and unexpected model behavior",
  "Record evaluation results and retest after changes",
];

const AI_SECURITY_TOPICS = [
  {
    title: "Prompt Injection & Indirect Injection",
    risk: "Untrusted input manipulates the LLM's behavior, overriding intended instructions.",
    why: "LLMs follow natural language instructions — malicious input embedded in user data or retrieved documents can hijack the model's responses.",
    howToTest: "In an authorized test environment: craft inputs that attempt to override system instructions, test with adversarial prefixes and role-play prompts, and observe whether the model follows injected instructions over intended ones.",
    mitigations: "Separate trusted system context from user input structurally, sanitize and validate inputs, use output validation, and apply instruction hierarchy defenses. No single defense is complete.",
  },
  {
    title: "Jailbreak Evaluation & Safety Boundary Testing",
    risk: "Adversarial prompts bypass safety guardrails to elicit harmful or policy-violating outputs.",
    why: "Safety layers in LLMs can be circumvented by clever prompt construction, impacting any application that relies on model-level safety alone.",
    howToTest: "In a controlled, authorized test environment: evaluate the model's responses to known jailbreak patterns, test boundary cases, and compare responses across different phrasings.",
    mitigations: "Combine model-level guardrails with application-level output validation. Implement content filtering, logging, and human oversight mechanisms. Accept that no guardrail is foolproof.",
  },
  {
    title: "Insecure Tool Use & Excessive Agent Permissions",
    risk: "Agentic AI systems with overly broad tool access can execute unintended or harmful actions.",
    why: "Agents granted unnecessary capabilities (file deletion, API calls, code execution) can cause irreversible damage if their reasoning is flawed or their input is manipulated.",
    howToTest: "Verify that agents cannot call tools outside their declared scope. Test whether injected instructions can trigger unauthorized tool invocations.",
    mitigations: "Apply least-privilege tool permissions, require confirmation for sensitive actions, implement allowlists, and log all tool calls. Design agents to fail safely.",
  },
  {
    title: "RAG Security & Document Trust Boundaries",
    risk: "Malicious or untrusted content in a retrieval corpus can manipulate LLM responses.",
    why: "RAG systems retrieve external documents and inject them into the LLM context — untrusted retrieved content is treated similarly to trusted instructions if not bounded.",
    howToTest: "In a test environment: inject synthetic adversarial documents into the retrieval corpus and observe whether they influence the model's output inappropriately.",
    mitigations: "Label retrieved content clearly, enforce source trust boundaries, validate retrieved chunks before injection, and evaluate grounding quality regularly.",
  },
  {
    title: "Sensitive Information Exposure",
    risk: "LLM applications may leak PII, credentials, or proprietary data through model outputs or logs.",
    why: "Training data memorization, insecure prompt design, and verbose error messages can expose sensitive information.",
    howToTest: "Evaluate whether sensitive data can be extracted through targeted queries. Review logs and API responses for leaked context.",
    mitigations: "Scrub sensitive data from prompts and logs, enforce server-side access control, and never store credentials in prompts.",
  },
  {
    title: "LLM Output Validation",
    risk: "Unvalidated LLM outputs passed to downstream systems (code execution, APIs, databases) create injection and logic vulnerabilities.",
    why: "LLMs generate probabilistic text — treating their output as trusted input to other systems without validation is dangerous.",
    howToTest: "Trace model outputs through the application pipeline and verify that no output reaches a downstream system unvalidated.",
    mitigations: "Parse and validate all model outputs, use structured output schemas where possible, and apply sandboxing for code-execution scenarios.",
  },
];

const Security = () => {
  const [checked, setChecked] = useState<boolean[]>(CHECKLIST_ITEMS.map(() => false));
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleCheck = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const checkedCount = checked.filter(Boolean).length;

  return (
    <div className="security-page">
      {/* Hero */}
      <section className="security-hero">
        <div className="security-hero-bg">
          <div className="security-grid"></div>
          <div className="security-glow"></div>
        </div>
        <div className="security-hero-content">
          <div className="security-badge">AI SECURITY RESEARCH</div>
          <h1>
            CYBERSECURITY
            <br />
            <span className="security-x">×</span>
            <br />
            AI SECURITY
          </h1>
          <p className="security-hero-sub">
            Exploring how AI systems can be tested, evaluated, and made more resilient
            against adversarial inputs, prompt injection, insecure tool use,
            and other emerging LLM security risks.
          </p>
          <div className="security-hero-links">
            <a href="#ai-security-topics" className="security-btn security-btn-primary">
              Explore AI Security Topics
            </a>
            <a href="#work" className="security-btn security-btn-secondary">
              View AI Projects ↗
            </a>
          </div>
        </div>
      </section>

      {/* AI Security Topics */}
      <section className="security-section" id="ai-security-topics">
        <div className="security-container">
          <h2 className="security-section-title">
            AI & LLM Security <span>Topics</span>
          </h2>
          <p className="security-section-sub">
            Research and learning notes on AI system security. All testing should occur
            only on systems you own or have explicit authorization to assess.
          </p>
          <div className="security-topics">
            {AI_SECURITY_TOPICS.map((topic, i) => (
              <div
                key={i}
                className={`security-topic-card ${expanded === i ? "expanded" : ""}`}
              >
                <button
                  className="security-topic-header"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  aria-expanded={expanded === i}
                >
                  <span className="topic-number">0{i + 1}</span>
                  <span className="topic-title">{topic.title}</span>
                  <span className="topic-toggle">{expanded === i ? "−" : "+"}</span>
                </button>
                {expanded === i && (
                  <div className="security-topic-body">
                    <div className="topic-field">
                      <h4>The Risk</h4>
                      <p>{topic.risk}</p>
                    </div>
                    <div className="topic-field">
                      <h4>Why It Matters</h4>
                      <p>{topic.why}</p>
                    </div>
                    <div className="topic-field">
                      <h4>How to Assess (Authorized Environments Only)</h4>
                      <p>{topic.howToTest}</p>
                    </div>
                    <div className="topic-field">
                      <h4>Mitigations & Limitations</h4>
                      <p>{topic.mitigations}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Workflow */}
      <section className="security-section security-workflow-section">
        <div className="security-container">
          <h2 className="security-section-title">
            Security <span>Workflow</span>
          </h2>
          <p className="security-section-sub">
            A structured approach to authorized security evaluation. Never test systems without permission.
          </p>
          <div className="security-workflow">
            {[
              "Scope & Authorization",
              "Threat Modeling",
              "Controlled Test Cases",
              "Observe & Record",
              "Assess Impact",
              "Apply Mitigations",
              "Retest",
              "Document Findings",
            ].map((step, i, arr) => (
              <div key={i} className="workflow-step-wrapper">
                <div className="workflow-step">
                  <div className="workflow-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="workflow-label">{step}</div>
                </div>
                {i < arr.length - 1 && <div className="workflow-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Checklist */}
      <section className="security-section">
        <div className="security-container">
          <h2 className="security-section-title">
            Developer Security <span>Checklist</span>
          </h2>
          <p className="security-section-sub">
            An interactive checklist for developers building LLM applications.
            This is a reference guide — not an audit. Progress is local to this page only.
          </p>
          <div className="security-checklist">
            <div className="checklist-progress">
              <div
                className="checklist-bar"
                style={{ width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%` }}
              ></div>
            </div>
            <p className="checklist-count">
              {checkedCount} / {CHECKLIST_ITEMS.length} reviewed
            </p>
            {CHECKLIST_ITEMS.map((item, i) => (
              <button
                key={i}
                className={`checklist-item ${checked[i] ? "checklist-checked" : ""}`}
                onClick={() => toggleCheck(i)}
                aria-pressed={checked[i]}
              >
                <span className="checklist-icon">
                  {checked[i] ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
                <span>{item}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Research Interests */}
      <section className="security-section">
        <div className="security-container">
          <h2 className="security-section-title">
            Research <span>Interests</span>
          </h2>
          <div className="security-interests-grid">
            {[
              { icon: "🔬", title: "Prompt Injection Robustness", desc: "Evaluating how LLM systems respond to adversarial instruction injection across different prompt structures." },
              { icon: "📄", title: "RAG Security Testing", desc: "Investigating trust boundaries in retrieval-augmented systems and document poisoning scenarios." },
              { icon: "🛠️", title: "Agentic Tool Permissions", desc: "Analyzing agent permission boundaries and the risks of excessive tool access in multi-agent workflows." },
              { icon: "🎯", title: "Adversarial Input Handling", desc: "Exploring how AI systems can be made more robust against unexpected or manipulated input." },
              { icon: "📋", title: "Safety Evaluations", desc: "Building structured test suites to evaluate AI safety properties and track changes over model versions." },
              { icon: "🏗️", title: "Secure-by-Design AI", desc: "Applying security principles during AI application design rather than as an afterthought." },
            ].map((item, i) => (
              <div key={i} className="security-interest-card">
                <span className="interest-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
                <span className="interest-status">Research Interest</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Projects */}
      <section className="security-section">
        <div className="security-container">
          <h2 className="security-section-title">
            Security <span>Labs</span>
          </h2>
          <p className="security-section-sub">
            Planned and in-progress security research labs. Status is clearly labeled — no completed claims without verification.
          </p>
          <div className="security-labs">
            {[
              { title: "Prompt-Injection Evaluation Lab", desc: "A controlled suite of benign test cases for evaluating prompt injection resilience in a toy RAG application.", status: "Planned Lab" },
              { title: "RAG Security Testbed", desc: "Testing trust boundaries, synthetic document poisoning, and retrieval handling in a controlled environment.", status: "Research Interest" },
              { title: "Agent Permission Audit", desc: "Verifying that a demo agent cannot invoke tools beyond its intended permissions through boundary testing.", status: "Research Interest" },
              { title: "LLM Safety Evaluation Dashboard", desc: "Organizing test cases, observed outputs, pass/fail results, and regression comparisons over time.", status: "Planned Lab" },
            ].map((lab, i) => (
              <div key={i} className="security-lab-card">
                <div className="lab-header">
                  <h4>{lab.title}</h4>
                  <span className="lab-status">{lab.status}</span>
                </div>
                <p>{lab.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics Statement */}
      <section className="security-section security-ethics">
        <div className="security-container">
          <div className="ethics-card">
            <h3>Security Ethics & Responsible Research</h3>
            <p>
              I support authorized security testing, responsible disclosure, privacy-conscious evaluation,
              and defensive research. Testing should remain within an approved scope, and findings should
              be documented accurately without exposing sensitive data. All security evaluation work
              described here is either conceptual, conducted on systems I own, or performed in explicitly
              authorized environments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="security-section security-cta">
        <div className="security-container">
          <h2>Discuss AI Security</h2>
          <p>
            Interested in AI security research, evaluation methodology, or building more secure AI applications?
          </p>
          <div className="security-cta-links">
            <Link to="/contact" className="security-btn security-btn-primary">
              Contact Me
            </Link>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="security-btn security-btn-secondary"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="security-btn security-btn-secondary"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Security;

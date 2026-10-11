import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MdEmojiEvents, MdCode, MdStorage, MdWorkspacePremium,
  MdAutoAwesome, MdArrowOutward, MdSecurity, MdBugReport,
  MdVerified, MdFilterList, MdRocketLaunch,
} from "react-icons/md";
import { ACHIEVEMENTS, FUTURE_MISSIONS } from "../data/portfolio";
import "./styles/Pages.css";
import "./styles/Achievements.css";

// ── Category config ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "All", label: "All" },
  { id: "Awards", label: "Awards" },
  { id: "Certifications", label: "Certifications" },
  { id: "Competitive Programming", label: "Competitive" },
  { id: "AI Engineering", label: "AI Engineering" },
  { id: "AI Security", label: "AI Security" },
];

// ── Icon resolver ─────────────────────────────────────────────────────────────
const getIcon = (iconName: string, accent: string) => {
  const style = { color: accent, fontSize: "26px" };
  switch (iconName) {
    case "trophy":    return <MdEmojiEvents style={style} />;
    case "code":      return <MdCode style={style} />;
    case "database":  return <MdStorage style={style} />;
    case "microsoft": return <MdWorkspacePremium style={style} />;
    case "ai":        return <MdAutoAwesome style={style} />;
    case "shield":    return <MdSecurity style={style} />;
    case "bug":       return <MdBugReport style={style} />;
    default:          return <MdEmojiEvents style={style} />;
  }
};

// ── Category accent colours ───────────────────────────────────────────────────
const categoryAccent: Record<string, string> = {
  "Awards": "#f59e0b",
  "Certifications": "#7c3aed",
  "Competitive Programming": "#06b6d4",
  "AI Engineering": "#ec4899",
  "AI Security": "#ef4444",
};

// ── Single achievement card ───────────────────────────────────────────────────
const AchievementCard = ({
  ach,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ach: any;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 60}ms`;
          el.classList.add("ach-card-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const isSecurityCard = ach.category === "AI Security";

  return (
    <div
      ref={ref}
      className={`ach-card ${isSecurityCard ? "ach-card-security" : ""}`}
      style={{ "--ach-accent": ach.accent } as React.CSSProperties}
    >
      {/* Glow orb */}
      <div className="ach-card-glow" />

      {/* Header row */}
      <div className="ach-card-header">
        <div className="ach-icon-wrap">
          {getIcon(ach.icon, ach.accent)}
        </div>
        <div className="ach-category-chip" style={{ color: categoryAccent[ach.category] ?? "#c2a4ff", borderColor: `${categoryAccent[ach.category] ?? "#c2a4ff"}40` }}>
          {ach.category}
        </div>
      </div>

      {/* Count badge (for entries that have a count) */}
      {ach.count && (
        <div className="ach-count-badge" style={{ color: ach.accent }}>
          <span className="ach-count-num">{ach.count}</span>
          {ach.countLabel && (
            <span className="ach-count-label">{ach.countLabel}</span>
          )}
        </div>
      )}

      {/* Title */}
      <h3 className="ach-card-title">{ach.title}</h3>

      {/* Description */}
      <p className="ach-card-desc">{ach.description}</p>

      {/* Detail pill */}
      {ach.detail && (
        <div className="ach-detail-pill" style={{ background: `${ach.accent}18`, borderColor: `${ach.accent}45`, color: ach.accent }}>
          {ach.detail}
        </div>
      )}

      {/* Security disclaimer */}
      {isSecurityCard && (
        <p className="ach-security-note">
          Counts represent research cases identified or reported. Acceptance, severity, and reward status are platform-determined and not claimed beyond what is verified.
        </p>
      )}

      {/* Footer */}
      <div className="ach-card-footer">
        <div className="ach-verified-row">
          <MdVerified style={{ color: "#06d6a0", fontSize: "15px" }} />
          <span>Verified</span>
        </div>
        {ach.link && (
          <a
            href={ach.link}
            target="_blank"
            rel="noopener noreferrer"
            className="ach-platform-link"
            aria-label={`Visit ${ach.title} platform`}
          >
            Platform <MdArrowOutward />
          </a>
        )}
      </div>
    </div>
  );
};

// ── Mission card ──────────────────────────────────────────────────────────────
const MissionCard = ({
  mission,
  index,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mission: any;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 50}ms`;
          el.classList.add("mission-card-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="mission-card"
      style={{ "--mission-color": mission.color } as React.CSSProperties}
    >
      <div className="mission-card-glow" />
      <div className="mission-icon">{mission.icon}</div>
      <h4 className="mission-title">{mission.title}</h4>
      <p className="mission-desc">{mission.desc}</p>
      {mission.target && (
        <div className="mission-target">Target: {mission.target}</div>
      )}
      <div className="mission-status-badge">Planned Goal</div>
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────────────────────
const AchievementsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    document.title = "Honors & Achievements | Akash T. — AI & Generative AI Engineer";
    window.scrollTo(0, 0);
  }, []);

  const filtered =
    activeFilter === "All"
      ? ACHIEVEMENTS
      : ACHIEVEMENTS.filter((a) => a.category === activeFilter);

  // Stats
  const totalAch = ACHIEVEMENTS.length;
  const securityAch = ACHIEVEMENTS.filter((a) => a.category === "AI Security").length;

  return (
    <div className="page-container ach-page">
      <Link to="/" className="page-back-link">
        ← Back to Home
      </Link>

      {/* ── Hero header ─────────────────────────────────────────── */}
      <div className="ach-hero">
        <div className="ach-hero-particles" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="ach-particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }} />
          ))}
        </div>

        <div className="ach-hero-content">
          <span className="page-tag">Milestones & Recognition</span>
          <h1 className="page-title ach-headline">
            Honors &amp; <span>Achievements</span>
          </h1>
          <p className="page-subtitle">
            Verified academic milestones, AI security research, competitive programming
            records, certifications, and a mission board of ambitious long-term goals.
          </p>

          {/* Quick stats */}
          <div className="ach-stats-row">
            <div className="ach-stat">
              <div className="ach-stat-num">{totalAch}</div>
              <div className="ach-stat-label">Achievements</div>
            </div>
            <div className="ach-stat-divider" />
            <div className="ach-stat">
              <div className="ach-stat-num" style={{ color: "#ef4444" }}>{securityAch}</div>
              <div className="ach-stat-label">Security Research</div>
            </div>
            <div className="ach-stat-divider" />
            <div className="ach-stat">
              <div className="ach-stat-num" style={{ color: "#f59e0b" }}>16</div>
              <div className="ach-stat-label">Cases Identified</div>
            </div>
            <div className="ach-stat-divider" />
            <div className="ach-stat">
              <div className="ach-stat-num" style={{ color: "#7c3aed" }}>{FUTURE_MISSIONS.length}</div>
              <div className="ach-stat-label">Future Missions</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────────── */}
      <div className="ach-filters" role="group" aria-label="Filter achievements by category">
        <MdFilterList style={{ color: "#64748b", fontSize: "18px" }} />
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`ach-filter-btn ${activeFilter === cat.id ? "active" : ""}`}
            onClick={() => setActiveFilter(cat.id)}
            aria-pressed={activeFilter === cat.id}
            style={
              activeFilter === cat.id && cat.id !== "All"
                ? {
                    background: `${categoryAccent[cat.id] ?? "#7c3aed"}22`,
                    borderColor: `${categoryAccent[cat.id] ?? "#7c3aed"}80`,
                    color: categoryAccent[cat.id] ?? "#c2a4ff",
                  }
                : {}
            }
          >
            {cat.label}
            <span className="ach-filter-count">
              {cat.id === "All"
                ? ACHIEVEMENTS.length
                : ACHIEVEMENTS.filter((a) => a.category === cat.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Achievements grid ────────────────────────────────────── */}
      <div className="ach-grid" aria-label="Achievements grid">
        {filtered.map((ach, i) => (
          <AchievementCard key={`${ach.title}-${i}`} ach={ach} index={i} />
        ))}
      </div>

      {/* ── Integrity statement ──────────────────────────────────── */}
      <div className="ach-integrity-banner">
        <MdVerified style={{ color: "#06d6a0", fontSize: "20px", flexShrink: 0 }} />
        <p>
          All achievements represent actual verified academic and technical records. AI security
          entries are labeled as research cases identified or reported — no severity levels, CVEs,
          bounties, or awards are claimed beyond what is independently confirmed.
        </p>
      </div>

      {/* ── AI Security Research highlight ───────────────────────── */}
      <section className="ach-security-section" aria-label="AI Security Research">
        <div className="ach-section-label">
          <MdSecurity style={{ fontSize: "16px" }} />
          AI Security Research
        </div>
        <h2 className="ach-section-title">
          Vulnerability Research &amp; <span>LLM Security</span>
        </h2>
        <p className="ach-section-sub">
          Adversarial research across AI systems, prompt injection evaluation, and
          responsible bug disclosure on industry platforms. All testing conducted on
          authorized targets or in controlled environments only.
        </p>

        <div className="ach-security-platforms">
          {[
            {
              platform: "Mozilla 0DIN",
              count: "16",
              unit: "Cases",
              focus: "Prompt Injection & LLM Jailbreak Research",
              color: "#ef4444",
              link: "https://0din.ai",
            },
            {
              platform: "HackerOne",
              count: "5",
              unit: "Bugs",
              focus: "Application Security & Responsible Disclosure",
              color: "#f97316",
              link: "https://hackerone.com",
            },
            {
              platform: "Bugcrowd",
              count: "2",
              unit: "Bugs",
              focus: "Vulnerability Analysis & Security Testing",
              color: "#f97316",
              link: "https://bugcrowd.com",
            },
          ].map((p) => (
            <a
              key={p.platform}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="ach-platform-card"
              style={{ "--platform-color": p.color } as React.CSSProperties}
            >
              <div className="ach-platform-glow" />
              <div className="ach-platform-count" style={{ color: p.color }}>
                {p.count}
                <span className="ach-platform-unit">{p.unit}</span>
              </div>
              <div className="ach-platform-name">{p.platform}</div>
              <div className="ach-platform-focus">{p.focus}</div>
              <div className="ach-platform-visit">
                Visit <MdArrowOutward />
              </div>
            </a>
          ))}
        </div>

        <div className="ach-security-ethics">
          <MdSecurity style={{ color: "#ef4444", fontSize: "18px", flexShrink: 0 }} />
          <p>
            All security research is conducted on authorized systems, in official bug bounty
            program scope, or in controlled research environments. Findings are disclosed
            responsibly following platform policies.
          </p>
        </div>
      </section>

      {/* ── BEYOND THE LIMITS — Future Missions ─────────────────── */}
      <section className="ach-missions-section" aria-label="Future Missions">
        <div className="ach-missions-header">
          <div className="ach-section-label">
            <MdRocketLaunch style={{ fontSize: "16px" }} />
            Long-Term Vision
          </div>
          <h2 className="ach-section-title">
            BEYOND THE LIMITS — <span>AI Mission Board</span>
          </h2>
          <p className="ach-section-sub">
            Ambitious long-term goals and planned milestones. These are not earned
            achievements — they represent the direction and scale of ambition driving
            current work and learning.
          </p>
          <div className="ach-missions-disclaimer">
            ⚠ All items below are planned goals, not earned accomplishments.
          </div>
        </div>

        <div className="ach-missions-grid">
          {FUTURE_MISSIONS.map((mission, i) => (
            <MissionCard key={mission.title} mission={mission} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;

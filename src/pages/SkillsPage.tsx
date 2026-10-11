import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { SKILLS } from "../data/portfolio";
import "./styles/Pages.css";

const SkillsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    document.title = "Skills | Akash T. — AI & Generative AI Engineer";
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", ...Object.keys(SKILLS)];

  return (
    <div className="page-container">
      <Link to="/" className="page-back-link">
        ← Back to Home
      </Link>

      <div className="page-header">
        <span className="page-tag">Technical Competencies</span>
        <h1 className="page-title">
          Skills &amp; <span>Technologies</span>
        </h1>
        <p className="page-subtitle">
          Technologies and engineering tools applied across Generative AI development,
          agent orchestration, machine learning pipelines, full-stack interfaces,
          and vector databases.
        </p>
      </div>

      {/* Search and Category Filter */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "36px",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", minWidth: "260px", flex: "1 1 300px" }}>
          <MdSearch
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#94a3b8",
              fontSize: "20px",
            }}
          />
          <input
            type="text"
            className="form-input"
            placeholder="Search skills (e.g. LangGraph, PyTorch, FAISS)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "42px" }}
          />
        </div>

        <div className="project-filters" style={{ margin: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Categories Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "60px" }}>
        {Object.entries(SKILLS)
          .filter(([cat]) => selectedCategory === "All" || selectedCategory === cat)
          .map(([category, skills]) => {
            const filteredSkills = search
              ? skills.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
              : skills;

            if (filteredSkills.length === 0) return null;

            return (
              <div
                key={category}
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(194, 164, 255, 0.12)",
                  borderRadius: "16px",
                  padding: "28px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#ffffff",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {category}
                  </h3>
                  <span
                    style={{
                      fontSize: "12px",
                      fontFamily: "monospace",
                      color: "var(--accentColor)",
                    }}
                  >
                    {filteredSkills.length} technologies
                  </span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {filteredSkills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        background: "rgba(124, 58, 237, 0.12)",
                        border: "1px solid rgba(124, 58, 237, 0.3)",
                        color: "#eae5ec",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontFamily: "Geist, sans-serif",
                        display: "inline-block",
                        transition: "all 0.2s",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SkillsPage;

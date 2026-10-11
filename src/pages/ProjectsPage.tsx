import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { PROJECTS } from "../data/portfolio";
import "./styles/Pages.css";

const CATEGORIES = [
  "All",
  "Generative AI",
  "Agentic AI",
  "Machine Learning",
  "Computer Vision",
  "Full Stack",
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null);

  useEffect(() => {
    document.title = "Projects | Akash T. — AI & Generative AI Engineer";
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter(
          (p) =>
            p.category === activeCategory ||
            (p.tags && p.tags.includes(activeCategory))
        );

  return (
    <div className="page-container">
      <Link to="/" className="page-back-link">
        ← Back to Home
      </Link>

      <div className="page-header">
        <span className="page-tag">Selected Works &amp; Systems</span>
        <h1 className="page-title">
          Engineered <span>Projects</span>
        </h1>
        <p className="page-subtitle">
          AI systems, multi-agent frameworks, document intelligence assistants,
          and machine learning models built with verifiable architectures and
          honest capability scopes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="project-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project.id}>
            <div className="project-card-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-card-body">
              <div className="project-card-header">
                <span className="project-card-number">{project.number}</span>
                <span
                  className={`status-badge status-${project.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="project-card-title">{project.title}</h3>
              <div className="project-card-subtitle">{project.subtitle}</div>
              <p className="project-card-desc">{project.description}</p>
              <div className="project-tech-tags">
                {project.tech.map((t) => (
                  <span className="project-tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="project-card-footer">
                <button
                  className="project-details-btn"
                  onClick={() => setSelectedProject(project)}
                >
                  View Architecture &amp; Details →
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-details-btn"
                  >
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <MdClose />
            </button>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
              <span className="project-card-number" style={{ fontSize: "16px" }}>
                {selectedProject.number}
              </span>
              <span
                className={`status-badge status-${selectedProject.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedProject.status}
              </span>
              <span className="page-tag" style={{ margin: 0, padding: "2px 10px" }}>
                {selectedProject.category}
              </span>
            </div>

            <h2 style={{ fontSize: "28px", margin: "0 0 6px 0", color: "#ffffff" }}>
              {selectedProject.title}
            </h2>
            <p style={{ color: "#06b6d4", fontSize: "15px", margin: "0 0 20px 0" }}>
              {selectedProject.subtitle}
            </p>

            <div style={{ marginBottom: "20px" }}>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                style={{
                  width: "100%",
                  maxHeight: "220px",
                  objectFit: "contain",
                  background: "#08070d",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              />
            </div>

            <h4 style={{ color: "#c2a4ff", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 8px 0" }}>
              Detailed Description &amp; Architecture
            </h4>
            <p style={{ color: "#94a3b8", lineHeight: 1.7, fontSize: "14px", marginBottom: "20px" }}>
              {selectedProject.longDescription}
            </p>

            <h4 style={{ color: "#c2a4ff", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px 0" }}>
              Technology Stack
            </h4>
            <div className="project-tech-tags" style={{ marginBottom: "24px" }}>
              {selectedProject.tech.map((t) => (
                <span
                  key={t}
                  className="project-tech-tag"
                  style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    background: "rgba(124, 58, 237, 0.15)",
                    borderColor: "rgba(124, 58, 237, 0.35)",
                    color: "#e2d9f3",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                className="filter-btn"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;

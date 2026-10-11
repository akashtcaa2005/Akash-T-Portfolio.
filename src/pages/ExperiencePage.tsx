import { useEffect } from "react";
import { Link } from "react-router-dom";
import { EXPERIENCE, PROFILE } from "../data/portfolio";
import "./styles/Pages.css";

const ExperiencePage = () => {
  useEffect(() => {
    document.title = "Experience | Akash T. — AI & Generative AI Engineer";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      <Link to="/" className="page-back-link">
        ← Back to Home
      </Link>

      <div className="page-header">
        <span className="page-tag">Career &amp; Internships</span>
        <h1 className="page-title">
          Professional <span>Experience</span>
        </h1>
        <p className="page-subtitle">
          Hands-on engineering roles evaluating advanced AI reasoning, building
          retrieval-augmented generation pipelines, and training machine learning
          models.
        </p>
      </div>

      <div className="experience-timeline">
        {EXPERIENCE.map((exp) => (
          <div
            className={`timeline-item ${exp.current ? "current" : ""}`}
            key={exp.id}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-card">
              <div className="timeline-header">
                <div>
                  <h3 className="timeline-role">{exp.role}</h3>
                  <div className="timeline-company">
                    {exp.company} ·{" "}
                    <span style={{ color: "#94a3b8" }}>{exp.type}</span>
                  </div>
                </div>
                <div
                  className={`timeline-period ${
                    exp.current ? "badge-current" : ""
                  }`}
                >
                  {exp.period}
                </div>
              </div>
              <p className="timeline-desc">{exp.description}</p>
              <div className="project-tech-tags">
                {exp.tech.map((t) => (
                  <span className="project-tech-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Education Timeline Entry */}
        <div className="timeline-item">
          <div className="timeline-dot" style={{ borderColor: "#06b6d4" }}></div>
          <div className="timeline-card">
            <div className="timeline-header">
              <div>
                <h3 className="timeline-role">{PROFILE.education.degree}</h3>
                <div className="timeline-company">
                  {PROFILE.education.college} ·{" "}
                  <span style={{ color: "#94a3b8" }}>{PROFILE.education.university}</span>
                </div>
              </div>
              <div className="timeline-period">{PROFILE.education.period}</div>
            </div>
            <p className="timeline-desc">
              Academic curriculum in Artificial Intelligence and Data Science.
              Cumulative Grade Point Average: {PROFILE.education.cgpa} / 10.
              Status: {PROFILE.education.status}. Coursework encompasses machine
              learning, deep learning architectures, computer vision, natural
              language processing, and database engineering.
            </p>
            <div className="project-tech-tags">
              <span className="project-tech-tag">Artificial Intelligence</span>
              <span className="project-tech-tag">Data Science</span>
              <span className="project-tech-tag">Machine Learning</span>
              <span className="project-tech-tag">Algorithms &amp; Data Structures</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;

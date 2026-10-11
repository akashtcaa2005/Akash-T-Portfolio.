import "./styles/Career.css";
import { EXPERIENCE, PROFILE } from "../data/portfolio";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>

        {/* Education */}
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>{PROFILE.education.degree}</h4>
                <h5>{PROFILE.education.college}</h5>
              </div>
              <h3>{PROFILE.education.period}</h3>
            </div>
            <p>
              {PROFILE.education.university} · CGPA: {PROFILE.education.cgpa} ·{" "}
              {PROFILE.education.status}. Focused on AI, machine learning,
              deep learning, and data-driven systems.
            </p>
          </div>

          {/* Experience entries */}
          {EXPERIENCE.map((exp) => (
            <div className="career-info-box" key={exp.id}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{exp.role}</h4>
                  <h5>
                    {exp.company} · {exp.type}
                  </h5>
                </div>
                <h3 style={{ fontSize: "1.5rem", lineHeight: "1.8rem" }}>
                  {exp.current ? "NOW" : exp.period.split("–")[1] || exp.period}
                </h3>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;

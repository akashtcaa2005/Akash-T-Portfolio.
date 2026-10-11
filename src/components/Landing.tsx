import { PropsWithChildren, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Landing.css";
import { PROFILE } from "../data/portfolio";

const FOCUS_PAIRS = [
  { top: "Generative", bottom: "AI Systems" },
  { top: "Agentic", bottom: "Intelligence" },
  { top: "Applied", bottom: "Deep Learning" },
  { top: "Secure", bottom: "Architecture" },
];

const Landing = ({ children }: PropsWithChildren) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [focusIndex, setFocusIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % PROFILE.roles.length);
    }, 2800);
    const focusTimer = setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % FOCUS_PAIRS.length);
    }, 3200);
    return () => {
      clearInterval(roleTimer);
      clearInterval(focusTimer);
    };
  }, []);

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-circle1"></div>
        <div className="landing-circle2"></div>
        <div className="nav-fade"></div>
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              AKASH
              <br />
              <span>T.</span>
            </h1>
            <div className="landing-role-title">
              {PROFILE.roles[roleIndex]}
            </div>
            <p className="landing-tagline">
              {PROFILE.tagline}
            </p>
            <div className="landing-cta-group">
              <Link to="/projects" className="landing-btn landing-btn-primary">
                Explore Projects
              </Link>
              <Link to="/security" className="landing-btn landing-btn-security">
                AI Security ↗
              </Link>
              <Link to="/contact" className="landing-btn landing-btn-outline">
                Contact Me
              </Link>
            </div>
          </div>
          <div className="landing-info">
            <h3>Focusing On</h3>
            <h2 className="landing-info-h2">
              <span key={`f-top-${focusIndex}`} className="landing-focus-word">
                {FOCUS_PAIRS[focusIndex].top}
              </span>
            </h2>
            <h2>
              <span key={`f-bot-${focusIndex}`} className="landing-focus-word landing-focus-bottom">
                {FOCUS_PAIRS[focusIndex].bottom}
              </span>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;

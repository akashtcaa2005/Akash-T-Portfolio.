import { MdArrowOutward, MdCopyright, MdLocationOn, MdCode } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles/Contact.css";
import { PROFILE } from "../data/portfolio";

const Contact = () => {
  const year = new Date().getFullYear();

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">

        {/* Top label */}
        <div className="contact-label">
          <span className="contact-label-dot" />
          Get in Touch
        </div>

        {/* Headline */}
        <h2 className="contact-headline">
          Let's Build Something<br />
          <span className="contact-headline-accent">Intelligent.</span>
        </h2>

        {/* Main grid */}
        <div className="contact-main-grid">

          {/* Left: tagline + quick info */}
          <div className="contact-left">
            <p className="contact-tagline">
              Open to AI engineering roles, internships, research collaborations,
              and building impactful AI-powered products.
            </p>

            <div className="contact-info-items">
              <div className="contact-info-row">
                <MdLocationOn className="contact-info-icon location" />
                <div>
                  <div className="contact-info-label">Based in</div>
                  <div className="contact-info-value">{PROFILE.location}</div>
                </div>
              </div>

              <div className="contact-info-row">
                <MdCode className="contact-info-icon role" />
                <div>
                  <div className="contact-info-label">Role</div>
                  <div className="contact-info-value">{PROFILE.title}</div>
                </div>
              </div>
            </div>

            <Link to="/contact" className="contact-cta-btn">
              Send a Message <MdArrowOutward />
            </Link>
          </div>

          {/* Right: social links + divider */}
          <div className="contact-right">
            <div className="contact-right-label">Connect Directly</div>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social-card"
            >
              <FaGithub className="social-card-icon github" />
              <div className="social-card-body">
                <div className="social-card-name">GitHub</div>
                <div className="social-card-handle">github.com/akashtcaa2005</div>
              </div>
              <MdArrowOutward className="social-card-arrow" />
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social-card"
            >
              <FaLinkedin className="social-card-icon linkedin" />
              <div className="social-card-body">
                <div className="social-card-name">LinkedIn</div>
                <div className="social-card-handle">linkedin.com/in/akash-t</div>
              </div>
              <MdArrowOutward className="social-card-arrow" />
            </a>
          </div>
        </div>

        {/* Footer strip */}
        <div className="contact-footer-strip">
          <div className="contact-footer-credit">
            Designed &amp; Developed by <strong>{PROFILE.name}</strong>
          </div>
          <div className="contact-footer-copy">
            <MdCopyright /> {year}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

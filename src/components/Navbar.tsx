import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollSmoother } from "gsap-trial/ScrollSmoother";
import { MdSecurity, MdMenu, MdClose } from "react-icons/md";
import "./styles/Navbar.css";
import { PROFILE } from "../data/portfolio";

export let smoother: ScrollSmoother | null = null;
export const setNavbarSmoother = (s: ScrollSmoother | null) => {
  smoother = s;
};

const navLinks = [
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Skills", path: "/skills" },
  { name: "Security", path: "/security", isSecurity: true },
  { name: "Achievements", path: "/achievements" },
  { name: "Contact", path: "/contact", isCta: true },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change & scroll to top
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      if (smoother) {
        smoother.scrollTo(0, true);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header className="header">
      <Link
        to="/"
        className="navbar-title"
        data-cursor="disable"
        onClick={handleHomeClick}
      >
        <span className="navbar-logo-badge">AT</span>
        <span className="navbar-logo-text">AKASH T.</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="desktop-nav" aria-label="Main Navigation">
        <ul>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            if (link.isSecurity) {
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-security-link ${isActive ? "active" : ""}`}
                  >
                    <MdSecurity className="nav-security-icon" />
                    <span>AI Security</span>
                  </Link>
                </li>
              );
            }
            if (link.isCta) {
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`nav-cta-btn ${isActive ? "active" : ""}`}
                  >
                    Contact
                  </Link>
                </li>
              );
            }
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-item-link ${isActive ? "active" : ""}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <MdClose /> : <MdMenu />}
      </button>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileOpen(false)}>
          <div
            className="mobile-menu-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-menu-header">
              <span className="navbar-logo-text">AKASH T.</span>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <MdClose />
              </button>
            </div>

            <ul className="mobile-nav-list">
              <li>
                <Link
                  to="/"
                  className={location.pathname === "/" ? "active" : ""}
                >
                  Home
                </Link>
              </li>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`${
                      location.pathname === link.path ? "active" : ""
                    } ${link.isSecurity ? "mobile-security-link" : ""}`}
                  >
                    {link.isSecurity && <MdSecurity style={{ marginRight: "6px" }} />}
                    {link.name === "Security" ? "Cybersecurity & AI Security" : link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mobile-social-links">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

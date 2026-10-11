import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Cursor from "./Cursor";
import SocialIcons from "./SocialIcons";
import { MdCopyright } from "react-icons/md";
import { Link } from "react-router-dom";
import { PROFILE } from "../data/portfolio";

const PageLayout = ({ children }: PropsWithChildren) => {
  const year = new Date().getFullYear();

  return (
    <div className="container-main" style={{ minHeight: "100vh", position: "relative" }}>
      <Cursor />
      <Navbar />
      <SocialIcons />
      <main className="main-active" style={{ opacity: 1, minHeight: "calc(100vh - 140px)" }}>
        {children}
      </main>
      <footer className="site-footer">
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            Designed and Developed by <strong style={{ color: "#ffffff" }}>{PROFILE.name}</strong>
            <span style={{ marginLeft: "12px", color: "#64748b" }}>
              <MdCopyright /> {year}
            </span>
          </div>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/security" style={{ color: "#06b6d4" }}>AI Security</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/achievements">Achievements</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;

import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Pages.css";

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 Not Found | Akash T.";
  }, []);

  return (
    <div
      className="page-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        minHeight: "80vh",
      }}
    >
      <span className="page-tag">404 Error</span>
      <h1 className="page-title">
        Page <span>Not Found</span>
      </h1>
      <p className="page-subtitle" style={{ marginBottom: "32px" }}>
        The requested URL was not found on this portfolio. Please explore the main pages below.
      </p>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" className="filter-btn active">
          Home
        </Link>
        <Link to="/projects" className="filter-btn">
          Projects
        </Link>
        <Link to="/security" className="filter-btn">
          AI Security
        </Link>
        <Link to="/contact" className="filter-btn">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

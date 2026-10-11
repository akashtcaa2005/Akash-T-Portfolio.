import { useEffect } from "react";
import { Link } from "react-router-dom";
import Security from "../components/Security";
import "./styles/Pages.css";

const SecurityPage = () => {
  useEffect(() => {
    document.title = "Cybersecurity & AI Security | Akash T.";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "88px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "1200px",
          width: "100%",
          padding: "0 24px",
          boxSizing: "border-box",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <Link
          to="/"
          className="page-back-link"
          style={{ pointerEvents: "auto" }}
        >
          ← Back to Home
        </Link>
      </div>
      <Security />
    </div>
  );
};

export default SecurityPage;

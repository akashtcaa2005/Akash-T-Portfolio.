import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PROJECTS } from "../data/portfolio";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;

      const workFlex = document.querySelector(".work-flex") as HTMLElement;
      const workSection = document.querySelector(
        ".work-section"
      ) as HTMLElement;

      if (!workFlex || !workSection) return;

      const boxWidth = box[0].getBoundingClientRect().width;
      const totalBoxesWidth = boxWidth * box.length;
      const viewportWidth = workSection.getBoundingClientRect().width;
      translateX = totalBoxesWidth - viewportWidth;
    }

    setTranslateX();

    const smoothContent = document.getElementById("smooth-content");

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
        ...(smoothContent ? { pinnedContainer: smoothContent } : {}),
        onEnter: () => {
          gsap.set(".work-section", { zIndex: 20 });
        },
        onLeave: () => {
          gsap.set(".work-section", { zIndex: 10 });
        },
        onEnterBack: () => {
          gsap.set(".work-section", { zIndex: 20 });
        },
        onLeaveBack: () => {
          gsap.set(".work-section", { zIndex: 10 });
        },
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {PROJECTS.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tech Stack</h4>
                <p>{project.tech.slice(0, 5).join(", ")}</p>
                <div className="work-status">
                  <span
                    className={`status-badge status-${project.status.toLowerCase().replace(" ", "-")}`}
                  >
                    {project.status}
                  </span>
                </div>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-link"
                  >
                    GitHub →
                  </a>
                )}
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;

import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  useEffect(() => {
    const containers = containerRef.current;
    const listeners: Array<{ el: HTMLDivElement; fn: () => void }> = [];

    containers.forEach((container) => {
      if (container) {
        const handler = () => handleClick(container);
        container.addEventListener("click", handler);
        listeners.push({ el: container, fn: handler });
      }
    });

    return () => {
      listeners.forEach(({ el, fn }) => {
        el.removeEventListener("click", fn);
      });
    };
  }, []);

  return (
    <div className="whatIDO" id="whatIDO">
      <div className="what-box">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          {/* Card 1: BUILD */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 0)}
          >
            <div className="what-arrow"></div>
            <div className="what-content-in">
              <h3>BUILD</h3>
              <h4>Generative AI &amp; Agentic Systems</h4>
              <p>
                I design and implement multi-agent systems, RAG pipelines, and
                LLM-powered applications using LangChain, LangGraph, and Gemini
                APIs. I focus on reliable, grounded, and production-ready AI
                architectures.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">LangChain</div>
                <div className="what-tags">LangGraph</div>
                <div className="what-tags">RAG</div>
                <div className="what-tags">Gemini API</div>
                <div className="what-tags">FastAPI</div>
                <div className="what-tags">FAISS</div>
                <div className="what-tags">pgvector</div>
                <div className="what-tags">LangSmith</div>
                <div className="what-tags">Prompt Engineering</div>
                <div className="what-tags">Multi-Agent Systems</div>
              </div>
            </div>
          </div>

          {/* Card 2: ENGINEER */}
          <div
            className="what-content what-noTouch"
            ref={(el) => setRef(el, 1)}
          >
            <div className="what-arrow"></div>
            <div className="what-content-in">
              <h3>ENGINEER</h3>
              <h4>ML, Data Science &amp; Full-Stack AI</h4>
              <p>
                I train and deploy machine learning models, build data pipelines,
                and integrate AI into full-stack applications with React,
                TypeScript, PostgreSQL, and Supabase. I value clean code,
                reproducibility, and honest evaluation.
              </p>
              <h5>Skillset &amp; tools</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">Scikit-learn</div>
                <div className="what-tags">PyTorch</div>
                <div className="what-tags">XGBoost</div>
                <div className="what-tags">React</div>
                <div className="what-tags">TypeScript</div>
                <div className="what-tags">PostgreSQL</div>
                <div className="what-tags">Supabase</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container && sibling instanceof HTMLElement) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

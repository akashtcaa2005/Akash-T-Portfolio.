import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar, { setNavbarSmoother } from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import FeaturedSecurity from "./FeaturedSecurity";
import setSplitText, { revertSplitText } from "./utils/splitText";
import { cleanupScrollTimelines } from "./utils/GsapScroll";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    document.title = "Akash T. — AI & Generative AI Engineer";

    const wrapper = document.querySelector("#smooth-wrapper");
    const content = document.querySelector("#smooth-content");
    let smootherInst: ScrollSmoother | null = null;

    if (wrapper && content && window.innerWidth > 1024) {
      try {
        smootherInst = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.5,
          speed: 1.5,
          effects: true,
          autoResize: true,
          ignoreMobileResize: true,
        });
        smootherInst.scrollTop(0);
        smootherInst.paused(false);
        setNavbarSmoother(smootherInst);
      } catch (e) {
        console.warn("ScrollSmoother init warning:", e);
      }
    }

    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
      if (smootherInst) {
        ScrollSmoother.refresh(true);
      }
    };

    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cleanupScrollTimelines();
      revertSplitText();
      if (smootherInst) {
        try {
          smootherInst.kill();
        } catch (e) {
          console.warn("ScrollSmoother cleanup:", e);
        }
        setNavbarSmoother(null);
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.body.style.removeProperty("overflow");
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            <FeaturedSecurity />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;

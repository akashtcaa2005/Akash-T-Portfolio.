import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let intensityInterval: ReturnType<typeof setInterval> | null = null;
let screenLightTl: gsap.core.Timeline | null = null;

export function cleanupScrollTimelines() {
  if (intensityInterval) {
    clearInterval(intensityInterval);
    intensityInterval = null;
  }
  if (screenLightTl) {
    screenLightTl.kill();
    screenLightTl = null;
  }
  const triggerIds = ["landing-char", "about-char", "what-char", "what-mobile", "career-line"];
  triggerIds.forEach((id) => {
    ScrollTrigger.getById(id)?.kill();
  });
}

export function setCharTimeline(
  character: THREE.Object3D<THREE.Object3DEventMap> | null,
  camera: THREE.PerspectiveCamera
) {
  if (!character || !document.querySelector(".landing-section") || !document.querySelector(".about-section")) {
    return;
  }

  // Clear any previous triggers
  cleanupScrollTimelines();

  let intensity = 0;
  intensityInterval = setInterval(() => {
    intensity = Math.random();
  }, 200);

  const tl1 = gsap.timeline({
    scrollTrigger: {
      id: "landing-char",
      trigger: ".landing-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      id: "about-char",
      trigger: ".about-section",
      start: "center 55%",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  const tl3 = gsap.timeline({
    scrollTrigger: {
      id: "what-char",
      trigger: ".whatIDO",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  let screenLight: THREE.Mesh | null = null;
  let monitor: THREE.Mesh | null = null;

  character.children.forEach((object: THREE.Object3D) => {
    if (object.name === "Plane004") {
      object.children.forEach((child: THREE.Object3D) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.transparent = true;
          mat.opacity = 0;
          if (mat.name === "Material.027") {
            monitor = mesh;
            mat.color.set("#FFFFFF");
          }
        }
      });
    }
    if (object.name === "screenlight") {
      const mesh = object as THREE.Mesh;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.transparent = true;
        mat.opacity = 0;
        mat.emissive.set("#C8BFFF");
        screenLightTl = gsap.timeline({ repeat: -1, repeatRefresh: true }).to(mat, {
          emissiveIntensity: () => intensity * 8,
          duration: () => Math.random() * 0.6,
          delay: () => Math.random() * 0.1,
        });
        screenLight = mesh;
      }
    }
  });

  const neckBone = character.getObjectByName("spine005");

  if (window.innerWidth > 1024) {
    tl1
      .fromTo(character.rotation, { y: 0 }, { y: 0.7, duration: 1 }, 0)
      .to(camera.position, { z: 22 }, 0)
      .fromTo(".character-model", { x: 0 }, { x: "-25%", duration: 1 }, 0)
      .to(".landing-container", { opacity: 0, duration: 0.4 }, 0)
      .to(".landing-container", { y: "40%", duration: 0.8 }, 0)
      .fromTo(".about-me", { y: "-50%" }, { y: "0%" }, 0);

    tl2
      .to(
        camera.position,
        { z: 75, y: 8.4, duration: 6, delay: 2, ease: "power3.inOut" },
        0
      )
      .to(".about-section", { opacity: 0, delay: 3, duration: 3 }, 0)
      .fromTo(
        ".character-model",
        { pointerEvents: "inherit" },
        { pointerEvents: "none", x: "-12%", delay: 2, duration: 5 },
        0
      )
      .to(character.rotation, { y: 0.92, x: 0.12, delay: 3, duration: 3 }, 0);

    if (neckBone) {
      tl2.to(neckBone.rotation, { x: 0.6, delay: 2, duration: 3 }, 0);
    }

    const targetMonitor = monitor as THREE.Mesh | null;
    const targetScreenLight = screenLight as THREE.Mesh | null;

    if (targetMonitor) {
      tl2
        .to(targetMonitor.material, { opacity: 1, duration: 0.8, delay: 3.2 }, 0)
        .fromTo(
          targetMonitor.position,
          { y: -10, z: 2 },
          { y: 0, z: 0, delay: 1.5, duration: 3 },
          0
        );
    }
    if (targetScreenLight) {
      tl2.to(targetScreenLight.material, { opacity: 1, duration: 0.8, delay: 4.5 }, 0);
    }

    tl2.fromTo(
      ".character-rim",
      { opacity: 1, scaleX: 1.4 },
      { opacity: 0, scale: 0, y: "-70%", duration: 5, delay: 2 },
      0.3
    );

    tl3
      .fromTo(
        ".character-model",
        { y: "0%" },
        { y: "-100%", duration: 4, ease: "none", delay: 1 },
        0
      )
      .to(character.rotation, { x: -0.04, duration: 2, delay: 1 }, 0);
  }
}

export function setAllTimeline() {
  if (!document.querySelector(".career-section")) return;

  const careerTimeline = gsap.timeline({
    scrollTrigger: {
      id: "career-line",
      trigger: ".career-section",
      start: "top 30%",
      end: "100% center",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });

  careerTimeline
    .fromTo(
      ".career-timeline",
      { maxHeight: "10%" },
      { maxHeight: "100%", duration: 0.5 },
      0
    )
    .fromTo(
      ".career-timeline",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    );

  const dots = document.querySelectorAll(".career-dot");
  if (dots.length > 0) {
    careerTimeline.fromTo(
      ".career-dot",
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      0
    );
  }
}

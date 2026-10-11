import IMText from "./iAmText";
import { useEffect, useRef } from "react";
import { useMainStore } from "../../statemanagement/store";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

export default function HeaderText() {
  const headerTextRef = useRef<HTMLDivElement>(null);
  const greetElementRef = useRef<HTMLSpanElement>(null);
  const greetRef = useRef<gsap.core.Timeline | null>(null);

  const bottomBtn = useRef<gsap.core.Timeline | null>(null);

  const setCurrentPage = useMainStore((state) => state.setCurrentPage);
  const shouldReduceMotion = useReducedMotion();

  useGSAP(() => {
    const greetElement = greetElementRef.current;
    if (!greetElement) return;

    const greetSplitter = SplitText.create(greetElement, { type: "words" });

    bottomBtn.current = gsap.timeline({ paused: true }).from(".bottom-btn", {
      y: 100,
      stagger: 0.4,
      opacity: 0.2,
      duration: 0.6,
      ease: "power3.inOut",
    });

    greetRef.current = gsap
      .timeline({ paused: true })
      .from(greetSplitter.words, {
        y: -90,
        stagger: 0.4,
        opacity: 0.05,
        duration: 0.6,
        ease: "back.in",
      });

    return () => greetSplitter.revert();
  }, { scope: headerTextRef });

  useEffect(() => {
    const headerText = headerTextRef.current;
    if (!headerText) return;

    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting) {
        const page = headerText.closest(".section-pages");
        if (page?.id) setCurrentPage(page.id);
        greetRef.current?.restart();
        bottomBtn.current?.restart();
      }
    }, {
      root: headerText.closest(".main-container"),
      threshold: 0,
    });

    observer.observe(headerText);
    return () => observer.disconnect();
  }, [setCurrentPage]);

  return (
    <div ref={headerTextRef} className="mb-0 mt-[60%] md:mt-[10%] rounded-lg p-4 w-full md:w-1/2 text-center md:text-left overflow-hidden">
      <div className="p-2 rounded-md">
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 overflow-hidden">
            <span
              ref={greetElementRef}
              className="greet text-white flex flex-row m-2"
              style={{ textShadow: "1px 0 3px black" }}
            >
              Hi, I'm
            </span>
            <motion.span
              className="inline-block max-w-full text-4xl sm:text-5xl md:text-6xl font-normal leading-tight"
              animate={shouldReduceMotion ? undefined : {
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={shouldReduceMotion ? undefined : {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundImage: "linear-gradient(90deg, #8b5cf6, aquamarine, #d946ef, #3b82f6, #8b5cf6)",
                backgroundSize: "300% 100%",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Thapelo Petrick Sikhosana
            </motion.span>
          </h1>

          <IMText />

          <div className="bottom-btn flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              className="bg-blue-400 text-white px-6 py-3 cursor-pointer rounded-lg font-medium hover:opacity-90 transition-all"
              onClick={() => {
                const targetElement = document.getElementById("skills-page");
                if (targetElement)
                  targetElement.scrollIntoView({ behavior: "smooth" });
                setCurrentPage("skills-page");
              }}
            >
              View My Work
            </button>

            <button
              className="bg-white px-6 py-3 cursor-pointer rounded-lg font-medium hover:bg-secondary/80 transition-all"
              onClick={() => {
                const targetElement = document.getElementById("contact-page");
                if (targetElement)
                  targetElement.scrollIntoView({ behavior: "smooth" });
                setCurrentPage("contact-page");
              }}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

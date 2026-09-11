import IMText from "./iAmText";
import { useEffect, useRef } from "react";
import { useMainStore } from "../../statemanagement/store";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/src/SplitText";
import ScrollTrigger from "gsap/src/ScrollTrigger";

export default function HeaderText() {
  const headerTextRef = useRef<HTMLDivElement>(null);
  const myNameRef = useRef<gsap.core.Timeline | null>(null);
  const greetRef = useRef<gsap.core.Timeline | null>(null);

  const bottomBtn = useRef<gsap.core.Timeline | null>(null);

  const setCurrentPage = useMainStore((state) => state.setCurrentPage);

  useGSAP(() => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    const nameSplitter = SplitText.create(".myName", { type: "words" });
    const greetSplitter = SplitText.create(".greet", { type: "words" });

    bottomBtn.current = gsap.timeline({ pause: true }).from(".bottom-btn", {
      y: 100,
      stagger: 0.4,
      opacity: 0.2,
      duration: 0.6,
      ease: "power3.inOut",
    });

    greetRef.current = gsap
      .timeline({ pause: true })
      .from(greetSplitter.words, {
        y: -90,
        stagger: 0.4,
        opacity: 0.05,
        duration: 0.6,
        ease: "back.in",
      });

    myNameRef.current = gsap
      .timeline({ pause: true })
      .from(nameSplitter.words, {
        x: -500,
        stagger: 0.4,
        duration: 0.6,
        ease: "circ.inOut",
      });
  });

  useEffect(() => {
    const observerOptions = { root: null, threshold: 1.0 };

    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && entries.intersectionRatio === 1) {
        myNameRef.current?.play();
        greetRef.current?.play();
        bottomBtn.current?.play();
      } else {
        myNameRef.current?.reverse();
        greetRef.current?.reverse();
        bottomBtn.current?.reverse();
      }
    }, observerOptions);

    const observeElement = document.getElementById("header-page");
    if (!observeElement) return;
    observer.observe(observeElement);
  }, []);

  return (
    <div className="border-2 border-green-500 mt-[30%] md:mt-[10%] rounded-lg p-4 w-full md:w-1/2 text-center md:text-left overflow-hidden">
      <div className="p-2 rounded-md">
        <div className="overflow-hidden">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 overflow-hidden">
            <span
              className="greet text-white flex flex-row m-2"
              style={{ textShadow: "1px 0 3px black" }}
            >
              Hi, I'm
            </span>
            <motion.span
              // className="myName font-light text-[orange]"
              className="text-6xl font-normal bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{
                backgroundImage: "linear-gradient(90deg, #8b5cf6, aquamarine, #d946ef, #3b82f6, #8b5cf6)",
                backgroundSize: "200% auto",
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

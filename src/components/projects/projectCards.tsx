import Packages from "../about/libraries";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ProjectImage from "./ui/projectImage";
import { SplitText } from "gsap/all";

type PROPS = {
  projectImageUrl: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  codeLink: string;
  projectItems: string[];
  projectRevere: boolean;
};

export default function ProjectCard({
  projectImageUrl,
  projectTitle,
  projectDescription,
  projectLink,
  codeLink,
  projectItems,
  projectRevere,
}: PROPS) {
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<gsap.core.Timeline | null>(null);
  const describeRef = useRef<gsap.core.Timeline | null>(null);

  const paragraphRef = useRef<HTMLParagraphElement>(null);

  // words animation
  useGSAP(
    () => {
      const paragraph = paragraphRef.current;
      if (!paragraph) return;

      const headerSplitter = SplitText.create(".header-char", {
        type: "chars",
      });
      const describeSplitter = SplitText.create(paragraph, { type: "words" });

      headerRef.current = gsap
        .timeline({ paused: true })
        .from(headerSplitter.chars, {
          y: -90,
          stagger: 0.05,
          opacity: 0.1,
          duration: 0.2,
        });

      describeRef.current = gsap
        .timeline({ paused: true })
        .from(describeSplitter.words, {
          opacity: 0.05,
          stagger: 0.07,
          duration: 0.05,
          ease: "sine.inOut",
        });

      return () => {
        headerSplitter.revert();
        describeSplitter.revert();
      };
    },
    { scope: cardRef },
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          headerRef.current?.play();
          describeRef.current?.play();
          observer.unobserve(card);
        }
      },
      {
        root: card.closest(".skills-scroll-container"),
        threshold: 0.1,
      },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`
    flex ${projectRevere ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"}
    border-t border-t-[rgba(96,165,250,0.5)] w-[99%] mt-2 bg-black/20 h-auto lg:h-90 lg:my-15 mx-2 overflow-hidden`}
      ref={cardRef}
    >
      <ProjectImage imageUrl={projectImageUrl} />

      <div className="w-full md:w-1/2 h-full py-4 px-2 backdrop:blur-xs overflow-hidden">
        <h1 className="header-char text-white text-center text-2xl my-4">
          {projectTitle}
          <span className="text-blue-400"> Application</span>
        </h1>
        <p ref={paragraphRef} className="describe text-white/40">
          {projectDescription}
        </p>

        <hr className="border-t border-blue-400 my-6" />

        <Packages items={projectItems} />

        <div>
          <button
            className="p-2 m-4 px-8 w-fit bg-[rgba(0,255,255,0.1)] text-white rounded-2xl cursor-pointer"
            style={{
              boxShadow:
                "inset 0.5px 0.5px 5px white, inset -0.5px -0.5px 5px white, 1px 2px 9px black, 1px 2px 15px rgba(96,165,250,0.5)",
              textShadow: "1px 1px 2px black",
            }}
          >
            <a href={projectLink} target="_blank">
              Link
            </a>
          </button>

          <button
            className="p-2 m-4 px-4 w-fit bg-[rgba(0,255,255,0.1)] text-white rounded-2xl cursor-pointer"
            style={{
              boxShadow:
                "inset 0.5px 0.5px 5px white, inset -0.5px -0.5px 5px white, 1px 2px 9px black, 1px 2px 15px rgba(96,165,250,0.5)",
              textShadow: "1px 1px 2px black",
            }}
          >
            <a href={codeLink} target="_blank">
              View Code
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

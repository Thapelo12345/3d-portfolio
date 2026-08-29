import Packages from "../about/libraries";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { scale } from "framer-motion";
import SplitText from "gsap/src/SplitText";

type PROPS = {
  projectImageUrl: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
  projectItems: string[];
  projectRevere: boolean;
};

export default function ProjectCard({
  projectImageUrl,
  projectTitle,
  projectDescription,
  projectLink,
  projectItems,
  projectRevere
}: PROPS) {

  const imageRef = useRef<gsap.core.Timeline | null>(null);
  const headerRef = useRef<gsap.core.Timeline | null>(null);
  const describeRef = useRef<gsap.core.Timeline | null>(null);

  const imageElementRef = useRef<HTMLImageElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useGSAP(()=>{
    gsap.registerPlugin(SplitText)

    const headerSplitter = SplitText.create(".header-char", {type: "chars"})
    const describeSplitter = SplitText.create(paragraphRef.current, {type: "words"})

    headerRef.current = gsap.timeline({pause: true}).from(headerSplitter.chars, {
      y: -90,
      stagger: 0.05,
      opacity: 0.1,
      duration: 0.2
    })

    describeRef.current = gsap.timeline({pause: true}).from(describeSplitter.words, {
      opacity: 0.05,
      stagger: 0.07,
      duration: 0.05,
      ease: "sine.inOut"
    })

    imageRef.current = gsap.timeline({pause: true}).from(imageElementRef.current,{
      stagger: 0.4,
      scale: 0.5,
      opacity: 0.2,
      duration: 0.5,
    })
  })

  useEffect(()=>{
  const observerOptions = {
  root: null,
  threshold: 1.0
};

const observer = new IntersectionObserver(([entries]) => {
  if(!imageRef.current || !headerRef.current || !describeRef.current) return
  if (entries.isIntersecting && entries.intersectionRatio === 1) {
    imageRef.current.play()
    headerRef.current.play()
    describeRef.current.play()
  }
  else {
    imageRef.current.reverse()
    headerRef.current.reverse()
    describeRef.current?.reverse()
  }
      
}, observerOptions);

const targetElement = document.getElementById("skills-page")
if(!targetElement) return
observer.observe(targetElement);
  }, [])

  return (
    <div className={`
    flex ${projectRevere ? "flex-col md:flex-row-reverse" : "flex-col md:flex-row"}
    border-t border-t-[rgba(96,165,250,0.5)] w-[99%] mt-2 bg-black/20 h-auto md:h-90 md:my-15 mx-2 overflow-hidden`}>
      
      <div className="flex items-center justify-center w-full md:w-1/2 h-full">
        <img
          ref={imageElementRef}
          className="project-image w-full md:w-150 h-80 rounded-lg"
          src={projectImageUrl}
          alt="Project image"
        />
      </div>

      <div className="w-full md:w-1/2 h-full py-4 px-2 backdrop:blur-xs overflow-hidden">
        <h1 className="header-char text-white text-center text-2xl my-4">
          {projectTitle}
          <span className="text-blue-400"> Application</span>
        </h1>
        <p 
        ref={paragraphRef}
        className="describe text-white/40">{projectDescription}</p>

        <hr className="border-t border-blue-400 my-6" />

        <Packages items={projectItems} />

        <button
          className="p-2 m-4 px-8 w-fit bg-[rgba(96,165,250,0.5)] border-2 border-white text-white rounded-2xl cursor-pointer"
          style={{
            boxShadow:
            "inset 2px 2px 2px black, 1px 2px 9px black, 1px 2px 15px rgba(96,165,250,0.5)",
            textShadow: "1px 1px 2px black",
          }}
        >
          Link
        </button>
      </div>
    </div>
  );
}

import { useRef } from "react"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { publicAsset } from "../../assets/publicAsset";
import { SplitText, ScrollTrigger } from "gsap/all";

export default function Introduction() {
  const introContainerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const container = introContainerRef.current;
    const scroller = container?.closest<HTMLElement>(".custom-scrollbar");
    if (!container || !scroller) {
      throw new Error(
        "Introduction must be inside the .custom-scrollbar element",
      );
    }

    const text = container.querySelector(".intro-text");
    if (!text) throw new Error("Introduction text element was not found");
    const textSplit = SplitText.create(text, { type: "words" });

    gsap.from(textSplit.words, {
      scrollTrigger: {
        trigger: container,
        scroller,
        start: "top 100%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
      xPercent: 30,
      stagger: 0.02,
      autoAlpha: 0,
      duration: 0.05,
    });
    return () => textSplit.revert();
  }, { scope: introContainerRef });
  return (
    <div 
    ref={introContainerRef}
    className="intro-container -mt-20 md:mt-0 lg:px-4 flex flex-row w-full md:w-[90%] md:mx-auto overflow-hidden">
      <div className="p-2 w-full lg:w-1/2 mt-20 h-fit overflow-hidden">

    <div className="w-1/2 h-90 mx-auto hidden md:block lg:hidden">
     <img
        className="w-full h-full md:w-78 md:h-80 rounded-full mx-auto"
        src={publicAsset("School.png")}
        alt="Thapelo"
     />
      </div>
     
        <h1
          className="text-center text-2xl mt-20 underline-offset-1 underline text-white"
          style={{ textShadow: "1px 1px 2px black" }}
        >
          Introd
          <span className="text-blue-400">uction</span>
        </h1>
        <p className="intro-text text-white text-sm p-4">
          Hi, I'm Thapelo. I'm a developer who loves bringing ideas to life on
          the screen—whether that's on a desktop browser or a mobile phone. I
          honed my skills through freeCodeCamp's self-paced curriculum, where I
          built dozens of hands-on projects that taught me how to write clean,
          maintainable code from the ground up. I specialize in the React
          ecosystem, handling everything from the front-end UI to the back-end
          logic, which means I can take a feature from concept all the way to
          production. I'm a big believer in quality assurance, which is why I'm
          proficient in testing with Jest for unit tests and Playwright for
          end-to-end browser automation, ensuring that what I ship actually
          works. Right now, I'm excited to be exploring the potential of AI and
          how it can create better, more personalized user experiences.
        </p>
      </div>
    </div>
  );
}

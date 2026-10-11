import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

type PROPS = {
  alignment: string;
  title1: string;
  title2: string;
  sectionNumber: number;
  sectionDescription: string;
};

export default function JourneySection({
  alignment,
  title1,
  title2,
  sectionNumber,
  sectionDescription,
}: PROPS) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const paragraph = paragraphRef.current;
      const scroller = section?.parentElement;

      if (!section || !paragraph || !scroller)
        throw new Error("JourneySection must be inside its scroll container");

      const splitWords = SplitText.create(paragraph, { type: "words" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller,
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play reverse play reverse",
        },
      });

      timeline
        .from(
          paragraph,
          {
            x: alignment !== "left" ? -850 : 850,
            duration: 0.8,
            delay: 0.2
          },
          0,
        )
        .from(
          splitWords.words,
          {
            x: alignment !== "left" ? -835 : 835,
            stagger: 0.02,
            duration: 0.06,
          },
          1.3,
        );

      const sectionBounds = section.getBoundingClientRect();
      const scrollerBounds = scroller.getBoundingClientRect();
      const viewportTop = scrollerBounds.top + scroller.clientTop;
      const viewportBottom = viewportTop + scroller.clientHeight;

      if (
        sectionBounds.bottom > viewportTop &&
        sectionBounds.top < viewportBottom
      ) {
        timeline.play();
      }

      return () => splitWords.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className={`w-full h-full flex flex-col ${alignment === "left" ? "items-end" : "items-start"} snap-start`}
    >
      <div
        className="flex items-center justify-center w-10 h-10 m-2 rounded-full"
        style={{
          boxShadow:
            "inset 1px 1px 8px rgb(96, 165, 250), inset -1px -1px 8px rgb(96, 165, 250), 2px 12px 10px black, 2px 7px 10px rgb(96, 165, 250)",
          backdropFilter: "blur(5px)",
        }}
      >
        <span className="text-white font-extrabold">{sectionNumber}</span>
      </div>

      <div className="m-2 p-2 rounded-lg">
        <h4
          className={`${alignment === "left" ? "ml-0 md:ml-140" : "ml-0"} text-white text-lg underline underline-offset-2 font-bold`}
          style={{ textShadow: "1px 1px 3px black" }}
        >
          {title1}
          <span className="text-blue-400">{title2}</span>
        </h4>
        <p
          ref={paragraphRef}
          className={`${alignment === "left" ? "ml-0 md:ml-60" : "ml-0"} text-animation4 text-white w-full md:w-[70%] h-fit text-sm p-4 m-4 border-t border-blue-400 overflow-hidden`}
          style={{
            backdropFilter: "blur(4px)",
            textShadow: "1px 1px 2px black",
          }}
        >
          {sectionDescription}
        </p>
      </div>
    </section>
  );
}

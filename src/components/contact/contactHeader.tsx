import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

export default function ContactHeader() {
  const headerContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = headerContainerRef.current;
    const scroller = container?.closest<HTMLElement>(".custom-scrollbar");
    if (!container || !scroller) {
      throw new Error("ContactHeader must be inside a .custom-scrollbar");
    }

    const headerSplitter = SplitText.create(".contact-header", {
      type: "chars",
    });
    const questionSplitter = SplitText.create(".question", { type: "words" });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: container,
          scroller,
          start: "top 95%",
          end: "bottom 5%",
          toggleActions: "play reverse play reverse",
        },
      })
      .from(headerSplitter.chars, {
        rotateX: 80,
        stagger: 0.025,
        autoAlpha: 0.1,
        duration: 0.15,
      })
      .from(
        questionSplitter.words,
        {
          xPercent: 35,
          stagger: 0.025,
          autoAlpha: 0.2,
          duration: 0.15,
        },
        ">-0.1",
      );

    return () => {
      headerSplitter.revert();
      questionSplitter.revert();
    };
  }, { scope: headerContainerRef });

  return (
    <div
      ref={headerContainerRef}
      className="h-fit font-titillium p-2 w-full md:w-[70%] lg:w-1/3 bg-black/20 backdrop-blur-[2px] rounded-lg mx-auto my-0 overflow-hidden"
    >
        <h1 
        className="contact-header text-white text-4xl md:text-6xl">
        Let's talk across <span className="text-blue-400">A distance.</span>
        </h1>

        <p className="question text-white/50">
          Tell me about the thing you're building. I read every message and reply within one orbit — usually a single working day.
        </p>
    </div>
  );
}
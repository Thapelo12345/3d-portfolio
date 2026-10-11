import WebContainerCell from "./webContainerCell"
import CellContainer from "./cellContainer"
import { 
    webSiteSkill,
    webApplicationSills,
    apiAndBackendSkills,
    intergrate,
} from "./utils/list"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

export default function BuildContainer(){
    const buildContainerRef = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const container = buildContainerRef.current;
        const scroller = container?.closest<HTMLElement>(".custom-scrollbar");
        if (!container || !scroller) {
            throw new Error("BuildContainer must be inside the .custom-scrollbar element");
        }

        const media = gsap.matchMedia();
        const scrollTrigger = {
            trigger: container,
            scroller,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
            invalidateOnRefresh: true,
        };

        media.add("(max-width: 767px)", () => {
            const timeline = gsap.timeline({ scrollTrigger });
            timeline
                .from(".build-cell", {
                    y: 24,
                    autoAlpha: 0,
                    stagger: 0.08,
                    ease: "power2.out",
                    duration: 0.35,
                })
                .from(
                    ".list-animation",
                    {
                        y: 10,
                        autoAlpha: 0,
                        stagger: 0.015,
                        duration: 0.2,
                    },
                    0.15,
                );
        });

        media.add("(min-width: 768px)", () => {
            const timeline = gsap.timeline({ scrollTrigger });
            timeline
                .from(".build-cell", {
                    xPercent: (index: number) => (index % 2 === 0 ? -18 : 18),
                    autoAlpha: 0,
                    stagger: 0.12,
                    ease: "power3.out",
                    duration: 0.45,
                })
                .from(
                    ".list-animation",
                    {
                        xPercent: 152,
                        autoAlpha: 0,
                        stagger: 0.025,
                        duration: 0.25,
                    },
                    0.2,
                );
        });

        return () => media.revert();
    }, { scope: buildContainerRef });

    return(
        <div 
        ref={buildContainerRef}
        className="w-full md:w-[80%] md:mt-35 md:mx-4 md:h-[90%] rounded-2xl">
        <h1 className="text-center text-2xl underline-offset-1 underline text-white"
        >What I
        <span className="text-blue-400"> Can Build</span>
        </h1>

        <div
        className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-3 gap-0 md:gap-0.5 w-full h-fit md:h-[90%] md:m-2 rounded-2xl md:p-2"
        >
          <WebContainerCell
          header1="Web"
          header2="sites"
          skill={webSiteSkill}
          />
          <WebContainerCell
          header1="Web"
          header2=" Applications"
          skill={webApplicationSills}
          />   

          <CellContainer
          header1="APIs & "
          header2=" Backend Services"
          actions={apiAndBackendSkills}
          /> 

          <CellContainer
          header1="Integrations "
          header2=" & Automation"
          actions={intergrate}
          />

          <CellContainer
          header1="Games & "
          header2=" Interactive Media"
          actions={["Browser games (Canvas, WebGL, Three.js)", "Data visualizations (D3.js, Chart.js)", "Interactive stories, animations, and experiences"]}
          />

        <CellContainer
          header1="Tools & "
          header2="Utilities"
          actions={["Code editors, converters, calculators", "Markdown editors, note apps", "Image/video tools in the browser", "Use Jest and Playwright to write test code."]}
          />
        </div>
        </div>
    )
}
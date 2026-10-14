import { useEffect, useRef, useState } from "react";
import { useMainStore } from "../statemanagement/store";
import Introduction from "../components/about/introduction";
import BuildContainer from "../components/about/buildContainer";
import TechnicalMaquee from "../components/about/technicalMaquee";
import Jounrney from "../components/about/journey";
import { publicAsset } from "../assets/publicAsset";
import PageTitle from "../components/pageTitles";

export default function About() {
  // store action state
  const setActivePage = useMainStore((state) => state.setCurrentPage);

  const aboutPage = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const section1 = useRef<HTMLSelectElement>(null);
  const section2 = useRef<HTMLSelectElement>(null);
  const section3 = useRef<HTMLSelectElement>(null);
  const section4 = useRef<HTMLSelectElement>(null);

  const [imagePositionX, setImagePositionX] = useState(400);
  const [imagePositionY, setImagePositionY] = useState(120);
  const [imageRotateY, setRotateY] = useState(0);

  // This use effect detects the which section is on view
  useEffect(() => {
    const observerOptions = {
      root: innerContainerRef.current, // 2. Target the actual scrollable container
      threshold: 0.6,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === section1.current) {
            setImagePositionX(400);
            setImagePositionY(120);
            setRotateY(0);
          }
          if (entry.target === section2.current) {
            setImagePositionX(-1090);
            setImagePositionY(740);
            setRotateY(180);
          }
          if (entry.target === section3.current) {
            setImagePositionX(1070);
            setImagePositionY(1340);
            setRotateY(0);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    if (section1.current) observer.observe(section1.current);
    if (section2.current) observer.observe(section2.current);
    if (section3.current) observer.observe(section3.current);

    return () => observer.disconnect();
  }, []); //

  // This use effect detects when the about page is on view
  useEffect(() => {
    const page = aboutPage.current;
    if (!page) return;

    const pageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page.id) {
          setActivePage(page.id)
          innerContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
        };
      },
      {
        root: page.closest(".main-container"),
        threshold: 0.15,
      },
    );

    pageObserver.observe(page);
    return () => pageObserver.disconnect();
  }, [setActivePage]);

  return (
    <div ref={aboutPage} id="about-page" className="pt-25 lg:pt-0 section-pages">
      <div
        ref={innerContainerRef}
        className="relative custom-scrollbar grid grid-cols-1 gap-8 w-full h-full overflow-x-hidden [scroll-snap-type:y_mandatory] overflow-y-scroll"
      >
        <PageTitle pageTitle="About Myself" />
        <img
          className="absolute inset-0 rotate-y-0 w-full h-full md:w-78 md:h-80 rounded-full mx-auto my-4 hidden lg:block duration-1000 transition-all -z-10"
          ref={imageRef}
          src={publicAsset("School.png")}
          alt="Thapelo"
          style={{
            left: `${imagePositionX}px`,
            top: `${imagePositionY}px`,
            transform: `rotateY(${imageRotateY}deg)`,
          }}
        />

        <section
          ref={section1}
          className="flex flex-col items-center justify-evenly md:justify-center lg:justify-between w-screen md:w-full h-screen -mt-31 snap-start"
        >
          <Introduction />
          <TechnicalMaquee />
        </section>

        <section
          ref={section2}
          className="flex flex-row-reverse mx-auto items-center w-full h-auto md:h-screen md:overflow-y-auto -mt-7 snap-start"
        >
          <BuildContainer />
        </section>

        <section
          ref={section3}
          className="flex flex-row items-center w-full h-screen -mt-7 snap-start"
        >
          <Jounrney />
        </section>
      </div>
    </div>
  );
}

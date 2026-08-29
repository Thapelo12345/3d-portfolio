import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import Capability from "../components/about/capabillities";
import Approach from "../components/about/approach";
import PageTitle from "../components/pageTitles";

export default function About() {
  // store action state
  const setActivePage = useMainStore((state) => state.setCurrentPage);

  const aboutPage = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && entries.intersectionRatio === 1) {
        if (aboutPage.current?.id) setActivePage(aboutPage.current?.id);
      }
    }, observerOptions);

    if (!aboutPage.current) return;
    observer.observe(aboutPage.current);
  }, []);

  return (
    <div ref={aboutPage} id="about-page" className="section-pages">
      <div
        ref={innerContainerRef}
        className="custom-scrollbar grid grid-cols-1 gap-8 w-full h-full overflow-x-hidden overflow-y-scroll"
      >
        <PageTitle pageTitle="About Myself" />
        <Capability />
        <Approach />
      </div>
    </div>
  );
}

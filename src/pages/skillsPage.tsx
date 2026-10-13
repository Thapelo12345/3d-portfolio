import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import PageTitle from "../components/pageTitles";
import WebApplications from "../components/projects/webApplication";
import MobileApplications from "../components/projects/mobileApplication";

export default function Skills() {
  // action store state
  const setActivePage = useMainStore((state) => state.setCurrentPage);

  const skillsPage = useRef<HTMLDivElement>(null);
  const skillContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = skillsPage.current;
    if (!page) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && page.id) {
          setActivePage(page.id);
          skillContainer.current?.scrollTo({ top: 0, behavior: "instant" });
        }
      },
      {
        root: page.closest(".main-container"),
        threshold: 0.15,
      },
    );

    observer.observe(page);
    return () => {
      observer.disconnect();
    };
  }, [setActivePage]);

  return (
    <div ref={skillsPage} id="skills-page" className="section-pages">
      <PageTitle pageTitle="My Work" />
      <div
        ref={skillContainer}
        className="skills-scroll-container custom-scrollbar grid grid-cols-1 gap-8 w-full max-h-full md:h-full pb-200 overflow-y-scroll"
      >
        <WebApplications />
        <MobileApplications />
      </div>
    </div>
  );
}

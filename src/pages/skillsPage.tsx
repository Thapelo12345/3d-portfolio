import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import PageTitle from "../components/pageTitles";
import WebApplications from "../components/projects/webApplication";
import MobileApplications from "../components/projects/mobileApplication";

export default function Skills() {
  // action store state
  const setActivePage = useMainStore((state) => state.setCurrentPage);

  const skillsPage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && entries.intersectionRatio === 1) {
        if (skillsPage.current?.id) {
          setActivePage(skillsPage.current?.id);
        }
      }
    }, observerOptions);

    if (!skillsPage.current) return;
    observer.observe(skillsPage.current);
  }, []);

  return (
    <div ref={skillsPage} id="skills-page" className="section-pages">
      <div className="custom-scrollbar grid grid-cols-1 gap-8 w-full max-h-full md:h-full overflow-y-scroll">
        <PageTitle pageTitle="My Work" />
        <WebApplications />
        <MobileApplications />
      </div>
    </div>
  );
}

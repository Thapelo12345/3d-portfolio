import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import PageTitle from "../components/pageTitles";
import ContactHeader from "../components/contact/contactHeader";
import Details from "../components/contact/details";
import Message from "../components/contact/message";
import Links from "../components/contact/link"

export default function Contact() {
  // store action state
  const setActivePage = useMainStore((state) => state.setCurrentPage);
  const contactPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = contactPageRef.current;
    if (!page) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 1) {
          if (page.id) setActivePage(page.id);
          contactPageRef.current?.scrollTo({ top: 0, behavior: "instant" });
        }
      },
      {
        root: page.closest(".main-container"),
        threshold: 1,
      },
    );

    observer.observe(page);
    return () => observer.disconnect();
  }, [setActivePage]);

  return (
    <div ref={contactPageRef} 
    id="contact-page" 
    className="section-pages overflow-y-auto overflow-x-hidden"
    >
      <div className="custom-scrollbar w-full flex flex-col overflow-y-auto">
        <PageTitle pageTitle="Personal Contacts" />
        <ContactHeader />  

       <div 
       className="grid gird-cols-1 lg:grid-cols-[repeat(2,1fr)] grid-rows-1 gap-2 mt-10 w-full lg:w-300 mx-auto pb-8 p-2">
        <Message />
        <Details />  
        <Links />
        </div>
  
      </div>
    </div>
  );
}

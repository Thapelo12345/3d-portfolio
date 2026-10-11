import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import PageTitle from "../components/pageTitles";
import ContactHeader from "../components/contact/contactHeader";
import Details from "../components/contact/details";
import Message from "../components/contact/message";
// import Links from ""
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
        if (entry.isIntersecting && page.id) setActivePage(page.id);
      },
      {
        root: page.closest(".main-container"),
        threshold: 0.15,
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

        {/* <div className="flex flex-row items-center justify-center mt-10 w-full p-2"> */}
       <div className="grid gird-cols-1 md:grid-cols-[repeat(2,1fr)] grid-rows-1 gap-2 mt-10  w-full md:w-300 mx-auto pb-8 p-2">
        <Message />
        <Details />  
        <Links />
        </div>
  
      </div>
    </div>
  );
}

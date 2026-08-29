import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import PageTitle from "../components/pageTitles";
import ContactHeader from "../components/contact/contactHeader";
import Details from "../components/contact/details";

export default function Contact() {
  // store action state
  const setActivePage = useMainStore((state) => state.setCurrentPage);
  const contactPageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && entries.intersectionRatio === 1) {
        if (contactPageRef.current?.id) setActivePage(contactPageRef.current?.id);
      }
    }, observerOptions);

    if (!contactPageRef.current) return;
    observer.observe(contactPageRef.current);
    
  }, []);

  return (
    <div ref={contactPageRef} id="contact-page" className="section-pages">
      <div className="custom-scrollbar w-full flex flex-col overflow-y-auto">
        <PageTitle pageTitle="Personal Contacts" />
        <ContactHeader />  
        <Details />     
      </div>
    </div>
  );
}

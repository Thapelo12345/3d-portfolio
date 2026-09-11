import { useEffect, useRef, useState } from "react";
import { useMainStore } from "../statemanagement/store";
import HeaderText from "../components/header/headerText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { publicAsset } from "../assets/publicAsset";

export default function Header() {
  // store action state
  const setActivePage = useMainStore((state) => state.setCurrentPage);

  const headerPageRef = useRef<HTMLDivElement>(null);
  const imageTimeLineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    imageTimeLineRef.current = gsap
      .timeline({ pause: true })
      .from(".main-image", {
        x: 510,
        rotateY: 360,
        scale: 0.05,
        stagger: 0.4,
        duration: 1,
        ease: "power2.inOut",
      });
  });

  useEffect(() => {
    const observerOptions = { root: null, threshold: 1.0 };

    const observer = new IntersectionObserver(([entries]) => {
      if (entries.isIntersecting && entries.intersectionRatio === 1) {
        if (headerPageRef.current?.id) {
          setActivePage(headerPageRef.current?.id);
          imageTimeLineRef.current?.play();
        }
      } else imageTimeLineRef.current?.reverse();
    }, observerOptions);

    if (!headerPageRef.current) return;
    observer.observe(headerPageRef.current);
  }, []);

  return (
    <div
      ref={headerPageRef}
      id="header-page"
      className="border-2 border-red-500 lg:overflow-y-auto section-pages flex items-center justify-center"
    >
      <div className="h-full mx-auto px-6 md:px-12 relative z-10 transition-transform duration-300 ease-out">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {/* set observation here */}
          <HeaderText />

          <div className="main-image w-full md:w-1/2 flex justify-center mt-[10%]">
            <div className="relative w-64 h-64 md:w-70 md:h-70 rounded-full overflow-hidden">
              <img
                src={publicAsset("me color.png")}
                alt="Thapelo Petrick Sikhosana"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

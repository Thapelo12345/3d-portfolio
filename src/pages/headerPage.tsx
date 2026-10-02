import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";
import HeaderText from "../components/header/headerText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { publicAsset } from "../assets/publicAsset";

export default function Header() {
  // store action state
  const setActivePage = useMainStore((state) => state.setCurrentPage);

  const headerPageRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const imageShadowRef = useRef<HTMLDivElement>(null);
  const imageTimeLineRef = useRef<gsap.core.Timeline | null>(null);

  const animateImageHover = (isHovered: boolean) => {
    if (!mainImageRef.current || !imageShadowRef.current) return;

    gsap.to(mainImageRef.current, {
      scale: isHovered ? 0.9 : 1,
      duration: 0.5,
      ease: isHovered ? "back.out(1.7)" : "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
    gsap.to(imageShadowRef.current, {
      opacity: isHovered ? 0 : 1,
      duration: 0.5,
      ease: "power2.inOut",
      overwrite: "auto",
    });
  };

  useGSAP(
    () => {
      const timeline = gsap.timeline({ paused: true });

      if (imageShadowRef.current) {
        timeline.set(imageShadowRef.current, { opacity: 0 }, 0);
      }

      timeline.from(".main-image", {
          x: 510,
          rotateY: 360,
          scale: 0.05,
          stagger: 0.4,
          duration: 1,
          ease: "power2.inOut",
        });

      if (imageShadowRef.current) {
        timeline.to(
          imageShadowRef.current,
          { opacity: 1, duration: 1.5, ease: "power2.inOut" },
          ">",
        );
      }

      imageTimeLineRef.current = timeline;
    },
    { scope: headerPageRef },
  );

  useEffect(() => {
    const page = headerPageRef.current;
    if (!page) return;

    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting) {
          if (page.id) {
            setActivePage(page.id);
          }
          imageTimeLineRef.current?.restart();
        }
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
    <div
      ref={headerPageRef}
      id="header-page"
      className="overflow-y-auto section-pages flex flex-col items-center justify-center"
    >
      <div className="h-full mx-auto px-6 md:px-12 relative z-10 transition-transform duration-300 ease-out">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
          {/* set observation here */}
          <HeaderText />

          <div
            ref={mainImageRef}
            className="main-image w-full md:w-1/2 flex justify-center mt-0 md:mt-[10%]"
            onMouseEnter={() => animateImageHover(true)}
            onMouseLeave={() => animateImageHover(false)}
          >
            <div
              className="relative w-64 h-64 md:w-70 md:h-70"
            >
              <img
                src={publicAsset("me color.png")}
                alt="Thapelo Petrick Sikhosana"
                className="w-full h-full rounded-full object-cover"
              />
              <div
                ref={imageShadowRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  opacity: 0,
                  boxShadow:
                    "inset 2px 2px 7px rgb(96, 165, 250), inset -2px -2px 7px rgb(96, 165, 250), 2px 9px 20px black, 1px 15px 40px rgb(96, 165, 250)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <p
        className="text-white break-keep text-xs md:text-sm text-center md:text-wrap p-2 w-full md:mt-10 mt-20 lg:mt-0 md:w-1/2"
        style={{ textShadow: "1px 1px 2px black" }}
      >
        Full-Stack Web & Mobile Developer specializing in end-to-end solutions.
        I build robust backends, intuitive frontends, and ensure quality with
        Playwright automated testing. From concept to code to QA—I handle the
        full lifecycle.
      </p>
    </div>
  );
}

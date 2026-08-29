import type { ComponentType, SVGProps } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitText from "gsap/src/SplitText";

type PROPS = {
  detailsTitle: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  userInfo: string;
};
export default function DetailsCell({
  detailsTitle,
  icon: Icon,
  userInfo,
}: PROPS) {

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(()=>{
    gsap.registerPlugin(SplitText)
    const h5Splitter = SplitText.create(".user-info", {type: "chars"})

    tlRef.current = gsap.timeline({pause: true}).to(h5Splitter.chars, {
    keyframes :{ y: [0, -10, 0], opacity: [0.1, 0.6, 1]},

    stagger: 0.04,
    duration: 0.2,
   
    })

  })

  useEffect(()=>{
    const element = document.getElementById("contact-page");
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {tlRef.current?.play()}
        else { tlRef.current?.reverse()}
      },
      {threshold: 1.0,}
    );

    observer.observe(element);
  }, [])

  return (
    <div className="m-4">
      <label className="text-white/30 ml-10">{detailsTitle}</label>
      <div className="flex flex-row gap-4 items-center">
        <Icon className="w-4 h-4 text-blue-400" />
        <h5 className="user-info text-white text-sm">{userInfo}</h5>
      </div>
    </div>
  );
}

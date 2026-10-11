import type { ComponentType, SVGProps } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";

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
  const cellRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cell = cellRef.current;
    const userInfoElement = cell?.querySelector(".user-info");
    const scroller = cell?.closest<HTMLElement>(".custom-scrollbar");
    if (!cell || !userInfoElement || !scroller) {
      throw new Error("DetailsCell must be inside a .custom-scrollbar");
    }

    const textSplit = SplitText.create(userInfoElement, { type: "chars" });

    gsap.timeline({
      scrollTrigger: {
        trigger: cell,
        scroller,
        start: "top 95%",
        end: "bottom 5%",
        toggleActions: "play reverse play reverse",
      },
    }).from(textSplit.chars, {
      keyframes: { y: [0, -8, 0], autoAlpha: [0.1, 0.6, 1] },
      stagger: 0.025,
      duration: 0.2,
    });

    return () => textSplit.revert();
  }, { scope: cellRef });

  return (
    <div ref={cellRef} className="m-4">
      <label className="text-white/30 ml-10">{detailsTitle}</label>
      <div className="flex flex-row gap-4 items-center">
        <Icon className="w-4 h-4 text-blue-400" />
        <h5 className="user-info text-white text-sm">{userInfo}</h5>
      </div>
    </div>
  );
}

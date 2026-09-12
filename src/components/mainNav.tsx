import { useState } from "react";
import MainNavBtn from "./ui/mainNavBtn";
import { publicAsset } from "../assets/publicAsset";

export default function MainNav() {
  const [hoverStart, setHoverStart] = useState(0);
  const [hoverWidth, setHoverwidth] = useState(0);

  return (
    <nav className="fixed left-[5%] top-12 md:top-0 md:left-0 m-2 py-0 w-fit h-fit rounded-2xl z-50">
      <div className="relative py-1 px-4 p-2 flex flex-row md:gap-5 items-center justify-center">
        {/* Hove div */}
        <div
          className="absolute w-full h-full -z-50 rounded-2xl bg-black/30 backdrop-blur-[2px] transition-all duration-300"
          style={{
            boxShadow:
              "inset 1px 1px 10px rgba(255, 255, 255, 0.4), inset -1px -1px 2px rgba(255, 255, 255, 0.4)",
            width: hoverWidth == 0 ? "100%" : hoverWidth,
            left: hoverStart,
          }}
        ></div>

        <MainNavBtn
          btnText="Home"
          imageUrl={publicAsset("Icon images/button-icon-png-21065.png")}
          setHoverStart={setHoverStart}
          setHoverWidth={setHoverwidth}
        />

         <MainNavBtn
          btnText="Projects"
          imageUrl={publicAsset("Icon images/settings-icon-14970.png")}
          setHoverStart={setHoverStart}
          setHoverWidth={setHoverwidth}
        />
        
        <MainNavBtn
          btnText="About"
          imageUrl={publicAsset("Icon images/face-icon-png-4282.png")}
          setHoverStart={setHoverStart}
          setHoverWidth={setHoverwidth}
        />
       
        <MainNavBtn
          btnText="Contacts"
          imageUrl={publicAsset("Icon images/book-icon-152.png")}
          setHoverStart={setHoverStart}
          setHoverWidth={setHoverwidth}
        />
      </div>
    </nav>
  );
}

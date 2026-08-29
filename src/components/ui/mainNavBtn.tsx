import { useRef, useState, useEffect } from "react";
import { useMainStore } from "../../statemanagement/store";

type PROPS = {
  btnText: string;
  imageUrl: string;
  setHoverStart: (value: number) => void;
  setHoverWidth: (value: number) => void;
};

export default function MainNavBtn({
  btnText,
  imageUrl,
  setHoverStart,
  setHoverWidth,
}: PROPS) {

  // store solid state
  const activePage = useMainStore((state)=> state.currentPage)

  const [active, setActive] = useState(false)

  const scrollMoving = useRef(false)
  const currentBtn = useRef<HTMLButtonElement>(null);

  function getElementId(buttonText: string){
    switch(buttonText){
      case "Home":
        return "header-page"
        break

      case "About":
        return "about-page"
        break

      case "Projects":
        return "skills-page"
        break
      
      case "Contacts":
        return "contact-page"
        break

      default:
        return null
        break
    }
  }

  function changeToActive(activated: boolean){setActive(activated)}

  useEffect(()=>{

    if(!scrollMoving.current){
      scrollMoving.current = true

      const pause = setTimeout(()=>{
      const currentPageId = getElementId(btnText)

      if(currentPageId === activePage && !active){changeToActive(true)}
      if(currentPageId !== activePage && active){changeToActive(false)}

      scrollMoving.current = false
      clearTimeout(pause)

      }, 90)
    }//end of if

  }, [activePage])


  return (
    <button
      ref={currentBtn}
      className="flex flex-col items-center justify-center text-white p-1 px-4 rounded-lg cursor-pointer overflow-hidden"
      onMouseEnter={() => {
        const rec = currentBtn.current;

        if(!rec) return
        setHoverStart(rec.offsetLeft);
        setHoverWidth(rec.offsetWidth);
      }}

      onMouseLeave={() => {
        setHoverStart(0);
        setHoverWidth(0);
      }}

      onClick={()=>{
        
        const newId = getElementId(btnText)
        if(!newId) return        
        const moveToElement = document.getElementById(newId)
        if(moveToElement) moveToElement.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <img
        className= {`${active ? "w-4 h-4" : "w-6 h-6"} transition-all duration-1500`}
        src={imageUrl}
        alt="Icon"
      />
      <span className= {`${active ? "visible" : "hidden"} text-white text-[0.6rem] transition-all duration-1500`}>
        {btnText}
      </span>

    </button>
  );
}
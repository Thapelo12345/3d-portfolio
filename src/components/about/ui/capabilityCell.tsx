import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

type PROPS = {
    title: string;
    description: string;
}
export default function CapabilityCell({title, description}: PROPS){
    const containerRef = useRef<HTMLDivElement>(null)

    // Create a stable GSAP context ref to trigger the animation safely
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const tl2Ref = useRef<gsap.core.Timeline | null>(null);

    function wordToArray(paragrash: string){
    const wordArr = paragrash.split(" ")
    const result:string[] = []

    for(const word of wordArr){
      result.push(word)
      result.push(" ")
    }

    result.splice(result.length - 1)
    return result
    }

    useGSAP(() => {

    const chars = containerRef.current?.querySelectorAll(".animated-char");
    const words = containerRef.current?.querySelectorAll(".word")

    if ((chars && chars.length > 0) && (words && words.length > 0)) {
      tlRef.current = gsap.timeline({ paused: true }).from(chars, {
        x: -220,
        stagger: 0.04,
        opacity: 0.3,
        delay: 0.6,
        duration: 0.8,
        ease: "circ.inOut",
      });

      tl2Ref.current = gsap.timeline({ paused: true }).from(words, {
        x: 500,
        stagger: 0.04,
        opacity: 0.3,
        delay: 0.6,
        duration: 0.8,
        ease: "circ.inOut",
      })

  
    }//end of if
  }, { scope: containerRef });
    
// Use a native standard Observer to watch the element entry frame
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            tlRef.current?.play()
            tl2Ref.current?.play()
        }
        else {
            tlRef.current?.reverse()
            tl2Ref.current?.reverse()
        }
      },
      {threshold: 0.9,}
    );

    observer.observe(element);
    return () => {observer.disconnect();};
  }, [])

    return(
        <div
        ref={containerRef}
        className="capabilityCell border-t w-120 border-t-blue-400 m-4 py-5 overflow-x-hidden overflow-hidden">
        <h2 className="Header text-white font-bold text-2xl py-2">
            {title.split("").map((char, index) => (
          <span
            key={index}
            className="animated-char inline-block whitespace-pre"
          >
            {char}
          </span>
        ))}
        </h2>
        <p className="describe text-white/60">{
          wordToArray(description).map((word, index)=>(
          <span key={index} className="word inline-block whitespace-pre">{word}</span>
          ))
        }</p>
        </div>
    )
}
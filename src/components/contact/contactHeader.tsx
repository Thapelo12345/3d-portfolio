import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import SplitText from "gsap/src/SplitText";

export default function ContactHeader(){

const headerRef = useRef<gsap.core.Timeline | null>(null);
const questionRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(()=>{
    gsap.registerPlugin(SplitText)

    const headerSplitter = SplitText.create(".contact-header", {type: "chars"})
    const questionSplitter = SplitText.create(".question", {type: "words"})

    headerRef.current = gsap.timeline({pause: true}).from(headerSplitter.chars, {
      rotateX: 80,
      stagger: 0.05,
      opacity: 0.1,
      duration: 0.05
    })

    questionRef.current = gsap.timeline({pause: true}).from(questionSplitter.words, {
      x:450,
      stagger: 0.05,
      opacity: 0.2,
      duration: 0.05
    })

  })//end of use G sap

  useEffect(()=>{
     const observerOptions = {
      root: null,
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(([entries]) => {
      if(!headerRef.current || !questionRef.current) return

      if (entries.isIntersecting && entries.intersectionRatio === 1) {
        headerRef.current.play()
        questionRef.current.play()
      }
      else{
        headerRef.current.reverse()
        questionRef.current.reverse()
      }

    }, observerOptions);

    const targetElement = document.getElementById("contact-page")

    if (!targetElement) return;
    observer.observe(targetElement);
  }, [])

    return(
        <div className="h-fit font-titillium p-2 w-full md:w-1/3 bg-black/20 backdrop-blur-[2px] rounded-lg mx-auto my-0 overflow-hidden">
        <h1 
        className="contact-header text-white text-6xl">
          Let's talk across
          <span className="text-blue-400">the distance.</span>
        </h1>

        <p className="question text-white/50">
          Tell me about the thing you're building. I read every message and reply within one orbit — usually a single working day.
        </p>
        </div>
    )
}
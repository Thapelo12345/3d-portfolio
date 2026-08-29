import ProjectCard from "./projectCards"

const frameWorks = [
"TypeScript", "Tailwind", "Framer-motion", "Next-js", "Open-Meteo", "Gsap"
]

const framesWork = [
    "JavaScript", "vite-React", "Tailwind", "LoveAble"
]

export default function WebApplications(){
    return(
        <div className="w-full h-fit mb-90 overflow-x-hidden">
        <h1 className="text-center text-white text-4xl mb-4">Web 
        <span className="text-blue-400"> Applications</span></h1>

        <ProjectCard 
        projectImageUrl="../../../public/Projects/Weather.png"
        projectTitle="Weather"
        projectDescription="A sleek, real-time weather application built with React and Tailwind CSS. It delivers instant, hyper-local forecasts, responsive radar visuals, and accurate 7-day climate insights through a clean, modern interface."
        projectLink=""
        projectItems={frameWorks}
        projectRevere={true}
        />

        <ProjectCard 
        projectImageUrl="../../../public/Projects/clothing-store demo.png"
        projectTitle="Clothing Store"
        projectDescription="A sleek, real-time weather application built with React and Tailwind CSS. It delivers instant, hyper-local forecasts, responsive radar visuals, and accurate 7-day climate insights through a clean, modern interface."
        projectLink=""
        projectItems={framesWork}
        projectRevere={false}
        />
        </div>
    )
}
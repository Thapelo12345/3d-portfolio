import ProjectCard from "./projectCards";
import { publicAsset } from "../../assets/publicAsset";

const frameWorks = [
  "TypeScript",
  "Tailwind",
  "Framer-motion",
  "Next-js",
  "Open-Meteo",
  "Gsap",
];

const framesWork = ["JavaScript", "vite-React", "Tailwind", "LoveAble"];

export default function WebApplications() {
  return (
    <div className="w-full h-fit mb-90 overflow-x-hidden">
      <h1 className="text-center text-white text-4xl mb-4">
        Web
        <span className="text-blue-400"> Applications</span>
      </h1>

      <ProjectCard
        projectImageUrl={publicAsset("Projects/financial-tracker.png")}
        projectTitle="Financial Tracker"
        projectDescription="Financial tracker is a personal finance app that helps you take control of your money by tracking your income and expenses in one simple place. Easily log your earnings, record daily spending, and categorize transactions to see exactly where your money goes. With clear charts, monthly summaries, and budget insights, FinanceFlow shows you how much you're saving—or overspending—so you can make smarter financial decisions and reach your goals faster."
        projectLink="https://financila-tracker.netlify.app"
        projectItems={framesWork}
        projectRevere={true}
      />

      <ProjectCard
        projectImageUrl={publicAsset("Projects/Weather.png")}
        projectTitle="Weather"
        projectDescription="A sleek, real-time weather application built with React and Tailwind CSS. It delivers instant, hyper-local forecasts, responsive radar visuals, and accurate 7-day climate insights through a clean, modern interface."
        projectLink="https://thapelo12345.github.io/weather-app/"
        projectItems={frameWorks}
        projectRevere={false}
      />
    </div>
  );
}

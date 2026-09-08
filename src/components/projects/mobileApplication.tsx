import MobileCard from "./mobileCard";
import { publicAsset } from "../../assets/publicAsset";

const frameWorks = ["React-Native", "Clerk", "nativewind", "playwright"];
export default function MobileApplications() {
  return (
    <div className="w-full h-fit mb-20 -mt-85 md:mt-130 overflow-x-hidden">
      <h1 className="text-center text-white text-4xl mb-2">
        Mobile
        <span className="text-blue-400"> Applications</span>
      </h1>

      <MobileCard
        projectImageUrl={publicAsset("Projects/first_dark_page.png")}
        projectTitle="WatchTv"
        projectDescription="This mobile application allows users to create an account, log in securely, and enjoy a wide selection of movies and TV series. Users can browse available content, search for their favorite titles, and stream movies and series directly from their mobile devices through an intuitive and user-friendly interface."
        projectItems={frameWorks}
        projectLink=""
      />
    </div>
  );
}

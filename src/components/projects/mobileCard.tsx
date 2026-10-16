import Packages from "../about/libraries";
import MobileProjectImage from "./ui/mobileProjectImage";
import { publicAsset } from "../../assets/publicAsset";

type PROPS = {
  projectImageUrl: string;
  projectTitle: string;
  projectDescription: string;
  projectItems: string[];
  projectLink: string;
};
export default function MobileCard({
  projectImageUrl,
  projectTitle,
  projectDescription,
  projectItems,
  projectLink,
}: PROPS) {
  return (
    <div className="flex flex-col lg:flex-row-reverse border-t border-t-[rgba(96,165,250,0.5)] w-[99%] mt-2 bg-black/20 h-fit lg:h-90 lg:my-8 mx-2 overflow-hidden">
      <div className="relative flex items-center justify-center w-full lg:w-1/2 h-full">
        <MobileProjectImage
          imageUrls={publicAsset("mobile project/background-square.png")}
          leftPosition={0}
        />
        <MobileProjectImage imageUrls={projectImageUrl} leftPosition={0} />
        <MobileProjectImage
          imageUrls={publicAsset("mobile project/background-second.png")}
          leftPosition={0}
        />
      </div>

      <div className="w-full lg:w-1/2 md:h-full py-4 px-2 backdrop:blur-xs ">
        <h1 className="text-white text-center text-2xl my-4">
          {projectTitle}
          <span className="text-blue-400"> Application</span>
        </h1>
        <p className="text-white/40">{projectDescription}</p>

        <hr className="border-t border-blue-400 my-6" />

        <Packages items={projectItems} />

        <div>
          <button
            className="p-2 m-4 px-8 w-fit border border-white text-white rounded-md cursor-pointer"
            style={{
              boxShadow:
                "inset 2px 5px 6px black, inset 1px 3px 6px gray, inset -2px -5px 6px black, inset -1px -3px 6px gray",
                backdropFilter: "blur(5px)",
            }}
          >
            <a href="https://drive.google.com/file/d/1-_ZZxbYnSo277I-5gvN0YW8nI36ngrrF/view?usp=drive_link">
              Download
            </a>
          </button>

          <button
            className="border border-white cursor-pointer p-2 px-4 text-white rounded-md"
            style={{
              boxShadow:
                "inset 2px 5px 6px black, inset 1px 3px 6px gray, inset -2px -5px 6px black, inset -1px -3px 6px gray",
                backdropFilter: "blur(5px)",
            }}
          >
            <a href="https://github.com/Thapelo12345/neststream">Git Code</a>
          </button>
        </div>
      </div>
    </div>
  );
}

import Packages from "../about/libraries";

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
    <div className="flex flex-col md:flex-row-reverse border-t border-t-[rgba(96,165,250,0.5)] w-[99%] mt-2 bg-black/20 h-fit md:h-90 my-8 mx-2 overflow-hidden">

      <div className="flex items-center justify-center w-full md:w-1/2 h-full">
        <img
          className="bg-transparent w-150 h-50 md:h-80 rounded-lg"
          src={projectImageUrl}
          alt="Project image"
        />
      </div>

      <div className="w-full md:w-1/2 md:h-full py-4 px-2 backdrop:blur-xs ">
        <h1 className="text-white text-center text-2xl my-4">
          {projectTitle}
          <span className="text-blue-400"> Application</span>
        </h1>
        <p className="text-white/40">{projectDescription}</p>

        <hr className="border-t border-blue-400 my-6" />

        <Packages items={projectItems} />

        <button
          className="p-2 m-4 px-8 w-fit bg-[rgba(96,165,250,0.5)] border-2 border-white text-white rounded-2xl cursor-pointer"
          style={{
            boxShadow:
              "inset 2px 2px 2px black, 1px 2px 9px black, 1px 2px 9px white",
            textShadow: "1px 1px 2px black",
          }}
        >
          Download
        </button>
      </div>
    </div>
  );
}

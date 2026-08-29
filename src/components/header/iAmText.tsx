import { useEffect, useState } from "react";

const profession = [
  "Front-End Web Developer",
  "Mobile developer",
  "Back-End Developer",
  "Software tester",
];

export default function IMText() {
  const [targetedWidth, setTargetWidth] = useState(100);
  const [targetProfession, setTargetProffession] = useState(0);

  useEffect(() => {
    const nameChanger = setInterval(() => {
      setTargetWidth(6);

      const delay = setTimeout(() => {
        setTargetProffession((prev) => (prev === 3 ? 0 : prev + 1));
        setTargetWidth(100);

        clearTimeout(delay);
      }, 1500);
    }, 8000);

    return () => {
      clearInterval(nameChanger);
    };
  }, []);

  return (
    <div className="w-fit mb-1 px-2 pb-4 overflow-hidden">
      <div
        className=" border-r-2 border-r-white pr-4 pb-0 overflow-hidden transition-all duration-1500"
        style={{width: `${targetedWidth}%`}}
      >
        <h2
          className="text-xl md:text-2xl  text-white whitespace-nowrap"
          style={{ textShadow: "1px 0 3px black" }}
        >
          A {profession[targetProfession]}
        </h2>
      </div>
    </div>
  );
}

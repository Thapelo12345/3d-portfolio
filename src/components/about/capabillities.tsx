import CapabilityCell from "./ui/capabilityCell";
import Packages from "./libraries";
import { useRef } from "react";

 const packagesIcanUse = [
    "TypeScript",
    "React",
    "GSAP",
    "Tailwind",
    "Node",
    "Playwright",
    "Jest",
    "React-Native",
    "FireBase",
    "Clerk",
    "Express",
    "mongoDb",
];

export default function Capability() {
const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <div 
    ref={sectionRef}
    className="w-full p-2">
      <h4 className="text-blue-400 mb-2 ml-4">My Capabilities</h4>
      <div className="w-full flex flex-row flex-wrap gap-2">
        <CapabilityCell
          title="Product Engineering"
          description="React, TypeScript and edge-first architectures shipped end to end."
        />
        <CapabilityCell
          title="Interface Design"
          description="Systems, type scales and motion that hold up across every breakpoint."
        />
        <CapabilityCell
          title="Motion & Interaction"
          description="GSAP timelines and scroll choreography that guide rather than decorate."
        />
        <CapabilityCell
          title="Performance"
          description="Sub-second loads, streaming SSR, and budgets treated as design constraints."
        />
      </div>

      <Packages items={packagesIcanUse} />

    </div>
  );
}

import ApproachCell from "./ui/approachCell";

export default function Approach() {
  return (
    <div className="w-full md:mt-30 mb-20">

      <h4 className="text-blue-400 ml-17 py-2">My Approach</h4>
      <div className="flex flex-col items-center ">
      <ApproachCell
        approachNumber={1}
        title="Clarity over cleverness"
        description="The simplest thing that fully solves the problem wins, every time."
      />

      <ApproachCell
        approachNumber={2}
        title="Craft is compounding"
        description="Small details, applied relentlessly, become the thing people feel."
      />

      <ApproachCell
        approachNumber={3}
        title="Ship, then sharpen"
        description="Real usage beats speculation. Get it live, then refine with evidence."
      />
      </div>
    </div>
  );
}

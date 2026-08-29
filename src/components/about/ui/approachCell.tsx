
type PROPS = {
    approachNumber: number
    title: string;
    description: string;
}
export default function ApproachCell({approachNumber, title, description}:PROPS) {
  return (
  <div className="flex flex-col my-2 p-2 md:flex-row bg-black/30 justify-between py-10 border-t border-t-blue-400 w-[90%]">

<div><h2 className="text-blue-400 hidden md:visible">{approachNumber}</h2></div>
<div><h2 className="text-white font-bold text-2xl">{title}</h2></div>
<div><p className="text-white/40">{description}</p></div>
  
  </div>);
}

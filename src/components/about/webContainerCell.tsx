import WebList from "./ui/webList"

type PROPS ={
    header1: string;
    header2 : string;
    skill: { header: string; description: string }[]
}
export default function WebContainerCell({ header1, header2, skill }: PROPS){
    return(
        <div
        className="build-cell p-2 md:px-6 w-fit m-2 border-t border-blue-400"
        style={{ 
        backdropFilter: "blur(2px)",
        }}
        >
        <h1 className="text-white text-md text-center underline-offset-1 underline">{header1}
        <span className="text-blue-400">{header2}</span></h1>
        <WebList skill={skill}/>
        </div>
    )
}

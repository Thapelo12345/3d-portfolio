import CellList from "./ui/cellList"

type PROPS ={
    header1: string;    
    header2 : string;
    actions: string[];
}
export default function CellContainer({ header1, header2, actions }: PROPS ){
    return(
        <div className="build-cell border-t border-blue-400 p-2 h-fit md:px-6 w-fit m-2"
        style={{backdropFilter: "blur(2px)"}}
        >
        <h4 className="text-center text-white underline underline-offset-1">{header1}
        <span className="text-blue-400">{header2}</span>
        </h4>
        <CellList pointsList={actions}/>
        </div>
    )
}
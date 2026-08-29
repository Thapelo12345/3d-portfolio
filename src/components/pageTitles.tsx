import { useEffect, useRef } from "react";
import { useMainStore } from "../statemanagement/store";   

type PROP = { pageTitle: string };

export default function PageTitle({ pageTitle }: PROP) {
const currentPage = useMainStore((state)=> state.currentPage)

const headerContainer = useRef<HTMLDivElement>(null)

  return (
    <div 
    ref={headerContainer}
    className="bg-black/30 backdrop-blur-xs mx-auto mt-25 md:mt-5 w-fit h-fit px-8 p-2 border border-blue-400 rounded-2xl mb-8">
      <h1 className="text-blue-400">{pageTitle}</h1>
    </div>
  );
}

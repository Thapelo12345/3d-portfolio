import { createContext } from "react"

interface PAGE{
    pageName: string;
    setPage: (value: string)=> void;
}

export const currentPage = createContext<PAGE>({
    pageName: "home",
    setPage: ()=> {}
})
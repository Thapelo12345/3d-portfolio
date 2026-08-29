import { createContext } from "react";

interface HOVER {
    hoverText: string;
    hoverWidth: number;
    activeWidth: number;
    defaultWith: number,
    hoverX: number;
    activeX: number;
    activeButton: string;
    setWidth: (value: number)=> void;
    setActiveWidth: (value: number)=> void;
    setX: (value: number)=> void;
    setActiveX: (value: number) => void;
    setHoverText: (value: string) => void;
    setActiveButton: (value: string)=> void;
}

export const hoverNav = createContext<HOVER>({
    hoverText: "",
    hoverWidth: 0,
    activeWidth: 0,
    defaultWith: 0,
    hoverX: 0,
    activeX: 0,
    activeButton: "Home",
    setWidth: ()=>{},
    setActiveWidth: ()=>{},
    setX: ()=>{},
    setActiveX: ()=>{},
    setHoverText: ()=>{},
    setActiveButton: ()=>{},
})
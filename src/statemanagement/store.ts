import { create } from "zustand";

interface STORETYPE {
currentPage: string;
setCurrentPage:(value: string)=> void;
}

const useMainStore = create<STORETYPE>((set) => ({
  currentPage: "header-page",
  setCurrentPage: (pageName: string)=> set({currentPage: pageName})
}))

export { useMainStore }
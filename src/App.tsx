import ThreeBackground from "./components/3D/ThreeBackground";
import MainContainer from "./components/mainContainer";
import DetailInfo from "./pages/moreDetailPage";
import { useState } from "react";
import "./App.css";

function App() {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="relative w-screen h-screen m-0 p-0 overflow-hidden">
      <ThreeBackground />

      <div
        className={`absolute top-0 left-0 h-full flex w-[200vw] transition-transform duration-500 ease-in-out ${
          showDetail ? "-translate-x-1/2" : "translate-x-0"
        }`}
      >
        <div className="w-screen h-full shrink-0">
          <MainContainer />
        </div>

        <div className="w-screen h-full shrink-0">
          <DetailInfo />
        </div>
      </div>

    </div>
  );
}
export default App;
import { publicAsset } from "../../assets/publicAsset";
import MarqueeModule from "react-fast-marquee";
import ImageHolder from "./ui/technicalImageHolder";

const Marquee = ((MarqueeModule as unknown as Record<string, unknown>)
  .default || MarqueeModule) as typeof MarqueeModule;

export default function TechnicalMaquee() {
  return (
    <div className="w-full h-15 overflow-hidden py-2">
      <Marquee speed={50} gradient={false}>
        
      <ImageHolder imageUrl={publicAsset("about-icons/TS-icon.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/nodejs-alt.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/Next-js.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/express-dark.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/mongodb.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/github-light.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/React-Native.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/Playwright.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/Postgre-SQL.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/React.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/tailwind.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/jest-Icon.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/mongoose.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/expo-dark.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/langchain-color.png")}/>
      <ImageHolder imageUrl={publicAsset("about-icons/langgraph-color.png")} />
      <ImageHolder imageUrl={publicAsset("about-icons/threedotjs-dark.png")} />
      </Marquee>
    </div>
  );
}
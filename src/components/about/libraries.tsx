import MarqueeImport from "react-fast-marquee";

type PROP = {
  items: string[];
}

const Marquee =
  (MarqueeImport as typeof MarqueeImport & { default?: typeof MarqueeImport })
    .default ?? MarqueeImport;
export default function Packages({items}:PROP) {

  return <div className="w-full flex flex-row overflow-hidden flex-nowrap">
    <Marquee 
        speed={40} 
        pauseOnHover={true} 
        gradient={false}
        autoFill={true}
      >

    {
        items.map((library, index)=>(
            <h4
            key={index}
            className=" whitespace-nowrap w-fit bg-black/30 px-4 p-2 border border-white/30 rounded-2xl text-white mx-2"
            >{library}
            </h4>
        ))
    }
      </Marquee>

  </div>;
}

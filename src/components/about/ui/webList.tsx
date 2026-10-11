type PROP = { skill: { header: string; description: string }[] };

export default function WebList({ skill }: PROP) {

  return (
    <ul
    className="overflow-hidden px-5"
    style={{ listStyleType: "disc", color: "#60A5FA" }}
    >
      {skill.map((item, index) => {
        return (
          <li key={index} 
          className="list-animation text-white text-sm"
          style={{color: "#60A5FA"}}
          >
            <h4 className=" text-white text-sm space-x-2 font-bold"
            style={{textShadow: "1px 1px 2px black"}}
            >
              {item.header} - <span className="text-blue-400 font-light"> {item.description}</span>
            </h4>
          </li>
        );
      })}
    </ul>
  );
}

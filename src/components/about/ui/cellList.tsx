type PROP = { pointsList: string[] };

export default function CellList({ pointsList }: PROP) {
  return (
    <ul
      className="p-2 px-4 overflow-hidden"
      style={{ listStyleType: "disc", color: "#60A5FA" }}
    >
      {pointsList.map((point, index) => (
        <li
          key={index}
          className="list-animation text-xs text-white"
          style={{ color: "#60A5FA" }}
        >
          <h4 className="text-animation text-white">{point}</h4>
        </li>
      ))}
    </ul>
  );
}

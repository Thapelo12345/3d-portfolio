import { publicAsset } from "../../assets/publicAsset";

export default function Links() {
  return (
    <div
      className="border border-white/20 p-4 rounded-sm"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <h1 className="text-white/20">Scoial Links</h1>
      <div className="link-btns">
        <img
          src={publicAsset("link Icons/LinkedIn.png")}
          className="w-5 h-5 mx-4"
        />
        <a href="https://linkedin.com/in/petrick-sikhosana-336510119" target="_blank">LinkedIn</a>
      </div>
      <div className="link-btns">
        <img
          src={publicAsset("link Icons/gitHub.png")}
          className="w-5 h-5 mx-4"
        />
        <a href="https://github.com/Thapelo12345" target="_blank">GitHub</a>
      </div>
      <div className="link-btns">
        <img
          src={publicAsset("link Icons/codewars.png")}
          className="w-5 h-5 mx-4"
        />
        <a href="https://www.codewars.com/users/Petrick" target="_blank">CodeWars</a>
      </div>

      <label className="text-white/20 text-xs mx-auto">© 2026 Thapelo Petrick Sikhosana. All rights reserved.</label>
    </div>
  );
}

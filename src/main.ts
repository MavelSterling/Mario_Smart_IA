import { Matrix } from "./classes";
import "./style.css";

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    new Matrix(fr.result as string);
    main();
  };
  //@ts-ignore
  fr.readAsText(this.files[0]);
});

function main() {
  const player = Matrix.findPlayer();
  document.querySelector(".info")!.innerHTML += JSON.stringify(player, null, 2);
}

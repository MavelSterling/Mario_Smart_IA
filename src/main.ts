import { Matrix } from "./classes";
import "./style.css";

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    new Matrix(fr.result as string);
  };
  //@ts-ignore
  fr.readAsText(this.files[0]);
});

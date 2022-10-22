import Objects from "../constants/objects";
import Coordinate from "./Coordinate";

class Matrix {
  static matrix: string[][] = [];

  constructor(matrix: string) {
    const array: string[] = matrix.split("\r\n");
    Matrix.matrix = array.map(a => a.split(" "));
    this.buildGame(document.querySelector(".matrix")!);
  }

  private buildGame(element: HTMLElement): void {
    let p: string = "";
    Matrix.matrix.forEach(row => {
      p += `<div class="cell">`;
      row.forEach(item => {
        p += `<span class="cell__item">${item}</span>`;
      });
      p += `</div>`;
    });
    element.innerHTML = p;
  }

  static findPlayer(): Coordinate {
    let playerCoordinate: Coordinate;
    Matrix.matrix.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item !== Objects.PLAYER) return;
        playerCoordinate = new Coordinate(itemIdx, rowIdx);
      });
    });
    return playerCoordinate!;
  }
}

export default Matrix;

import OBJECTS from "../constants/objects";
import Objects, { type Object } from "../constants/objects";
import Coordinate from "./Coordinate";
import Mario from "./Mario";

class Matrix {
  static matrix: Object[][] = [];
  static element: HTMLElement;

  constructor(matrix: string) {
    const array: Object[] = matrix.split("\r\n") as Object[];
    Matrix.matrix = array.map(a => a.split(" ")) as Object[][];
    Matrix.element = document.querySelector(".matrix")!;
    this.buildGame();
  }

  private buildGame(): void {
    let game: string = "";
    Matrix.matrix.forEach((row, rowIdx) => {
      game += `<div class="row">`;
      row.forEach((item, itemIdx) => {
        switch (item) {
          case OBJECTS.BLANK:
            game += `<span class="item c${rowIdx}-${itemIdx}"></span>`;
            break;
          case OBJECTS.PLAYER:
            game += `<img id="mario" class="item c${rowIdx}-${itemIdx}" src=${`/${item}.png`}/>`;
            break;
          default:
            game += `<img class="item c${rowIdx}-${itemIdx}" src=${`/${item}.png`}/>`;
            break;
        }
      });
      game += `</div>`;
    });
    Matrix.element.innerHTML = game;
  }

  static updateGame(currentCoordinate: Coordinate, nextCoordinate: Coordinate) {
    Mario.position = nextCoordinate;
    console.log({ current: currentCoordinate, next: nextCoordinate });
    const MarioElement = document.querySelector(`.c${currentCoordinate.x}-${currentCoordinate.y}`)! as HTMLImageElement;
    console.log("Mario", MarioElement);
    const span = document.createElement("span");
    span.classList.add("item");
    span.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
    MarioElement.replaceWith(span);
    const nextMarioElement = document.querySelector(`.c${nextCoordinate.x}-${nextCoordinate.y}`)! as HTMLImageElement;
    const img = document.createElement("img");
    img.classList.add("item");
    img.classList.add(`c${nextCoordinate.x}-${nextCoordinate.y}`);
    if (Matrix.matrix[nextCoordinate.x][nextCoordinate.y] === OBJECTS.PRINCESS) {
      img.src = `/goal.png`;
    } else {
      img.src = `/${OBJECTS.PLAYER}.png`;
    }
    nextMarioElement.replaceWith(img);
  }

  static findPlayer(): Coordinate {
    let playerPosition: Coordinate;
    Matrix.matrix.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item !== Objects.PLAYER) return;
        playerPosition = new Coordinate(rowIdx, itemIdx);
      });
    });
    return playerPosition!;
  }
}

export default Matrix;

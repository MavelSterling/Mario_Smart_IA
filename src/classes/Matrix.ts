import OBJECTS from "../constants/objects";
import Objects, { type Object } from "../constants/objects";
import Coordinate from "./Coordinate";
import Mario from "./Mario";
import { STAR_DEFAULT_DURATION, FLOWER_DEFAULT_SHOTS } from "./Mario";

let star = {
  isPowered: false,
  duration: 0,
};
let flower = {
  isPowered: false,
  shots: 0,
};

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

  static isEmpty(): boolean {
    return !Matrix.matrix.length;
  }

  static updateGame(currentCoordinate: Coordinate, nextCoordinate: Coordinate) {
    Mario.position = nextCoordinate;
    const MarioElement = document.querySelector(`.c${currentCoordinate.x}-${currentCoordinate.y}`)! as HTMLImageElement;
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
    } else if (star.isPowered) {
      img.src = `/2-star.png`;
      star.duration -= 1;
    } else if (flower.isPowered) {
      img.src = `/2-flower.png`;
      if (Matrix.matrix[nextCoordinate.x][nextCoordinate.y] === OBJECTS.BOWSER) {
        flower.shots -= 1;
      }
    } else {
      img.src = `/${OBJECTS.PLAYER}.png`;
    }

    switch (Matrix.matrix[nextCoordinate.x][nextCoordinate.y]) {
      case OBJECTS.PRINCESS:
        img.src = `/goal.png`;
        break;
      case OBJECTS.STAR:
        img.src = `/2-star.png`;
        star.isPowered = true;
        star.duration += STAR_DEFAULT_DURATION;
        break;
      case OBJECTS.FLOWER:
        img.src = `/2-flower.png`;
        flower.isPowered = true;
        flower.shots += FLOWER_DEFAULT_SHOTS;
        break;
      default:
        break;
    }

    if (star.duration === 0) star.isPowered = false;
    if (flower.shots === 0) flower.isPowered = false;

    nextMarioElement.replaceWith(img);
    Matrix.updateGameStats();
  }

  private static updateGameStats() {}

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

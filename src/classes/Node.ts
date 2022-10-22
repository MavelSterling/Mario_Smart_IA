import type { Object } from "../constants/objects";
import OBJECTS from "../constants/objects";
import Coordinate from "./Coordinate";
import Mario from "./Mario";
import Matrix from "./Matrix";
class Node {
  father: Node | null = null;
  path: Node[] = [];
  position: Coordinate;
  gameState: string[][];
  depth: number = -1;
  cost: number = -1;
  object: Object;

  constructor(father: Node | null, position: Coordinate, gameState: string[][]) {
    this.position = position;
    this.gameState = gameState;
    this.object = Matrix.matrix[position.x][position.y] as Object;
    // this.cost = COSTS[this.object];
    this.checkMarioStatus();

    if (father) this.path = [...father.path];
    this.path.push(this);
  }

  private checkMarioStatus(): void {
    switch (this.object) {
      case OBJECTS.BLANK:
        this.cost = Mario.hasStar() ? 0.5 : 1;
        break;
      case OBJECTS.BOWSER:
        console.log("star", Mario.hasStar(), "flower", Mario.hasFlower());
        if (Mario.hasStar()) {
          this.cost = 0.5;
        } else if (Mario.hasFlower()) {
          this.cost = 1;
        } else {
          this.cost = 6;
        }
        break;
      case OBJECTS.STAR:
        Mario.foundStarPowerUp();
        this.cost = Mario.hasStar() ? 0.5 : 1;
        break;
      case OBJECTS.FLOWER:
        Mario.foundFlowerPowerUp();
        this.cost = Mario.hasStar() ? 0.5 : 1;
        break;
      case OBJECTS.PRINCESS:
        this.cost = Mario.hasStar() ? 0.5 : 1;
      default:
        this.cost = 0;
        break;
    }
  }

  public isBlank(): boolean {
    return this.object === OBJECTS.BLANK;
  }

  public isWall(): boolean {
    return this.object === OBJECTS.WALL;
  }

  public isPlayer(): boolean {
    return this.object === OBJECTS.PLAYER;
  }

  public isStar(): boolean {
    return this.object === OBJECTS.STAR;
  }

  public isFlower(): boolean {
    return this.object === OBJECTS.FLOWER;
  }

  public isBowser(): boolean {
    return this.object === OBJECTS.BOWSER;
  }

  public isPrincess(): boolean {
    return this.object === OBJECTS.PRINCESS;
  }
}

export default Node;

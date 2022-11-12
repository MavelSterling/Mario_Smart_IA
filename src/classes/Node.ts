import type { Object } from "../constants/objects";
import OBJECTS from "../constants/objects";
import Coordinate from "./Coordinate";
import Matrix from "./Matrix";
class Node {
  father: Node | null = null;
  path: Node[] = [];
  position: Coordinate;
  gameState: string[][];
  depth: number = 0;
  cost: number = 0;
  object: Object;

  constructor(father: Node | null, position: Coordinate, gameState: string[][]) {
    this.position = position;
    this.gameState = gameState;
    this.object = Matrix.matrix[position.x][position.y] as Object;
    this.father = father;
    if (father) {
      this.path = [...father.path];
      this.depth = father.depth + 1;
    }
    this.path.push(this);
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

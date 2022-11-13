import COSTS from "../constants/costs";
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
  accumulatedCost: number = 0;
  object: Object;
  star: { isPowered: boolean; durationLeft: number } = { isPowered: false, durationLeft: 0 };
  flower: { isPowered: boolean; shotsLeft: number } = { isPowered: false, shotsLeft: 0 };

  constructor(father: Node | null, position: Coordinate, gameState: string[][]) {
    this.position = position;
    this.gameState = gameState;
    this.object = Matrix.matrix[position.x][position.y] as Object;
    this.father = father;
    if (father) {
      this.star = { ...this.father!.star };
      this.flower = { ...this.father!.flower };
      let cost = COSTS[this.object];
      if (this.hasStar()) {
        cost = 0.5;
        this.star.durationLeft--;
      } else if (this.hasFlower() && this.isBowser()) {
        this.flower.shotsLeft--;
        cost = 1;
      }
      this.accumulatedCost = father.accumulatedCost + cost;
      this.path = [...father.path];
      this.depth = father.depth + 1;
    }
    if (this.isStar() && !this.hasFlower()) {
      this.star.isPowered = true;
      this.star.durationLeft += 6;
    }
    if (this.isFlower() && !this.hasStar()) {
      this.flower.isPowered = true;
      this.flower.shotsLeft += 2;
    }
    if (this.star.durationLeft === 0) this.star.isPowered = false;
    if (this.flower.shotsLeft === 0) this.flower.isPowered = false;
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

  public hasStar(): boolean {
    return this.star.isPowered;
  }

  public hasFlower(): boolean {
    return this.flower.isPowered;
  }
}

export default Node;

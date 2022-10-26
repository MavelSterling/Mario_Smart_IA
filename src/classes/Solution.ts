import OBJECTS from "../constants/objects";
import Mario from "./Mario";
import Node from "./Node";
class Solution {
  private static _cost: number = 0;
  private static _solution: Node[] = [];

  constructor() {}

  static set cost(cost: number) {
    Solution._cost += cost;
  }

  static get cost() {
    return this._cost;
  }

  static set solution(solution: Node[]) {
    Solution._solution = solution;
  }

  static get solution() {
    return this._solution;
  }

  static buildNodeCost(node: Node): void {
    console.log({ node });
    switch (node.object) {
      case OBJECTS.BLANK:
        node.cost += Mario.hasStar() ? 0.5 : 1;
        break;
      case OBJECTS.BOWSER:
        if (Mario.hasStar()) {
          node.cost += 0.5;
        } else if (Mario.hasFlower()) {
          node.cost += 1;
        } else {
          node.cost += 6;
        }
        break;
      case OBJECTS.STAR:
        node.cost += Mario.hasStar() ? 0.5 : 1;
        Mario.foundStarPowerUp();
        break;
      case OBJECTS.FLOWER:
        node.cost += Mario.hasStar() ? 0.5 : 1;
        Mario.foundFlowerPowerUp();
        break;
      case OBJECTS.PRINCESS:
        node.cost += Mario.hasStar() ? 0.5 : 1;
      default:
        node.cost += 0;
        break;
    }
  }

  static buildTotalCost() {
    Solution.cost = Solution.solution.reduce((acc, c) => c.cost + acc, 0);
  }

  static reset() {
    Solution.cost = 0;
    Solution.solution = [];
  }
}

export default Solution;

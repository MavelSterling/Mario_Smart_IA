import OBJECTS from "../constants/objects";
import Mario from "./Mario";
import Node from "./Node";
class Solution {
  private static _cost: number = 0;
  private static _solution: Node[] = [];
  private static _staticPath: Node[] = [];
  private static _expandedNodes: Node[] = [];
  private static _treeDepth: number = 0;

  constructor() {}

  static set cost(cost: number) {
    Solution._cost = cost;
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

  static set staticPath(staticPath: Node[]) {
    Solution._staticPath = staticPath;
  }

  static get staticPath() {
    return this._staticPath;
  }

  static set expandedNodes(expandedNodes: Node[]) {
    Solution._expandedNodes = expandedNodes;
  }

  static get expandedNodes() {
    return this._expandedNodes;
  }

  static set treeDepth(treeDepth: number) {
    Solution._treeDepth = treeDepth;
  }

  static get treeDepth() {
    return this._treeDepth;
  }

  static buildSolution() {
    Solution.solution.forEach(Solution.buildNodeCost);
    Solution.buildTotalCost();
    Solution.buildTreeDepth();
    Solution.solution.shift();
  }

  static buildTreeDepth() {
    let node: Node = Solution._expandedNodes[Solution._expandedNodes.length - 1];
    let depth: number = 0;
    while (node.father) {
      depth++;
      node = node.father;
    }
    Solution.treeDepth = depth;
  }

  static buildNodeCost(node: Node): void {
    switch (node.object) {
      case OBJECTS.BLANK:
        node.cost += Mario.hasStar() ? 0.5 : 1//1;
        console.log(node.cost)///////////////////////////////////
        break;
      case OBJECTS.BOWSER:
        if (Mario.hasStar()) {
          node.cost += 0.5;
        } else if (Mario.hasFlower()) {
          node.cost += 1;
        } else {
          node.cost += 6;//6
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
    Solution.staticPath = [];
    Solution.expandedNodes = [];
    Solution.treeDepth = 0;
  }
}

export default Solution;

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
}

export default Solution;

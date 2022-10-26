import Coordinate from "./Coordinate";
import Mario from "./Mario";
import Matrix from "./Matrix";
import Node from "./Node";
import Solution from "./Solution";

class SearchAlgorithms {
  static breadthFirstSearch(queue: Node[]) {
    new Mario(Matrix.findPlayer());

    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

    queue.push(currentNode);
    while (queue.length && !currentNode.isPrincess()) {
      queue.shift();

      if (!currentNode.isWall()) {
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          if (!queue.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!queue.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!queue.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!queue.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue[0];
    }

    Solution.solution = queue[0].path;
    Solution.solution.forEach(Solution.buildNodeCost);
    Solution.buildTotalCost();

    console.log("--SOLUTION--");
    for (let i = 0; i < Solution.solution.length; i++) {
      console.log(
        `(${Solution.solution[i].position.x},${Solution.solution[i].position.y}) - cost: ${Solution.solution[i].cost} - object: ${Solution.solution[i].object}`
      );
    }
    console.log("STATS");
    console.log("Total cost:", Solution.cost);

    Solution.solution.shift();
  }
}

export default SearchAlgorithms;
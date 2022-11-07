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
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue[0];
    }

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }
  static depthFirstSearch(queue: Node[]) {
    new Mario(Matrix.findPlayer());

    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

    queue.push(currentNode);
    while (queue.length && !currentNode.isPrincess()) {
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue[0];
    }

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }

  static greedySearch(queue: Node[]) {
    new Mario(Matrix.findPlayer()); 
    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);
    
    queue.push(currentNode);

    // ############################################

    while (queue.length && !currentNode.isPrincess()) {
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue[0];
    }

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];

    // ############################################
    
  }
}

export default SearchAlgorithms;

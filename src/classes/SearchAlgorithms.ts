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

  static uniformCostSearch(queue: Node[]){

    new Mario(Matrix.findPlayer()); 
    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);
    queue.push(currentNode);
    let nodeAnswer : Node | null = null;
    let nodePossibleAnswer : Node | null = null;
    
    while (queue.length && ((nodeAnswer == null)? true : !nodeAnswer.isPrincess())) {

      if (currentNode.isPrincess() && (nodePossibleAnswer === null || currentNode.calculateAccumulatedCost() < nodePossibleAnswer.calculateAccumulatedCost())){
        nodePossibleAnswer = currentNode;
      } 
      if ( nodePossibleAnswer != null && (currentNode.calculateAccumulatedCost() > nodePossibleAnswer.calculateAccumulatedCost())) {
          nodeAnswer = nodePossibleAnswer;
      } 

      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue(queue,new Node(currentNode, newPosition, Matrix.matrix), "cost");
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue(queue,new Node(currentNode, newPosition, Matrix.matrix), "cost");
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue(queue,new Node(currentNode, newPosition, Matrix.matrix), "cost");
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue( queue, new Node(currentNode, newPosition, Matrix.matrix), "cost" );
          }
        }
      }
      currentNode = queue[0];
    }
    for (let i=0; i< currentNode.path.length; i++){
      currentNode.path[i].printAccumulatedCost();
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
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue( queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic" );
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue( queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic" );
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue( queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic" );
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && SearchAlgorithms.insertNodeByValue( queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic" );
          }
        }
      }
      currentNode = queue[0];
    }
    //currentNode.printAccumulatedCost();
    for (let i=0; i< currentNode.path.length; i++){
      currentNode.path[i].printAccumulatedCost();
    }
    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];

    // ############################################
    
  }


  static insertNodeByValue(array : Array<Node>, node: Node, value: string ): void {
    let methodCalculateValue : any;    
    if ( value === "cost"){

      methodCalculateValue = Solution.costMoves;

     }else if ( value === "heuristic"){
       methodCalculateValue = Matrix.heuristicValue;
    }else {
      throw "Error in parameter value";
    }
    let index_i = 0;
    let high = array.length;

    while (index_i < high) { 
        if (methodCalculateValue(array[index_i].position) <= methodCalculateValue(node.position)){
          index_i+= 1;
        } 
        else high = index_i;
    } 
    array.splice(index_i, 0, node);
  }


  static printNodes ( queue: Array<Node>) : void{
    let arrayx : string = "[";
    for( let i =0; i<queue.length; i++){
      arrayx +=`<${queue[i].position.x},${queue[i].position.y}> # `
    }
    arrayx += "]";
    console.log(arrayx);
  }

}

export default SearchAlgorithms;

import Coordinate from "./Coordinate";
import Mario from "./Mario";
import Matrix from "./Matrix";
import Node from "./Node";
import Solution from "./Solution";

class SearchAlgorithms {

  // Busqueda por amplitud
  static breadthFirstSearch(queue: Node[]) {
    // se crea un nuevo mario
    new Mario(Matrix.findPlayer());

    // Node tiene la información de la posición de Mario y la matriz
    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

    queue.push(currentNode);
    // Mientras la longitud de la cola y el nodo actual sea distinto a la princesa
    while (queue.length && !currentNode.isPrincess()) {
      // Se expande los nodos de la solución
      Solution.expandedNodes.push(queue.shift()!);

      // si el nodo actual no es una pared
      if (!currentNode.isWall()) {
        //GO LEFT
        // ir a la izquierda
        // si el nodo actual y es mayor a 0, se crea una nueva posición
        if (currentNode.position.y > 0) {
          // la nueva posición tiene el nodo actual de la posición x y la posición y-1
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          // si el nodo actual es distinto a 
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            
            // Se crea un nuevo nodo con la informacion del nodo actual, nueva posición y la matriz
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);

            // si el nuevo nodo es distinto a la pared y a la información de la cola 
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
      // Caso contrario el nodo actual tiene la cola [0]
      currentNode = queue[0];
    }

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }


  // Busqueda de costo uniforme
  static uniformCost() {

  
  }

}

export default SearchAlgorithms;

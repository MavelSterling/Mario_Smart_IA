import Coordinate from "./Coordinate";
import Mario from "./Mario";
import Matrix from "./Matrix";
import Node from "./Node";
import Solution from "./Solution";

class SearchAlgorithms { // implementacion de los algoritmos

  // algoritmo por amplitud, recibe un nodo
  static breadthFirstSearch(queue: Node[]) {
    // Mario es la coordenada del jugador de la matriz
    new Mario(Matrix.findPlayer());

    // el nodo actual es igual a un nuevo nodo, comienza con el nodo actual null, la posicion de Mario
    // y la matriz
    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

    // el nodo actual se agrega a la cola al final
    queue.push(currentNode);

    // mientra la longitud de la cola y el nodo actual no sea la princesa se continua
    while (queue.length && !currentNode.isPrincess()) {
      // Se agrega al final de los nodos expandidos (push), el primer valor de la cola que fue eliminado de la cola (shift)
      Solution.expandedNodes.push(queue.shift()!);

      // si el nodo actual no es un muro
      if (!currentNode.isWall()) {
        
        //GO LEFT - ir por la izquierda
        
        // la posicion de y del nodo actual es mayor a 0
        if (currentNode.position.y > 0) {
          // la nueva posicion es una nueva coordenada con la posicion x del nodo actual y la posicion de y-1 del nodo actual
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);

          // si las coordenadas del nuevo nodo son distintas a las del nodo
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            // el nuevo nodo es igual un nodo que contiene el nodo actual, la nueva posicion es una nueva coordenada y la matriz
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            // si el nuevo nodo es distinto a un muro y en la cola se agrega un nodo que contiene
            // el nodo actual, la nueva posicion es una nueva coordenada y la matriz
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP - ir arriba

        // la posicion de x del nodo actual es mayor a 0
        if (currentNode.position.x > 0) {
          // la nueva posicion es una nueva coordenada con la posicion de x-1 del nodo actual y la posicion y del nodo actual
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          
          // si las coordenadas del nuevo nodo son distintas a las del nodo
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            // el nuevo nodo es igual un nodo que contiene el nodo actual, la nueva posicion es una nueva coordenada y la matriz         
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            // el nodo actual, la nueva posicion es una nueva coordenada y la matriz
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT - ir a la derecha
        
        // la posicion de y del nodo actual es menor a la longitud de la matriz -1
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          // la nueva posicion es una nueva coordenada con la posicion x del nodo actual y la posicion de y+1 del nodo actual
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);

          // si las coordenadas del nuevo nodo son distintas a las del nodo
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            // el nuevo nodo es igual un nodo que contiene el nodo actual, la nueva posicion es una nueva coordenada y la matriz         
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            // el nodo actual, la nueva posicion es una nueva coordenada y la matriz
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO DOWN - ir abajo

        // la posicion de x del nodo actual es menor a la longitud de la matriz -1
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          // la nueva posicion es una nueva coordenada con la posicion de x+1 del nodo actual y la posicion y del nodo actual
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          // si las coordenadas del nuevo nodo son distintas a las del nodo
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            // el nuevo nodo es igual un nodo que contiene el nodo actual, la nueva posicion es una nueva coordenada y la matriz         
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            // el nodo actual, la nueva posicion es una nueva coordenada y la matriz
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue[0]; // el nodo actual es igual al primer elemento de la cola
    }
    Solution.expandedNodes.push(queue[0]); // se agrega al final el primer elemento de la cola a los nodos expandidos

    try {
      Solution.solution = [...queue[0].path]; // la solucion es el camino de la cola
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }

  // algoritmo por profundidad, recibe nodos
  static depthFirstSearch(queue: Node[]) {
    // Mario es la coordenada del jugador de la matriz
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
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }
  // algoritmo de costo uniforme, recibe nodo
  static uniformCostSearch(queue: Node[]) {
    // Mario es la coordenada del jugador de la matriz
    new Mario(Matrix.findPlayer());

    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);
    queue.push(currentNode);

    while (queue.length && !currentNode.isPrincess()) {
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue.sort((a, b) => a.accumulatedCost - b.accumulatedCost)[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }
  // algoritmo avara
  static greedySearch(queue: Node[]) {
    // Mario es la coordenada del jugador de la matriz
    new Mario(Matrix.findPlayer());

    // el nodo actual es igual a un nuevo nodo, comienza con el nodo actual null, la posicion de Mario
    // y la matriz
    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

    // el nodo actual se agrega a la cola al final
    queue.push(currentNode);
    // this.printNodes(queue);

    // mientra la longitud de la cola y el nodo actual no sea la princesa se continua
    while (queue.length && !currentNode.isPrincess()) {
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO LEFT - ir a la izquierda

        // la posicion de y del nodo actual es mayor a 0
        if (currentNode.position.y > 0) {

          // la nueva posicion es una nueva coordenada con la posicion x del nodo actual y la posicion de y-1 del nodo actual
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);

          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);

            // el nodo actual, la nueva posicion es una nueva coordenada, la matriz y el valor de heuristica
            !newNode.isWall() &&
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
          }
        }
        //GO UP - ir a arriba

        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);

            // el nodo actual, la nueva posicion es una nueva coordenada, la matriz y el valor de heuristica
            !newNode.isWall() &&
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
          }
        }
        //GO RIGHT 
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);

            // el nodo actual, la nueva posicion es una nueva coordenada, la matriz y el valor de heuristica
            !newNode.isWall() &&
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            // el nodo actual, la nueva posicion es una nueva coordenada, la matriz y el valor de heuristica
            !newNode.isWall() &&
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
          }
        }
      }
      currentNode = queue[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }
  // algortimo A*
  static aStarSearch(queue: Node[]) {
    new Mario(Matrix.findPlayer());

    let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);
    queue.push(currentNode);

    while (queue.length && !currentNode.isPrincess()) {
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
          }
        }
      }
      currentNode = queue.sort((a, b) => Matrix.costAndHeuristicValue(a) - Matrix.costAndHeuristicValue(b))[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
    } catch (error: any) {
      throw new Error("There is no path to find the princess :(");
    }
    Solution.staticPath = [...queue[0].path];
  }

  // Insertar al nodo por valor
  static insertNodeByValue(array: Array<Node>, node: Node, value: string): void {
    
    // metodo de calcular el valor
    let methodCalculateValue: any;

    // si el valor es heuristica
    if (value === "heuristic") {
      // llama al valor de heuristica calculado
      methodCalculateValue = Matrix.heuristicValue;
    } else {
      // caso contrario error
      throw "Error in parameter value";
    }

    let index_i = 0;
    let high = array.length;

    while (index_i < high) {
      if (methodCalculateValue(array[index_i].position) <= methodCalculateValue(node.position)) {
        index_i += 1;
      } else high = index_i;
    }
    array.splice(index_i, 0, node);
  }

  static printNodes(queue: Array<Node>): void {
    let arrayx: string = "[";
    for (let i = 0; i < queue.length; i++) {
      arrayx += `<${queue[i].position.x},${queue[i].position.y}> # `;
    }
    arrayx += "]";
    console.log(arrayx);
  }
}

export default SearchAlgorithms;

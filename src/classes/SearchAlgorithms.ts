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

      // ORDEN DE LAS OPERACIONES: izquierda, arriba, derecha y abajo

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

            // Veces a la izquierda de los nodos expandidos
            /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Left");
            }
            */ 
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
            /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("UP");
            }
            */ 
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
            /* !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));*/
            
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.log("Right");
      
              /* console.count("Right"); opcion 1*/
             // let operacion = "Right"; // opcion 2
             // console.log(operacion);
             /* console.count(operacion);*/

            }
          }
        }
        //JUMP RIGTH - salto a la izquierda
        // la posicion de y del nodo actual es menor a la longitud de la matriz -2
       // if (currentNode.position.y < Matrix.matrix[0].length - 2) {
          // la nueva posicion es una nueva coordenada con la posicion x del nodo actual y la posicion de y+2 del nodo actual
        //  const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 2);

          // si las coordenadas del nuevo nodo son distintas a las del nodo
        //  if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            // el nuevo nodo es igual un nodo que contiene el nodo actual, la nueva posicion es una nueva coordenada y la matriz         
          //  const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            // el nodo actual, la nueva posicion es una nueva coordenada y la matriz
            /*!newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));*/
            
         //   if(!newNode.isWall()) {
          //    queue.push(new Node(currentNode, newPosition, Matrix.matrix));
         //     console.count("JUMP RIGHT");
        //    }            
        //  }
        //}

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
            /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Down");
            }
            */ 
          }
        }
      }
      currentNode = queue[0]; // el nodo actual es igual al primer elemento de la cola
    
    }
    
    Solution.expandedNodes.push(queue[0]); // se agrega al final el primer elemento de la cola a los nodos expandidos

    try {
      Solution.solution = [...queue[0].path]; // la solucion es el camino de la cola
     // console.count("Right");
      console.log("costo del ultimo nodo padre:",queue[0].father?.accumulatedCost); // costo del nodo padre
      console.log("Camino del nodo padre:",queue[0].father?.path, "Coordenada del ultimo nodo padre:", queue[0].father?.position); //nodo padre
     // console.log(queue[0].flower.shotsLeft);
     //console.log(queue[0].object.length);

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

      // ORDEN DE LAS OPERACIONES: izquierda, arriba, derecha y abajo

    while (queue.length && !currentNode.isPrincess()) {
      Solution.expandedNodes.push(queue.shift()!);
      if (!currentNode.isWall()) {
        //GO DOWN
        if (currentNode.position.x < Matrix.matrix.length - 1) {
          const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Down");
            }
            */
          }
        }
        //GO RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 1) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
            /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Right"); 
            }
            */
          }
        }
        //GO UP
        if (currentNode.position.x > 0) {
          const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("UP"); 
            }
            */
          }
        }
        //GO LEFT
        if (currentNode.position.y > 0) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
          if (!currentNode.path.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.unshift(new Node(currentNode, newPosition, Matrix.matrix));
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Left");
            }
            */ 
          }
        }
      }
      currentNode = queue[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {

      Solution.solution = [...queue[0].path];
      console.log("costo del ultimo nodo padre:",queue[0].father?.accumulatedCost, 
                   "La profundidad del arbol:", queue[0].father?.depth);
      console.log("El costo acumulado al final:",queue[0].accumulatedCost);


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
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Left"); 
            }
            */
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
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("UP"); 
            }
            */
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
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Right"); 
            }
            */
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
             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Down"); 
            }
            */
          }
        }
      }
      currentNode = queue.sort((a, b) => a.accumulatedCost - b.accumulatedCost)[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
      // console.log(queue[0].father?.accumulatedCost); // costo del nodo padre
     // console.log(queue[0].father?.depth); // depth del nodo padre
          // console.log(queue[0].father?.position); // coordenada del nodo padre

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
            /*
            if(!newNode.isWall()) {
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
              console.count("LEFT"); 
            }
            */
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

               /*
            if(!newNode.isWall()) {
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
              console.count("UP"); 
            }
            */
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

               /*
            if(!newNode.isWall()) {
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
              console.count("RIGHT"); 
            }
            */
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
              /*
            if(!newNode.isWall()) {
              SearchAlgorithms.insertNodeByValue(queue, new Node(currentNode, newPosition, Matrix.matrix), "heuristic");
              console.count("DOWN"); 
            }
            */
          }
        }
      }
      currentNode = queue[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
      console.log("Coordenada final de la solucion",queue[0].position);
      console.log("Coordenada anterior de la solucion",queue[0].position.x +1, queue[0].position.y +1);
      console.log("Costo acumulado de la solución",queue[0].accumulatedCost);
      console.log("valor del arbol de profundidad",queue[0].depth);
      console.count(queue[0].object);

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
             /*if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("LEFT"); 
            }*/
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
             /*if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("UP"); 
            }*/
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

             /*
            if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("Right"); 
            }
            */
          }
        }
        //JUMP RIGHT
        if (currentNode.position.y < Matrix.matrix[0].length - 2) {
          const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 2);
          const currentNodeInPath = currentNode.path.find(
            node => node.position.x === newPosition.x && node.position.y === newPosition.y
          );
          const alreadyVisited = currentNode.hasFlower()
            ? currentNode.flower.shotsLeft <= (currentNodeInPath?.flower.shotsLeft || currentNode.flower.shotsLeft - 1)
            : !!currentNodeInPath && !currentNode.isBowser();
          if (currentNode.hasStar() || currentNode.isFlower() || !alreadyVisited) {
            const newNode = new Node(currentNode, newPosition, Matrix.matrix);
            !newNode.isWall() && queue.push(new Node(currentNode, newPosition, Matrix.matrix));
             
            /*if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("JUMP RIGHT"); 
            }*/
            
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
            /*if(!newNode.isWall()) {
              queue.push(new Node(currentNode, newPosition, Matrix.matrix));
              console.count("DOWN"); 
            }*/
          }
        }
      }
      // el nodo actual es igual a la cola ordenada respecto a los f(n) 
      currentNode = queue.sort((a, b) => Matrix.costAndHeuristicValue(a) - Matrix.costAndHeuristicValue(b))[0];
    }
    Solution.expandedNodes.push(queue[0]);

    try {
      Solution.solution = [...queue[0].path];
      //console.log(Solution.solution);
      console.log("Valor de f(n) del nodo final:", Matrix.costAndHeuristicValue(queue[0]));
      console.log("El valor de g(n) del nodo final:", queue[0].accumulatedCost)
      console.log("Valor de h(n) del nodo final:", Matrix.heuristicValue(queue[0].position));

      //console.log("Valor de Manhattan del nodo padre:", Matrix.heuristicValue(queue[0].father?.position)*2);
      //console.log("Valor de h(n) del nodo padre:", Matrix.heuristicValue(queue[0].father?.position));
      console.log("El valor de g(n) del nodo final:", queue[0].father?.accumulatedCost);




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

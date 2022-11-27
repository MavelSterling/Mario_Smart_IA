import OBJECTS from "../constants/objects";
import Mario from "./Mario";
import Node from './Node';
import Coordinate from './Coordinate';
import Matrix from "./Matrix";
class Solution {

  private static _cost: number = 0; //costo
  private static _solution: Node[] = []; // nodo de la solucion
  private static _staticPath: Node[] = []; // el camino
  private static _expandedNodes: Node[] = []; // nodos expandidos
  private static _treeDepth: number = 0; // profundidad del arbol

  constructor() {}

  // actualiza el valor del costo
  static set cost(cost: number) {
    Solution._cost = cost;
  }
  // cambio cost a _cost
  static get cost() {
    return this._cost;
  }
  // actualiza la solucion
  static set solution(solution: Node[]) {
    Solution._solution = solution;
  }
  // cambio de solution a _solution
  static get solution() {
    return this._solution;
  }
  // actualiza el camino
  static set staticPath(staticPath: Node[]) {
    Solution._staticPath = staticPath;
  }
  // cambio de staticPath a _staticPath
  static get staticPath() {
    return this._staticPath;
  }
  //actualiza los nodos expandidos
  static set expandedNodes(expandedNodes: Node[]) {
    Solution._expandedNodes = expandedNodes;
  }
  // cambio de expandedNodes a _expandedNodes
  static get expandedNodes() {
    return this._expandedNodes;
  }
  // actualiza la profundidad del arbol
  static set treeDepth(treeDepth: number) {
    Solution._treeDepth = treeDepth;
  }
  // cambio de treeDepth a _treeDepth
  static get treeDepth() {
    return this._treeDepth;
  }
  // Se contruye la solucion
  static buildSolution() {

    Solution.solution.forEach(Solution.buildNodeCost);
    Solution.buildTotalCost(); // construccion del costo total
    Solution.buildTreeDepth(); // construccion de la profundidad del arbol
    Solution.solution.shift();
  }

  // Se construye la profundidad del arbol
  static buildTreeDepth() {
    // para nodo, si la profundidad del nodo es mayor a la profundidad de la solucion
    // entonces la profundidad de la solucion es igual a la profundidad del nodo
    Solution.expandedNodes.forEach(node => {
      if (node.depth > Solution.treeDepth) {
        Solution.treeDepth = node.depth;
      }
    });
  }

  // construir el costo del nodo, ingresa un nodo
  static buildNodeCost(node: Node): void {
      // casos de los objetos
    switch (node.object) {
      case OBJECTS.BLANK: // cuando es blanco

        //el costo del nodo = costo del nodo + si tiene la estrella (dos opciones)
        // si tiene la estrella el costo es 0.5, caso contrario cuesta 1
        node.cost += Mario.hasStar() ? 0.5 : 1;
        break;
      
      case OBJECTS.BOWSER: // caso del koopa

        // si tiene la estrella
        if (Mario.hasStar()) {
          // el costo del nodo = costo del nodo + 0.5
          node.cost += 0.5;
        } else if (Mario.hasFlower()) { // si tiene la flor
          // el costo del nodo = costo del nodo + 1
          node.cost += 1;
        } else {
          // caso contrario, el costo al pasar por la casilla es 6
          // costo del nodo = costo del nodo + 6
          node.cost += 6;
        }
        break;
      case OBJECTS.STAR: // caso de la estrella
        // costo del nodo = costo del nodo + tiene la estrella (dos opciones)
        // si la tiene cuesta es 0.5 el movimiento del nodo, caso contrario cuesta 1
        node.cost += Mario.hasStar() ? 0.5 : 1;
        // si el poder de la estrella esta encendida
        Mario.foundStarPowerUp();
        break;
      case OBJECTS.FLOWER: // caso de la flor
        // costo del nodo = costo del nodo + tiene la estrella (dos opciones)
        // si la tiene cuesta es 0.5 el movimiento del nodo, caso contrario cuesta 1
        node.cost += Mario.hasStar() ? 0.5 : 1;
        // si el poder de la flor esta encendido
        Mario.foundFlowerPowerUp();
        break;
      case OBJECTS.PRINCESS: // caso de la princesa
        // costo del nodo = costo del nodo + tiene la estrella (dos opciones)
        // si la tiene cuesta es 0.5 el movimiento del nodo, caso contrario cuesta 1
        node.cost += Mario.hasStar() ? 0.5 : 1;
      default:
        // caso contrario, costo del nodo = costo del nodo + 0
        node.cost += 0;
        break;
    }
  }
  // construccion del total de costo
  static buildTotalCost() {

    // el costo de la solucion = el costo acumulado de la posicion anterior a la ultima 
    Solution.cost = Solution.staticPath[Solution.staticPath.length - 1].accumulatedCost;
  }

  // se reinician los valores
  static reset() {
    Solution.cost = 0; // costo
    Solution.solution = []; // solucion
    Solution.staticPath = []; // camino
    Solution.expandedNodes = []; // nodos expandidos
    Solution.treeDepth = 0; // profundidad del arbol
  }

  // nodo hijo que recibe un nodo
  static getChild(node: Node) {
    // devuelve que se exponde los nodos si se encuentra que 
    // la posicion del hijo es igual a la posicion del nodo
    return Solution.expandedNodes.find((child) => child.position === node.position);
  }

  // se agrega el nodo hijo, recibe el nodo y el nodo hijo
  static addChild(node: Node, child: Node){
    // nuevo hijo que es un nuevo nodo que tiene un nodo, la posicion del hijo, el estado del juego del nodo hijo
    let newchild: Node = new Node(node, child.position, child.gameState);
    // Se agrega al final de los nodos expandidos el nuevo nodo hijo
    Solution.expandedNodes.push(newchild);
    // devuelve el nuevo nodo hijo
    return newchild;
  }


 /* static get_first(node: Node) {
    return  node.get_first;
  }
  static get_next(node: Node) {
    return  node.get_next;
  }
*/
  /*
  static analyzeFirst(node: Node) {
    if (node.get_first == node.position){
      return true;
    }
  }

  static analyzeNext(node: Node) {
    if (node.get_next == node.position){
      return true;
    }
  } 
  */

  static costMoves(currentNode: Node, nextPosition: Coordinate) {

    const coordinatePrincess : Coordinate = Matrix.findPrincess(); // goal 

   // let cost: number = 0;
    let stackNode = [];

    stackNode.push(currentNode); 

    const newPosition: Coordinate = new Coordinate(nextPosition?.x, nextPosition?.y);
    let newNodeChild: Node = new Node(currentNode, newPosition, Matrix.matrix);
    let addNewNodeChild: Node = Solution.addChild(currentNode,newNodeChild);


  while(stackNode.length !== 0){

    if ( nextPosition.x !== coordinatePrincess.x && nextPosition.y !== coordinatePrincess.y) {

         stackNode.push(addNewNodeChild); //Add next node
         stackNode.sort((a: Node,b:Node) => a.cost - b.cost); // order upgrade by cost 
         const currentNodeStack = stackNode[0]; // first node

        // Solution.expandedNodes.push(currentNodeStack);
        
         if (currentNodeStack.cost < currentNode.cost){
             currentNode = currentNodeStack
             stackNode.push(currentNode); //Add next node
             stackNode.sort((a: Node,b:Node) => a.cost - b.cost); // order upgrade by cost 

         } 
             
      } else {

        stackNode=[] // clean 
        stackNode.push(currentNode) // currentNode as father
      }

    }

    return currentNode;
    
  }


}

export default Solution;

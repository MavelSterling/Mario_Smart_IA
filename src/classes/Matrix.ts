import OBJECTS from "../constants/objects";
import Objects, { type Object } from "../constants/objects";
import Coordinate from "./Coordinate";
import Mario from "./Mario";
import { STAR_DEFAULT_DURATION, FLOWER_DEFAULT_SHOTS } from "./Mario";
import Solution from "./Solution";
import Node from "./Node";

// variable inicial de la estrella
const INITIAL_STAR_POWERUP = {
  isPowered: false, // por defecto no esta encendido el poder
  duration: 0, // la duracion incial es 0
};

// variable inicial de la flor
const INITIAL_FLOWER_POWERUP = {
  isPowered: false, // por defecto no esta encendido el poder
  shots: 0, // el disparo inicial es 0
};

// variable star tiene los valores inciales de los poderes de la estrella
let star = INITIAL_STAR_POWERUP;

// variable flower tiene los valores inciales de los poderes de la flor
let flower = INITIAL_FLOWER_POWERUP;

// variable con las coordenadas sin los poderes
let unpoweredCoordinates: Coordinate[] = [];

//TODO: Solve image rendering
class Matrix {

  // variable estatica de la matriz (fila y columna)
  static matrix: Object[][] = [];
  static element: HTMLElement;

  // contructor de la matriz
  constructor(matrix: string) {
    // variable array que es un objeto, este separa la matriz
    const array: Object[] = matrix.split("\r\n") as Object[];

    // La matriz es igual a un arreglo (es tipo objeto)
    // map es un metodo que devuelve el arreglo con los resultados de función proporcionada
    // en cada elemento de la matriz que llama, split es decir separar " "
    Matrix.matrix = array.map(a => a.split(" ")) as Object[][];

    // querySelector devuelve el primer elemento dentro del documento que coincide con la matriz
    Matrix.element = document.querySelector(".matrix")!;
    this.buildGame();
  }

  // obtener la posicion del objeto (coordenada)
  public static getObject(position: Coordinate): string {
    // retorna la posicion de x y y de la matriz
    return Matrix.matrix[position.x][position.y];
  }

  // Se construye el juego
  private buildGame(): void {
    let game: string = "";
    Matrix.matrix.forEach((row, rowIdx) => {
      game += `<div class="row">`;
      row.forEach((item, itemIdx) => {
        switch (item) {
          case OBJECTS.BLANK:
            game += `<span class="item c${rowIdx}-${itemIdx}"></span>`;
            break;
          case OBJECTS.PLAYER:
            game += `<img id="mario" class="item c${rowIdx}-${itemIdx}" src=${`/${item}.png`}/>`;
            break;
          default:
            game += `<img class="item c${rowIdx}-${itemIdx}" src=${`/${item}.png`}/>`;
            break;
        }
      });
      game += `</div>`;
    });
    Matrix.element.innerHTML = game;
  }

  // variable si esta vacio:boolean
  static isEmpty(): boolean {
    // no devuelve la longitud de la matriz 
    return !Matrix.matrix.length;
  }

  // actualiza el juego con la coordena actual y la coordena siguiente
  static updateGame(currentCoordinate: Coordinate, nextCoordinate: Coordinate) {
    // La posicion de Mario es igual a las siguentes coordenadas
    Mario.position = nextCoordinate;

    // Variable MarioElement es igual al primer elemento del documento que con las coordenadas actuales
    const MarioElement = document.querySelector(`.c${currentCoordinate.x}-${currentCoordinate.y}`)! as HTMLImageElement;
    const span = document.createElement("span");
    span.classList.add("item");
    span.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);

    // si el objeto de la coordenada actual es igual a koopa y no una estrella, ni una flor
    if (Matrix.getObject(currentCoordinate) === Objects.BOWSER && !star.isPowered && !flower.isPowered) {
      const currentImg = document.createElement("img");
      currentImg.classList.add("item");
      currentImg.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
      currentImg.src = `/${OBJECTS.BOWSER}.png`;
      MarioElement.replaceWith(currentImg);
    } else if (
      // caso contrario, si el objeto es igual a una estrella y la flor tiene el poder encendido
      // y las coordenadas sin los poderes encendidos 
      Matrix.getObject(currentCoordinate) === Objects.STAR &&
      flower.isPowered &&
      unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y)
    ) {
      const currentImg = document.createElement("img");
      currentImg.classList.add("item");
      currentImg.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
      currentImg.src = `/${OBJECTS.STAR}.png`;
      MarioElement.replaceWith(currentImg);
    } else if (
      // caso contrario, si el objeto es igual a una flor y la estrella tiene el poder encendido
      // y las coordenadas sin los poderes encendidos
      Matrix.getObject(currentCoordinate) === Objects.FLOWER &&
      star.isPowered &&
      unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y)
    ) {
      const currentImg = document.createElement("img");
      currentImg.classList.add("item");
      currentImg.classList.add(`c${currentCoordinate.x}-${currentCoordinate.y}`);
      currentImg.src = `/${OBJECTS.FLOWER}.png`;
      MarioElement.replaceWith(currentImg);
    } else {
      MarioElement.replaceWith(span);
    }

    // si la duracion del poder de la estrella es 0, entonces no esta encendido
    if (star.duration === 0) star.isPowered = false;
    // si los disparos de la flor es 0, entonces no esta encendido
    if (flower.shots === 0) flower.isPowered = false;

    const nextMarioElement = document.querySelector(`.c${nextCoordinate.x}-${nextCoordinate.y}`)! as HTMLImageElement;
    const nextImg = document.createElement("img");
    nextImg.classList.add("item");
    nextImg.classList.add(`c${nextCoordinate.x}-${nextCoordinate.y}`);

    if (Matrix.getObject(nextCoordinate) === OBJECTS.PRINCESS) {
      nextImg.src = `/goal.png`;
    } else if (star.isPowered) {
      nextImg.src = `/2-star.png`;
      star.duration -= 1;
    } else if (flower.isPowered) {
      nextImg.src = `/2-flower.png`;
      if (Matrix.getObject(nextCoordinate) === OBJECTS.BOWSER) flower.shots -= 1;
    } else {
      nextImg.src = `/${OBJECTS.PLAYER}.png`;
    }

    switch (Matrix.getObject(nextCoordinate)) {
      case OBJECTS.PRINCESS:
        nextImg.src = `/goal.png`;
        break;
      case OBJECTS.STAR:
        if (flower.isPowered || !!unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y))
          break;
        nextImg.src = `/2-star.png`;
        star.isPowered = true;
        unpoweredCoordinates.push(nextCoordinate);
        console.log(
          "solution",
          Solution.solution.map(n => n)
        );
        star.duration += STAR_DEFAULT_DURATION;
        break;
      case OBJECTS.FLOWER:
        if (star.isPowered || !!unpoweredCoordinates.find(c => c.x === nextCoordinate.x && c.y === nextCoordinate.y))
          break;
        nextImg.src = `/2-flower.png`;
        flower.isPowered = true;
        unpoweredCoordinates.push(nextCoordinate);
        flower.shots += FLOWER_DEFAULT_SHOTS;
        break;
      default:
        break;
    }
    console.log("star", { ...star });
    console.log("flower", { ...flower });

    nextMarioElement.replaceWith(nextImg);
  }

  // se actualiza los datos del juego
  static updateGameStats() {
    document.querySelector(".stats__layout")?.classList.add("show");
    const nodes = document.querySelector(".stats__nodes") as HTMLDivElement;
    const nodesQty = document.querySelector(".stats__nodes__quantity") as HTMLDivElement;
    let path: string = "";
    Solution.staticPath.forEach((node, idx, arr) => {
      if (idx === arr.length - 1) path += `<span class="stats__node">(${node.position.x},${node.position.y})</span>`;
      else path += `<span class="stats__node">(${node.position.x},${node.position.y}),</span>`;
    });
    nodes.innerHTML += path;
    nodesQty.innerHTML = Solution.staticPath.length.toString();

    // los nodos expandidos
    const expandedNodes = document.querySelector(".stats__expanded") as HTMLDivElement;
    let expandedNodesContainer: string = "";
    Solution.expandedNodes.forEach((node, idx, arr) => {
      if (idx === arr.length - 1)
        expandedNodesContainer += `<span class="stats__node">(${node.position.x},${node.position.y})</span>`;
      else expandedNodesContainer += `<span class="stats__node">(${node.position.x},${node.position.y}),</span>`;
    });
    const expandedNodesQty = document.querySelector(".stats__expanded__quantity") as HTMLDivElement;
    expandedNodesQty.innerHTML = Solution.expandedNodes.length.toString();
    expandedNodes.innerHTML += expandedNodesContainer;

    // profundidad del arbol
    const treeDepth = document.querySelector(".stats__tree__depth") as HTMLDivElement;
    treeDepth.innerHTML = Solution.treeDepth.toString();

    // costo
    const cost = document.querySelector(".stats__cost") as HTMLDivElement;
    cost.innerHTML = Solution.cost.toString();
  }

  // Se limpian los datos del juego
  private static clearGameStats() {
    document.querySelector(".stats__nodes")!.replaceChildren("");
    document.querySelector(".stats__nodes__quantity")!.replaceChildren("");
    document.querySelector(".stats__expanded")!.replaceChildren("");
    document.querySelector(".stats__expanded__quantity")!.replaceChildren("");
    document.querySelector(".stats__tree__depth")!.replaceChildren("");
    document.querySelector(".stats__cost")!.replaceChildren("");
    document.querySelector(".stats__time")!.replaceChildren("");
  }

  // Se limpiar los poderes a valores iniciales
  private static clearPowerups() {
    star.isPowered = false;
    star.duration = 0;
    flower.isPowered = false;
    flower.shots = 0;
    unpoweredCoordinates = [];
  }


  static clear() {
    Matrix.clearGameStats();
    Matrix.clearPowerups();
  }

  // encontrar al jugador con la coordenada
  static findPlayer(): Coordinate {
    let playerPosition: Coordinate;
    Matrix.matrix.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item !== Objects.PLAYER) return;
        playerPosition = new Coordinate(rowIdx, itemIdx);
      });
    });
    return playerPosition!;
  }

  // encontrar a la princesa con la coordenada
  static findPrincess(): Coordinate {
    let playerPosition: Coordinate;
    Matrix.matrix.forEach((row, rowIdx) => {
      row.forEach((item, itemIdx) => {
        if (item !== Objects.PRINCESS) return;
        playerPosition = new Coordinate(rowIdx, itemIdx);
      });
    });
    return playerPosition!;
  }
  // Algoritmo AVARA
  // variable heuristicValue numerica y recibe coordenadas
  static heuristicValue(coordinates: Coordinate): number {

    //variable para la coordenadad de la princesa que es igual si se encontró la princesa en la matriz
    const coordinatePrincess: Coordinate = Matrix.findPrincess();

    // variable manhattanDistance que es un número y calcula el valor de la distancia de manhattan
    // | coord de la princesa en y - coordena de y| + | coord de la princesa en x - coordena de x|
    let manhattanDistance: number =
      Math.abs(coordinatePrincess.y - coordinates.y) + Math.abs(coordinatePrincess.x - coordinates.x);

    // Se devuelve el valor de la distancia de manhattan dividida por 2, heuristica admisible
    return manhattanDistance / 2;
  }
  // Algoritmo A*
  // variable costAndHeuristicValue que es numerica y recibe un nodo
  static costAndHeuristicValue(node: Node): number {

    // variable costAndHeuristic inicia con un valor de  0
    let costAndHeuristic = 0;
    // se calcula el valor de la heristica + del costo acumulado, f(n) = g(n) + h(n)
    costAndHeuristic = Matrix.heuristicValue(node.position) + node.accumulatedCost;

    // devuelve el valor del calculo anterior f(n)
    return costAndHeuristic;
  }
}

export default Matrix;

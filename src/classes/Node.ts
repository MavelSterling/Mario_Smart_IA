import COSTS from "../constants/costs";
import type { Object } from "../constants/objects";
import OBJECTS from "../constants/objects";
import Coordinate from "./Coordinate";
import Matrix from "./Matrix";
import { FLOWER_DEFAULT_SHOTS, STAR_DEFAULT_DURATION } from "./Mario";
class Node {

  father: Node | null = null; // nodo padre
  path: Node[] = []; // camino actual
  position: Coordinate; // coordenadas para la posicion actual del nodo
  gameState: string[][]; // estado del juego
  depth: number = 0; // profundidad
  cost: number = 0; // costo
  accumulatedCost: number = 0; // costo acumulado
  object: Object; //  tipo de objeto
  //estrella: poder encendido (defecto falso) y duración (defecto 0)
  star: { isPowered: boolean; durationLeft: number } = { isPowered: false, durationLeft: 0 };
  //flor: poder encendido (defecto falso) y disparo (defecto 0)
  flower: { isPowered: boolean; shotsLeft: number } = { isPowered: false, shotsLeft: 0 };

  // constructor del nodo padre, posicion y estado del juego
  constructor(father: Node | null, position: Coordinate, gameState: string[][]) {
    this.position = position;
    this.gameState = gameState;
    this.object = Matrix.matrix[position.x][position.y] as Object; 
    this.father = father;

    // si es el nodo padre
    if (father) {

      // La estrella no es el nodo padre
      this.star = { ...this.father!.star };

      // La flor no es el nodo padre
      this.flower = { ...this.father!.flower };

      // variable para el costo segun el objeto 
      let cost = COSTS[this.object];

      // si tiene una estrella
      if (this.hasStar()) {
        cost = 0.5; // el costo de cada movimiento 
        this.star.durationLeft--; // se disminuye la duración 

      // si tiene una flor y es un koopa
      } else if (this.hasFlower() && this.isBowser()) {
        this.flower.shotsLeft--; // se disminuye la cantidad de balas
        cost = 1; // el costo de cada movimiento 
      }

      // el costo acumulado es el costo acumulado del nodo padre + del nodo
      this.accumulatedCost = father.accumulatedCost + cost;

      // El camino del nodo padre
      this.path = [...father.path];

      // a la profundidad se le va sumando 1 a medida que se expanda los nodos
      this.depth = father.depth + 1; 
    }
    // si esta la estrella en el camino y no tiene la flor
    if (this.isStarInPath() && !this.hasFlower()) {

      // tiene el poder de la estrella, esta encendido el poder
      this.star.isPowered = true;
      // la duración de la estrella = duracion de la estrella + la duracion de la estrella por defecto (6)
      this.star.durationLeft += STAR_DEFAULT_DURATION; 
    }
    // Si esta la flor en el camino y esta la estrella
    if (this.isFlowerInPath() && !this.hasStar()) {

      // tiene el poder de la flor, esta encendido el poder
      this.flower.isPowered = true;
      // el disparo de la izquierda = disparo de la izquierda + el disparo por defecto (1 bala)
      this.flower.shotsLeft += FLOWER_DEFAULT_SHOTS;

    }

    // si la estrella tiene una duración igual a 0, entonces la estrella no tiene poder
    if (this.star.durationLeft === 0) this.star.isPowered = false;
    // si la flor tiene disparos igual a 0, entonces la flor no tiene poder
    if (this.flower.shotsLeft === 0) this.flower.isPowered = false;

    // agrega en el arreglo al final 
    this.path.push(this);
  }

  // variable si es blanco(casilla vacia):boolean
  public isBlank(): boolean {
    // Se retorna el objeto es igual al objeto blanco
    return this.object === OBJECTS.BLANK;
  }

  // variable si es un muro:boolean
  public isWall(): boolean {
    // Se retorna el objeto es igual al objeto muro 
    return this.object === OBJECTS.WALL;
  }

 // variable si es el jugador:boolean
  public isPlayer(): boolean {
    // Se retorna el objeto es igual al objeto jugador
    return this.object === OBJECTS.PLAYER;
  }

   // variable si es una estrella:boolean
   public isStar(): boolean {
    // Se retorna el objeto es igual al objeto estrella
    return this.object === OBJECTS.STAR;
  }

   // variable si es una flor:boolean
  public isFlower(): boolean {
    // Se retorna el objeto es igual al objeto flor
    return this.object === OBJECTS.FLOWER;
  }

   // variable si es una koopa:boolean
  public isBowser(): boolean {
    // Se retorna el objeto es igual al objeto koopa
    return this.object === OBJECTS.BOWSER;
  }

   // variable si es una princesa:boolean
  public isPrincess(): boolean {
    // Se retorna el objeto es igual al objeto koopa
    return this.object === OBJECTS.PRINCESS;
  }

   // variable si tiene una estrella:boolean
  public hasStar(): boolean {
    // Se retorna si esta encendido el poder de la estrella
    return this.star.isPowered;
  }

  // variable si tiene una flor:boolean
  public hasFlower(): boolean {
    // Se retorna si esta encendido el poder de la flor
    return this.flower.isPowered;
  }

  // variable si la estrella esta en el camino: boolean
  public isStarInPath(): boolean {
    // se retorna si esta la estrella y no esta en el camino para no volverla a tomar
    // find devuelve el primer valor encontrado con la condición de la posicion en x y y
    return this.isStar() && !this.path.find(n => n.position.x === this.position.x && n.position.y === this.position.y);
  }

  // variable si la flor esta en el camino: boolean
  public isFlowerInPath(): boolean {
    // se retorna si esta la flor y no esta en el camino para no volverla a tomar
    // find devuelve el primer valor encontrado con la condición de la posicion en x y y
    return (
      this.isFlower() && !this.path.find(n => n.position.x === this.position.x && n.position.y === this.position.y)
    );
  }
}

export default Node;

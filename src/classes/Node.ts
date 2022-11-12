import type { Object } from "../constants/objects";
import OBJECTS from "../constants/objects";
import Coordinate from "./Coordinate";
import Matrix from "./Matrix";
import Mario from "./Mario";
class Node {
  [x: string]: any;
  father: Node | null = null;
  path: Node[] = [];
  position: Coordinate;
  gameState: string[][];
  depth: number = 0;
  cost: number = 0;
  object: Object;

  constructor(father: Node | null, position: Coordinate, gameState: string[][]) {
    this.position = position;
    this.gameState = gameState;
    this.object = Matrix.matrix[position.x][position.y] as Object;
    this.father = father;
    if (father) this.path = [...father.path];
    this.path.push(this);
    this.cost = this.calculateAccumulatedCost();
    
  }

  public printAccumulatedCost(): void {
    console.log(`Mi costo acumulado es ${this.cost}, y estoy en la ubicación - ${this.position.x},${this.position.y}`);
  }

  public calculateAccumulatedCost () : number {
    let accumulatedCost: number = 0; 
    accumulatedCost += (this.father)? this.path[this.path.length - 2].cost : 0;
    if( Mario.hasStar() ){
      accumulatedCost += 0.5;
    }else if( this.isBowser() ){
      accumulatedCost += (Mario.hasFlower())? 1 : 6; 
    }else {
      accumulatedCost += (this.father)? 1 : 0;
    }
    //console.log(`Estoy en la posición ${this.position.x},${this.position.y} - Y mi valor acumulado es: ${accumulatedCost}`)
    return accumulatedCost;
  }

  public getCost() : number {
    return this.cost;
  }

  public isBlank(): boolean {
    return this.object === OBJECTS.BLANK;
  }

  public isWall(): boolean {
    return this.object === OBJECTS.WALL;
  }

  public isPlayer(): boolean {
    return this.object === OBJECTS.PLAYER;
  }

  public isStar(): boolean {
    return this.object === OBJECTS.STAR;
  }

  public isFlower(): boolean {
    return this.object === OBJECTS.FLOWER;
  }

  public isBowser(): boolean {
    return this.object === OBJECTS.BOWSER;
  }

  public isPrincess(): boolean {
    return this.object === OBJECTS.PRINCESS;
  }
}

export default Node;

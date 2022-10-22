import type { Object } from "../constants/objects";
import Coordinate from "./Coordinate";
import Matrix from "./Matrix";
class Node {
  father: Node | null;
  position: Coordinate;
  //leaves: Node[] = [];
  depth: number = -1;
  cost: number = -1;
  object: Object;

  constructor(father = null, position: Coordinate) {
    this.father = father;
    this.position = position;
    this.object = Matrix.matrix[position.x][position.y] as Object;
  }
}

export default Node;

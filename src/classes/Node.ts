import type { Object } from "../constants/objects";
import Coordinate from "./Coordinate";
import Matrix from "./Matrix";
class Node {
  father: Node | null;
  coordinate: Coordinate;
  //leaves: Node[] = [];
  depth: number = -1;
  cost: number = -1;
  object: Object;

  constructor(father = null, coordinate: Coordinate) {
    this.father = father;
    this.coordinate = coordinate;
    this.object = Matrix.matrix[coordinate.x][coordinate.y] as Object;
  }
}

export default Node;

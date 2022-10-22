import { Mario, Matrix, Node, Coordinate, Solution } from "./classes";
import "./style.css";

const MAIN_GAME =
  "1 0 0 0 0 0 0 0 1 1\r\n0 3 1 1 0 1 1 0 0 1\r\n1 1 1 1 0 1 1 1 3 0\r\n0 0 0 0 0 1 1 1 1 0\r\n2 1 1 1 0 0 0 0 5 5\r\n0 0 0 1 0 1 1 1 1 5\r\n0 1 0 0 0 5 5 5 0 0\r\n0 1 1 0 1 1 1 1 1 0\r\n0 4 4 0 1 1 1 6 0 0\r\n1 1 1 1 1 1 1 0 1 1";

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    console.log("result", fr.result);
    new Matrix(fr.result as string);
    main();
  };
  //@ts-ignore
  fr.readAsText(this.files[0]);
});

new Matrix(MAIN_GAME);
main();

function main() {
  new Mario(Matrix.findPlayer());

  let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);
  const bfs: Node[] = [];

  bfs.push(currentNode);
  let it = 10;
  while (bfs.length && !currentNode.isPrincess()) {
    it--;
    bfs.shift();

    if (!currentNode.isWall()) {
      //GO LEFT
      if (currentNode.position.y > 0) {
        const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y - 1);
        if (!bfs.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
          bfs.push(new Node(currentNode, newPosition, Matrix.matrix));
        }
      }
      //GO RIGHT
      if (currentNode.position.y < Matrix.matrix[0].length - 1) {
        const newPosition = new Coordinate(currentNode.position.x, currentNode.position.y + 1);
        if (!bfs.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
          bfs.push(new Node(currentNode, newPosition, Matrix.matrix));
        }
      }
      //GO UP
      if (currentNode.position.x > 0) {
        const newPosition = new Coordinate(currentNode.position.x - 1, currentNode.position.y);
        if (!bfs.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
          bfs.push(new Node(currentNode, newPosition, Matrix.matrix));
        }
      }
      //GO DOWN
      if (currentNode.position.x < Matrix.matrix.length - 1) {
        const newPosition = new Coordinate(currentNode.position.x + 1, currentNode.position.y);
        if (!bfs.find(node => node.position.x === newPosition.x && node.position.y === newPosition.y)) {
          bfs.push(new Node(currentNode, newPosition, Matrix.matrix));
        }
      }
    }
    currentNode = bfs[0];

    // console.log("--EXPANDED--");
    // for (let i = 0; i < bfs.length; i++) {
    //   if (!Solution.solution.includes(bfs[i])) {
    //     console.log(`(${bfs[i].position.x},${bfs[i].position.y})`);
    //   }
    // }
    // console.log("--EXPANDED END--");
    // console.log(`Pop -> (${bfs[0].position.x},${bfs[0].position.y})`);
  }

  Solution.solution = bfs[0].path;

  console.log("--SOLUTION--");
  for (let i = 0; i < Solution.solution.length; i++) {
    console.log(
      `(${Solution.solution[i].position.x},${Solution.solution[i].position.y}) - cost: ${Solution.solution[i].cost} - object: ${Solution.solution[i].object}`
    );
  }
  console.log("STATS");
  console.log(
    "Total cost:",
    Solution.solution.reduce((acc, c) => c.cost + acc, 0)
  );

  //mario.walk(new Coordinate(mario.position.x - 1, mario.position.y));

  // for (let x = 0; x < Matrix.matrix[0].length; x++) {
  //   for (let y = 0; y < Matrix.matrix.length; y++) {
  //     console.log(`(${x},${y}):`, Matrix.matrix[x][y]);
  //   }
  // }
}

function animate(): void {
  setInterval(() => {
    console.log("animation");
  }, 500);
}

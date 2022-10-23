import { Animation, Coordinate, Mario, Matrix, Node, Solution } from "./classes";
import { AnimationSetup } from "./classes/Animation";
import "./style.css";

let MATRIX: string;
let INTERVAL_ID: number | undefined;
let bfs: Node[] = [];

const reloadGame = (): void => {
  if (!Matrix.matrix.length) return;
  clearInterval(INTERVAL_ID);
  Mario.reset();
  Solution.reset();
  bfs = [];
  const initAnimationButton = document.querySelector(".init__game") as HTMLButtonElement;
  initAnimationButton.removeAttribute("disabled");
  new Matrix(MATRIX);
  main();
};

const MAIN_GAME =
  "1 0 0 0 0 0 0 0 1 1\r\n0 3 1 1 0 1 1 0 0 1\r\n1 1 1 1 0 1 1 1 3 0\r\n0 0 0 0 0 1 1 1 1 0\r\n2 1 1 1 0 0 0 0 5 5\r\n0 0 0 1 0 1 1 1 1 5\r\n0 1 0 0 0 5 5 5 0 0\r\n0 1 1 0 1 1 1 1 1 0\r\n0 4 4 0 1 1 1 6 0 0\r\n1 1 1 1 1 1 1 0 1 1";

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    reloadGame();
    console.log("result", fr.result);
    new Matrix(fr.result as string);
    MATRIX = fr.result as string;
    main();
  };
  //@ts-ignore
  fr.readAsText(this.files[0]);
});

// new Matrix(MAIN_GAME);
// main();

function main() {
  new Mario(Matrix.findPlayer());

  let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

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
  Solution.solution.forEach(Solution.buildNodeCost);
  Solution.buildTotalCost();

  console.log("--SOLUTION--");
  for (let i = 0; i < Solution.solution.length; i++) {
    console.log(
      `(${Solution.solution[i].position.x},${Solution.solution[i].position.y}) - cost: ${Solution.solution[i].cost} - object: ${Solution.solution[i].object}`
    );
  }
  console.log("STATS");
  console.log("Total cost:", Solution.cost);

  //mario.walk(new Coordinate(mario.position.x - 1, mario.position.y));

  // for (let x = 0; x < Matrix.matrix[0].length; x++) {
  //   for (let y = 0; y < Matrix.matrix.length; y++) {
  //     console.log(`(${x},${y}):`, Matrix.matrix[x][y]);
  //   }
  // }
  Solution.solution.shift();
  // animate();
}

function animate(): void {
  if (!Matrix.matrix.length) return;
  const id = setInterval(() => {
    if (!Solution.solution.length) {
      clearInterval(id);
      return;
    }
    Matrix.updateGame(Mario.position, Solution.solution.shift()!.position);
  }, Animation.interval);
  INTERVAL_ID = id;
}

const toggleSidebar = () => document.body.classList.toggle("open");

const toggleSidebarButton = document.querySelector(".toggle__sidebar") as HTMLButtonElement;
toggleSidebarButton?.addEventListener("click", toggleSidebar);

const initAnimationForm = document.querySelector(".animation__form") as HTMLFormElement;

initAnimationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!Matrix.matrix.length) return;
  // @ts-ignore
  const data: AnimationSetup = Object.fromEntries(new FormData(initAnimationForm));

  data.interval = Number(data.interval);
  Animation.setup({
    ...data,
  });

  const initAnimationButton = document.querySelector(".init__game") as HTMLButtonElement;
  initAnimationButton.toggleAttribute("disabled");

  animate();
});

const reloadButton = document.querySelector(".sidebar-reload-button") as HTMLButtonElement;
reloadButton.addEventListener("click", reloadGame);

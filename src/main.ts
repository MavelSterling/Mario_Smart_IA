import { Animation, Coordinate, Mario, Matrix, Node, Solution } from "./classes";
import { AnimationSetup } from "./classes/Animation";
import "./style.css";

let MATRIX: string;
let INTERVAL_ID: number | undefined;
let bfs: Node[] = [];

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    reloadGame(false);
    new Matrix(fr.result as string);
    MATRIX = fr.result as string;
    main();
  };
  //@ts-ignore
  fr.readAsText(this.files[0]);
});

const initAnimationButton = document.querySelector(".init__game") as HTMLButtonElement;
const toggleSidebarButton = document.querySelector(".toggle__sidebar") as HTMLButtonElement;
const initAnimationForm = document.querySelector(".animation__form") as HTMLFormElement;
const reloadButton = document.querySelector(".sidebar-reload-button") as HTMLButtonElement;

const toggleSidebar = () => document.body.classList.toggle("open");

const resetGame = () => {
  clearInterval(INTERVAL_ID);
  Mario.reset();
  Solution.reset();
  bfs = [];
  initAnimationButton.removeAttribute("disabled");
};

const reloadGame = (sameGame: boolean = true): void => {
  if (Matrix.isEmpty()) return;
  resetGame();
  if (!sameGame) return;
  new Matrix(MATRIX);
  main();
};

const startAnimation = (e: SubmitEvent) => {
  e.preventDefault();
  if (Matrix.isEmpty()) return;
  const data: AnimationSetup = Object.fromEntries(new FormData(initAnimationForm) as any) as AnimationSetup;
  data.interval = Number(data.interval);
  Animation.setup({
    ...data,
  });
  initAnimationButton.toggleAttribute("disabled");
  animate();
};

toggleSidebarButton.addEventListener("click", toggleSidebar);
initAnimationForm.addEventListener("submit", startAnimation);
reloadButton.addEventListener("click", () => reloadGame());

const MAIN_GAME =
  "1 0 0 0 0 0 0 0 1 1\r\n0 3 1 1 0 1 1 0 0 1\r\n1 1 1 1 0 1 1 1 3 0\r\n0 0 0 0 0 1 1 1 1 0\r\n2 1 1 1 0 0 0 0 5 5\r\n0 0 0 1 0 1 1 1 1 5\r\n0 1 0 0 0 5 5 5 0 0\r\n0 1 1 0 1 1 1 1 1 0\r\n0 4 4 0 1 1 1 6 0 0\r\n1 1 1 1 1 1 1 0 1 1";

// new Matrix(MAIN_GAME);
// main();

function main() {
  new Mario(Matrix.findPlayer());

  let currentNode: Node = new Node(null, Mario.position, Matrix.matrix);

  bfs.push(currentNode);
  while (bfs.length && !currentNode.isPrincess()) {
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

  Solution.solution.shift();
}

function animate(): void {
  if (Matrix.isEmpty()) return;
  const id = setInterval(() => {
    if (!Solution.solution.length) {
      clearInterval(id);
      return;
    }
    Matrix.updateGame(Mario.position, Solution.solution.shift()!.position);
  }, Animation.interval);
  INTERVAL_ID = id;
}

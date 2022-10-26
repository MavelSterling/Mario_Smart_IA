import { Animation, Mario, Matrix, Node, Solution, SearchAlgorithms } from "./classes";
import { AnimationSetup } from "./classes/Animation";
import "./style.css";

let MATRIX: string;
let INTERVAL_ID: number | undefined;
let nodeList: Node[] = [];

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    reloadGame(false);
    new Matrix(fr.result as string);
    MATRIX = fr.result as string;
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
  nodeList = [];
  initAnimationButton.removeAttribute("disabled");
};

const reloadGame = (sameGame: boolean = true): void => {
  if (Matrix.isEmpty()) return;
  resetGame();
  if (!sameGame) return;
  new Matrix(MATRIX);
};

const startGame = (e: SubmitEvent) => {
  e.preventDefault();
  if (Matrix.isEmpty()) return;
  const data: AnimationSetup = Object.fromEntries(new FormData(initAnimationForm) as any) as AnimationSetup;
  data.interval = Number(data.interval);
  Animation.setup({
    ...data,
  });
  initAnimationButton.toggleAttribute("disabled");
  main();
};

toggleSidebarButton.addEventListener("click", toggleSidebar);
initAnimationForm.addEventListener("submit", startGame);
reloadButton.addEventListener("click", () => reloadGame());

// const MAIN_GAME = "1 0 0 0 0 0 0 0 1 1\r\n0 3 1 1 0 1 1 0 0 1\r\n1 1 1 1 0 1 1 1 3 0\r\n0 0 0 0 0 1 1 1 1 0\r\n2 1 1 1 0 0 0 0 5 5\r\n0 0 0 1 0 1 1 1 1 5\r\n0 1 0 0 0 5 5 5 0 0\r\n0 1 1 0 1 1 1 1 1 0\r\n0 4 4 0 1 1 1 6 0 0\r\n1 1 1 1 1 1 1 0 1 1";

// new Matrix(MAIN_GAME);
// main();

function main() {
  SearchAlgorithms.breadthFirstSearch(nodeList);

  animate();
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

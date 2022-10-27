import { Animation, Mario, Matrix, Node, Solution, SearchAlgorithms } from "./classes";
import { AnimationSetup } from "./classes/Animation";
import Algorithm from "./types/Algorithm";
import "./style.css";

let MATRIX: string;
let INTERVAL_ID: number | undefined;
let nodeList: Node[] = [];

document.getElementById("inputFile")!.addEventListener("change", function () {
  var fr = new FileReader();
  fr.onload = function () {
    new Matrix(fr.result as string);
    MATRIX = fr.result as string;
    reloadGame(false);
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
  document.querySelector(".stats__layout")?.classList.remove("show");
  clearInterval(INTERVAL_ID);
  Mario.reset();
  Solution.reset();
  Matrix.clear();
  nodeList = [];
  initAnimationButton.removeAttribute("disabled");
};

const reloadGame = (sameGame: boolean = true): void => {
  if (Matrix.isEmpty()) {
    alert("Select a game first");
    return;
  }
  resetGame();
  if (!sameGame) return;
  new Matrix(MATRIX);
};

const startGame = (e: SubmitEvent) => {
  e.preventDefault();
  if (Matrix.isEmpty()) {
    alert("Select a game first");
    return;
  }
  const data: AnimationSetup = Object.fromEntries(new FormData(initAnimationForm) as any) as AnimationSetup;
  data.interval = Number(data.interval);
  Animation.setup({
    ...data,
  });
  initAnimationButton.toggleAttribute("disabled");
  main(data.algorithm);
};

toggleSidebarButton.addEventListener("click", toggleSidebar);
initAnimationForm.addEventListener("submit", startGame);
reloadButton.addEventListener("click", () => reloadGame());

function main(algorithm: Algorithm) {
  const start = Date.now();
  try {
    switch (algorithm) {
      case Algorithm.BREADTH_FIRST_SEARCH:
        SearchAlgorithms.breadthFirstSearch(nodeList);
        break;
      default:
        alert("Invalid algorithm");
        resetGame();
        return;
    }
  } catch (error) {
    alert(error);
    return;
  }
  const end = Date.now();
  const time = document.querySelector(".stats__time") as HTMLDivElement;
  time.innerHTML = `${end - start} ms`;
  Solution.buildSolution();

  Matrix.updateGameStats();
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

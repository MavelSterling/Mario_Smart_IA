import { Animation, Mario, Matrix, Node, SearchAlgorithms, Solution } from "./classes";
import "./style.css";
import Algorithm, { InformedAlgorithm, UninformedAlgorithm } from "./types/Algorithm";
import AlgorithmType from "./types/AlgorithmType";
import Settings from "./types/Settings";

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
const algorithmTypeSelect = document.getElementById("algorithmType") as HTMLSelectElement;
const uninformedAlgorithms = document.querySelector(".uninformed__algorithms") as HTMLDivElement;
const informedAlgorithms = document.querySelector(".informed__algorithms") as HTMLDivElement;

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

const changeAlgorithmType = () => {
  if (algorithmTypeSelect.value === AlgorithmType.UNINFORMED) {
    informedAlgorithms.classList.remove("display-flex");
    uninformedAlgorithms.classList.add("display-flex");
  } else {
    uninformedAlgorithms.classList.remove("display-flex");
    informedAlgorithms.classList.add("display-flex");
  }
};

const startGame = (e: SubmitEvent) => {
  e.preventDefault();
  if (Matrix.isEmpty()) {
    alert("Select a game first");
    return;
  }
  const data: Settings = Object.fromEntries(new FormData(initAnimationForm) as any) as Settings;
  data.interval = Number(data.interval);
  let selectedAlgorithm: Algorithm;

  if (data.algorithmType === AlgorithmType.UNINFORMED) {
    selectedAlgorithm = data.uninformedAlgorithm;
  } else {
    selectedAlgorithm = data.informedAlgorithm;
  }

  Animation.setup({
    interval: data.interval,
    algorithm: selectedAlgorithm,
  });
  initAnimationButton.toggleAttribute("disabled");
  main(Animation.algorithm);
};

toggleSidebarButton.addEventListener("click", toggleSidebar);
initAnimationForm.addEventListener("submit", startGame);
reloadButton.addEventListener("click", () => reloadGame());
algorithmTypeSelect.addEventListener("change", changeAlgorithmType);

function main(algorithm: Algorithm) {
  const start = Date.now();
  try {
    switch (algorithm) {
      case UninformedAlgorithm.BREADTH_FIRST_SEARCH:
        SearchAlgorithms.breadthFirstSearch(nodeList);
        break;
      case UninformedAlgorithm.DEPTH_FIRST_SEARCH:
        SearchAlgorithms.depthFirstSearch(nodeList);
        break;
      case UninformedAlgorithm.COST:
        SearchAlgorithms.uniformCostSearch(nodeList);
        break;
      case InformedAlgorithm.GREEDY:
        SearchAlgorithms.greedySearch(nodeList);
        break;
      case InformedAlgorithm.ASTAR:
        SearchAlgorithms.aStarSearch(nodeList);
        break;
      default:
        alert("Invalid algorithm");
        resetGame();
        return;
    }
    console.log(Solution.staticPath.map(({ accumulatedCost, star, flower }) => ({ accumulatedCost, star, flower })));
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

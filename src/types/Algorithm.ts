export enum UninformedAlgorithm {
  BREADTH_FIRST_SEARCH = "BREADTH_FIRST_SEARCH",
  DEPTH_FIRST_SEARCH = "DEPTH_FIRST_SEARCH",
  COST = "COST",
}

export enum InformedAlgorithm {
  GREEDY = "GREEDY",
  ASTAR = "A*",
}

type Algorithm = UninformedAlgorithm | InformedAlgorithm;

export default Algorithm;

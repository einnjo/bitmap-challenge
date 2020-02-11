import { parseInput, printSolution } from "./io";
import { matrixMinDistanceToTarget } from "./solver";

const problems = parseInput("./input.txt");
for (const problem of problems) {
  const solution = matrixMinDistanceToTarget(problem);
  printSolution(solution);
}

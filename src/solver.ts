export function matrixMinDistanceToTarget(problem: Problem) {
  const { rows, cols, matrix, target } = problem;
  // solution[row][col] represents the shortest distance of position row, col
  // to target.
  // We initialize it to a big distance that'll be replaced by the algorithm
  // once it finds a better solution.
  const solution = createMatrix(rows, cols, Number.MAX_SAFE_INTEGER);

  // We'll start from existing target positions and branch out.
  const targetPositions = findAllPositionsWithValue(matrix, target);

  // The distance of a position with a value of target is 0, since it is already at target.
  setPositionsToValue(solution, targetPositions, 0);

  const searchQueue = [...targetPositions];
  while (searchQueue.length > 0) {
    const position = searchQueue.shift()!;
    const neighbors = findNeighbors(rows, cols, position);

    for (const neighbor of neighbors) {
      const distance = manhattanDistance(position, neighbor);
      const totalDistance = solution[position.row][position.col] + distance;
      if (totalDistance < solution[neighbor.row][neighbor.col]) {
        solution[neighbor.row][neighbor.col] = totalDistance;
        searchQueue.push(neighbor);
      }
    }
  }

  return solution;
}

export interface Problem {
  rows: number;
  cols: number;
  matrix: number[][];
  target: number;
}

/**
 * Creates a rows x cols matrix initialized to value
 * @param rows
 * @param cols
 * @param initialValue
 */
export function createMatrix(
  rows: number,
  cols: number,
  initialValue: number
): number[][] {
  const matrix = [];

  for (let row = 0; row < rows; row++) {
    const row = [];

    for (let col = 0; col < cols; col++) {
      row.push(initialValue);
    }

    matrix.push(row);
  }

  return matrix;
}

/**
 * Finds all points where value is present in matrix.
 * @param matrix
 * @param value
 */
export function findAllPositionsWithValue(
  matrix: number[][],
  value: number
): MatrixPosition[] {
  const positions = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (matrix[row][col] === value) {
        positions.push({ row, col });
      }
    }
  }

  return positions;
}

/**
 * Represents a specific position in a two-dimensional matrix.
 */
interface MatrixPosition {
  row: number;
  col: number;
}

/**
 * Sets positions in matrix to value.
 * Does not check bounds.
 * Mutates original matrix.
 *
 * @param matrix
 * @param positions
 * @param value
 */
export function setPositionsToValue(
  matrix: number[][],
  positions: MatrixPosition[],
  value: number
): void {
  for (const { row, col } of positions) {
    matrix[row][col] = value;
  }
}

/**
 * Finds all neighbors around a matrix position.
 * Out of bounds neighbors are ommited.
 * Ordering of neighbors is row ASC col ASC i.e. top to bottom, left to right.
 * A point is not considered a neighbor of itself.
 * @param rows
 * @param cols
 * @param p
 */
export function findNeighbors(
  rows: number,
  cols: number,
  p: MatrixPosition
): MatrixPosition[] {
  const neighbors = [];

  for (let row = p.row - 1; row <= p.row + 1; row++) {
    for (let col = p.col - 1; col <= p.col + 1; col++) {
      const rowInBounds = row >= 0 && row < rows;
      const colInBounds = col >= 0 && col < cols;
      const isSelf = row === p.row && col === p.col;
      if (rowInBounds && colInBounds && !isSelf) {
        neighbors.push({ row, col });
      }
    }
  }

  return neighbors;
}

/**
 * Calculates manhattanDistance distance between p1 and p2.
 * @param p1
 * @param p2
 */
export function manhattanDistance(
  p1: MatrixPosition,
  p2: MatrixPosition
): number {
  const rowDistance = Math.abs(p1.row - p2.row);
  const colDistance = Math.abs(p1.col - p2.col);

  return rowDistance + colDistance;
}

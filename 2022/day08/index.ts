import { Day09Input } from "./input";

const grid = Day09Input.map((line) => {
  const digits = line.split("").map(Number);
  return digits;
});

const width = grid[0].length;
const height = grid.length;

const columns: number[][] = [];
for (let x = 0; x < width; ++x) {
  const column: number[] = [];
  for (let y = 0; y < height; ++y) {
    column.push(grid[y][x]);
  }
  columns.push(column);
}

console.log(`grid is ${width} x ${height}`);

const isVisible = (x: number, y: number) => {
  if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
    return true;
  }

  const myRow = grid[y];
  const myHeight = myRow[x];
  const left = myRow.slice(0, x);
  const right = myRow.slice(x + 1);

  if (
    left.every((digit) => digit < myHeight) ||
    right.every((digit) => digit < myHeight)
  ) {
    return true;
  }

  const myColumn = columns[x];
  const above = myColumn.slice(0, y);
  const below = myColumn.slice(y + 1);

  if (
    above.every((digit) => digit < myHeight) ||
    below.every((digit) => digit < myHeight)
  ) {
    return true;
  }

  return false;
};

const getArrayScore = (myHeight: number, values: number[]) => {
  let distance = 0;
  while (true) {
    const value = values.pop();
    if (value === undefined) {
      return distance;
    }

    ++distance;

    if (value >= myHeight) {
      return distance;
    }
  }
};

const getScenicScore = (x: number, y: number) => {
  const myRow = grid[y];
  const myHeight = myRow[x];
  const left = myRow.slice(0, x);
  const right = myRow.slice(x + 1).reverse();
  const myColumn = columns[x];
  const above = myColumn.slice(0, y);
  const below = myColumn.slice(y + 1).reverse();

  const leftScore = getArrayScore(myHeight, left);
  const rightScore = getArrayScore(myHeight, right);
  const aboveScore = getArrayScore(myHeight, above);
  const belowScore = getArrayScore(myHeight, below);
  const scenicScore = leftScore * rightScore * aboveScore * belowScore;

  return scenicScore;
};

let totalVisible = 0;
let highestScenicScore = 0;
for (let y = 0; y < height; ++y) {
  for (let x = 0; x < width; ++x) {
    if (isVisible(x, y)) {
      totalVisible += 1;
    }

    highestScenicScore = Math.max(highestScenicScore, getScenicScore(x, y));
  }
}

console.log({
  totalVisible,
  highestScenicScore,
});

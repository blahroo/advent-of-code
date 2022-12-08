import { Day09Input } from "./input";

const lines = Day09Input;

const grid = lines.map((line) => {
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

let totalVisible = 0;
for (let y = 0; y < height; ++y) {
  for (let x = 0; x < width; ++x) {
    if (isVisible(x, y)) {
      totalVisible += 1;
    }
  }
}

console.log({
  totalVisible,
});

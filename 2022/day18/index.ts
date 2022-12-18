import { Day18Lines } from "./input";

const lines = Day18Lines;

let uncoveredCount = 0;

for (const line of lines) {
  const [x, y, z] = line.split(",").map(Number);

  const neighbours = [
    [x - 1, y, z],
    [x + 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ].forEach((neighbour) => {
    const reformed = neighbour.join(",");
    if (!lines.includes(reformed)) {
      ++uncoveredCount;
    }
  });
}

console.log({
  uncoveredCount,
});

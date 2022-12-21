import { Day14Input } from "./input";
import { isInPoints, Point } from "utilities/space";

const EXAMPLE_INPUT = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`.split("\n");

const world: Point[] = [];
const rested: Point[] = [];

for (const line of Day14Input) {
  const pairs = line.split(" -> ").map((pair) => {
    return pair.split(",").map(Number);
  });

  while (pairs.length > 1) {
    const [startX, startY] = pairs.shift();
    const [endX, endY] = pairs[0];

    const isHorizontal = startY === endY;

    if (isHorizontal) {
      for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); ++x) {
        world.push({ x, y: startY });
      }
    } else {
      for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); ++y) {
        world.push({ x: startX, y });
      }
    }
  }
}

let leftmost = world[0].x;
let rightmost = world[0].x;
let bottommost = world[0].y;

world.forEach((point) => {
  leftmost = Math.min(leftmost, point.x);
  rightmost = Math.max(rightmost, point.x);
  bottommost = Math.max(bottommost, point.y);
});

const printState = () => {
  const lines: string[] = [];
  for (let y = 0; y <= bottommost; ++y) {
    const line: string[] = [];

    for (let x = leftmost; x <= rightmost; ++x) {
      if (isInPoints(world, x, y)) {
        line.push("#");
      } else if (isInPoints(rested, x, y)) {
        line.push("o");
      } else {
        line.push(".");
      }
    }

    lines.push(line.join(""));
  }

  console.log(lines.join("\n"));
};

const collides = (x: number, y: number) => {
  return isInPoints(world, x, y) || isInPoints(rested, x, y);
};

let currentDrop: Point = { x: 500, y: 0 };
let dropNumber = 0;
while (currentDrop.y < bottommost) {
  const { x, y } = currentDrop;

  if (collides(x, y + 1)) {
    // Cannot move down
    if (collides(x - 1, y + 1)) {
      // Cannot move down+left
      if (collides(x + 1, y + 1)) {
        // Cannot move down+right
        // Rest the grain
        //console.log(`Resting drop ${dropNumber++} as ${x},${y}`);
        rested.push(currentDrop);
        currentDrop = { x: 500, y: 0 };

        //     printState();
      } else {
        // Do move down+right
        currentDrop.x = currentDrop.x + 1;
        currentDrop.y = currentDrop.y + 1;
      }
    } else {
      // Do move down+left
      currentDrop.x = currentDrop.x - 1;
      currentDrop.y = currentDrop.y + 1;
    }
  } else {
    //Can move down
    currentDrop.y = currentDrop.y + 1;
  }
}

console.log({
  part1: rested.length,
});

import { Day14Input } from "./input";
import { Point } from "utilities/space";

const world: Point[] = [];

const solids = new Set<string>();

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
  solids.add(`${point.x},${point.y}`);
  leftmost = Math.min(leftmost, point.x);
  rightmost = Math.max(rightmost, point.x);
  bottommost = Math.max(bottommost, point.y);
});

const floor = bottommost + 2;

const simulate = () => {
  const rested: Point[] = [];

  const collides = (x: number, y: number) => {
    if (y >= floor) {
      return true;
    }

    return solids.has(`${x},${y}`);
  };

  let currentDrop: Point = { x: 500, y: 0 };
  while (true) {
    const { x, y } = currentDrop;

    if (collides(x, y + 1)) {
      // Cannot move down
      if (collides(x - 1, y + 1)) {
        // Cannot move down+left
        if (collides(x + 1, y + 1)) {
          // Cannot move down+right
          // Rest the grain
          rested.push(currentDrop);
          solids.add(`${currentDrop.x},${currentDrop.y}`);

          if (currentDrop.x === 500 && currentDrop.y === 0) {
            return rested.length;
          }

          currentDrop = { x: 500, y: 0 };
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
};

console.log({
  part2: simulate(),
});

import { Point } from "utilities/space";
import { Day09Input } from "./input";

let headPos: Point = { x: 0, y: 0 };
let tailPos: Point = { x: 0, y: 0 };

const tailPositions = new Set<string>(["0,0"]);

const distance = (pointA: Point, pointB: Point) => {
  const a = pointA.x - pointB.x;
  const b = pointA.y - pointB.y;

  return Math.sqrt(a * a + b * b);
};

for (const line of Day09Input) {
  const [direction, stepsStr] = line.split(" ");
  const steps = Number(stepsStr);

  for (let step = 0; step < steps; ++step) {
    const headWas: Point = { ...headPos };

    switch (direction) {
      case "U":
        headPos.y++;
        break;
      case "D":
        headPos.y--;
        break;
      case "R":
        headPos.x++;
        break;
      case "L":
        headPos.x--;
        break;
      default:
        throw new Error("Unknown direction " + direction);
    }

    const distanceBetween = distance(headPos, tailPos);

    if (distanceBetween >= 2) {
      tailPos = headWas;
      tailPositions.add(`${tailPos.x},${tailPos.y}`);
    }
  }
}

console.log({
  totalTailPositions: tailPositions.size,
});

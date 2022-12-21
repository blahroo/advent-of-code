import { findTallestY, isInPoints, movePoints, Point } from "utilities/space";
import { Day17Input } from "./input";

const EXAMPLE_INPUT = `>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>`;
const CHAMBER_WIDTH = 7;

const NUDGE_LEFT = Object.freeze<Point>({ x: -1, y: 0 });
const NUDGE_RIGHT = Object.freeze<Point>({ x: 1, y: 0 });
const NUDGE_DOWN = Object.freeze<Point>({ x: 0, y: -1 });

const getNewShape = (
  highestRock: number,
  shapeCounter: number
): Readonly<Point[]> => {
  const LEFT_EDGE = 2;
  const BOTTOM = highestRock + 4;

  switch (shapeCounter % 5) {
    case 0:
      return Object.freeze([
        { x: LEFT_EDGE, y: BOTTOM },
        { x: LEFT_EDGE + 1, y: BOTTOM },
        { x: LEFT_EDGE + 2, y: BOTTOM },
        { x: LEFT_EDGE + 3, y: BOTTOM },
      ]);
    case 1:
      return Object.freeze([
        // Top row
        { x: LEFT_EDGE + 1, y: BOTTOM + 2 },
        // Middle row
        { x: LEFT_EDGE, y: BOTTOM + 1 },
        { x: LEFT_EDGE + 1, y: BOTTOM + 1 },
        { x: LEFT_EDGE + 2, y: BOTTOM + 1 },
        // Bottom row
        { x: LEFT_EDGE + 1, y: BOTTOM },
      ]);
    case 2:
      return Object.freeze([
        // Top row
        { x: LEFT_EDGE + 2, y: BOTTOM + 2 },
        // Middle row
        { x: LEFT_EDGE + 2, y: BOTTOM + 1 },
        // Bottom row, left to right
        { x: LEFT_EDGE, y: BOTTOM },
        { x: LEFT_EDGE + 1, y: BOTTOM },
        { x: LEFT_EDGE + 2, y: BOTTOM },
      ]);
    case 3:
      return Object.freeze([
        { x: LEFT_EDGE, y: BOTTOM },
        { x: LEFT_EDGE, y: BOTTOM + 1 },
        { x: LEFT_EDGE, y: BOTTOM + 2 },
        { x: LEFT_EDGE, y: BOTTOM + 3 },
      ]);
    case 4:
      return Object.freeze([
        { x: LEFT_EDGE, y: BOTTOM },
        { x: LEFT_EDGE, y: BOTTOM + 1 },
        { x: LEFT_EDGE + 1, y: BOTTOM + 1 },
        { x: LEFT_EDGE + 1, y: BOTTOM },
      ]);
  }

  throw new Error(`Failed to infer shape for counter ${shapeCounter}`);
};

const getPrintableCharacter = (
  restedRocks: ReadonlySet<string>,
  fallingPoints: Readonly<Point[]>,
  x: number,
  y: number
) => {
  if (isInPoints(fallingPoints, x, y)) {
    return "@";
  }

  if (restedRocks.has(`${x},${y}`)) {
    return "#";
  }

  return ".";
};

const print = (
  restedRocks: ReadonlySet<string>,
  fallingPoints: Readonly<Point[]>,
  highestRock: number,
  title?: string
) => {
  return;
  const height =
    fallingPoints.length === 0
      ? highestRock
      : Math.max(highestRock, findTallestY(fallingPoints));

  const lines = ["", `+-------+`];

  for (let y = 0; y < height + 1; ++y) {
    const line = ["|"];

    for (let x = 0; x < CHAMBER_WIDTH; ++x) {
      line.push(getPrintableCharacter(restedRocks, fallingPoints, x, y));
    }
    line.push("|");

    lines.push(line.join(""));
  }

  if (title) {
    lines.push(title);
  }
  lines.reverse();
  console.log(lines.join("\n"));
};

const shapeCollides = (
  restedRocks: ReadonlySet<string>,
  fallingPoints: Readonly<Point[]>
) => {
  const outOfBounds = fallingPoints.some((point) => {
    return point.x < 0 || point.x >= CHAMBER_WIDTH || point.y < 0;
  });

  const collidesWithRestedBlock = fallingPoints.some(({ x, y }) => {
    return restedRocks.has(`${x},${y}`);
  });

  const output = outOfBounds || collidesWithRestedBlock;
  /*
  console.log({
    outOfBounds,
    collidesWithRestedBlock,
    output,
    points: fallingPoints.map((point) => `[${point.x},${point.y}]`).join(","),
    rested: Array.from(restedRocks.values())
      .map((str) => str.split(","))
      .map(([x, y]) => `[${x},${y}]`)
      .join(","),
  });
*/
  return output;
};

const solve = (input: string, rocksToSimulate: number) => {
  const directions = input.split("");

  let highestRock = -1;
  let shapesCreated = 0;

  let rocksCompleted = 0;

  let fallingPoints: Readonly<Point[]> | null = null;
  const restedRocks = new Set<string>();

  let cycle = 0;
  while (true) {
    const direction = directions[cycle % input.length];

    // Spawn a new rock is nothing is presently falling
    if (fallingPoints === null) {
      fallingPoints = getNewShape(highestRock, shapesCreated++);
      print(
        restedRocks,
        fallingPoints,
        highestRock,
        `Rock ${shapesCreated} begins falling:`
      );
    }

    // Apply gas
    const movedCandidate = movePoints(
      fallingPoints,
      direction === "<" ? NUDGE_LEFT : NUDGE_RIGHT
    );

    // If there is no collision, continue with this position otherwise roll back
    const movedCollides = shapeCollides(restedRocks, movedCandidate);
    const moved = movedCollides ? fallingPoints : movedCandidate;
    print(
      restedRocks,
      moved,
      highestRock,
      `Jet of gas pushes rock ${direction === "<" ? "left" : "right"}${
        movedCollides ? ", but nothing happens" : ""
      }:`
    );

    const fallenRocks = movePoints(moved, NUDGE_DOWN);
    if (shapeCollides(restedRocks, fallenRocks)) {
      // Ignore the drop, solidify the moved positions
      moved.forEach((point) => {
        highestRock = Math.max(highestRock, point.y);
        restedRocks.add(`${point.x},${point.y}`);
      });
      fallingPoints = null;

      print(
        restedRocks,
        [],
        highestRock,
        `Rock falls 1 unit, causing it to come to rest:`
      );

      ++rocksCompleted;
      if (rocksCompleted === rocksToSimulate) {
        return highestRock + 1;
      }
    } else {
      // Accept fallen position as the new position of the falling rocks
      fallingPoints = fallenRocks;
      print(restedRocks, fallingPoints, highestRock, `Rock falls 1 unit:`);
    }

    ++cycle;
  }
};

const part1 = solve(Day17Input, 2022);

console.log({
  part1,
});

import { Direction, Point, turnTo } from "utilities/space";
import buildMoves from "./buildMoves";
import buildWorld from "./buildWorld";
import getNextPosition from "./getNextPosition";
import { EXAMPLE_INPUT, Day22Input } from "./input";

const input = Day22Input;
const mapLines = input.slice(0, -2);
const moveLine = input[input.length - 1];

type Arrow = ">" | "<" | "^" | "v";

const DirectionToArrow: Record<Direction, Arrow> = {
  E: ">",
  N: "^",
  S: "v",
  W: "<",
};

const ArrowToFacingValue: Record<Arrow, number> = {
  ">": 0,
  v: 1,
  "<": 2,
  "^": 3,
};

const solve = () => {
  const visited = new Map<string, Direction>();

  const worldWidth = mapLines.reduce(
    (longest, line) => Math.max(longest, line.length),
    0
  );
  const worldHeight = mapLines.length;

  const { startPos, world } = buildWorld(mapLines);
  let position: Readonly<Point> = startPos;
  let facing: Direction = "E";

  visited.set(`${position.x},${position.y}`, facing);

  const moves = buildMoves(moveLine);
  let prevFacing: Direction = facing;
  for (const move of moves) {
    for (let stepNo = 0; stepNo < move.totalSteps; ++stepNo) {
      position = getNextPosition(world, position, facing);
      visited.set(`${position.x},${position.y}`, facing);
    }

    prevFacing = facing;
    facing = turnTo(facing, move.turnTo);
    visited.set(`${position.x},${position.y}`, facing);
  }

  // Ignore the last turn
  visited.set(`${position.x},${position.y}`, prevFacing);

  // Print world and visited arrows
  const printLines: string[] = [];
  for (let y = 0; y < worldHeight; ++y) {
    const printLine: string[] = [];
    for (let x = 0; x < worldWidth; ++x) {
      const coorsStr = `${x},${y}`;
      const tileMaybe = world.get(coorsStr);
      if (tileMaybe === undefined) {
        printLine.push(" ");
      } else {
        const visitedMaybe = visited.get(coorsStr);
        printLine.push(
          visitedMaybe === undefined
            ? tileMaybe
            : DirectionToArrow[visitedMaybe]
        );
      }
    }

    printLines.push(printLine.join("").trimEnd());
  }

  console.log(printLines.join("\n"));

  const row = position.y + 1; // We are 0 indexed,
  const column = position.x + 1; // We are 0 indexed
  const facingValue = ArrowToFacingValue[DirectionToArrow[prevFacing]];

  return {
    rawPosition: position,
    row,
    column,
    facingValue,
    answer: 1000 * row + 4 * column + facingValue,
  };
};

console.log(`part 1 = ${solve().answer}`);

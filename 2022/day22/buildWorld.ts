import { Point } from "utilities/space";
import { World, WorldTile } from "./types";

function assertIsWorldTile(input: string): asserts input is WorldTile {
  if (input === "." || input === "#") {
    return;
  }

  throw new Error(`"${input}" is not a world tile`);
}

const buildWorld = (
  mapLines: Readonly<string[]>
): {
  startPos: Readonly<Point>;
  world: World;
} => {
  const world = new Map<string, WorldTile>();
  let startPos: Point = null;
  let y = 0;

  for (const line of mapLines) {
    const chars = line.split("");
    let x = 0;

    for (const char of chars) {
      if (char !== " ") {
        assertIsWorldTile(char);
        world.set(`${x},${y}`, char);

        if (startPos === null) {
          startPos = { x, y };
        }
      }

      ++x;
    }
    ++y;
  }

  if (startPos === null) {
    throw new Error("Failed to set a start position");
  }

  return { startPos, world };
};

export default buildWorld;

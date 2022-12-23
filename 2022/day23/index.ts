import { Direction, Point } from "utilities/space";
import { Day23Input } from "./input";

const input = Day23Input;

const elfPositions = new Set<string>();

const resetInput = () => {
  elfPositions.clear();
  input.forEach((line, rowIndex) => {
    const characters = line.split("");
    characters.forEach((character, columnIndex) => {
      if (character === "#") {
        elfPositions.add(`${columnIndex},${rowIndex}`);
      }
    });
  });
};

const getDimensions = () => {
  const coords = Array.from(elfPositions.keys());

  const [firstX, firstY] = coords[0].split(",").map(Number);

  let leftMost = firstX;
  let rightMost = firstX;
  let topMost = firstY;
  let bottomMost = firstY;

  coords.forEach((str) => {
    const [x, y] = str.split(",").map(Number);
    leftMost = Math.min(leftMost, x);
    rightMost = Math.max(rightMost, x);
    topMost = Math.min(topMost, y);
    bottomMost = Math.max(bottomMost, y);
  });

  return {
    bottomMost,
    leftMost,
    rightMost,
    topMost,
    width: rightMost - leftMost + 1,
    height: bottomMost - topMost + 1,
  };
};

const hasAnAdjacentElf = (elf: Readonly<Point>) => {
  const surroundingPoints: Point[] = [
    { x: elf.x - 1, y: elf.y - 1 },
    { x: elf.x, y: elf.y - 1 },
    { x: elf.x + 1, y: elf.y - 1 },

    { x: elf.x - 1, y: elf.y },
    { x: elf.x + 1, y: elf.y },

    { x: elf.x - 1, y: elf.y + 1 },
    { x: elf.x, y: elf.y + 1 },
    { x: elf.x + 1, y: elf.y + 1 },
  ];

  return surroundingPoints.some(({ x, y }) => {
    return elfPositions.has(`${x},${y}`);
  });
};

const isElf = (x: number, y: number) => {
  return elfPositions.has(`${x},${y}`);
};

const isEmpty = (x: number, y: number) => {
  return !isElf(x, y);
};

const getProposedPoint = (
  elf: Readonly<Point>,
  order: Readonly<Direction[]>
): Point => {
  const { x, y } = elf;

  for (let i = 0; i < order.length; ++i) {
    switch (order[i]) {
      case "N":
        {
          if (
            // north
            isEmpty(x, y - 1) &&
            // north east
            isEmpty(x + 1, y - 1) &&
            // north west
            isEmpty(x - 1, y - 1)
          ) {
            // Move north one step
            return { x, y: y - 1 };
          }
        }
        break;
      case "S":
        {
          if (
            // south
            isEmpty(x, y + 1) &&
            // south east
            isEmpty(x + 1, y + 1) &&
            // south west
            isEmpty(x - 1, y + 1)
          ) {
            // Move south one step
            return { x, y: y + 1 };
          }
        }
        break;
      case "E":
        {
          if (
            // east
            isEmpty(x + 1, y) &&
            // north east
            isEmpty(x + 1, y - 1) &&
            // south east
            isEmpty(x + 1, y + 1)
          ) {
            // Move east one step
            return { x: x + 1, y };
          }
        }
        break;
      case "W":
        {
          if (
            // west
            isEmpty(x - 1, y) &&
            // north west
            isEmpty(x - 1, y - 1) &&
            // south west
            isEmpty(x - 1, y + 1)
          ) {
            // Move west one step
            return { x: x - 1, y };
          }
        }
        break;
    }
  }

  return elf;
};

const solve = (limit: number) => {
  resetInput();

  const order: Direction[] = ["N", "S", "W", "E"];
  for (let round = 0; round < limit; ++round) {
    let movedAnElf = false;

    const allElfCoords = Object.freeze(
      Array.from(elfPositions.keys()).map((coords): Point => {
        const [x, y] = coords.split(",").map(Number);
        return {
          x,
          y,
        };
      })
    );

    // Coordinate "x,y" to list of elf indexes wanting to move to that spot
    const proposals = new Map<string, number[]>();

    allElfCoords.forEach((elf, elfIndex) => {
      if (hasAnAdjacentElf(elf)) {
        const proposedMove = getProposedPoint(elf, order);
        const proposedKey = `${proposedMove.x},${proposedMove.y}`;

        const existingList = proposals.get(proposedKey);
        if (existingList === undefined) {
          proposals.set(proposedKey, [elfIndex]);
        } else {
          existingList.push(elfIndex);
        }
      }
    });

    proposals.forEach((elfIndexes, coords) => {
      if (elfIndexes.length === 1) {
        // Only the one elf moving to this coordinate, allow it
        // - delete existing position
        const currentPosition = allElfCoords[elfIndexes[0]];
        elfPositions.delete(`${currentPosition.x},${currentPosition.y}`);
        // - set new position
        elfPositions.add(coords);
        // - mark that a move happened this round
        movedAnElf = true;
      }
    });

    // end of turn, move first step to be last
    const shifted = order.shift();
    order.push(shifted);

    if (!movedAnElf) {
      // Part 2 return point, no elf moved this round
      return round + 1;
    }
  }

  const { width, height } = getDimensions();
  const area = width * height;
  const elfCount = elfPositions.size;
  const answer = area - elfCount;

  // Part 1 return point
  return answer;
};

const part1 = solve(10);
const part2 = solve(Number.MAX_SAFE_INTEGER);

console.log({
  part1,
  part2,
});

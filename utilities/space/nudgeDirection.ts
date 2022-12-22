import { Direction, Point } from "./types";

export const nudgeDirection = (
  currentPosition: Readonly<Point>,
  direction: Direction
): Readonly<Point> => {
  const { x, y } = currentPosition;

  switch (direction) {
    case "E":
      return { x: x + 1, y };
    case "W":
      return { x: x - 1, y };
    case "N":
      return { x, y: y - 1 };
    case "S":
      return { x, y: y + 1 };
  }
};

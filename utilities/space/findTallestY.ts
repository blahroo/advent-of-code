import { Point } from "./types";

type HasY = Pick<Point, "y">;

export const findTallestY = (points: Readonly<Array<HasY>>): number => {
  if (points.length === 0) {
    throw new Error("Received an empty array");
  }

  return points.reduce((tallest, { y }) => {
    return Math.max(y, tallest);
  }, points[0].y);
};

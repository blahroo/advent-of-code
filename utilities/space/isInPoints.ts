import { Point } from "./types";

export const isInPoints = (
  points: Readonly<Array<Readonly<Point>>>,
  x: number,
  y: number
) => {
  return points.some((point) => point.x === x && point.y === y);
};

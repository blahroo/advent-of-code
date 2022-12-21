import { Point } from "./types";

export const movePoints = (
  points: Readonly<Array<Readonly<Point>>>,
  offset: Readonly<Point>
): Point[] => {
  return points.map((point) => ({
    x: point.x + offset.x,
    y: point.y + offset.y,
  }));
};

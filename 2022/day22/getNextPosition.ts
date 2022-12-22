import { Direction, nudgeDirection, Point } from "utilities/space";
import { World } from "./types";

const getPositionAcrossTheVoid = (
  world: World,
  currentPosition: Readonly<Point>,
  direction: Direction
): Readonly<Point> => {
  if (direction === "E") {
    let position: Point = { x: 0, y: currentPosition.y };

    // tried to move right, hit the void, so we search from x=0 until world is hit
    while (true) {
      const tile = world.get(`${position.x},${position.y}`);
      if (tile !== undefined) {
        return position;
      }

      // Still in the void, keep moving right
      position.x = position.x + 1;
    }
  }

  if (direction === "W") {
    let position: Point = { x: currentPosition.x, y: currentPosition.y };

    // tried to move left, hit the void, so we search right until we find the last world tile
    while (true) {
      const tile = world.get(`${position.x + 1},${position.y}`);
      if (tile === undefined) {
        // Next tile would be void, so current position is the east most world tile
        return position;
      }

      // Still on the map, keep moving right
      position.x = position.x + 1;
    }
  }

  if (direction === "S") {
    let position: Point = { x: currentPosition.x, y: 0 };

    // tried to move down, hit the void, so search from top of the world down until we find world
    while (true) {
      const tile = world.get(`${position.x},${position.y}`);
      if (tile !== undefined) {
        return position;
      }

      // Still in the void, keep moving down
      position.y = position.y + 1;
    }
  }

  // Direction is north
  let position: Point = { x: currentPosition.x, y: currentPosition.y };

  // tried to move up, hit the void, so we search down until we find the last world tile
  while (true) {
    const tile = world.get(`${position.x},${position.y + 1}`);
    if (tile === undefined) {
      // Next tile would be void, so current position is the bottom most world tile
      return position;
    }

    // Still on the map, keep moving down
    position.y = position.y + 1;
  }
};

const getNextPosition = (
  world: World,
  currentPosition: Readonly<Point>,
  direction: Direction
): Readonly<Point> => {
  const optimisticNext = nudgeDirection(currentPosition, direction);
  const optimisticValue = world.get(`${optimisticNext.x},${optimisticNext.y}`);

  const nextCandidate =
    optimisticValue === undefined
      ? getPositionAcrossTheVoid(world, currentPosition, direction)
      : optimisticNext;

  const tile = world.get(`${nextCandidate.x},${nextCandidate.y}`);
  if (tile === ".") {
    // Destination is a free space, valid to move into
    return nextCandidate;
  }

  if (tile === "#") {
    // Destination is in the world but is solid, return current position
    return currentPosition;
  }

  throw new Error(
    `Expected to find a world tile at ${nextCandidate.x},${nextCandidate.y}`
  );
};

export default getNextPosition;

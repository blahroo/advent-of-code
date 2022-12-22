import { Direction } from "./types";

export const turnTo = (facing: Direction, turnTo: "L" | "R"): Direction => {
  switch (facing) {
    case "E":
      return turnTo === "L" ? "N" : "S";
    case "N":
      return turnTo === "L" ? "W" : "E";
    case "S":
      return turnTo === "L" ? "E" : "W";
    case "W":
      return turnTo === "L" ? "S" : "N";
  }
};

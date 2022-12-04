import { Day02Input } from "./input";

type Shape = "rock" | "paper" | "scissors";
type Outcome = "win" | "lose" | "draw";

const LookupShape: Record<string, Shape> = {
  A: "rock",
  B: "paper",
  C: "scissors",
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const DesiredOutcomeLookup: Record<string, Outcome> = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

const LookupShapeScore: Record<Shape, number> = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

const LookupOutcomeScore: Record<Outcome, number> = {
  draw: 3,
  lose: 0,
  win: 6,
};

const parseShape = (play: string): Shape => {
  const maybe = LookupShape[play];
  if (maybe === undefined) {
    throw new Error(`Invalid input ${play}`);
  }
  return maybe;
};

const parseDesiredOutcome = (play: string): Outcome => {
  const maybe = DesiredOutcomeLookup[play];
  if (maybe === undefined) {
    throw new Error(`Invalid input ${play}`);
  }
  return maybe;
};

const isWin = (ourShape: Shape, opponentShape: Shape): boolean =>
  (ourShape === "paper" && opponentShape === "rock") ||
  (ourShape === "rock" && opponentShape === "scissors") ||
  (ourShape === "scissors" && opponentShape === "paper");

const getOutcome = (ourShape: Shape, opponentShape: Shape): Outcome => {
  if (ourShape === opponentShape) {
    return "draw";
  }

  return isWin(ourShape, opponentShape) ? "win" : "lose";
};

const findMoveForOutcome = (
  opponentShape: Shape,
  desiredOutcome: Outcome
): Shape => {
  if (desiredOutcome === "draw") {
    return opponentShape;
  }

  const shapes: Shape[] = ["paper", "rock", "scissors"];
  for (const proposal of shapes) {
    if (desiredOutcome === getOutcome(proposal, opponentShape)) {
      return proposal;
    }
  }

  throw new Error(`Did not find an outcome ${opponentShape} ${desiredOutcome}`);
};

const calculateScore = (shape: Shape, outcome: Outcome) =>
  LookupOutcomeScore[outcome] + LookupShapeScore[shape];

const getRoundScore = (opponentShape: Shape, ourShape: Shape) => {
  const outcome = getOutcome(ourShape, opponentShape);
  return calculateScore(ourShape, outcome);
};

let part1TotalScore = 0;
let part2TotalScore = 0;

for (const line of Day02Input) {
  const plays = line.split(" ");

  const opponentShape = parseShape(plays[0]);
  part1TotalScore += getRoundScore(opponentShape, parseShape(plays[1]));

  const desiredOutcome = parseDesiredOutcome(plays[1]);
  const shapeToPlay = findMoveForOutcome(opponentShape, desiredOutcome);
  part2TotalScore += calculateScore(shapeToPlay, desiredOutcome);
}

console.log({
  part1TotalScore,
  part2TotalScore,
});

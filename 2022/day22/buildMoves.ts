type TurnTo = "L" | "R";

type Move = {
  totalSteps: number;
  turnTo: TurnTo;
};

function assertIsValidTurnTo(input: string): asserts input is TurnTo {
  if (input === "L" || input === "R") {
    return;
  }

  throw new Error(`"${input}" is not a turn to`);
}

const buildMoves = (moveLine: string): Readonly<Array<Readonly<Move>>> => {
  const output: Move[] = [];
  const rawMoves = moveLine.split("");

  // There is no final turn in the input, however it's easier to parse if there is
  // so add here with any direction
  rawMoves.push("L");

  while (rawMoves.length) {
    const partsOfNumber: string[] = [rawMoves.shift()];

    while (rawMoves[0] >= "0" && rawMoves[0] <= "9") {
      partsOfNumber.push(rawMoves.shift());
    }

    const totalSteps = Number(partsOfNumber.join(""));

    const turnTo = rawMoves.shift();
    assertIsValidTurnTo(turnTo);

    output.push(
      Object.freeze<Move>({
        totalSteps,
        turnTo,
      })
    );
  }

  return Object.freeze(output);
};

export default buildMoves;

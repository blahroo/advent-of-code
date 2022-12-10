import { Day10Input } from "./input";

type Instruction = "noop" | "addx";

const CyclesToCompleteLookup: Record<Instruction, number> = {
  addx: 2,
  noop: 1,
};

function assertIsInstruction(maybe: string): asserts maybe is Instruction {
  if (maybe === "noop" || maybe === "addx") {
    return;
  }

  throw new Error(`Not a valid instruction - "${maybe}"`);
}

const decodeInstruction = (line: string): [Instruction, string | undefined] => {
  const [instruction, parameter] = line.split(" ");

  assertIsInstruction(instruction);

  return [instruction, parameter];
};

let registerX = 1;
let cycle = 1;

const CycleToSignalStrength: Record<number, number> = {};

type Pixel = " " | "█";
const allPixels: Pixel[] = [];

let crtPosition = 0;
const startCycle = () => {
  if (crtPosition >= registerX - 1 && crtPosition <= registerX + 1) {
    allPixels.push("█");
  } else {
    allPixels.push(" ");
  }

  ++crtPosition;
  if (crtPosition === 40) {
    crtPosition = 0;
  }
};

const endCycle = () => {
  ++cycle;
  CycleToSignalStrength[cycle] = registerX * cycle;
  startCycle();
};

startCycle();
for (const line of Day10Input) {
  const [instruction, parameter] = decodeInstruction(line);
  const cyclesToFinish = CyclesToCompleteLookup[instruction];

  // Burn cycles
  for (let burnIndex = 0; burnIndex < cyclesToFinish - 1; ++burnIndex) {
    endCycle();
  }

  if (instruction === "addx") {
    const offset = Number(parameter);
    registerX += offset;
  }

  endCycle();
}

const sum =
  CycleToSignalStrength[20] +
  CycleToSignalStrength[60] +
  CycleToSignalStrength[100] +
  CycleToSignalStrength[140] +
  CycleToSignalStrength[180] +
  CycleToSignalStrength[220];

const screen = [
  allPixels.slice(0, 40).join(""),
  allPixels.slice(40, 80).join(""),
  allPixels.slice(80, 120).join(""),
  allPixels.slice(120, 160).join(""),
  allPixels.slice(160, 200).join(""),
  allPixels.slice(200, 240).join(""),
];

console.log({
  sum,
  screen,
});

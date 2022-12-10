import { Day10Input } from "./input";

const lines = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`.split("\n");

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

let registerX = 1;
let cycle = 1;

const CycleToSignalStrength: Record<number, number> = {};

const endCycle = () => {
  ++cycle;
  CycleToSignalStrength[cycle] = registerX * cycle;
};

const decodeInstruction = (line: string): [Instruction, string | undefined] => {
  const [instruction, parameter] = line.split(" ");

  assertIsInstruction(instruction);

  return [instruction, parameter];
};

for (const line of Day10Input) {
  const [instruction, parameter] = decodeInstruction(line);
  const cyclesToFinish = CyclesToCompleteLookup[instruction];

  // Burn cycles
  for (let burnIndex = 0; burnIndex < cyclesToFinish - 1; ++burnIndex) {
    endCycle();
  }

  if (instruction === "addx") {
    const offset = Number(parameter);
    console.log(`[${parameter}]  ${offset}`);
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

console.log({
  20: CycleToSignalStrength[20],
  60: CycleToSignalStrength[60],
  100: CycleToSignalStrength[100],
  140: CycleToSignalStrength[40],
  180: CycleToSignalStrength[180],
  220: CycleToSignalStrength[220],
  sum,
});

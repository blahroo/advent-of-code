const memory: number[] = require('fs')
    .readFileSync('2019/day02/input.txt').toString()
    .split(",")
    .map((str: string) => Number.parseInt(str));

// BEFORE RUNNING replace position 1 with the value 12 and replace position 2 with the value 2.
memory[1] = 12;
memory[2] = 2;

let programCounter = 0;
let opCode: number = memory[0];

const performOperation = (opCode: number, inputA: number, inputB: number): number => {
    switch (opCode) {
        case 1:
            return inputA + inputB;
        case 2:
            return inputA * inputB;
    }

    throw new Error("Unknown opCode: " + opCode);
}

while (opCode !== 99) {
    const inputPositionA = memory[programCounter + 1];
    const inputPositionB = memory[programCounter + 2];
    const outputPosition = memory[programCounter + 3];

    memory[outputPosition] = performOperation(opCode, memory[inputPositionA], memory[inputPositionB]);

    programCounter += 4;
    opCode = memory[programCounter];
}

console.log("Part 1: " + memory[0])
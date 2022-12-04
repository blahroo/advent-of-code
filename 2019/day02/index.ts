const memory: number[] = require('fs')
    .readFileSync('2019/day02/input.txt').toString()
    .split(",")
    .map((str: string) => Number.parseInt(str));

// BEFORE RUNNING replace position 1 with the value 12 and replace position 2 with the value 2.
memory[1] = 12;
memory[2] = 2;

let instructionPointer = 0;
let opCode: number = memory[0];

const performOperation = (opCode: number, parameterA: number, parameterB: number): number => {
    switch (opCode) {
        case 1:
            return parameterA + parameterB;
        case 2:
            return parameterA * parameterB;
    }

    throw new Error("Unknown opCode: " + opCode);
}

while (opCode !== 99) {
    const parameterAddressA = memory[instructionPointer + 1];
    const parameterAddressB = memory[instructionPointer + 2];
    const outputAddress = memory[instructionPointer + 3];

    memory[outputAddress] = performOperation(opCode, memory[parameterAddressA], memory[parameterAddressB]);

    instructionPointer += 4;
    opCode = memory[instructionPointer];
}

console.log("Part 1: " + memory[0]);

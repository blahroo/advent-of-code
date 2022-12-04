const day5Program: number[] = require('fs')
    .readFileSync('2019/day02/input.txt').toString()
    .split(",")
    .map(Number);

const OPERATION_ADD = 1;
const OPERATION_MULTIPLY = 2;
const OPERATION_TERMINATE = 99;
type Operation = 1 | 2 | 99;

const PARAMETER_MODE_POSITION = 0;
const PARAMETER_MODE_IMMEDIATE = 1;
type ParameterMode = 0 | 1;

const performOperation = (opCode: Operation, parameterA: number, parameterB: number): number => {
    switch (opCode) {
        case OPERATION_ADD:
            return parameterA + parameterB;
        case OPERATION_MULTIPLY:
            return parameterA * parameterB;
    }

    throw new Error("Unknown opCode: " + opCode);
}

const extractOperation = (opCode: number): Operation => {
    const output = opCode % 100;

    switch (output) {
        case OPERATION_ADD:
        case OPERATION_MULTIPLY:
        case OPERATION_TERMINATE:
            return output;
    }

    throw new Error("Unknown operation: " + output + " for opcode: " + opCode);
};

const getParameterModesForOpCode = (opCode: number): ParameterMode[] => {
    const stringified = opCode.toString();

    if (stringified.length <= 2) {
        // Operation is 2 digits, can't have any parameter modes
        return [];
    }

    const withoutOpCode = stringified
        .substring(0, stringified.length - 2)
        .split("")
        .reverse()
        .map(Number);

    withoutOpCode.forEach((parameterMode) => {
        switch (parameterMode) {
            case PARAMETER_MODE_IMMEDIATE:
            case PARAMETER_MODE_POSITION:
                break;
            default: throw new Error("Unknown parameter mode: " + parameterMode);
        }
    });

    return withoutOpCode as ParameterMode[];
};

console.log(`Parameter modes for 1002: ${getParameterModesForOpCode(1002)}`);

const getOperationSize = (operation: Operation): number => {
    switch (operation) {
        case OPERATION_ADD:
        case OPERATION_MULTIPLY:
            return 4;
        case OPERATION_TERMINATE:
            return 1;
        default:
            throw new Error("Unknown operation: " + operation);
    }
};

const executeProgram = (rawProgram: number[]) => {
    const memory: number[] = rawProgram.map(n => n);

    let instructionPointer = 0;
    let opCode: number = memory[0];

    while (opCode !== OPERATION_TERMINATE) {
        const parameterModes = getParameterModesForOpCode(opCode);
        const operation = extractOperation(opCode);
        const operationSize = getOperationSize(operation);

        const parameterAddressA = memory[instructionPointer + 1];
        const parameterAddressB = memory[instructionPointer + 2];
        const outputAddress = memory[instructionPointer + 3];

        memory[outputAddress] = performOperation(operation, memory[parameterAddressA], memory[parameterAddressB]);

        instructionPointer += operationSize;
        opCode = memory[instructionPointer];
    }

    return memory[0];
};

console.log("Output = " + executeProgram([1,9,10,3,2,3,11,0,99,30,40,50]));

export {}

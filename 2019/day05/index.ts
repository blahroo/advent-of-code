const day5Program: number[] = require('fs')
    .readFileSync('2019/day02/input.txt').toString()
    .split(",")
    .map(Number);

const OPERATION_ADD = 1;
const OPERATION_MULTIPLY = 2;
const OPERATION_TAKE_INPUT = 3;
const OPERATION_PRINT = 4;
const OPERATION_TERMINATE = 99;
type Operation = 1 | 2 | 3 | 4 | 99;

const PARAMETER_MODE_POSITION = 0;
const PARAMETER_MODE_IMMEDIATE = 1;
type ParameterMode = 0 | 1;

const takeNextInput = () => {
    return 1;
}

const safeGetParameter = (index: number, parameters: number[]): number => {
    if (parameters.length <= index) {
        throw new Error("Tried to read non exising parameter at index: " + index + ", parameters are: " + parameters.join(","));
    }

    return parameters[index];
}

const performOperation = (opCode: Operation, parameters: number[]): number | null => {
    switch (opCode) {
        case OPERATION_ADD:
            return safeGetParameter(0, parameters) + safeGetParameter(1, parameters);
        case OPERATION_MULTIPLY:
            return safeGetParameter(0, parameters) * safeGetParameter(1, parameters);
        case OPERATION_TAKE_INPUT:
            return takeNextInput();
        case OPERATION_PRINT: {
            console.log(safeGetParameter(0, parameters));
            return null;
        };
    }

    throw new Error("Unknown opCode: " + opCode);
}

const extractOperation = (opCode: number): Operation => {
    const output = opCode % 100;

    switch (output) {
        case OPERATION_ADD:
        case OPERATION_MULTIPLY:
        case OPERATION_TAKE_INPUT:
        case OPERATION_PRINT:
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

const getOperationSize = (operation: Operation): number => {
    switch (operation) {
        case OPERATION_ADD:
        case OPERATION_MULTIPLY:
            return 4;
        case OPERATION_TAKE_INPUT:
            return 2;
        case OPERATION_PRINT:
            return 2;
        case OPERATION_TERMINATE:
            return 1;
        default:
            throw new Error("Unknown operation: " + operation);
    }
};

const getTotalParameters = (operation: Operation): number => {
    return Math.max(0, getOperationSize(operation) - 2);
}

const executeProgram = (rawProgram: number[]) => {
    const memory: number[] = rawProgram.map(n => n);

    let instructionPointer = 0;
    let opCode: number = memory[0];

    while (opCode !== OPERATION_TERMINATE) {
        const parameterModes = getParameterModesForOpCode(opCode);
        const operation = extractOperation(opCode);
        const operationSize = getOperationSize(operation);

        const totalParameters = getTotalParameters(operation);

        const parameters: number[] = [];
        for (let i = 0; i < totalParameters; ++i) {
            const address = memory[instructionPointer + 1 + i];
            const value = memory[address];

            parameters.push(value);
        }

        const operationOutput = performOperation(operation, parameters);
        if (operationOutput !== null) {
            const outputAddress = memory[instructionPointer + totalParameters + 1];
            memory[outputAddress] = operationOutput;
        }

        instructionPointer += operationSize;
        opCode = memory[instructionPointer];
    }

    return memory[0];
};

console.log("Output = " + executeProgram([1,9,10,3,2,3,11,0,99,30,40,50]));

export {}

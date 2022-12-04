const day5Program: number[] = require('fs')
    .readFileSync('2019/day05/input.txt').toString()
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
        case OPERATION_ADD: {
            const p1 = safeGetParameter(0, parameters);
            const p2 = safeGetParameter(1, parameters);
            const output = p1 + p2;

            console.log(`ADD ${p1} and ${p2} = ${output}`);

            return output;
        }
        case OPERATION_MULTIPLY: {
            const p1 = safeGetParameter(0, parameters);
            const p2 = safeGetParameter(1, parameters);
            const output = p1 * p2;

            console.log(`MULTIPLY ${p1} and ${p2} = ${output}`);

            return output;
        }
        case OPERATION_TAKE_INPUT:
            console.log("Taking input")
            return takeNextInput();
        case OPERATION_PRINT: {
            console.log(`Output: ${safeGetParameter(0, parameters)}`);
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
            // Base size, 2 inputs, 1 destination
            return 4;
        case OPERATION_TAKE_INPUT:
            // Base size, 0 inputs, 1 destination
            return 2;
        case OPERATION_PRINT:
            // Base size, 1 input, 0 destination
            return 2;
        case OPERATION_TERMINATE:
            // Base size, 0 input, 0 destination
            return 1;
        default:
            throw new Error("Unknown operation: " + operation);
    }
};

const getTotalParameters = (operation: Operation): number => {
    switch (operation) {
        case OPERATION_ADD:
        case OPERATION_MULTIPLY:
            return 2;
        case OPERATION_PRINT:
            return 1;
        case OPERATION_TERMINATE:
        case OPERATION_TAKE_INPUT:
            return 0;
        default:
            throw new Error("Unknown operation: " + operation);
    }
}

const executeProgram = (rawProgram: number[]) => {
    const memory: number[] = rawProgram.map(n => n);

    let instructionPointer = 0;
    let opCode: number = memory[0];

    let cycle = 0;

    while (opCode !== OPERATION_TERMINATE) {

        console.log(`\n\n***Performing cycle ${++cycle} ***`);


        const parameterModes = getParameterModesForOpCode(opCode);
        const operation = extractOperation(opCode);
        const operationSize = getOperationSize(operation);

        const totalParameters = getTotalParameters(operation);
        console.log(`Expecting ${totalParameters} parameter${totalParameters == 1 ? "." : "s."}`);

        const parameters: number[] = [];
        for (let i = 0; i < totalParameters; ++i) {
            let parameterMode = parameterModes[i] || PARAMETER_MODE_POSITION;

            const address = memory[instructionPointer + 1 + i];
            const value = (parameterMode == PARAMETER_MODE_IMMEDIATE) ? address : memory[address];

            parameters.push(value);
        }

        const operationOutput = performOperation(operation, parameters);
        if (operationOutput !== null) {
            const outputAddress = memory[instructionPointer + totalParameters + 1];
            console.log(`Storing ${operationOutput} to address ${outputAddress}`);
            memory[outputAddress] = operationOutput;
        }

        instructionPointer += operationSize;
        opCode = memory[instructionPointer];
    }

    return memory[0];
};

console.log("Output = " + executeProgram(day5Program));

// 152702 Too low

export {}

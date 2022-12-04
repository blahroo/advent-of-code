const program: number[] = require('fs')
    .readFileSync('2019/day02/input.txt').toString()
    .split(",")
    .map((str: string) => Number.parseInt(str));

const performOperation = (opCode: number, parameterA: number, parameterB: number): number => {
    switch (opCode) {
        case 1:
            return parameterA + parameterB;
        case 2:
            return parameterA * parameterB;
    }

    throw new Error("Unknown opCode: " + opCode);
}

const resetAndExecute = (noun = 12, verb = 2) => {
    const memory: number[] = program.map(n => n);

    // BEFORE RUNNING replace position 1 with the noun and replace position 2 with the verb.
    memory[1] = noun;
    memory[2] = verb;

    let instructionPointer = 0;
    let opCode: number = memory[0];

    while (opCode !== 99) {
        const parameterAddressA = memory[instructionPointer + 1];
        const parameterAddressB = memory[instructionPointer + 2];
        const outputAddress = memory[instructionPointer + 3];

        memory[outputAddress] = performOperation(opCode, memory[parameterAddressA], memory[parameterAddressB]);

        instructionPointer += 4;
        opCode = memory[instructionPointer];
    }

    return memory[0];
}

console.log("Part 1: " + resetAndExecute());

class FoundResult extends Error {
    constructor(private noun: number, private verb: number) {
        super(`Found result. noun=${noun}, verb=${verb}`);
    }

    get answer(): number {
        return 100 * this.noun + this.verb;
    }
}

try {
    for (let noun = 0; noun <= 99; ++noun) {
        for (let verb = 0; verb <= 99; ++verb) {
            if (19690720 === resetAndExecute(noun, verb)) {
                throw new FoundResult(noun, verb);
            }
        }
    }

    throw new Error("Did not find expected result");
} catch (e) {
    if (e instanceof FoundResult) {
        console.log("Part 2: " + e.answer);
    } else {
        throw e;
    }
}

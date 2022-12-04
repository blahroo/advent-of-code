const rawInput = require('fs')
    .readFileSync('2019/day03/input.txt').toString()

const testInput = "R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51\nU98,R91,D20,R16,D67,R40,U7,R15,U6,R7";

const instructionLists =
    rawInput
    .split("\n");

const allVisitedLocations: Set<string> = new Set();
const allCollisions: Set<string> = new Set();

const createCoordinatesString = (xPos: number, yPos: number) => `${xPos},${yPos}`;

const timings: Map<string, number>[] = instructionLists.map( (instructionList, wireNumber): Map<string, number> => {
    const instructions = instructionList.split(",");

    let positionCounter = 0;

    let xPos: number = 0;
    let yPos: number = 0;

    const allVisitedLocationsBeforeThisWireExisted = new Set(allVisitedLocations);
    const outputTimings = new  Map<string, number>();

    instructions.forEach( (instruction, instructionNumber) => {
        const instructionType = instruction.split("")[0];
        const instructionTotalTimes = Number(instruction.substring(1));

        let xStep = 0;
        let yStep = 0;

        switch (instructionType) {
            case "U": yStep = 1; break;
            case "D": yStep = -1; break;
            case "L": xStep = -1; break;
            case "R": xStep = 1; break;
            default: throw new Error("Unknown instruction type " + instructionType);
        }

        for (let instructionIteration = 0; instructionIteration < instructionTotalTimes; ++instructionIteration) {
            xPos = xPos + xStep;
            yPos = yPos + yStep;

            const asCoordinatesString = createCoordinatesString(xPos, yPos);

            if (allVisitedLocationsBeforeThisWireExisted.has(asCoordinatesString)) {
                allCollisions.add(asCoordinatesString);
            }
            allVisitedLocations.add(asCoordinatesString);
            outputTimings.set(asCoordinatesString, ++positionCounter);
        }
    });

    return outputTimings;
});

if (timings.length !== 2) {
    throw new Error("Expecting only two wires");
}

console.log(`Total collisions = ${allCollisions.size}.`);

const manhattanDistance = (x0: number, y0: number, x1: number, y1: number) => Math.abs(x1-x0) + Math.abs(y1-y0);

const wireTimingsA = timings[0];
const wireTimingsB = timings[1];

let shortestDistance = Infinity;
let shortestDelay = Infinity;

allCollisions.forEach(collidingPoint => {
    const brokenDown = collidingPoint.split(",");
    const collisionX = Number(brokenDown[0]);
    const collisionY = Number(brokenDown[1]);

    const distance = manhattanDistance(0, 0, collisionX, collisionY);
    if (distance < shortestDistance) {
        shortestDistance = distance;
    }

    const delayA = wireTimingsA.get(collidingPoint);
    const delayB = wireTimingsB.get(collidingPoint);

    const totalDelay = delayA + delayB;
    if (totalDelay < shortestDelay) {
        shortestDelay = totalDelay;
    }
});

console.log("Shortest distance is: " + shortestDistance);
console.log("Shortest delay is: " + shortestDelay);

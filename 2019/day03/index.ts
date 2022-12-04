const rawInput = require('fs')
    .readFileSync('2019/day03/input.txt').toString()

const testInput = "R75,D30,R83,U83,L12,D49,R71,U7,L72\nU62,R66,U55,R34,D71,R55,D58,R83";

const instructionLists =
    rawInput
    .split("\n");

const allVisitedLocations: Set<String> = new Set();
const allCollisions: Set<String> = new Set();

const createCoordinatesString = (xPos: number, yPos: number) => `${xPos},${yPos}`;

instructionLists.forEach( (instructionList, wireNumber) => {
    const instructions = instructionList.split(",");

    let xPos: number = 0;
    let yPos: number = 0;

    const allVisitedLocationsBeforeThisWireExisted = new Set(allVisitedLocations);

    instructions.forEach(instruction => {
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
        }
    });

    console.log(`Wire number ${wireNumber}, there are ${allCollisions.size} collisions`);
});

console.log(`Total collisions = ${allCollisions.size}.`);

const manhattanDistance = (x0: number, y0: number, x1: number, y1: number) => Math.abs(x1-x0) + Math.abs(y1-y0);

let shortestDistance = Infinity;
allCollisions.forEach(collidingPoint => {
    const brokenDown = collidingPoint.split(",");
    const collisionX = Number(brokenDown[0]);
    const collisionY = Number(brokenDown[1]);

    const distance = manhattanDistance(0, 0, collisionX, collisionY);
    if (distance < shortestDistance) {
        shortestDistance = distance;
    }
});

console.log("Shortest distance is: " + shortestDistance);

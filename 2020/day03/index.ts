const rawInput: string = require('fs')
    .readFileSync('2020/day03/input.txt')
    .toString()

const rows = rawInput.split("\n");
const rowWidth = rows[0].length;

function countTreesUsingRoute(xOffset: number, yOffset: number) {
    let xPos = 0;
    let treesSeen = 0;

    for (let yPos = 0; yPos < rows.length; yPos += yOffset) {
        const charAtPosition = rows[yPos].charAt(xPos);
        if (charAtPosition === "#") {
            ++treesSeen;
        }
        xPos = (xPos + xOffset) % (rowWidth - 1);
    }

    return treesSeen;
}

const routeR3D1 = countTreesUsingRoute(3, 1);
console.log(`Part 1: Saw ${routeR3D1} trees`); // 7 demo, 237 part 1

const routeR1D1 = countTreesUsingRoute(1, 1);
const routeR5D1 = countTreesUsingRoute(5, 1);
const routeR7D1 = countTreesUsingRoute(7, 1);
const routeR1D2 = countTreesUsingRoute(1, 2);

console.log("Right 1, down 1. " + routeR1D1);
console.log("Right 3, down 1. " + routeR3D1);
console.log("Right 5, down 1. " + routeR5D1);
console.log("Right 7, down 1. " + routeR7D1);
console.log("Right 1, down 2. " + routeR1D2);

console.log("Part 2: Trees seen = " + (routeR1D1 * routeR3D1 * routeR5D1 * routeR7D1 * routeR1D2)); // 2106818610

export {};

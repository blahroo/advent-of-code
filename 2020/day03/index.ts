const rawInput: string = require('fs')
    .readFileSync('2020/day03/input.txt')
//    .readFileSync('2020/day03/exampleInput.txt')
    .toString()

const rows = rawInput.split("\n");
const rowWidth = rows[0].length;

let treesSeen = 0;
let xPos = 0;

rows.forEach((row, yPos) => {

    const charAtThisPoint = row.charAt(xPos);
    console.log(`x: ${xPos}, y: ${yPos} = ${charAtThisPoint}`);

    if (charAtThisPoint === '#') {
        ++treesSeen;
    }

    xPos = (xPos + 3) % (rowWidth - 1);
});

console.log(`Saw ${treesSeen} trees`);

export {};

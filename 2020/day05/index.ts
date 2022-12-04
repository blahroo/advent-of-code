const rawInput: string = require('fs')
    .readFileSync('2020/day05/input.txt')
    .toString()
    .replace(/[\r]/g, '');
const rows = rawInput.split("\n");

type NextRegion = "upper" | "lower";

function adaptInstruction(character: string): NextRegion {
    return (character === "F" || character === "L")  ? "lower" : "upper";
}

function adaptInstructions(instructions: string): NextRegion[] {
    return instructions
        .split("")
        .map(adaptInstruction);
}

class RangePartitioner {
    constructor(private lowerValue: number, private higherValue: number) {
    }

    private becomeLowerHalf() {
        const midpoint = Math.floor((this.lowerValue + this.higherValue) / 2);
        this.higherValue = midpoint;
    }

    private becomeHigherHalf() {
        const midpoint = Math.ceil((this.lowerValue + this.higherValue) / 2);
        this.lowerValue = midpoint;
    }

    private partition(takeRegion: NextRegion) {
        if (takeRegion === "lower") {
            this.becomeLowerHalf();
        } else {
            this.becomeHigherHalf();
        }
    }

    public applyPartitionInstructions(instructions: NextRegion[]): number {
        for (let instruction of instructions) {
            this.partition(instruction);
            //console.log(`Took ${instruction} resulting in range: ${this.getValues()}`);
        }

        if (this.lowerValue !== this.higherValue) {
            throw new Error(`Expeted a single number as the higher and lower values, insead has ${this.getValues()}`);
        }

        return this.lowerValue;
    }

    private getValues(): [number, number] {
        return [this.lowerValue, this.higherValue];
    }
}

function getSeatId(row: number, column: number): number {
    return (row * 8) + column;
}

function getSeatRowAndColumn(boardingPass: string): [number, number] {
    const rowInstructions = adaptInstructions(boardingPass.substring(0, 7));
    const rowResult = new RangePartitioner(0, 127).applyPartitionInstructions(rowInstructions);

    const columnInstructions = adaptInstructions(boardingPass.substring(7));
    const columnResult = new RangePartitioner(0, 7).applyPartitionInstructions(columnInstructions);

    return [rowResult, columnResult];
}

function getSeatIdFromBoardingPass(boardingPass: string): number {
    const [rowResult, columnResult] = getSeatRowAndColumn(boardingPass);
    const seatId = getSeatId(rowResult, columnResult);
    //console.log(`row ${rowResult}, column ${columnResult}, seat ID ${seatId}`);

    return seatId;
}

let highestSeatId: number = rows.reduce((runningHighest, boardingPass) => {
    const seatId = getSeatIdFromBoardingPass(boardingPass);

    return Math.max(runningHighest, seatId);
}, 0);

console.log(`Highest seat ID on a boarding pass is ${highestSeatId}`);

const availableSeats = new Set<number>(); // Seat id, coords

for (let rowIndex = 0; rowIndex < 128; ++rowIndex) {
    for (let columnIndex = 0; columnIndex < 8; ++columnIndex) {
        const seatId = getSeatId(rowIndex, columnIndex);
        availableSeats.add(seatId);
    }
}

console.log(`initially ${availableSeats.size} available seats`);

rows.forEach(boardingPass => {
    const coords = getSeatRowAndColumn(boardingPass);
    const [rowResult, columnResult] = coords;
    const seatId = getSeatId(rowResult, columnResult);

    availableSeats.delete(seatId);
});

for (let seatId of availableSeats) {
    if (!availableSeats.has(seatId + 1) && !availableSeats.has(seatId - 1)) {
        console.log(`Your seat id is ${seatId}`);
    }
}

export {};

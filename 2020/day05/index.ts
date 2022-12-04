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

function getSeatIdFromBoardingPass(boardingPass: string): number {
    const rowInstructions = adaptInstructions(boardingPass.substring(0, 7));
    const rowResult = new RangePartitioner(0, 127).applyPartitionInstructions(rowInstructions);

    const columnInstructions = adaptInstructions(boardingPass.substring(7));
    const columnResult = new RangePartitioner(0, 7).applyPartitionInstructions(columnInstructions);

    const seatId = (rowResult * 8) + columnResult;
    //console.log(`row ${rowResult}, column ${columnResult}, seat ID ${seatId}`);

    return seatId;
}

let highestSeatId: number = rows.reduce((runningHighest, boardingPass) => {
    const seatId = getSeatIdFromBoardingPass(boardingPass);

    return Math.max(runningHighest, seatId);
}, 0);

console.log(`Highest seat ID on a boarding pass is ${highestSeatId}`);


export {};

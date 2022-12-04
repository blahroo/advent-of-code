const moduleWeights = require('fs')
    .readFileSync('2019/day01/input.txt').toString()
    .split("\n")
    .map(Number);

const calculateFuelFoMass = (mass: number): number => Math.floor(mass / 3) - 2;
const sumFuels = (runningTotal: number, moduleWeight: number) => runningTotal + moduleWeight;

const totalRequiredFuel = moduleWeights
    .map(calculateFuelFoMass)
    .reduce(sumFuels, 0);

console.log("Part 1: " + totalRequiredFuel);

const calculateTotalFuelWithFuelToLiftFuelForMass = (moduleMass: number): number => {
    let totalFuelRequired = calculateFuelFoMass(moduleMass);
    let fuelToLiftLastFuel = calculateFuelFoMass(totalFuelRequired)

    while (fuelToLiftLastFuel > 0) {
        totalFuelRequired += fuelToLiftLastFuel;
        fuelToLiftLastFuel = calculateFuelFoMass(fuelToLiftLastFuel);
    }

    return totalFuelRequired;
}

const totalFuelWithFuelConsideration = moduleWeights
    .map(calculateTotalFuelWithFuelToLiftFuelForMass)
    .reduce(sumFuels, 0);

console.log("Part 2: " + totalFuelWithFuelConsideration);

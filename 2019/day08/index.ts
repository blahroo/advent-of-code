const input: number[] = require('fs')
    .readFileSync('2019/day08/input.txt')
    .toString()
    .split("")
    .map(Number);

const IMAGE_WIDTH = 25;
const IMAGE_HEIGHT = 6;
const LAYER_DIMENSIONS = IMAGE_WIDTH * IMAGE_HEIGHT;

const totalLayers = input.length / LAYER_DIMENSIONS;
console.log("There will be " + totalLayers + " layers.");

type Layer = number[]
const layers: Layer[] = [];

const countHowManyInLayer = (digit: number, layer: Layer): number => {
    let total = 0;

    layer.forEach(layerDigit => {
        if (layerDigit === digit) {
            ++total;
        }
    });

    return total;
}

let layerWithFewestZeros: Layer = null;
let fewestZeroesSoFar = Infinity;

for (let i = 0; i < totalLayers; ++i) {
    const thisLayer: Layer = [];
    for (let j = 0; j < LAYER_DIMENSIONS; ++j) {
        thisLayer.push(input.shift());
    }

    const totalZeroesInLayer = countHowManyInLayer(0, thisLayer);
    if (totalZeroesInLayer < fewestZeroesSoFar) {
        fewestZeroesSoFar = totalZeroesInLayer;
        layerWithFewestZeros = thisLayer;
    }

    layers.push(thisLayer);
}

const total1s = countHowManyInLayer(1, layerWithFewestZeros);
const total2s = countHowManyInLayer(2, layerWithFewestZeros);
const part1 = total1s * total2s;

console.log(`${total1s} * ${total2s} = ${part1}`);

export {};

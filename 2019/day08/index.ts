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

const COLOUR_WHITE = 1;
const COLOUR_TRANSPARENT = 2;

layers.reverse();
const output: number[] = layers[0].map(n => n);
layers.shift();

const processPixel = (pixel: number, index: number) => {
    if (pixel !== COLOUR_TRANSPARENT) {
        output[index] = pixel;
    }
}

layers.forEach(layer => {
    layer.forEach(processPixel);
});

let message = ""
for (let y = 0; y < IMAGE_HEIGHT; ++y) {
    for (let x = 0; x < IMAGE_WIDTH; ++x) {
        const character = output.shift() == COLOUR_WHITE ? "█" : " ";
        message = message + character;
    }
    message = message + "\n";
}

console.log("Message: \n" + message);

export {};

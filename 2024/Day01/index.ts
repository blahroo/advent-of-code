import * as fs from "fs";
import { add } from "lodash";

// Read and process the file
const data = fs.readFileSync("data.txt", "utf-8");
const lines = data.split("\n");

let column1: number[] = [];
let column2: number[] = [];
let differences: number[] = [];
let similarities: number[] = [];

lines.forEach((line) => {
  const [num1, num2] = line.trim().split(/\s+/);
  column1.push(parseInt(num1, 10));
  column2.push(parseInt(num2, 10));
});

column1 = column1.sort(function (a, b) {
  return a - b;
});

column2 = column2.sort(function (a, b) {
  return a - b;
});

function calculateDifference(arr1: number[], arr2: number[]) {
  for (let step = 0; step < arr1.length; step++) {
    if (arr1[step] > arr2[step]) {
      differences.push(arr1[step] - arr2[step]);
    } else {
      differences.push(arr2[step] - arr1[step]);
    }
  }
  console.log(differences);
}

function addDifference(differences: number[]) {
  let runningTotal = 0;
  differences.forEach((number) => {
    runningTotal += number;
  });
  console.log(runningTotal);
}

function calculateSimilarities(arr1: number[], arr2: number[]) {
  arr1.forEach((arr1Number) => {
    let frequency = 0;
    arr2.forEach((arr2Number) => {
      if (arr1Number === arr2Number) {
        frequency += 1;
      }
    });
    similarities.push(frequency * arr1Number);
  });
  console.log(similarities);
}

console.log("Column 1:", column1);
console.log("Column 2:", column2);

calculateDifference(column1, column2);
addDifference(differences);
calculateSimilarities(column1, column2);
addDifference(similarities);

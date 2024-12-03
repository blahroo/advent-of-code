"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
// Read and process the file
const data = fs.readFileSync("data.txt", "utf-8");
const lines = data.split("\n");
const column1 = [];
const column2 = [];
lines.forEach((line) => {
    const [num1, num2] = line.trim().split(/\s+/);
    column1.push(parseInt(num1, 10));
    column2.push(parseInt(num2, 10));
});
function ascendingOrder(array) {
    array.sort(function (a, b) {
        return a - b;
    });
    return array;
}
function sumArray(inputArray) {
    let runningTotal = 0;
    inputArray.forEach((number) => {
        runningTotal += number;
    });
    console.log(runningTotal);
}
function calculateDifference(arr1, arr2) {
    let differences = [];
    for (let step = 0; step < arr1.length; step++) {
        if (arr1[step] > arr2[step]) {
            differences.push(arr1[step] - arr2[step]);
        }
        else {
            differences.push(arr2[step] - arr1[step]);
        }
    }
    return sumArray(differences);
}
function calculateSimilarities(arr1, arr2) {
    let similarities = [];
    arr1.forEach((arr1Number) => {
        let frequency = 0;
        arr2.forEach((arr2Number) => {
            if (arr1Number === arr2Number) {
                frequency += 1;
            }
        });
        if (frequency != 0) {
            similarities.push(frequency * arr1Number);
        }
    });
    return sumArray(similarities);
}
calculateDifference(ascendingOrder(column1), ascendingOrder(column2));
calculateSimilarities(ascendingOrder(column1), ascendingOrder(column2));
//# sourceMappingURL=index.js.map
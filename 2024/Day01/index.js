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
let column1 = [];
let column2 = [];
let differences = [];
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
function calculateDifference(arr1, arr2) {
    for (let step = 0; step < arr1.length; step++) {
        if (arr1[step] > arr2[step]) {
            differences.push(arr1[step] - arr2[step]);
        }
        else {
            differences.push(arr2[step] - arr1[step]);
        }
    }
    console.log(differences);
}
function addDifference(differences) {
    let runningTotal = 0;
    differences.forEach((number) => {
        runningTotal += number;
    });
    console.log(runningTotal);
}
console.log("Column 1:", column1);
console.log("Column 2:", column2);
calculateDifference(column1, column2);
addDifference(differences);
//# sourceMappingURL=index.js.map
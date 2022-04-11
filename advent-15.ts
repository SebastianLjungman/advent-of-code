// --- Day 15: Chiton ---

// You've almost reached the exit of the cave, but the walls are getting closer together. Your submarine can barely still fit, though; the main problem is that the walls of the cave are covered in chitons, and it would be best not to bump any of them.

// The cavern is large, but has a very low ceiling, restricting your motion to two dimensions. The shape of the cavern resembles a square; a quick scan of chiton density produces a map of risk level throughout the cave (your puzzle input). For example:

// 1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581

// You start in the top left position, your destination is the bottom right position, and you cannot move diagonally. The number at each position is its risk level; to determine the total risk of an entire path, add up the risk levels of each position you enter (that is, don't count the risk level of your starting position unless you enter it; leaving it adds no risk to your total).

// Your goal is to find a path with the lowest total risk. In this example, a path with the lowest total risk is highlighted here:

// 1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581

// The total risk of this path is 40 (the starting position is never entered, so its risk is not counted).

// What is the lowest total risk of any path from the top left to the bottom right?

import PriorityQueue from "ts-priority-queue";

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput15 = 
// `1163751742
// 1381373672
// 2136511328
// 3694931569
// 7463417111
// 1319128137
// 1359912421
// 3125421639
// 1293138521
// 2311944581`


stdinBuffer.toString();

// interface VertexDictionary {
//     [key: number]: Array<string>;
// }

// const verticesList: VertexDictionary = {};

interface Vertex {
    riskLevel: number,
    neighbors: Array<number>
}

const vertices: Array<Vertex> = [];

const puzzleInputArray15: Array<String> = puzzleInput15.split('\n').map(String);
const riskMap: Array<Array<number>> = [];

for (let row = 0; row < puzzleInputArray15.length; row++) {
    let numberRow = [];
    for(let column = 0; column < puzzleInputArray15[row].length; column++) {
        numberRow.push(parseInt(puzzleInputArray15[row][column]));
    }
    riskMap.push(numberRow);
}

riskMap.forEach(row => {
    console.log(...row)
})

let vertexIndex = 0;
for(let row = 0; row < riskMap.length; row++) {
    for(let column = 0; column < riskMap[row].length; column++) {
        const neighbors: Array<number> = [];
        if(riskMap[row] && riskMap[row-1]) {
            neighbors.push(vertexIndex-riskMap[row].length);
        }
        if(riskMap[row] && riskMap[row+1]) {
            neighbors.push(vertexIndex+riskMap[row].length)
        }
        if(riskMap[row] && riskMap[row][column-1]) {
            neighbors.push(vertexIndex-1)
        }
        if(riskMap[row] && riskMap[row][column+1]) {
            neighbors.push(vertexIndex+1)
        }
        vertices.push({riskLevel: riskMap[row][column], neighbors: neighbors});
        vertexIndex++;
    }
}

console.log(vertices);
const lowestRiskFromStart: Array<number> = Array(vertices.length).fill(Number.POSITIVE_INFINITY);
const visitedVertices: Array<boolean> = Array(vertices.length).fill(false);
lowestRiskFromStart[0] = 0;
for(let i = 0; i < lowestRiskFromStart.length; i++) {
    console.log("Vertex: ", i, "Is this far from start: ", lowestRiskFromStart[i])
}

var queue = new PriorityQueue({ comparator: function(a: number, b: number) { return lowestRiskFromStart[a] - lowestRiskFromStart[b]; }});
queue.queue(0);

while(queue.length != 0) {
    const vertexIndex = queue.dequeue();
    console.log("checking vertex: ", vertexIndex)
    visitedVertices[vertexIndex] = true;
    vertices[vertexIndex].neighbors.forEach(neighbor => {
        console.log(vertexIndex, "has neighbor: ", neighbor)
        if(!visitedVertices[neighbor]) {
            const newRisk = lowestRiskFromStart[vertexIndex] + vertices[neighbor].riskLevel;
            if(newRisk < lowestRiskFromStart[neighbor]) {
                lowestRiskFromStart[neighbor] = newRisk;
                queue.queue(neighbor);
            }
        }
    })
}

console.log("Lowest risk path in Part 1: ", lowestRiskFromStart[lowestRiskFromStart.length-1]);




// queue.queue(3);
// var lowest = queue.dequeue();

//console.log(lowest);
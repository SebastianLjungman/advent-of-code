// --- Day 13: Transparent Origami ---

// You reach another volcanically active part of the cave. It would be nice if you could do some kind of thermal imaging so you could tell ahead of time which caves are too hot to safely enter.

// Fortunately, the submarine seems to be equipped with a thermal camera! When you activate it, you are greeted with:

// Congratulations on your purchase! To activate this infrared thermal imaging
// camera system, please enter the code found on page 1 of the manual.

// Apparently, the Elves have never used this feature. To your surprise, you manage to find the manual; as you go to open it, page 1 falls out. It's a large sheet of transparent paper! The transparent paper is marked with random dots and includes instructions on how to fold it up (your puzzle input). For example:

// 6,10
// 0,14
// 9,10
// 0,3
// 10,4
// 4,11
// 6,0
// 6,12
// 4,1
// 0,13
// 10,12
// 3,4
// 3,0
// 8,4
// 1,10
// 2,14
// 8,10
// 9,0

// fold along y=7
// fold along x=5

// The first section is a list of dots on the transparent paper. 0,0 represents the top-left coordinate. The first value, x, increases to the right. The second value, y, increases downward. So, the coordinate 3,0 is to the right of 0,0, and the coordinate 0,7 is below 0,0. The coordinates in this example form the following pattern, where # is a dot on the paper and . is an empty, unmarked position:

// ...#..#..#.
// ....#......
// ...........
// #..........
// ...#....#.#
// ...........
// ...........
// ...........
// ...........
// ...........
// .#....#.##.
// ....#......
// ......#...#
// #..........
// #.#........

// Then, there is a list of fold instructions. Each instruction indicates a line on the transparent paper and wants you to fold the paper up (for horizontal y=... lines) or left (for vertical x=... lines). In this example, the first fold instruction is fold along y=7, which designates the line formed by all of the positions where y is 7 (marked here with -):

// ...#..#..#.
// ....#......
// ...........
// #..........
// ...#....#.#
// ...........
// ...........
// -----------
// ...........
// ...........
// .#....#.##.
// ....#......
// ......#...#
// #..........
// #.#........

// Because this is a horizontal line, fold the bottom half up. Some of the dots might end up overlapping after the fold is complete, but dots will never appear exactly on a fold line. The result of doing this fold looks like this:

// #.##..#..#.
// #...#......
// ......#...#
// #...#......
// .#.#..#.###
// ...........
// ...........

// Now, only 17 dots are visible.

// Notice, for example, the two dots in the bottom left corner before the transparent paper is folded; after the fold is complete, those dots appear in the top left corner (at 0,0 and 0,1). Because the paper is transparent, the dot just below them in the result (at 0,3) remains visible, as it can be seen through the transparent paper.

// Also notice that some dots can end up overlapping; in this case, the dots merge together and become a single dot.

// The second fold instruction is fold along x=5, which indicates this line:

// #.##.|#..#.
// #...#|.....
// .....|#...#
// #...#|.....
// .#.#.|#.###
// .....|.....
// .....|.....

// Because this is a vertical line, fold left:

// #####
// #...#
// #...#
// #...#
// #####
// .....
// .....

// The instructions made a square!

// The transparent paper is pretty big, so for now, focus on just completing the first fold. After the first fold in the example above, 17 dots are visible - dots that end up overlapping after the fold is completed count as a single dot.

// How many dots are visible after completing just the first fold instruction on your transparent paper?

// Your puzzle answer was 775.

// --- Part Two ---

// Finish folding the transparent paper according to the instructions. The manual says the code is always eight capital letters.

// What code do you use to activate the infrared thermal imaging camera system?

// Your puzzle answer was REUPUPKR.


var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput13 = stdinBuffer.toString();

interface Dot {
    x: number,
    y: number
}

interface Instruction {
    [instruction: string]: number
}

stdinBuffer.toString();
const puzzleInputArray13: Array<string> = puzzleInput13.split('\n').map(String);
const dotsLocationArray: Array<Dot> = [];
const instructionsArray: Array<Instruction> = [];
let startingArrayHeight = -1;
let startingArrayWidth = -1;

puzzleInputArray13.filter(row => row).forEach( row => {
    if (row.charCodeAt(0) < 58) {
        const [x, y] = row.split(',');
        const xNumber = parseInt(x);
        const yNumber = parseInt(y);
        dotsLocationArray.push({x: xNumber, y: yNumber})

        startingArrayHeight = yNumber > startingArrayHeight ? yNumber + 1: startingArrayHeight;
        startingArrayWidth = xNumber > startingArrayWidth ? xNumber + 1: startingArrayWidth;
    }
    else {
        const [text, direction, location] = row.split(/fold\salong\s|=/);
        if(direction === 'x'){
            instructionsArray.push({foldLeft: parseInt(location)})
        }
        if(direction === 'y') {
            instructionsArray.push({foldUp: parseInt(location)})
        }
    }
})

const dotsArray: Array<Array<string>> = [];

for(let rowIndex = 0; rowIndex < startingArrayHeight; rowIndex ++) {
    const row: Array<string> = []
    for(let columnIndex = 0; columnIndex < startingArrayWidth; columnIndex++) {
        row.push(".");
    }
    dotsArray.push(row);
}


console.log("Dots array; ", dotsLocationArray);
console.log("Instructions array: ", instructionsArray);
console.log("Starting Array height: ", startingArrayHeight, " Array width: ", startingArrayWidth);

dotsLocationArray.forEach(dotLocation => {
    dotsArray[dotLocation.y][dotLocation.x] = "*";
})


function foldPaper(paper: Array<Array<string>>, foldTimes: number) {
    for(let instructionIndex = 0; instructionIndex < foldTimes; instructionIndex++) {
        for(let rowIndex = 0; rowIndex < paper.length; rowIndex++) {
            for(let columnIndex = 0; columnIndex < paper[rowIndex].length; columnIndex++) {
                if(instructionsArray[instructionIndex].foldUp && rowIndex > instructionsArray[instructionIndex].foldUp && paper[rowIndex][columnIndex] === "*") {
                    paper[(instructionsArray[instructionIndex].foldUp - (rowIndex - instructionsArray[instructionIndex].foldUp))][columnIndex] = "*";
                }
                else if(instructionsArray[instructionIndex].foldLeft && columnIndex > instructionsArray[instructionIndex].foldLeft && paper[rowIndex][columnIndex] === "*") {
                    paper[rowIndex][(instructionsArray[instructionIndex].foldLeft - (columnIndex - instructionsArray[instructionIndex].foldLeft))] = "*" ;           
                }
            }
        }
        if(instructionsArray[instructionIndex].foldUp) {
            paper.length = instructionsArray[instructionIndex].foldUp;
        }
        else if (instructionsArray[instructionIndex].foldLeft) {
            paper.forEach(row => {
                row.length = instructionsArray[instructionIndex].foldLeft;
            });
        }
    }
}

function partOne13():void {
    const dotsArrayCopy: Array<Array<string>> = [];
    
    dotsArray.forEach(row => {
        dotsArrayCopy.push(Array.from(row));
    });

    foldPaper(dotsArrayCopy, 1);

    let count = 0;
    for(let rowIndex = 0; rowIndex < dotsArrayCopy.length; rowIndex++) {
        for(let columnIndex = 0; columnIndex < dotsArrayCopy[rowIndex].length; columnIndex++) {
            if(dotsArrayCopy[rowIndex][columnIndex] === "*") {
                count++;
            }
        }
    }
    console.log("Dots after first fold: ", count)
}

function partTwo13():void {
    const dotsArrayCopy: Array<Array<string>> = [];

    dotsArray.forEach(row => {
        dotsArrayCopy.push(Array.from(row));
    });

    foldPaper(dotsArrayCopy, instructionsArray.length);

    console.log("Code for Part 2: ");
    dotsArrayCopy.forEach(row => {
        console.log(...row);
    });
}

partOne13();
partTwo13();

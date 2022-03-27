// --- Day 5: Hydrothermal Venture ---

// You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.

// They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:

// 0,9 -> 5,9
// 8,0 -> 0,8 X
// 9,4 -> 3,4 
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0 X
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8 X
// 5,5 -> 8,2 X

// Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

//     An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
//     An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.

// For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.

// So, the horizontal and vertical lines from the above list would produce the following diagram:

// .......1..
// ..1....1..
// ..1....1..
// .......1..
// .112111211
// ..........
// ..........
// ..........
// ..........
// 222111....

// In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.

// To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.

// Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput5 = 
// `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`
stdinBuffer.toString();
const puzzleInputArray5: Array<string> = puzzleInput5.split('\n').map(String);
let lineSegmentArray: Array <LineSegment> = [];
puzzleInputArray5.forEach(row => {
    const [x1, y1, x2, y2] = row.split(/,| -> /);
    //console.log(x1, y1, x2, y2)
    lineSegmentArray.push({x1: parseInt(x1), y1: parseInt(y1), x2: parseInt(x2), y2: parseInt(y2)})
});

let crossingLinesArray: Array <Array<number>> = Array.from(Array(1000), _ => Array(1000).fill(0));

interface LineSegment {
    x1: number,
    y1: number,
    x2: number,
    y2: number
}
console.log(lineSegmentArray);

function partOne5():void {
    lineSegmentArray.forEach(lineSegment => {
        if (lineSegment.x1 === lineSegment.x2) {
            const smallerNumber = lineSegment.y1 < lineSegment.y2 ? lineSegment.y1: lineSegment.y2;
            const biggerNumber = lineSegment.y1 > lineSegment.y2 ? lineSegment.y1: lineSegment.y2;

            for(let y = smallerNumber; y <= biggerNumber; y++) {
                crossingLinesArray[y][lineSegment.x1]++;
            }
        } 
        else if (lineSegment.y1 === lineSegment.y2) {
            const smallerNumber = lineSegment.x1 < lineSegment.x2 ? lineSegment.x1: lineSegment.x2;
            const biggerNumber = lineSegment.x1 > lineSegment.x2 ? lineSegment.x1: lineSegment.x2;

            for(let x = smallerNumber; x <= biggerNumber; x++) {
                crossingLinesArray[lineSegment.y1][x]++;
            }
        }
    });
    console.log(crossingLinesArray);

    let count = 0;
    for (let y = 0; y < crossingLinesArray.length; y++) {
        for(let x = 0; x < crossingLinesArray[0].length; x++) {
            if (crossingLinesArray[y][x] > 1) {
                count++;
            }
        }
    }

    console.log("Points with at least one overlap: ", count)
}

partOne5();
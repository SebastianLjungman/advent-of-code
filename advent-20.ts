// --- Day 20: Trench Map ---

// With the scanners fully deployed, you turn their attention to mapping the floor of the ocean trench.

// When you get back the image from the scanners, it seems to just be random noise. Perhaps you can combine an image enhancement algorithm and the input image (your puzzle input) to clean it up a little.

// For example:

// ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##
// #..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###
// .######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#.
// .#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#.....
// .#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#..
// ...####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.....
// ..##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#

// #..#.
// #....
// ##..#
// ..#..
// ..###

// The first section is the image enhancement algorithm. It is normally given on a single line, but it has been wrapped to multiple lines in this example for legibility. The second section is the input image, a two-dimensional grid of light pixels (#) and dark pixels (.).

// The image enhancement algorithm describes how to enhance an image by simultaneously converting all pixels in the input image into an output image. Each pixel of the output image is determined by looking at a 3x3 square of pixels centered on the corresponding input image pixel. So, to determine the value of the pixel at (5,10) in the output image, nine pixels from the input image need to be considered: (4,9), (4,10), (4,11), (5,9), (5,10), (5,11), (6,9), (6,10), and (6,11). These nine input pixels are combined into a single binary number that is used as an index in the image enhancement algorithm string.

// For example, to determine the output pixel that corresponds to the very middle pixel of the input image, the nine pixels marked by [...] would need to be considered:

// # . . # .
// #[. . .].
// #[# . .]#
// .[. # .].
// . . # # #

// Starting from the top-left and reading across each row, these pixels are ..., then #.., then .#.; combining these forms ...#...#.. By turning dark pixels (.) into 0 and light pixels (#) into 1, the binary number 000100010 can be formed, which is 34 in decimal.

// The image enhancement algorithm string is exactly 512 characters long, enough to match every possible 9-bit binary number. The first few characters of the string (numbered starting from zero) are as follows:

// 0         10        20        30  34    40        50        60        70
// |         |         |         |   |     |         |         |         |
// ..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..##

// In the middle of this first group of characters, the character at index 34 can be found: #. So, the output pixel in the center of the output image should be #, a light pixel.

// This process can then be repeated to calculate every pixel of the output image.

// Through advances in imaging technology, the images being operated on here are infinite in size. Every pixel of the infinite output image needs to be calculated exactly based on the relevant pixels of the input image. The small input image you have is only a small region of the actual infinite input image; the rest of the input image consists of dark pixels (.). For the purposes of the example, to save on space, only a portion of the infinite-sized input and output images will be shown.

// The starting input image, therefore, looks something like this, with more dark pixels (.) extending forever in every direction not shown here:

// ...............
// ...............
// ...............
// ...............
// ...............
// .....#..#......
// .....#.........
// .....##..#.....
// .......#.......
// .......###.....
// ...............
// ...............
// ...............
// ...............
// ...............

// By applying the image enhancement algorithm to every pixel simultaneously, the following output image can be obtained:

// ...............
// ...............
// ...............
// ...............
// .....##.##.....
// ....#..#.#.....
// ....##.#..#....
// ....####..#....
// .....#..##.....
// ......##..#....
// .......#.#.....
// ...............
// ...............
// ...............
// ...............

// Through further advances in imaging technology, the above output image can also be used as an input image! This allows it to be enhanced a second time:

// ...............
// ...............
// ...............
// ..........#....
// ....#..#.#.....
// ...#.#...###...
// ...#...##.#....
// ...#.....#.#...
// ....#.#####....
// .....#.#####...
// ......##.##....
// .......###.....
// ...............
// ...............
// ...............

// Truly incredible - now the small details are really starting to come through. After enhancing the original input image twice, 35 pixels are lit.

// Start with the original input image and apply the image enhancement algorithm twice, being careful to account for the infinite size of the images. How many pixels are lit in the resulting image?

// Your puzzle answer was 5301.

// --- Part Two ---

// You still can't quite make out the details in the image. Maybe you just didn't enhance it enough.

// If you enhance the starting input image in the above example a total of 50 times, 3351 pixels are lit in the final output image.

// Start again with the original input image and apply the image enhancement algorithm 50 times. How many pixels are lit in the resulting image?

// Your puzzle answer was 19492.

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput20 = stdinBuffer.toString();

const [enhancementAlgorithm, _, ... inputImage]: Array<string> = puzzleInput20.split('\n').map(String); 

function enhanceImage(previousImage: Array<string>, surroundingPixels: string): Array<string> {
    const resultingImage: Array<string> = [];
    const extendedImage = [surroundingPixels.repeat(previousImage[0].length+2)]
    previousImage.forEach(row => {
        extendedImage.push(surroundingPixels + row + surroundingPixels);
    })
    extendedImage.push(surroundingPixels.repeat(previousImage[0].length+2)) 

    for (let pixelRow = 0; pixelRow < extendedImage.length; pixelRow++) {
        let pixelRowString = "";
        for (let pixelColumn = 0; pixelColumn < extendedImage[0].length; pixelColumn++) {
        const algorithmIndex = calculateAlgorithmIndex(extendedImage, pixelRow, pixelColumn, surroundingPixels);
        const pixelType = enhancementAlgorithm[algorithmIndex];
        pixelRowString += pixelType;
        }
        resultingImage.push(pixelRowString);
    }
    return resultingImage;
} 

function calculateAlgorithmIndex(inputImage: Array<string>, pixelRow: number, pixelColumn: number, surroundingPixels: string): number {
    let algorithmIndex = "";
    for(let row = pixelRow - 1; row <= pixelRow + 1; row++) {
        for(let column = pixelColumn - 1; column <= pixelColumn + 1; column++) {
            if(!inputImage[row] || !inputImage[row][column]) {
                algorithmIndex+= surroundingPixels === "." ? "0" : "1";
            }
            else {
                algorithmIndex += inputImage[row][column] === "." ? "0" : "1";
            }
        }
    }

    return parseInt(algorithmIndex, 2);
} 

function countLitPixels(finalImage: Array<string>): number {
    let litPixels = 0;
    for(let row = 0; row < finalImage.length; row++) {
        for(let column = 0; column < finalImage[0].length; column++) {
            if(finalImage[row][column] === "#") {
                litPixels++;
            }
        }
    }

    return litPixels;
}

function partOne20(): void {
    const iterations = 2;
    let surroundingPixels = ".";
    let previousImage = Array.from(inputImage);

    for (let iteration = 0; iteration < iterations; iteration++) {  
        const resultingImage = enhanceImage(previousImage, surroundingPixels)    
        previousImage = resultingImage;
        surroundingPixels = enhancementAlgorithm[0] === "#" && surroundingPixels !== enhancementAlgorithm[enhancementAlgorithm.length-1] ? enhancementAlgorithm[enhancementAlgorithm.length-1] : enhancementAlgorithm[0];
    }

    console.log(`Lit pixels in final image after ${iterations} iterations: ${countLitPixels(previousImage)}`)
} 

function partTwo20(): void {
    const iterations = 50;
    let surroundingPixels = ".";
    let previousImage = Array.from(inputImage);

    for (let iteration = 0; iteration < iterations; iteration++) {  
        const resultingImage = enhanceImage(previousImage, surroundingPixels)    
        previousImage = resultingImage;
        surroundingPixels = enhancementAlgorithm[0] === "#" && surroundingPixels !== enhancementAlgorithm[enhancementAlgorithm.length-1] ? enhancementAlgorithm[enhancementAlgorithm.length-1] : enhancementAlgorithm[0];
    }
    
    console.log(`Lit pixels in final image after ${iterations} iterations: ${countLitPixels(previousImage)}`)
}

partOne20();
partTwo20();
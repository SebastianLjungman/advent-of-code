// --- Day 4: Giant Squid ---

// You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.

// Maybe it wants to play bingo?

// Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)

// The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:

// 7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7

// After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):

// 22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
//  8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
// 21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
//  6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
//  1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

// After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:

// 22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
//  8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
// 21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
//  6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
//  1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

// Finally, 24 is drawn:

// 22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
//  8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
// 21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
//  6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
//  1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

// At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24 4).

// The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.

// To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?

// --- Part Two ---

// On the other hand, it might be wise to try a different strategy: let the giant squid win.

// You aren't sure how many bingo boards a giant squid could play at once, so rather than waste time counting its arms, the safe thing to do is to figure out which board will win last and choose that one. That way, no matter which boards it picks, it will win for sure.

// In the above example, the second board is the last to win, which happens after 13 is eventually called and its middle column is completely marked. If you were to keep playing until this point, the second board would have a sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.

// Figure out which board will win last. Once it wins, what would its final score be?

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput = 
// `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7`

stdinBuffer.toString();
const puzzleInputArray: Array<string> = puzzleInput.split('\n').map(String);
const [drawnNumbers, ... boards] = puzzleInputArray;
const bingoNumbers = drawnNumbers.split(',').map(Number);
const bingoBoards = boards.filter(row => row);

interface BingoSquare {
    squareNumber: number,
    marked: boolean
}

interface WinningBoardAndLastNumber {
    winningBoard: Array<Array<BingoSquare>>,
    lastNumber: number
}

function parseBoards(boards: Array<string>): Array<Array<Array<BingoSquare>>> {
    let finalBoards: Array<Array<Array<BingoSquare>>> = [];
    let oneBoard: Array<Array<BingoSquare>> = [];
    let rowOfBoard = 0;
    for(let row = 0; row < boards.length; row++) {
        const splitArray: Array<any> = boards[row].split(' ');
        var onlyNumbers: Array<string> = splitArray.filter(numberCandidate => numberCandidate);
        let numberArray: Array<BingoSquare> = [];
        onlyNumbers.forEach( boardNumber => {
            const currentSquare: BingoSquare ={
                squareNumber: parseInt(boardNumber),
                marked: false
            }
            numberArray.push(currentSquare);
        });
        
        oneBoard.push(numberArray);
        rowOfBoard++;
        if (rowOfBoard === 5){
            finalBoards.push(oneBoard);
            oneBoard = [];
            rowOfBoard = 0;
        }      
    }
    return finalBoards;
}

function playBingo(drawnNumbers: Array<number>, boards: Array<Array<Array<BingoSquare>>>) {
    for(let drawnNumber = 0; drawnNumber < drawnNumbers.length; drawnNumber++) {
        const winningBoardsAndNumbers = markNumbers(drawnNumbers[drawnNumber], boards);
        if(winningBoardsAndNumbers) return winningBoardsAndNumbers[0];
    };
}

function checkForBingo(board: Array<Array<BingoSquare>>, row: number, column: number): boolean {
    let markedInRow = 0;
    let markedInColumn = 0;
    
    for(let columnOfRow = 0; columnOfRow < board[row].length; columnOfRow++) {
        if (board[row][columnOfRow].marked === true) {
            markedInRow++;
        }
    }

    if(markedInRow === 5) {
        return true;
    }

    for(let rowOfColumn = 0; rowOfColumn < board.length; rowOfColumn++) {
        if (board[rowOfColumn][column].marked === true) {
            markedInColumn++;
        }
    }

    if (markedInColumn === 5) {
        return true;
    }

    return false;
}

function markNumbers(drawnNumber: number, boards: Array<Array<Array<BingoSquare>>>): Array <WinningBoardAndLastNumber> | undefined {
    let bingoWinners: Array <WinningBoardAndLastNumber> = [];
    for(let board = 0; board < boards.length; board++) {
        let currentBoard = boards[board];
        for(let boardRow = 0; boardRow < currentBoard.length; boardRow++) {
            for(let column = 0; column < currentBoard[boardRow].length; column++) {          
                if(currentBoard[boardRow][column].squareNumber === drawnNumber) {
                    currentBoard[boardRow][column].marked = true;
                    const isBingo = checkForBingo(currentBoard, boardRow, column)
                    if(isBingo) {
                        bingoWinners.push({winningBoard: currentBoard, lastNumber: drawnNumber});       
                        boards.splice(board, 1);   
                        board--;             
                    }                                               
                }
            }
        }
    }
    if(bingoWinners.length > 0) {
        return bingoWinners;
    }
} 

function calculateScore(winningBoard: Array<Array<BingoSquare>>): number {
    let sumOfUnmarked = 0;
    for(let boardRow = 0; boardRow < winningBoard.length; boardRow++) {
        for(let column = 0; column < winningBoard[boardRow].length; column++) {          
            if(winningBoard[boardRow][column].marked === false) {
               sumOfUnmarked += winningBoard[boardRow][column].squareNumber;
                }                        
        }        
    }
    return sumOfUnmarked;
}

function playBingoLastWinner(drawnNumbers: Array<number>, boards: Array<Array<Array<BingoSquare>>>): WinningBoardAndLastNumber {
    let allWinningBoardsAndLastNumbers: Array<WinningBoardAndLastNumber> = [];
    for(let drawnNumber = 0; drawnNumber < drawnNumbers.length; drawnNumber++) {
        const winningBoardsAndNumbers = markNumbers(drawnNumbers[drawnNumber], boards)
        if(winningBoardsAndNumbers) {
            allWinningBoardsAndLastNumbers.push(... winningBoardsAndNumbers);
        }
    };
    return allWinningBoardsAndLastNumbers[allWinningBoardsAndLastNumbers.length-1];
}


function partOne(): void {
    const parsedBoards = parseBoards(bingoBoards);
    const winningBoardAndNumber = playBingo(bingoNumbers, parsedBoards);
    console.log("AND THE WINNER IS: ", winningBoardAndNumber)

    if(winningBoardAndNumber) {
        const winningScore = calculateScore(winningBoardAndNumber.winningBoard)*winningBoardAndNumber.lastNumber;
        console.log("With a score of: ", winningScore);
    }
}

function partTwo(): void {
    const parsedBoards = parseBoards(bingoBoards);
    const lastWinningBoardAndNumber = playBingoLastWinner(bingoNumbers, parsedBoards);
    console.log("AND THE LAST WINNER IS: ", lastWinningBoardAndNumber)
    if(lastWinningBoardAndNumber) {
        const winningScore = calculateScore(lastWinningBoardAndNumber.winningBoard)*lastWinningBoardAndNumber.lastNumber;
        console.log("With a score of: ", winningScore);
    }
}

partOne();
partTwo();
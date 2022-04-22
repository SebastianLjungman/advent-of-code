// --- Day 21: Dirac Dice ---

// There's not much to do as you slowly descend to the bottom of the ocean. The submarine computer challenges you to a nice game of Dirac Dice.

// This game consists of a single die, two pawns, and a game board with a circular track containing ten spaces marked 1 through 10 clockwise. Each player's starting space is chosen randomly (your puzzle input). Player 1 goes first.

// Players take turns moving. On each player's turn, the player rolls the die three times and adds up the results. Then, the player moves their pawn that many times forward around the track (that is, moving clockwise on spaces in order of increasing value, wrapping back around to 1 after 10). So, if a player is on space 7 and they roll 2, 2, and 1, they would move forward 5 times, to spaces 8, 9, 10, 1, and finally stopping on 2.

// After each player moves, they increase their score by the value of the space their pawn stopped on. Players' scores start at 0. So, if the first player starts on space 7 and rolls a total of 5, they would stop on space 2 and add 2 to their score (for a total score of 2). The game immediately ends as a win for any player whose score reaches at least 1000.

// Since the first game is a practice game, the submarine opens a compartment labeled deterministic dice and a 100-sided die falls out. This die always rolls 1 first, then 2, then 3, and so on up to 100, after which it starts over at 1 again. Play using this die.

// For example, given these starting positions:

// Player 1 starting position: 4
// Player 2 starting position: 8

// This is how the game would go:

//     Player 1 rolls 1+2+3 and moves to space 10 for a total score of 10.
//     Player 2 rolls 4+5+6 and moves to space 3 for a total score of 3.
//     Player 1 rolls 7+8+9 and moves to space 4 for a total score of 14.
//     Player 2 rolls 10+11+12 and moves to space 6 for a total score of 9.
//     Player 1 rolls 13+14+15 and moves to space 6 for a total score of 20.
//     Player 2 rolls 16+17+18 and moves to space 7 for a total score of 16.
//     Player 1 rolls 19+20+21 and moves to space 6 for a total score of 26.
//     Player 2 rolls 22+23+24 and moves to space 6 for a total score of 22.

// ...after many turns...

//     Player 2 rolls 82+83+84 and moves to space 6 for a total score of 742.
//     Player 1 rolls 85+86+87 and moves to space 4 for a total score of 990.
//     Player 2 rolls 88+89+90 and moves to space 3 for a total score of 745.
//     Player 1 rolls 91+92+93 and moves to space 10 for a final score, 1000.

// Since player 1 has at least 1000 points, player 1 wins and the game ends. At this point, the losing player had 745 points and the die had been rolled a total of 993 times; 745 * 993 = 739785.

// Play a practice game using the deterministic 100-sided die. The moment either player wins, what do you get if you multiply the score of the losing player by the number of times the die was rolled during the game?

// Your puzzle answer was 853776.

// --- Part Two ---

// Now that you're warmed up, it's time to play the real game.

// A second compartment opens, this time labeled Dirac dice. Out of it falls a single three-sided die.

// As you experiment with the die, you feel a little strange. An informational brochure in the compartment explains that this is a quantum die: when you roll it, the universe splits into multiple copies, one copy for each possible outcome of the die. In this case, rolling the die always splits the universe into three copies: one where the outcome of the roll was 1, one where it was 2, and one where it was 3.

// The game is played the same as before, although to prevent things from getting too far out of hand, the game now ends when either player's score reaches at least 21.

// Using the same starting positions as in the example above, player 1 wins in 444356092776315 universes, while player 2 merely wins in 341960390180808 universes.

// Using your given starting positions, determine every possible outcome. Find the player that wins in more universes; in how many universes does that player win?

// Your puzzle answer was 301304993766094.

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput21 = stdinBuffer.toString();

let [none, player1PosInput, player2PosInput] = puzzleInput21.split(/Player 1 starting position: |\nPlayer 2 starting position: /)
player1PosInput = parseInt(player1PosInput);
player2PosInput = parseInt(player2PosInput);

const deterministicDie = Array.from({length: 100}, (x, i) => i + 1);

function partOne21(): void {
    let dieRolls = 0;
    let dieIndex = 0;
    let player1Score = 0;
    let player2Score = 0;
    let player1Pos = player1PosInput;
    let player2Pos = player2PosInput;

    while(player1Score < 1000 && player2Score < 1000) {
        let firstRoll = deterministicDie[dieIndex%100];
        let secondRoll = deterministicDie[(dieIndex+1)%100];
        let thirdRoll = deterministicDie[(dieIndex+2)%100];
        player1Pos = 1 + ((player1Pos + firstRoll  + secondRoll + thirdRoll - 1) % 10);
        
        dieRolls += 3;
        dieIndex = (dieIndex + 3) % 100;
        player1Score += player1Pos;

        firstRoll = deterministicDie[dieIndex%100];
        secondRoll = deterministicDie[(dieIndex+1)%100];
        thirdRoll = deterministicDie[(dieIndex+2)%100];
        player2Pos = 1 + ((player2Pos + firstRoll  + secondRoll + thirdRoll - 1) %10);

        dieRolls += 3;
        dieIndex = (dieIndex + 3) % 100;
        player2Score += player2Pos;
    }

    console.log("Score of loser multiplied by number of die rolls: ", Math.min(player1Score, player2Score) * dieRolls);
}

function partTwo21(): void {
    let totalWins = ai_prof_recursion(player1PosInput-1, 21, player2PosInput-1, 21);
    console.log("Most winning universes: ", Math.max(... totalWins));
}

//[Sum of three dice rolls, frequency of sum]
const rollFrequency = [[3,1],[4,3],[5,6],[6,7],[7,6],[8,3],[9,1]];

//Based on the very neat Python solution by reddit user 'ai_prof'/ GitHub user 'topaz'. Solution: https://tinyurl.com/y33sncff GitHub: https://github.com/topaz 
function ai_prof_recursion(p1:number, t1:number, p2:number, t2:number): Array<number> {
    if (t2 <= 0) {
        return [0,1]
    }

    let w1 = 0;
    let w2 = 0;
    for (const roll of rollFrequency) {
        const [c2, c1] = ai_prof_recursion(p2, t2, (p1 + roll[0] % 10), t1 - 1 - ((p1 + roll[0]) % 10) )
        w1 = w1 + roll[1] * c1, 
        w2 = w2 + roll[1] * c2;
    }
    return [w1, w2];
}

partOne21();
partTwo21();
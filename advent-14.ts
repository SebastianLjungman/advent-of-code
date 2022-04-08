// --- Day 14: Extended Polymerization ---

// The incredible pressures at this depth are starting to put a strain on your submarine. The submarine has polymerization equipment that would produce suitable materials to reinforce the submarine, and the nearby volcanically-active caves should even have the necessary input elements in sufficient quantities.

// The submarine manual contains instructions for finding the optimal polymer formula; specifically, it offers a polymer template and a list of pair insertion rules (your puzzle input). You just need to work out what polymer would result after repeating the pair insertion process a few times.

// For example:

// NNCB

// CH -> B
// HH -> N
// CB -> H
// NH -> C
// HB -> C
// HC -> B
// HN -> C
// NN -> C
// BH -> H
// NC -> B
// NB -> B
// BN -> B
// BB -> N
// BC -> B
// CC -> N
// CN -> C

// The first line is the polymer template - this is the starting point of the process.

// The following section defines the pair insertion rules. A rule like AB -> C means that when elements A and B are immediately adjacent, element C should be inserted between them. These insertions all happen simultaneously.

// So, starting with the polymer template NNCB, the first step simultaneously considers all three pairs:

//     The first pair (NN) matches the rule NN -> C, so element C is inserted between the first N and the second N.
//     The second pair (NC) matches the rule NC -> B, so element B is inserted between the N and the C.
//     The third pair (CB) matches the rule CB -> H, so element H is inserted between the C and the B.

// Note that these pairs overlap: the second element of one pair is the first element of the next pair. Also, because all pairs are considered simultaneously, inserted elements are not considered to be part of a pair until the next step.

// After the first step of this process, the polymer becomes NCNBCHB.

// Here are the results of a few steps using the above rules:

// Template:     NNCB
// After step 1: NCNBCHB
// After step 2: NBCCNBBBCBHCB
// After step 3: NBBBCNCCNBBNBNBBCHBHHBCHB
// After step 4: NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB

// This polymer grows quickly. After step 5, it has length 97; After step 10, it has length 3073. After step 10, B occurs 1749 times, C occurs 298 times, H occurs 161 times, and N occurs 865 times; taking the quantity of the most common element (B, 1749) and subtracting the quantity of the least common element (H, 161) produces 1749 - 161 = 1588.

// Apply 10 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?

// Your puzzle answer was 2745.

// --- Part Two ---

// The resulting polymer isn't nearly strong enough to reinforce the submarine. You'll need to run more steps of the pair insertion process; a total of 40 steps should do it.

// In the above example, the most common element is B (occurring 2192039569602 times) and the least common element is H (occurring 3849876073 times); subtracting these produces 2188189693529.

// Apply 40 steps of pair insertion to the polymer template and find the most and least common elements in the result. What do you get if you take the quantity of the most common element and subtract the quantity of the least common element?

// Your puzzle answer was 3420801168962.

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput14 = stdinBuffer.toString();

const puzzleInputArray14: Array<string> = puzzleInput14.split('\n').map(String);
const [polymerTemplate, blankSpace, ... insertionRules]: Array<string> = puzzleInputArray14; 

interface InsertionRule {
    pair: string,
    insert: string
}
interface ElementCountDict {
    [element: string]: number
}

interface PairCountDict {
    [pair: string]: number
}

const insertionRulesArray: Array<InsertionRule> = [];

insertionRules.forEach(rule => {
    const [pair, insert] = rule.split(' -> ');
    insertionRulesArray.push({pair: pair, insert: insert});
})

function polymerInsertionBruteForce(polymer: string): string {
    let polymerAfterInsertions = polymer;
    let offset = 0;
    for(let start = 0; start < polymer.length-1; start++) {
        const pair = polymer.substring(start, start+2);
        
        insertionRulesArray.forEach(rule => {
            if(pair === rule.pair) {
                polymerAfterInsertions = polymerAfterInsertions.slice(0, start+1+offset) + rule.insert + polymerAfterInsertions.slice(start+1+offset);
                offset++;
            }
        })
    }

    return polymerAfterInsertions;
}

function polymerInsertionTrackPairs(pairCounts: PairCountDict) {
        const changesToPairCounts: PairCountDict = {};
      
    for (const pair in pairCounts) {
        insertionRulesArray.forEach(rule => {
            if(pair === rule.pair) {
                const leftPair = pair.substring(0, 1) + rule.insert;
                const rightPair = rule.insert + pair.substring(1, 2);  
                
                if(!changesToPairCounts[leftPair]) {
                    changesToPairCounts[leftPair] = 0;
                }

                if(!changesToPairCounts[rightPair]) {
                    changesToPairCounts[rightPair] = 0;
                }
                
                changesToPairCounts[rightPair] += pairCounts[pair];
                changesToPairCounts[leftPair] += pairCounts[pair];
                pairCounts[pair] = 0;
            }
        })
    }
    
    for(const pair in changesToPairCounts) {
        pairCounts[pair] = changesToPairCounts[pair];
    }
    
    return pairCounts;
}

function partOne14(): void {
    console.time('NOT efficient, 10 iterations');
    let polymerTemplateCopy = polymerTemplate;
    const elementCounts: ElementCountDict = {};


    for(let step = 0; step < 10; step++) {
        polymerTemplateCopy = polymerInsertionBruteForce(polymerTemplateCopy);
    }

    for(let elementIndex = 0; elementIndex < polymerTemplateCopy.length; elementIndex++) {
       const element = polymerTemplateCopy[elementIndex];
       if(!elementCounts[element]) {
           elementCounts[element] = 0;
       }
       elementCounts[element]++;
    }

    let leastCommonElementCount = Number.POSITIVE_INFINITY;
    let mostCommonElementCount = Number.NEGATIVE_INFINITY;

    for (const element in elementCounts) {
        if(elementCounts[element] > mostCommonElementCount) {
            mostCommonElementCount = elementCounts[element];
        }
        if(elementCounts[element] < leastCommonElementCount) {
            leastCommonElementCount = elementCounts[element]
        }
    }

    console.log("Most common element count minus least common element count after 10 iterations: ", mostCommonElementCount - leastCommonElementCount);
    console.timeEnd('NOT efficient, 10 iterations');
}

function partTwo14(): void {
    console.time('Efficient, 40 iterations');
    const elementCounts: ElementCountDict = {};
    let pairCounts: PairCountDict = {};

    for(let start = 0; start < polymerTemplate.length-1; start++) {
        if(!pairCounts[polymerTemplate.substring(start, start+2)]) {
            pairCounts[polymerTemplate.substring(start, start+2)] = 0;
        }
        
        pairCounts[polymerTemplate.substring(start, start+2)]++;
    }

    for(let step = 0; step < 40; step++) {
        pairCounts = polymerInsertionTrackPairs(pairCounts);
    }

    for (const pair in pairCounts) {
        if(pairCounts[pair] > 0) {
            const leftElement = pair.substring(0, 1);
            const rightElement = pair.substring(1, 2);
            
            if(!elementCounts[leftElement]) {
                elementCounts[leftElement] = 0;
            }
            if(!elementCounts[rightElement]) {
                elementCounts[rightElement] = 0;
            }

            elementCounts[leftElement] += pairCounts[pair]/2;
            elementCounts[rightElement] += pairCounts[pair]/2;
        }
    }

    //Rounding up the counts for the first and last element in the polymer template
    elementCounts[polymerTemplate[0]] = Math.ceil(elementCounts[polymerTemplate[0]]);
    elementCounts[polymerTemplate[polymerTemplate.length-1]] = Math.ceil(elementCounts[polymerTemplate[polymerTemplate.length-1]]);

    let leastCommonElementCount = Number.POSITIVE_INFINITY;
    let mostCommonElementCount = Number.NEGATIVE_INFINITY;

    for (const element in elementCounts) {
        if(elementCounts[element] > mostCommonElementCount) {
            mostCommonElementCount = elementCounts[element];
        }
        if(elementCounts[element] < leastCommonElementCount) {
            leastCommonElementCount = elementCounts[element]
        }
    }

    console.log("Most common element count minus least common element count after 40 iterations: ", mostCommonElementCount - leastCommonElementCount);
    console.timeEnd('Efficient, 40 iterations');
}

partOne14();
partTwo14();


// --- Day 12: Passage Pathing ---

// With your submarine's subterranean subsystems subsisting suboptimally, the only way you're getting out of this cave anytime soon is by finding a path yourself. Not just a path - the only way to know if you've found the best path is to find all of them.

// Fortunately, the sensors are still mostly working, and so you build a rough map of the remaining caves (your puzzle input). For example:

// start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end

// This is a list of how all of the caves are connected. You start in the cave named start, and your destination is the cave named end. An entry like b-d means that cave b is connected to cave d - that is, you can move between them.

// So, the above cave system looks roughly like this:

//     start
//     /   \
// c--A-----b--d
//     \   /
//      end

// Your goal is to find the number of distinct paths that start at start, end at end, and don't visit small caves more than once. There are two types of caves: big caves (written in uppercase, like A) and small caves (written in lowercase, like b). It would be a waste of time to visit any small cave more than once, but big caves are large enough that it might be worth visiting them multiple times. So, all paths you find should visit small caves at most once, and can visit big caves any number of times.

// Given these rules, there are 10 paths through this example cave system:

// start,A,b,A,c,A,end
// start,A,b,A,end
// start,A,b,end
// start,A,c,A,b,A,end
// start,A,c,A,b,end
// start,A,c,A,end
// start,A,end
// start,b,A,c,A,end
// start,b,A,end
// start,b,end

// (Each line in the above list corresponds to a single path; the caves visited by that path are listed in the order they are visited and separated by commas.)

// Note that in this cave system, cave d is never visited by any path: to do so, cave b would need to be visited twice (once on the way to cave d and a second time when returning from cave d), and since cave b is small, this is not allowed.

// Here is a slightly larger example:

// dc-end
// HN-start
// start-kj
// dc-start
// dc-HN
// LN-dc
// HN-end
// kj-sa
// kj-HN
// kj-dc

// The 19 paths through it are as follows:

// start,HN,dc,HN,end
// start,HN,dc,HN,kj,HN,end
// start,HN,dc,end
// start,HN,dc,kj,HN,end
// start,HN,end
// start,HN,kj,HN,dc,HN,end
// start,HN,kj,HN,dc,end
// start,HN,kj,HN,end
// start,HN,kj,dc,HN,end
// start,HN,kj,dc,end
// start,dc,HN,end
// start,dc,HN,kj,HN,end
// start,dc,end
// start,dc,kj,HN,end
// start,kj,HN,dc,HN,end
// start,kj,HN,dc,end
// start,kj,HN,end
// start,kj,dc,HN,end
// start,kj,dc,end

// Finally, this even larger example has 226 paths through it:

// fs-end
// he-DX
// fs-he
// start-DX
// pj-DX
// end-zg
// zg-sl
// zg-pj
// pj-he
// RW-he
// fs-DX
// pj-RW
// zg-RW
// start-pj
// he-WI
// zg-he
// pj-fs
// start-RW

// How many paths through this cave system are there that visit small caves at most once?

var fs = require("fs");
var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
const puzzleInput12 =
// `start-A
// start-b
// A-c
// A-b
// b-d
// A-end
// b-end`

stdinBuffer.toString();

interface Edge {
    from: string,
    to: string,
}

interface VertexDictionary {
    [key: string]: Array<string>;
}

const puzzleInputArray12: Array<String> = puzzleInput12.split('\n').map(String);
const graphEdges: Array<Edge> = [];

puzzleInputArray12.forEach(edge => {
    const [from, to] = edge.split('-');
    graphEdges.push({from: from, to: to});
})

const verticesList: VertexDictionary = {};
const pathsToEnd: Array<Array<string>> = [];

graphEdges.forEach(edge => {
    if(!verticesList[edge.from]) {
        verticesList[edge.from] = [];
    }
    if(!verticesList[edge.to]) {
        verticesList[edge.to] = [];
    }
    verticesList[edge.from].push(edge.to)
    verticesList[edge.to].push(edge.from);
})

console.log(verticesList)

function checkNeighboringVertices(vertex: string, pastTrace: Array<string>, pastVisited: Array<string>) {
    const trace: Array<string> = Array.from(pastTrace);
    trace.push(vertex);
    console.log("Trace: ", trace);

    if(vertex === "end") {
        console.log("Pushed path: ", trace);
        pathsToEnd.push(trace);
        return;
    }

    const visited: Array<string> = Array.from(pastVisited);

    if(vertex.charCodeAt(0) > 96) {
        visited.push(vertex);
    }
    const vertexStack: Array<string> = [];

    verticesList[vertex].forEach( neighbor => {
        if(neighbor !== "start") {
            vertexStack.push(neighbor);
            console.log("Pushed: ", neighbor);
        }
    })

    console.log("Stack: ", vertexStack);

    while(vertexStack.length > 0) {    
        const next = vertexStack.pop();
        console.log("Popped: ", next)
        if(next && !visited.includes(next)) {
            console.log(next, " is visited: ", pastTrace.includes(next));
            checkNeighboringVertices(next, trace, visited);
            console.log("CHar code of ", next, "Is: ", next.charCodeAt(0))
        }
    }
}



function partOne12(): void {
    checkNeighboringVertices("start", [], []);
    console.log("Found paths: ", pathsToEnd, "Paths in total: ", pathsToEnd.length);
}

partOne12();
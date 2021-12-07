const CrabSubmarineAligner = require('./crab-submarine-aligner.js');
const crabSubmarineAligner = new CrabSubmarineAligner();
crabSubmarineAligner.loadInput('input.txt');

console.log(crabSubmarineAligner.calculateFuelCostForPosition(crabSubmarineAligner.findOptimizedCrabSubPosition()));

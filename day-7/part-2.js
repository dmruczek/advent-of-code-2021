const CrabSubmarineAligner = require('./crab-submarine-aligner.js');
const crabSubmarineAligner = new CrabSubmarineAligner(true);
crabSubmarineAligner.loadInput('input.txt');

console.log(crabSubmarineAligner.calculateFuelCostForPosition(crabSubmarineAligner.findOptimizedCrabSubPosition()));

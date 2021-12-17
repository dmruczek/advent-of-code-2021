const PolymerizationSimulator = require('./polymerization-simulator.js');
const polymerizationSimulator = new PolymerizationSimulator();
polymerizationSimulator.loadInput('input.txt');
polymerizationSimulator.simulatePairInsertionProcessANumberOfTimes(10);

console.log(polymerizationSimulator.calculateMostCommonElementMinusLeastCommonElement());

const LanternfishSpawningSimulator = require('./lanternfish-spawning-simulator.js');
const lanternfishSpawningSimulator = new LanternfishSpawningSimulator();
lanternfishSpawningSimulator.loadInput('input.txt');
lanternfishSpawningSimulator.simulateXCycles(80);
console.log(lanternfishSpawningSimulator.getNumberOfFish());
const HeightmapAnalyzer = require('./heightmap-analyzer.js');
const heightmapAnalyzer = new HeightmapAnalyzer();
heightmapAnalyzer.loadInput('input.txt');
heightmapAnalyzer.findAllBasins();

console.log(heightmapAnalyzer.calculateProductOfThreeLargestBasins());

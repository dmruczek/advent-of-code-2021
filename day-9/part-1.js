const HeightmapAnalyzer = require('./heightmap-analyzer.js');
const heightmapAnalyzer = new HeightmapAnalyzer();
heightmapAnalyzer.loadInput('input.txt');

console.log(heightmapAnalyzer.calculateAggregateRiskLevelOfLowPoints());

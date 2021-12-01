const DepthAnalyzer = require('./depth-analyzer.js');
const depthAnalyzer = new DepthAnalyzer();
depthAnalyzer.runDepthScan();
const numberOfDepthIncreases = depthAnalyzer.getNumberOfDepthIncreases();
console.log("Number of Depth Increases: " + numberOfDepthIncreases);

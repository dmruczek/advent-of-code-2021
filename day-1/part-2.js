const DepthAnalyzer = require('./depth-analyzer.js');
const depthAnalyzer = new DepthAnalyzer();
depthAnalyzer.runDepthScan();
const numberOfSlidingWindowDepthIncreases = depthAnalyzer.getNumberOfSlidingWindowDepthIncreases();
console.log("Number of Sliding Window Depth Increases: " + numberOfSlidingWindowDepthIncreases);

const ProbeLauncherTrajectoryAnalyzer = require('./probe-launcher-trajectory-analyzer.js');
const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
probeLauncherTrajectoryAnalyzer.loadInput('input.txt');

console.log(probeLauncherTrajectoryAnalyzer.findHighestSuccessfulFiringSolution().maxHeight);

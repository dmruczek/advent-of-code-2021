const ProbeLauncherTrajectoryAnalyzer = require('./probe-launcher-trajectory-analyzer.js');
const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
probeLauncherTrajectoryAnalyzer.loadInput('input.txt');

console.log(probeLauncherTrajectoryAnalyzer.findAllSuccessfullFiringSolutions().length);
// answer was 1908
const ProbeLauncherTrajectoryAnalyzer = require('./probe-launcher-trajectory-analyzer.js');
const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
probeLauncherTrajectoryAnalyzer.loadInput('input.txt');

console.log(probeLauncherTrajectoryAnalyzer.findAllSuccessfullFiringSolutions().length);
// first try gave 1788, which is too low.
// then got 1795, which is also too low.
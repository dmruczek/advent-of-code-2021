const SubmarineChitonAvoidanceAnalyzer = require('./submarine-chiton-avoidance-analyzer.js');
const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
submarineChitonAvoidanceAnalyzer.loadInput('input.txt', true);

console.log(submarineChitonAvoidanceAnalyzer.doRiskCalculation());

// submarineChitonAvoidanceAnalyzer.printPath();
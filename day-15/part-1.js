const SubmarineChitonAvoidanceAnalyzer = require('./submarine-chiton-avoidance-analyzer.js');
const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
submarineChitonAvoidanceAnalyzer.loadInput('input.txt');

console.log(submarineChitonAvoidanceAnalyzer.doRiskCalculation());

const SubmarineChitonAvoidanceAnalyzer = require('./submarine-chiton-avoidance-analyzer.js');
const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
submarineChitonAvoidanceAnalyzer.loadInput('input.txt', true);

// console.log(submarineChitonAvoidanceAnalyzer.doRiskCalculation());
// previous guess was 2850.  It's too high...
// submarineChitonAvoidanceAnalyzer.printPath();


console.log(submarineChitonAvoidanceAnalyzer.findPathThroughExpansion());

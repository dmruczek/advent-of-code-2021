const DiagnosticAnalyzer = require('./diagnostic-analyzer.js');
const diagnosticAnalyzer = new DiagnosticAnalyzer();
diagnosticAnalyzer.loadInput('input.txt');

console.log(diagnosticAnalyzer.calculatePowerConsumption());

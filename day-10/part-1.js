const NavigationSubsystemParser = require('./navigation-subsystem-parser.js');
const navigationSubsystemParser = new NavigationSubsystemParser();
navigationSubsystemParser.loadInput('input.txt');

console.log(navigationSubsystemParser.findIllegalLinesAndComputeScore());

const CaveNavigationSystem = require('./cave-navigation-system.js');
const caveNavigationSystem = new CaveNavigationSystem();
caveNavigationSystem.loadInput('input.txt');
const paths = caveNavigationSystem.findPathsFromStartToEndAllowingOneDoubleSmallCaveVisit();

console.log(paths.length);

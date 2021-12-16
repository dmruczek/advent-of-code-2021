const CaveNavigationSystem = require('./cave-navigation-system.js');
const caveNavigationSystem = new CaveNavigationSystem();
caveNavigationSystem.loadInput('input.txt');
const paths = caveNavigationSystem.findPathsFromStartToEnd();

console.log(paths.length);

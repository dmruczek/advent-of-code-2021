const SubmarineNavigator = require('./submarine-navigator.js');
const submarineNavigator = new SubmarineNavigator();
submarineNavigator.loadInput('input.txt');
submarineNavigator.navigate();

console.log(submarineNavigator.horizontalPosition * submarineNavigator.depth);

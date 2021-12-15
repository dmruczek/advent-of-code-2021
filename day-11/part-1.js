const DumboOctopusSchoolSimulator = require('./dumbo-octopus-school-simulator.js');
const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
dumboOctopusSchoolSimulator.loadInput('input.txt');
dumboOctopusSchoolSimulator.runSteps(100);

console.log(dumboOctopusSchoolSimulator.totalFlashes);

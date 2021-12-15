const DumboOctopusSchoolSimulator = require('./dumbo-octopus-school-simulator.js');
const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
dumboOctopusSchoolSimulator.loadInput('input.txt');
dumboOctopusSchoolSimulator.runUntilFirstSynchronization();

console.log(dumboOctopusSchoolSimulator.iteration);

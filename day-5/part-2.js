const HydrothermalVentMap = require('./hydrothermal-vent-map.js');
const hydrothermalVentMap = new HydrothermalVentMap();
hydrothermalVentMap.loadInput('input.txt');
hydrothermalVentMap.mapAllVents();
console.log(hydrothermalVentMap.countVentOverlapPoints());

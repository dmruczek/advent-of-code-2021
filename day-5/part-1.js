const HydrothermalVentMap = require('./hydrothermal-vent-map.js');
const hydrothermalVentMap = new HydrothermalVentMap();
hydrothermalVentMap.loadInput('input.txt');
hydrothermalVentMap.mapAllHorizontalAndVerticalVents();
console.log(hydrothermalVentMap.countVentOverlapPoints());

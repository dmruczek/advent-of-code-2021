const HydrothermalVent = require('./hydrothermal-vent');

describe('HydrothermalVentMap', function () {

    const HydrothermalVentMap = require('./hydrothermal-vent-map');

    describe('loadInput', function() {
        it('should load map based on the input', function () {
            const hydrothermalVentMap = new HydrothermalVentMap();
            hydrothermalVentMap.loadInput('test-input.txt');
            expect(hydrothermalVentMap.maxX).toBe(9);
            expect(hydrothermalVentMap.maxY).toBe(9);
            expect(hydrothermalVentMap.ventList.length).toBe(10);
        });
    });

    describe('mapVents', function() {
        it('should properly map a vent.', function () {
            const hydrothermalVentMap = new HydrothermalVentMap();
            hydrothermalVentMap.loadInput('test-input.txt');
            hydrothermalVentMap.mapVent(new HydrothermalVent('0,9 -> 5,9'));
            const expectedMapState = "..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n111111....\n";
            expect(hydrothermalVentMap.getStringRepresentationOfMap()).toBe(expectedMapState);
        });
    });

    describe('mapAllVents', function() {
        it('should properly map all the vents in thet list.', function () {
            const hydrothermalVentMap = new HydrothermalVentMap();
            hydrothermalVentMap.loadInput('test-input.txt');
            hydrothermalVentMap.mapAllVents();
            const expectedMapState = ".......1..\n..1....1..\n..1....1..\n.......1..\n.112111211\n..........\n..........\n..........\n..........\n222111....\n";
            expect(hydrothermalVentMap.getStringRepresentationOfMap()).toBe(expectedMapState);
        });
    });

    describe('countOverlapPoints', function() {
        it('should properly tabulate a count of the number of positions that have overlapping vents.', function () {
            const hydrothermalVentMap = new HydrothermalVentMap();
            hydrothermalVentMap.loadInput('test-input.txt');
            hydrothermalVentMap.mapAllVents();
            expect(hydrothermalVentMap.countVentOverlapPoints()).toBe(5);
        });
    });
 

});
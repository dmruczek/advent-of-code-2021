describe('HydrothermalVent', function () {

    const HydrothermalVent = require('./hydrothermal-vent');

    describe('constructor', function() {
        it('should load the Hydrothermal Vent data from the string representation passed in.', function () {
            const hydrothermalVent = new HydrothermalVent('1,2 -> 3,40');
            expect(hydrothermalVent.x1).toBe(1);
            expect(hydrothermalVent.y1).toBe(2);
            expect(hydrothermalVent.x2).toBe(3);
            expect(hydrothermalVent.y2).toBe(40);
        });
    });

    describe('isHorizontal', function() {
        it('should return true when the vent runs horizontally.', function () {
            expect((new HydrothermalVent('0,9 -> 5,9')).isHorizontal()).toBe(true);
            expect((new HydrothermalVent('7,0 -> 7,4')).isHorizontal()).toBe(false);
            expect((new HydrothermalVent('8,0 -> 0,8')).isHorizontal()).toBe(false);
        });
    });

    describe('isVertical', function() {
        it('should return true when the vent runs vertically.', function () {
            expect((new HydrothermalVent('0,9 -> 5,9')).isVertical()).toBe(false);
            expect((new HydrothermalVent('7,0 -> 7,4')).isVertical()).toBe(true);
            expect((new HydrothermalVent('8,0 -> 0,8')).isVertical()).toBe(false);
        });
    });
   
    describe('isVerticalOrHorizontal', function() {
        it('should return true when the vent runs either horizontally or vertically.', function () {
            expect((new HydrothermalVent('0,9 -> 5,9')).isVerticalOrHorizontal()).toBe(true);
            expect((new HydrothermalVent('7,0 -> 7,4')).isVerticalOrHorizontal()).toBe(true);
            expect((new HydrothermalVent('8,0 -> 0,8')).isVerticalOrHorizontal()).toBe(false);
        });
    });
    
});
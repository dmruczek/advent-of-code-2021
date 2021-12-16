describe('CaveNode', function () {

    const CaveNode = require('./cave-node');

    describe('isSmallCave', function() {
        it('should properly identify whether a cave is a small cave.', function () {
            expect(new CaveNode('a').isSmallCave()).toBe(true);
            expect(new CaveNode('start').isSmallCave()).toBe(true);
            expect(new CaveNode('end').isSmallCave()).toBe(true);
            expect(new CaveNode('ab').isSmallCave()).toBe(true);
            expect(new CaveNode('HN').isSmallCave()).toBe(false);
        });
    });


});
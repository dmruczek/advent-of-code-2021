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

    describe('isValidBasedOnAllowingOneSmallCaveToBeVisitedTwice', function() {
        it('should allow a path that has only one double-visit of a small cave.', function () {
            expect(new CaveNode().isValidBasedOnAllowingOneSmallCaveToBeVisitedTwice(['start', 'A', 'c', 'A', 'c'])).toBe(true);
        });
        it('should disallow a path that has three visits of a small cave.', function () {
            expect(new CaveNode().isValidBasedOnAllowingOneSmallCaveToBeVisitedTwice(['start', 'A', 'c', 'A', 'c', 'A', 'c'])).toBe(false);
        });
        it('should disallow a path that has more than one visit to "start".', function () {
            expect(new CaveNode().isValidBasedOnAllowingOneSmallCaveToBeVisitedTwice(['start', 'A', 'start'])).toBe(false);
        });

    });

    
    

});
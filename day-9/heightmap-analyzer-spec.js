describe('HeightmapAnalyzer', function () {

    const HeightmapAnalyzer = require('./heightmap-analyzer');

    describe('loadInput', function() {
        it('should load the heightmap correctly', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            expect(heightmapAnalyzer.heightmap).toEqual([
                [2,1,9,9,9,4,3,2,1,0],
                [3,9,8,7,8,9,4,9,2,1],
                [9,8,5,6,7,8,9,8,9,2],
                [8,7,6,7,8,9,6,7,8,9],
                [9,8,9,9,9,6,5,6,7,8]
            ]);
        });
    });

    describe('checkLowPoint', function() {
        it('should accurately detect whether a point is a low point.', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            expect(heightmapAnalyzer.checkLowPoint(0,0)).toBe(false);
            expect(heightmapAnalyzer.checkLowPoint(9,0)).toBe(true);
            expect(heightmapAnalyzer.checkLowPoint(0,4)).toBe(false);
            expect(heightmapAnalyzer.checkLowPoint(9,4)).toBe(false);
        });
    });

    describe('findAllLowPoints', function() {
        it('should correctly find all low points in the height map.', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            heightmapAnalyzer.findAllLowPoints();
            expect(heightmapAnalyzer.lowPoints).toEqual([
                {x: 1, y:0},
                {x: 9, y:0},
                {x: 2, y:2},
                {x: 6, y:4},
            ]);
        });
    });

    describe('calculateAggregateRiskLevelOfLowPoints', function() {
        it('should correctly calculate the aggregate risk level of all low points.', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            expect(heightmapAnalyzer.calculateAggregateRiskLevelOfLowPoints()).toBe(15);
        });
    });

    describe('findBasinForLowPoint', function() {
        it('should correctly find a basin, given a low point.', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            const basinPointList = heightmapAnalyzer.findBasinForLowPoint(9,0);
            expect(basinPointList).toEqual([
                {"x":9,"y":0},
                {"x":8,"y":0},
                {"x":7,"y":0},
                {"x":6,"y":0},
                {"x":5,"y":0},
                {"x":6,"y":1},
                {"x":8,"y":1},
                {"x":9,"y":1},
                {"x":9,"y":2}]);
        });
    });

    describe('findAllBasins', function() {
        it('should correctly find all basins.', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            heightmapAnalyzer.findAllBasins();
            expect(heightmapAnalyzer.basins.length).toBe(4);
        });
    });

    describe('calculateProductOfThreeLargestBasins', function() {
        it('should correctly calculate the product of the three largest basins.', function () {
            const heightmapAnalyzer = new HeightmapAnalyzer();
            heightmapAnalyzer.loadInput('test-input.txt');
            heightmapAnalyzer.findAllBasins();
            expect(heightmapAnalyzer.calculateProductOfThreeLargestBasins()).toBe(1134);
        });
    });

    

    

});
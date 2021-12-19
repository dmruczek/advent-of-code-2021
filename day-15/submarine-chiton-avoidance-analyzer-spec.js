describe('SubmarineChitonAvoidanceAnalyzer', function () {

    const SubmarineChitonAvoidanceAnalyzer = require('./submarine-chiton-avoidance-analyzer');

    describe('loadInput', function() {
        it('should properly load the chiton map data.', function () {
            const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
            submarineChitonAvoidanceAnalyzer.loadInput('test-input.txt');
            expect(submarineChitonAvoidanceAnalyzer.chitonRiskMatrix).toEqual([
                [0,1,6,3,7,5,1,7,4,2],
                [1,3,8,1,3,7,3,6,7,2],
                [2,1,3,6,5,1,1,3,2,8],
                [3,6,9,4,9,3,1,5,6,9],
                [7,4,6,3,4,1,7,1,1,1],
                [1,3,1,9,1,2,8,1,3,7],
                [1,3,5,9,9,1,2,4,2,1],
                [3,1,2,5,4,2,1,6,3,9],
                [1,2,9,3,1,3,8,5,2,1],
                [2,3,1,1,9,4,4,5,8,1]
            ]);
        });
    });

    describe('calculateAggregateRiskOfPosition', function() {
        it('should properly calculate the aggregate risk level of a given position.', function () {
            const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
            submarineChitonAvoidanceAnalyzer.loadInput('test-input.txt');
            expect(submarineChitonAvoidanceAnalyzer.calculateAggregateRiskOfPosition(9,9)).toBe(1);
            expect(submarineChitonAvoidanceAnalyzer.calculateAggregateRiskOfPosition(8,9)).toBe(9);
            expect(submarineChitonAvoidanceAnalyzer.calculateAggregateRiskOfPosition(0,0)).toBe(40);
        });
    });


    describe('doRiskCalculation', function() {

        it('should properly calculate the risk level given the simple case where we always go down and to the right.', function () {
            const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
            submarineChitonAvoidanceAnalyzer.loadInput('test-input.txt');
            expect(submarineChitonAvoidanceAnalyzer.doRiskCalculation()).toBe(40);
        });

        it('should sometimes go up, if that is better...', function () {
            const submarineChitonAvoidanceAnalyzer = new SubmarineChitonAvoidanceAnalyzer();
            submarineChitonAvoidanceAnalyzer.loadInput('test-input-2.txt');
            expect(submarineChitonAvoidanceAnalyzer.doRiskCalculation()).toBe(18);
        });

    });

    

});
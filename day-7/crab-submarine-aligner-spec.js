describe('CrabSubmarineAligner', function () {

    const CrabSubmarineAligner = require('./crab-submarine-aligner');

    describe('loadInput', function() {
        it('should load the crab submarine positions based on the input file.', function () {
            const crabSubmarineAligner = new CrabSubmarineAligner();
            crabSubmarineAligner.loadInput('test-input.txt');
            expect(crabSubmarineAligner.crabSubPositionArray).toEqual([16,1,2,0,4,2,7,1,2,14]);
            expect(crabSubmarineAligner.minSubPosition).toEqual(0);
            expect(crabSubmarineAligner.maxSubPosition).toEqual(16);
        });
    });

    describe('calculateFuelCostForPosition', function() {
        it('should calculate the fuel cost for all subs to move to the given position.', function () {
            const crabSubmarineAligner = new CrabSubmarineAligner();
            crabSubmarineAligner.loadInput('test-input.txt');
            expect(crabSubmarineAligner.calculateFuelCostForPosition(2)).toEqual(37);
        });

        it('should calculate the fuel cost for all subs to move to the given position for the enhanced fuel cost calculation.', function () {
            const crabSubmarineAligner = new CrabSubmarineAligner(true);
            crabSubmarineAligner.loadInput('test-input.txt');
            expect(crabSubmarineAligner.calculateFuelCostForPosition(5)).toEqual(168);
        });

    });

    describe('findOptimizedCrabSubPosition', function() {
        it('should find the best crab sub position.', function () {
            const crabSubmarineAligner = new CrabSubmarineAligner();
            crabSubmarineAligner.loadInput('test-input.txt');
            expect(crabSubmarineAligner.findOptimizedCrabSubPosition()).toBe(2);
        });
        it('should find the best crab sub position when using the enhanced fuel cost calculation.', function () {
            const crabSubmarineAligner = new CrabSubmarineAligner(true);
            crabSubmarineAligner.loadInput('test-input.txt');
            expect(crabSubmarineAligner.findOptimizedCrabSubPosition()).toBe(5);
        });

    });
    

});
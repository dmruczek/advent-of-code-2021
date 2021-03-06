describe('PolymerizationSimulator', function () {

    const PolymerizationSimulator = require('./polymerization-simulator');

    describe('loadInput', function() {
        it('should properly load the polymerization data.', function () {
            const polymerizationSimulator = new PolymerizationSimulator();
            polymerizationSimulator.loadInput('test-input.txt');
            expect(polymerizationSimulator.polymer).toEqual(['N', 'N', 'C', 'B']);
            expect(polymerizationSimulator.allPossibleElements).toEqual([ 'C', 'H', 'B', 'N' ]);
            expect(polymerizationSimulator.pairInsertionRuleMap.size).toBe(16);
            expect(polymerizationSimulator.pairInsertionRuleMap.get('CH')).toEqual('B');
            expect(polymerizationSimulator.pairInsertionRuleMap.get('NN')).toEqual('C');
            expect(polymerizationSimulator.pairInsertionRuleMap.get('CN')).toEqual('C');
        });
    });

    describe('simulatePairInsertionProcess', function() {
        it('should accurately simulate the pair insertion process based on the existing polymer and the defined polymer insertion rules.', function () {
            const polymerizationSimulator = new PolymerizationSimulator();
            polymerizationSimulator.loadInput('test-input.txt');
            polymerizationSimulator.simulatePairInsertionProcess();
            polymerizationSimulator.createElementOccurranceMap();
            // expect(polymerizationSimulator.polymer).toEqual(['N', 'C', 'N', 'B', 'C', 'H', 'B']);
            expect(polymerizationSimulator.elementOccuranceMap.get('N')).toBe(2);
            expect(polymerizationSimulator.elementOccuranceMap.get('C')).toBe(2);
            expect(polymerizationSimulator.elementOccuranceMap.get('B')).toBe(2);
            expect(polymerizationSimulator.elementOccuranceMap.get('H')).toBe(1);

            polymerizationSimulator.simulatePairInsertionProcess();
            polymerizationSimulator.createElementOccurranceMap();
            // expect(polymerizationSimulator.polymer).toEqual(['N', 'B', 'C', 'C', 'N', 'B', 'B', 'B', 'C', 'B', 'H', 'C', 'B']);
            expect(polymerizationSimulator.elementOccuranceMap.get('N')).toBe(2);
            expect(polymerizationSimulator.elementOccuranceMap.get('C')).toBe(4);
            expect(polymerizationSimulator.elementOccuranceMap.get('B')).toBe(6);
            expect(polymerizationSimulator.elementOccuranceMap.get('H')).toBe(1);
        });
    });

    describe('calculateMostCommonElementMinusLeastCommonElement', function() {
        it('should return the value represented by the most common element in the polymer minus the least common element in the polymer.', function () {
            const polymerizationSimulator = new PolymerizationSimulator();
            polymerizationSimulator.loadInput('test-input.txt');
            polymerizationSimulator.simulatePairInsertionProcessANumberOfTimes(10);
            expect(polymerizationSimulator.calculateMostCommonElementMinusLeastCommonElement()).toBe(1588);
        });

    });

    
    
 
});
describe('DepthAnalyzer', function () {

    const DepthAnalyzer = require('./depth-analyzer.js');

    describe('loadData', function() {

        it('should properly load the depth array', function () {
            const depthAnalyzer = new DepthAnalyzer(true);
            const expectedDepthArray = [199,200,208,210,200,207,240,269,260,263];
            expect(depthAnalyzer.depthArray).toEqual(expectedDepthArray);
        });

    });

    describe('runDepthScan', function() {

        it('should produce the correct number of depth increases', function () {
            const depthAnalyzer = new DepthAnalyzer(true);
            depthAnalyzer.runDepthScan();
            const numberOfDepthIncreases = depthAnalyzer.getNumberOfDepthIncreases();
            expect(numberOfDepthIncreases).toBe(7);
        });

    });

});
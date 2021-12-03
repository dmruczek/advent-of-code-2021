describe('DiagnosticAnalyzer', function () {

    const DiagnosticAnalyzer = require('./diagnostic-analyzer');

    describe('findGammaRate', function() {
        it('should properly find the gamma rate by looking at the most common bit at each index.', function () {
            const diagnosticAnalyzer = new DiagnosticAnalyzer();
            diagnosticAnalyzer.loadInput('test-input.txt');
            expect(diagnosticAnalyzer.findGammaRate()).toEqual('10110');
            expect(diagnosticAnalyzer.getGammaRateInDecimal()).toEqual(22);
        });
    });

    describe('findEpsilonRate', function() {
        it('should properly find the epsilon rate by finding the gamma rate and inverting it.', function () {
            const diagnosticAnalyzer = new DiagnosticAnalyzer();
            diagnosticAnalyzer.loadInput('test-input.txt');
            expect(diagnosticAnalyzer.findEpsilonRate()).toEqual('01001');
            expect(diagnosticAnalyzer.getEpsilonRateInDecimal()).toEqual(9);
        });
    });

    describe('calculatePowerConsumption', function() {
        it('should properly find the Power Consumption', function () {
            const diagnosticAnalyzer = new DiagnosticAnalyzer();
            diagnosticAnalyzer.loadInput('test-input.txt');
            expect(diagnosticAnalyzer.calculatePowerConsumption()).toEqual(198);
        });
    });

});
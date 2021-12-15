describe('NavigationSubsystemParser', function () {

    const NavigationSubsystemParser = require('./navigation-subsystem-parser');

    describe('findIllegalLinesAndComputeScore', function() {
        it('should properly compute the score based on invalid lines.', function () {
            const navigationSubsystemParser = new NavigationSubsystemParser();
            navigationSubsystemParser.loadInput('test-input.txt');
            expect(navigationSubsystemParser.findIllegalLinesAndComputeScore()).toBe(26397);
        });
    });

});
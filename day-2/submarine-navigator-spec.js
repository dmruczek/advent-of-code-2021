describe('SubmarineNavigator', function () {

    const SubmarineNavigator = require('./submarine-navigator.js');

    describe('loadInput', function() {

        it('should properly load the instruction list', function () {
            const submarineNavigator = new SubmarineNavigator();
            submarineNavigator.loadInput('test-input.txt');
            expect(submarineNavigator.instructionsList).toEqual([
                {direction: 'forward', magnitude: 5},
                {direction: 'down', magnitude: 5},
                {direction: 'forward', magnitude: 8},
                {direction: 'up', magnitude: 3},
                {direction: 'down', magnitude: 8},
                {direction: 'forward', magnitude: 2}
            ]);
        });

    });

    describe('navigate', function() {
        it('should properly follow the instructions in the list.', function () {
            const submarineNavigator = new SubmarineNavigator();
            submarineNavigator.loadInput('test-input.txt');
            submarineNavigator.navigate();
            expect(submarineNavigator.horizontalPosition).toBe(15);
            expect(submarineNavigator.depth).toBe(10);
        });
    });

    describe('navigateImproved', function() {
        it('should properly follow the instructions in the list.', function () {
            const submarineNavigator = new SubmarineNavigator();
            submarineNavigator.loadInput('test-input.txt');
            submarineNavigator.navigateImproved();
            expect(submarineNavigator.horizontalPosition).toBe(15);
            expect(submarineNavigator.depth).toBe(60);
        });
    });


});
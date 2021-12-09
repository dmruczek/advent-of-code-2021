describe('SubmarineDisplayDecoder', function () {

    const SubmarineDisplayDecoder = require('./submarine-display-decoder');

    describe('loadInput', function() {
        it('should load all displays in the input', function () {
            const submarineDisplayDecoder = new SubmarineDisplayDecoder();
            submarineDisplayDecoder.loadInput('test-input.txt');
            expect(submarineDisplayDecoder.displays.length).toBe(10);
        });
    });
    
    describe('countAll1478DigitsDisplayed', function() {
        it('should count the total number of 1, 4, 7, and 8 digits that are displayed in all displays', function () {
            const submarineDisplayDecoder = new SubmarineDisplayDecoder();
            submarineDisplayDecoder.loadInput('test-input.txt');
            expect(submarineDisplayDecoder.countAll1478DigitsDisplayed()).toBe(26);
        });
    });

    describe('decodeAllDisplaysAndSumValues', function() {
        it('should decode all displays and sum up their values.', function () {
            const submarineDisplayDecoder = new SubmarineDisplayDecoder();
            submarineDisplayDecoder.loadInput('test-input.txt');
            expect(submarineDisplayDecoder.decodeAllDisplaysAndSumValues()).toBe(61229);
        });
    });

});
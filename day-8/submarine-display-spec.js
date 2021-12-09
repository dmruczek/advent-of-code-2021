describe('SubmarineDisplay', function () {

    const SubmarineDisplay = require('./submarine-display');

    describe('constructor', function() {
        it('should parse the input string to create the display data.', function () {
            const submarineDisplay  = new SubmarineDisplay('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe');
            expect(submarineDisplay.signalPatterns).toEqual(['be', 'cfbegad', 'cbdgef', 'fgaecd', 'cgeb', 'fdcge', 'agebfd', 'fecdb', 'fabcd', 'edb']);
            expect(submarineDisplay.displayedDigits).toEqual(['fdgacbe', 'cefdb', 'cefbgd', 'gcbe']);
        });
    });
 
    describe('count1478DigitsDisplayed', function() {
        it('should properly count the number of 1, 4, 7, and 8 digits displayed in the final output.', function () {
            let submarineDisplay  = new SubmarineDisplay('be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe');
            expect(submarineDisplay.count1478DigitsDisplayed()).toBe(2);
            submarineDisplay  = new SubmarineDisplay('edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc');
            expect(submarineDisplay.count1478DigitsDisplayed()).toBe(3);
        });
    });

    describe('decodeDisplayedDigits', function() {
        it('should decode all digits displayed in the signal pattern', function () {
            let submarineDisplay  = new SubmarineDisplay('acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf');
            expect(submarineDisplay.decodeDisplayedDigits()).toEqual(5353);

        });
    });

    

});
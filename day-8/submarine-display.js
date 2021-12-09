'use strict';

module.exports = class SubmarineDisplay {

    constructor(submarineDisplayStr) {
        const splitStr = submarineDisplayStr.split(" | ");
        this.signalPatterns = splitStr[0].split(" ");
        this.displayedDigits = splitStr[1].split(" ");
    }

    count1478DigitsDisplayed() {
        // 1 uses 2 lines
        // 4 uses 4 lines
        // 7 uses 3 lines
        // 8 uses 7 lines

        let numberOf1478DigitsDisplayed = 0;
        for (let i = 0; i < this.displayedDigits.length; i++) {
            if (this.displayedDigits[i].length === 2 || 
                this.displayedDigits[i].length === 4 || 
                this.displayedDigits[i].length === 3 || 
                this.displayedDigits[i].length === 7) {
                numberOf1478DigitsDisplayed ++;
            }
        }
        return numberOf1478DigitsDisplayed;
    }

};
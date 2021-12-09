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



    // 5 lines:  "2", "3", "5"
    // 6 lines:  "0", "6", "9"


    // 0 --> 6 lines.  Has all lines from "1", but is missing one line from "4".
    // 1 --> 2 lines.
    // 2 --> 5 lines.  Missing 2 lines from "4".
    // 3 --> 5 lines.  Has all lines from "7", but is missing one line from "4".
    // 4 --> 4 lines.
    // 5 --> 5 lines.  Missing 1 line from "7" and one line from "4".
    // 6 --> 6 lines.  Missing 1 line from "1".
    // 7 --> 3 lines.
    // 8 --> 7 lines.
    // 9 --> 6 lines.  Has all lines from "4" and "7".

    decodeDisplayedDigits() {

        let decodedDigitArray = Array(10);
        for (let i = 0; i < this.signalPatterns.length; i++) {
            const pattern = this.signalPatterns[i];
            if (pattern.length === 2) {
                decodedDigitArray[1] = pattern;
            } else if (pattern.length === 4) {
                decodedDigitArray[4] = pattern;
            } else if (pattern.length === 3) {
                decodedDigitArray[7] = pattern;
            } else if (pattern.length === 7) {
                decodedDigitArray[8] = pattern;
            }
        }

        for (let i = 0; i < this.signalPatterns.length; i++) {
            const pattern = this.signalPatterns[i];
            if (pattern.length === 5) {
                if (this.countMissingLines(pattern, decodedDigitArray[4]) === 2) {
                    decodedDigitArray[2] = pattern;
                } else if (this.countMissingLines(pattern, decodedDigitArray[7]) === 0 && this.countMissingLines(pattern, decodedDigitArray[4]) === 1) {
                    decodedDigitArray[3] = pattern;
                } else if (this.countMissingLines(pattern, decodedDigitArray[7]) === 1 && this.countMissingLines(pattern, decodedDigitArray[4]) === 1) {
                    decodedDigitArray[5] = pattern;
                }
            } else if (pattern.length === 6) {
                if (this.countMissingLines(pattern, decodedDigitArray[1]) === 0 && this.countMissingLines(pattern, decodedDigitArray[4]) === 1) {
                    decodedDigitArray[0] = pattern;
                } else if (this.countMissingLines(pattern, decodedDigitArray[1]) === 1) {
                    decodedDigitArray[6] = pattern;
                } else if (this.countMissingLines(pattern, decodedDigitArray[4]) === 0 && this.countMissingLines(pattern, decodedDigitArray[7]) === 0) {
                    decodedDigitArray[9] = pattern;
                }
            }
        }
        this.decodedDigitArray = decodedDigitArray;

        return this.determineAllDisplayedDigits();
    }

    determineAllDisplayedDigits() {
        let displayedDigits = 0;
        displayedDigits += (this.translateDigit(this.displayedDigits[0]) * 1000);
        displayedDigits += (this.translateDigit(this.displayedDigits[1]) * 100);
        displayedDigits += (this.translateDigit(this.displayedDigits[2]) * 10);
        displayedDigits += this.translateDigit(this.displayedDigits[3]);
        this.decodedDisplayedDigits = displayedDigits;
        return displayedDigits;
    }

    translateDigit(digit) {
        for (let i = 0; i < this.decodedDigitArray.length; i++) {
            if (this.digitMatches(this.decodedDigitArray[i], digit)) {
                return i;
            }
        }
    }

    digitMatches(digit1, digit2) {
        return digit1.length === digit2.length && this.countMissingLines(digit1, digit2) === 0;

    }

    countMissingLines(digitToCheck, patternToCheckAgainst) {
        let missingLines = 0;
        for (let i = 0; i < patternToCheckAgainst.length; i++)  {
            if (!digitToCheck.includes(patternToCheckAgainst.charAt(i))) {
                missingLines += 1;
            }
        }
        return missingLines;
    }




};
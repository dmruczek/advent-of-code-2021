'use strict';

module.exports = class DiagnosticAnalyzer {

    constructor() { }

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        this.lines = data.split(os.EOL);
    }

    findMostCommonBit(index, lines) {
        if (!lines) {
            lines = this.lines;
        }
        let ones = 0;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].charAt(index) === '1') {
                ones ++;
            }
        }
        if (ones === (lines.length / 2)) {
            return 'X';
        } else if (ones > (lines.length / 2)) {
            return '1';
        } else {
            return '0';
        }
    }
    
    findGammaRate() {
        let gammaRate = '';
        for (let i = 0; i < this.lines[0].length; i++) {
            gammaRate = gammaRate + this.findMostCommonBit(i);
        }
        this.gammaRate = gammaRate;
        return gammaRate;
    }

    getGammaRateInDecimal() {
        return this.convertBinaryToDecimal(this.gammaRate);
    }

    getEpsilonRateInDecimal() {
        return this.convertBinaryToDecimal(this.epsilonRate);
    }

    convertBinaryToDecimal(binaryStr) {
        return parseInt(binaryStr, 2);
    }

    calculatePowerConsumption() {
        this.findGammaRate();
        this.findEpsilonRate();
        return this.getEpsilonRateInDecimal() * this.getGammaRateInDecimal();
    }

    calculateLifeSupportRating() {
        this.findOxygenGeneratorRating();
        this.findCO2ScrubberRating();
        return this.convertBinaryToDecimal(this.oxygenGeneratorRating) * this.convertBinaryToDecimal(this.CO2ScrubberRating);
    }

    findEpsilonRate() {
        if (!this.gammaRate) {
            this.findGammaRate();
        }
        let epsilonRate = '';
        for (let i = 0; i < this.gammaRate.length; i++) {
            if (this.gammaRate.charAt(i) === '1') {
                epsilonRate = epsilonRate += '0';
            } else {
                epsilonRate = epsilonRate += '1';
            }
        }
        this.epsilonRate = epsilonRate;
        return epsilonRate;
    }

    findOxygenGeneratorRating() {
        let lines = JSON.parse(JSON.stringify(this.lines));

        for (let i = 0; i < this.lines[0].length; i++) {
            let mostCommonBit = this.findMostCommonBit(i, lines);
            if (mostCommonBit === 'X') {
                mostCommonBit = '1';
            }
            for (let j = lines.length-1; j > -1; j--) {
                if (lines[j].charAt(i) !== mostCommonBit) {
                    lines.splice(j, 1);
                }
            }
            if (lines.length === 1) {
                this.oxygenGeneratorRating = lines[0];
                return this.oxygenGeneratorRating;
            }
        }
    }

    findCO2ScrubberRating() {
        let lines = JSON.parse(JSON.stringify(this.lines));

        for (let i = 0; i < this.lines[0].length; i++) {
            let mostCommonBit = this.findMostCommonBit(i, lines);
            let leastCommonBit = '0';
            if (mostCommonBit === '0') {
                leastCommonBit = '1';
            }

            for (let j = lines.length-1; j > -1; j--) {
                if (lines[j].charAt(i) !== leastCommonBit) {
                    lines.splice(j, 1);
                }
            }
            if (lines.length === 1) {
                this.CO2ScrubberRating = lines[0];
                return this.CO2ScrubberRating;
            }
        }
    }


};
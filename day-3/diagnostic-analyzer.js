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

    findMostCommonBit(index) {
        let ones = 0;
        for (let i = 0; i < this.lines.length; i++) {
            if (this.lines[i].charAt(index) === '1') {
                ones ++;
            }
        }
        if (ones > (this.lines.length / 2)) {
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


};
'use strict';

const SubmarineDisplay = require('./submarine-display');

module.exports = class SubmarineDisplayDecoder {

    constructor() {}

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);

        let displays = [];
        for (let i = 0; i < lines.length; i++) {
            displays.push(new SubmarineDisplay(lines[i]));
        }
        this.displays = displays;

    }

    countAll1478DigitsDisplayed() {
        let total1478DigitsDisplayed = 0;
        for (let i = 0; i < this.displays.length; i++) {
            total1478DigitsDisplayed += this.displays[i].count1478DigitsDisplayed();
        }
        return total1478DigitsDisplayed;
    }
        

};
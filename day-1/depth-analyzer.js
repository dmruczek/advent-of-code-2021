'use strict';

module.exports = class DepthAnalyzer {
    constructor(useTestData) {
        this.initialize(useTestData);
    }

    initialize(useTestData) {
        if (useTestData) {
            this.parseData('test-input.txt');
        } else {
            this.parseData('input.txt');
        }
    }

    parseData(filename) {
        const path = require('path');
        const fs = require('fs');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const stringArray = data.split('\r\n');
        this.depthArray = stringArray.map(function(item) {
            return parseInt(item, 10);
        });
    }

    runDepthScan() {
        let numberOfDepthIncreases = 0;
        for (let i = 0; i < this.depthArray.length - 1; i++) {
            if (this.depthArray[i] < this.depthArray[i+1]) {
                numberOfDepthIncreases++;
            }
        }
        this.numberOfDepthIncreases = numberOfDepthIncreases;
    }

    getNumberOfDepthIncreases() {
        return this.numberOfDepthIncreases;
    }

};
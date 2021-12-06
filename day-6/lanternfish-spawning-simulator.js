'use strict';

module.exports = class LanternfishSpawningSimulator {

    constructor() { }

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);

        const initialFishStrArray = lines[0].split(',');

        let fishList = [];
        for (let i = 0; i < initialFishStrArray.length; i++) {
            fishList.push(parseInt(initialFishStrArray[i], 10));
        }
        this.fishList = fishList;
    }

    simulateXCycles(numberOfCycles) {
        for (let i = 0; i < numberOfCycles; i++) {
            this.simulateOneCycle();
        }
    }
    
    simulateOneCycle() {
        for (let i = this.fishList.length-1; i >= 0; i--) {
            if (this.fishList[i] === 0) {
                this.fishList.push(8);
                this.fishList[i] = 6;
            } else {
                this.fishList[i] = this.fishList[i] - 1;
            }
        }
    }

    getNumberOfFish() {
        return this.fishList.length;
    }


};
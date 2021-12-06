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

        let fishMaturityLevelCountArray = [0,0,0,0,0,0,0,0,0];

        for (let i = 0; i < initialFishStrArray.length; i++) {
            fishMaturityLevelCountArray[initialFishStrArray[i]] += 1;
        }
        this.fishMaturityLevelCountArray = fishMaturityLevelCountArray;
    }

    simulateXCycles(numberOfCycles) {
        for (let i = 0; i < numberOfCycles; i++) {
            this.simulateOneCycle();
        }
    }
    
    simulateOneCycle() {

        let newFishMaturityLevelCountArray = [0,0,0,0,0,0,0,0,0];
        for (let i = 8; i > 0; i--) {
            newFishMaturityLevelCountArray[i-1] = this.fishMaturityLevelCountArray[i];
        }
        newFishMaturityLevelCountArray[8] = this.fishMaturityLevelCountArray[0];
        newFishMaturityLevelCountArray[6] = newFishMaturityLevelCountArray[6] + this.fishMaturityLevelCountArray[0];
        this.fishMaturityLevelCountArray = newFishMaturityLevelCountArray;
    }

    getNumberOfFish() {
        let totalNumberOfFish = 0;
        for (let i = 0; i < this.fishMaturityLevelCountArray.length; i++) {
            totalNumberOfFish += this.fishMaturityLevelCountArray[i];
        }
        return totalNumberOfFish;
    }


};
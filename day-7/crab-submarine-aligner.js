'use strict';

module.exports = class CrabSubmarineAligner {

    constructor(useEnhancedFuelCostCalculation) {
        this.useEnhancedFuelCostCalculation = useEnhancedFuelCostCalculation;
    }

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);

        const initialCrabSubPositionStrArray = lines[0].split(',');

        let crabSubPositionArray = [];
        let maxSubPosition = 0;
        let minSubPosition = 9999;

        for (let i = 0; i < initialCrabSubPositionStrArray.length; i++) {
            crabSubPositionArray[i] = parseInt(initialCrabSubPositionStrArray[i], 10);
            if (crabSubPositionArray[i] > maxSubPosition) {
                maxSubPosition = crabSubPositionArray[i];
            }
            if (minSubPosition > crabSubPositionArray[i]) {
                minSubPosition = crabSubPositionArray[i];
            }
        }
        this.crabSubPositionArray = crabSubPositionArray;
        this.maxSubPosition = maxSubPosition;
        this.minSubPosition = minSubPosition;
    }

    calculateFuelCostForDistance(x) {
        let stepCost = 1;
        let totalCost = 0;
        for (let i = 0; i < x; i ++) {
            totalCost += stepCost;
            stepCost += 1;
        }
        return totalCost;
    }

    calculateFuelCostForPosition(x) {
        if (this.useEnhancedFuelCostCalculation) {
            let totalFuelCost = 0;

            for (let i = 0; i < this.crabSubPositionArray.length; i++) {
                if (x > this.crabSubPositionArray[i]) {
                    totalFuelCost += this.calculateFuelCostForDistance(x - this.crabSubPositionArray[i]);
                } else {
                    totalFuelCost += this.calculateFuelCostForDistance(this.crabSubPositionArray[i] - x);
                }
            }
            return totalFuelCost;
        } else {
            let totalFuelCost = 0;
            for (let i = 0; i < this.crabSubPositionArray.length; i++) {
                if (x > this.crabSubPositionArray[i]) {
                    totalFuelCost += (x - this.crabSubPositionArray[i]);
                } else {
                    totalFuelCost += (this.crabSubPositionArray[i] - x);
                }
            }
            return totalFuelCost;
        }
    }

    findOptimizedCrabSubPosition() {
        return this.findOptimizedCrabSubPositionBetweenPositions(this.minSubPosition, this.maxSubPosition);
    }

    // printAllCrabPositionCosts() {
    //     let previousPositionCost;
    //     for (let i = this.minSubPosition; i <= this.maxSubPosition; i++) {
    //         const thisCost = this.calculateFuelCostForPosition(i);
    //         if (i != this.minSubPosition) {
    //             if (thisCost < previousPositionCost) {
    //                 console.log('Cost of ' + i + '\t' + thisCost + '\t\\/');
    //             } else {
    //                 console.log('Cost of ' + i + '\t' + thisCost + '\t^');
    //             }
    //         } else {
    //             console.log('Cost of ' + i + '\t' + thisCost);
    //         }
    //         previousPositionCost = thisCost;
    //     }
    // }

    findOptimizedCrabSubPositionBetweenPositions(p1, p2) {
        // console.log('Checking for best sub-region between ' + p1 + ' and ' + p2);
        if (p1 === p2) {
            // console.log('Found optimal position: ' + p1);
            return p1;
        } else if (p2 === (p1 + 1)) {
            const costOfP1 = this.calculateFuelCostForPosition(p1);
            const costOfP2 = this.calculateFuelCostForPosition(p2);
            if (costOfP1 < costOfP2) {
                // console.log('Found optimal position: ' + p1 + ' at a cost of ' + costOfP1);
                return p1;
            } else {
                // console.log('Found optimal position: ' + p2 + ' at a cost of ' + costOfP2);
                return p2;
            }
        }

        const midwayPoint = Math.floor(p1 + ((p2 - p1) / 2));
        const costForLowerRange = this.calculateFuelCostForPosition(midwayPoint - 1);
        const costForHigherRange = this.calculateFuelCostForPosition(midwayPoint + 1);
        if (costForLowerRange < costForHigherRange) {
            return this.findOptimizedCrabSubPositionBetweenPositions(p1, midwayPoint);
        } else {
            return this.findOptimizedCrabSubPositionBetweenPositions(midwayPoint, p2);
        }
        
    }


};
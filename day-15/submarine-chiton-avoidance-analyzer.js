'use strict';

module.exports = class SubmarineChitonAvoidanceAnalyzer {

    constructor() {}

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);
        this.processInputData(lines);
    }

    processInputData(lines) {
        let chitonRiskMatrix = [];
        let aggregateRiskMatrix = [];
        for (let y = 0; y < lines.length; y++) {
            chitonRiskMatrix.push([]);
            aggregateRiskMatrix.push([]);
            for (let x = 0; x < lines[y].length; x++) {
                chitonRiskMatrix[y].push(parseInt(lines[y].charAt(x), 10));
                aggregateRiskMatrix[y].push(undefined);
            }
        }
        this.chitonRiskMatrix = chitonRiskMatrix;
        this.aggregateRiskMatrix = aggregateRiskMatrix;
        // Setting first position to risk 0, since you start here.
        this.chitonRiskMatrix[0][0] = 0;
    }

    doRiskCalculation() {
        this.calculateAggregateRiskOfPosition(0,0);
        this.secondAggregateRiskPass();
        return this.aggregateRiskMatrix[0][0];
    }

    calculateAggregateRiskOfPosition(x, y) {
        let downRisk = 999999999;
        let rightRisk = 999999999;
        if (this.aggregateRiskMatrix[y][x]) {
            return this.aggregateRiskMatrix[y][x];
        }

        if (y < (this.chitonRiskMatrix.length - 1)) {
            // going down is an option.
            downRisk = this.calculateAggregateRiskOfPosition(x, y+1);
        }
        if (x < (this.chitonRiskMatrix[0].length - 1)) {
            // going right is an option.
            rightRisk = this.calculateAggregateRiskOfPosition(x+1, y);
        }
        let aggregateRisk = this.chitonRiskMatrix[y][x];
        if (downRisk === 999999999 && rightRisk === 999999999) {
            // already at the bottom right position.
        } else {
            if (downRisk < rightRisk) {
                aggregateRisk += downRisk;
            } else {
                aggregateRisk += rightRisk;
            }
        }
        this.aggregateRiskMatrix[y][x] = aggregateRisk;
        return aggregateRisk;
    }




    secondAggregateRiskPass() {

        for (let y = this.aggregateRiskMatrix.length - 1; y > -1 ; y--) {
            for (let x = this.aggregateRiskMatrix[y].length - 1; x > -1 ; x--) {
                // check if UP is better:
                if (y > 0 && (this.aggregateRiskMatrix[y-1][x] + this.chitonRiskMatrix[y][x]) < this.aggregateRiskMatrix[y][x]) {
                    // OK, up is better... Now what? ... Check if others depended on me, if so, update it and anyone who depended on him.
                    // console.log(`need to adjust X: ${x}, Y: ${y}.  ${this.aggregateRiskMatrix[y-1][x]} is less than ${this.aggregateRiskMatrix[y][x]}`);
                    this.cascadeAdjustments(this.aggregateRiskMatrix[y-1][x] + this.chitonRiskMatrix[y][x], x, y);
                }
                if (x > 0 && (this.aggregateRiskMatrix[y][x-1] + this.chitonRiskMatrix[y][x]) < this.aggregateRiskMatrix[y][x]) {
                    // OK, left is better... Now what? ... Check if others depended on me, if so, update it and anyone who depended on him.
                    this.cascadeAdjustments(this.aggregateRiskMatrix[y][x-1] + this.chitonRiskMatrix[y][x], x, y);
                }


            }
        }
    }

    cascadeAdjustments(newValue, x, y) {
        // did others depend on me?
        const oldValue = this.aggregateRiskMatrix[y][x];
        this.aggregateRiskMatrix[y][x] = newValue;

        // cascade upward
        if (y > 0 && this.aggregateRiskMatrix[y-1][x] === oldValue + this.chitonRiskMatrix[y-1][x]) {
            this.cascadeAdjustments(newValue + this.chitonRiskMatrix[y-1][x], x, y-1);
        }

        // cascade leftward
        if (x > 0 && this.aggregateRiskMatrix[y][x-1] === oldValue + this.chitonRiskMatrix[y][x-1]) {
            this.cascadeAdjustments(newValue + this.chitonRiskMatrix[y][x-1], x-1, y);
        }

        // cascade downward
        if ((y < this.aggregateRiskMatrix - 2) && this.aggregateRiskMatrix[y+1][x] === oldValue + this.chitonRiskMatrix[y+1][x]) {
            this.cascadeAdjustments(newValue + this.chitonRiskMatrix[y+1][x], x, y+1);
        }

        // cascade rightward
        if ((x < this.aggregateRiskMatrix[0] - 2) && this.aggregateRiskMatrix[y][x+1] === oldValue + this.chitonRiskMatrix[y][x+1]) {
            this.cascadeAdjustments(newValue + this.chitonRiskMatrix[y][x+1], x+1, y);
        }


    }



    printAggregateRiskMatrix() {

        for (let y = 0; y < this.aggregateRiskMatrix.length; y++) {
            let str = "";
            for (let x = 0; x < this.aggregateRiskMatrix[y].length; x++) {
                const thisVal = this.aggregateRiskMatrix[y][x];
                if (thisVal >= 100) {
                    str += thisVal + " ";
                } else if (thisVal >= 10) {
                    str += " " + thisVal + " ";
                } else {
                    str += "  " + thisVal + " ";
                }
            }
            console.log(str);
        }

    }
    

};
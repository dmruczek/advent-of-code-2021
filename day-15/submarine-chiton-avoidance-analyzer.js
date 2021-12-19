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
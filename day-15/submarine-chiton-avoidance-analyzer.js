'use strict';

module.exports = class SubmarineChitonAvoidanceAnalyzer {

    constructor() {}

    loadInput(filename, enhanced) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);
        if (enhanced) {
            this.processInputDataEnhanced(lines);
        } else {
            this.processInputData(lines);
        }
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

    processInputDataEnhanced(lines) {
        let chitonRiskMatrix = Array(lines.length * 5);
        let aggregateRiskMatrix = Array(lines.length * 5);

        for (let i = 0; i < chitonRiskMatrix.length; i++) {
            chitonRiskMatrix[i] = Array(lines[0].length * 5);
            aggregateRiskMatrix[i] = Array(lines[0].length * 5);
        }

        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                const thisNum = parseInt(lines[y].charAt(x), 10);

                for (let yO = 0; yO < 5; yO ++) {
                    for (let xO = 0; xO < 5; xO ++) {
                        let num = thisNum + (xO + yO);
                        if (num > 9) {
                            num -= 9;
                        }
                        chitonRiskMatrix[y + yO * (lines.length)][x + xO * (lines[0].length)] = num;
                    }
                }
            }
        }
        this.chitonRiskMatrix = chitonRiskMatrix;
        this.aggregateRiskMatrix = aggregateRiskMatrix;
        // Setting first position to risk 0, since you start here.
        this.chitonRiskMatrix[0][0] = 0;
    }

    doRiskCalculation() {

        this.calculateAggregateRiskOfPosition(0,0);
        console.log('completed initial analysis.  Risk Level: ' + this.aggregateRiskMatrix[0][0]);
        // console.log(this.aggregateRiskMatrix[0][0]);
        this.printPath();
        let shouldDoAdditoinalAggregateRiskPass = true;
        let additionalPassNumber = 1;
        while (shouldDoAdditoinalAggregateRiskPass) {
            this.pointsOfInterestMap = new Map();
            this.markPointsOfInterestAlongPath();
            // console.log(this.pointsOfInterestMap);
            shouldDoAdditoinalAggregateRiskPass = this.doAdditionalAggregateRiskPass();
            console.log('completed additional pass.  Risk Level: ' + this.aggregateRiskMatrix[0][0]);
            additionalPassNumber++;
        }
        // this.printPath();
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




    doAdditionalAggregateRiskPass() {

        let somethingChanged = false;
        for (let y = this.aggregateRiskMatrix.length - 1; y > -1 ; y--) {
            for (let x = this.aggregateRiskMatrix[y].length - 1; x > -1 ; x--) {

                // only do this calculation at "points of interest" (points on or near the line).
                if (this.isPointOfInterest(x, y)) {
                    if (y > 0 && (this.aggregateRiskMatrix[y-1][x] + this.chitonRiskMatrix[y][x]) < this.aggregateRiskMatrix[y][x]) {
                        // OK, up is better... Now what? ... Check if others depended on me, if so, update it and anyone who depended on him.
                        // console.log(`need to adjust X: ${x}, Y: ${y}.  ${this.aggregateRiskMatrix[y-1][x]} is less than ${this.aggregateRiskMatrix[y][x]}`);
                        // console.log('tweaking up');
                        this.markPointOfInterest(x, y-1, 6);
                        this.cascadeAdjustments(this.aggregateRiskMatrix[y-1][x] + this.chitonRiskMatrix[y][x], x, y);
                        somethingChanged = true;
                    }
                    if (x > 0 && (this.aggregateRiskMatrix[y][x-1] + this.chitonRiskMatrix[y][x]) < this.aggregateRiskMatrix[y][x]) {
                        // OK, left is better... Now what? ... Check if others depended on me, if so, update it and anyone who depended on him.
                        // console.log('tweaking left');
                        this.markPointOfInterest(x-1, y, 6);
                        this.cascadeAdjustments(this.aggregateRiskMatrix[y][x-1] + this.chitonRiskMatrix[y][x], x, y);
                        somethingChanged = true;
                    }
                }

            }
        }
        return somethingChanged;
    }

    cascadeAdjustments(newValue, x, y) {
        if (this.isPointOfInterest(x, y)) {
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
            if ((y <= this.aggregateRiskMatrix.length - 2) && this.aggregateRiskMatrix[y+1][x] === oldValue + this.chitonRiskMatrix[y+1][x]) {
                this.cascadeAdjustments(newValue + this.chitonRiskMatrix[y+1][x], x, y+1);
            }

            // cascade rightward
            if ((x <= this.aggregateRiskMatrix[0].length - 2) && this.aggregateRiskMatrix[y][x+1] === oldValue + this.chitonRiskMatrix[y][x+1]) {
                this.cascadeAdjustments(newValue + this.chitonRiskMatrix[y][x+1], x+1, y);
            }

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


    isPointOfInterest(x, y) {
        return this.pointsOfInterestMap.get(JSON.stringify({x: x, y: y}));
    }

    markPointOfInterest(x, y, n) {
        // marks points of interest with a radius of n.
        if (!n) {
            n = 1;
        }
        for (let xO = -1 * n; xO <= n; xO++) {
            for (let yO = -1 * n; yO <= n; yO++) {
                this.pointsOfInterestMap.set(JSON.stringify({x: x + xO, y: y + yO}), true);
            }
        }
    }

    markPointsOfInterestAlongPath() {
        let y = 0; 
        let x = 0;

        this.markPointOfInterest(x,y,1);

        while (x !== this.chitonRiskMatrix[0].length - 1 || y !== this.chitonRiskMatrix.length - 1) {

            let left = 99999;
            let right = 99999;
            let up = 99999;
            let down = 99999;

            if (x > 0) {
                left = this.aggregateRiskMatrix[y][x-1];
            }
            if (x < this.chitonRiskMatrix[0].length - 1) {
                right = this.aggregateRiskMatrix[y][x+1];
            }
            if (y > 0) {
                up = this.aggregateRiskMatrix[y-1][x];
            }
            if (y < this.chitonRiskMatrix.length - 1) {
                down = this.aggregateRiskMatrix[y+1][x];
            }

            if (up <= left && up <= right && up <= down) {
                y--;
            } else if (down <= left && down <= right && down <= up) {
                y++;
            } else if (left <= down && left <= right && left <= up) {
                x--;
            } else if (right <= down && right <= left && right <= up) {
                x++;
            }
            this.markPointOfInterest(x,y);
        }
    }
    
    printPath() {

        let matrix = JSON.parse(JSON.stringify(this.chitonRiskMatrix));
        matrix[0][0] = ' ';

        let y = 0; 
        let x = 0;

        while (x !== this.chitonRiskMatrix[0].length - 1 || y !== this.chitonRiskMatrix.length - 1) {

            // console.log(`${x}, ${y}`)
            let left = 99999;
            let right = 99999;
            let up = 99999;
            let down = 99999;

            if (x > 0) {
                left = this.aggregateRiskMatrix[y][x-1];
            }
            if (x < this.chitonRiskMatrix[0].length - 1) {
                right = this.aggregateRiskMatrix[y][x+1];
            }
            if (y > 0) {
                up = this.aggregateRiskMatrix[y-1][x];
            }
            if (y < this.chitonRiskMatrix.length - 1) {
                down = this.aggregateRiskMatrix[y+1][x];
            }

            // console.log(`up= ${up}, down=${down}, left=${left}, right=${right}`);

            if (up <= left && up <= right && up <= down) {
                y--;
            } else if (down <= left && down <= right && down <= up) {
                y++;
            } else if (left <= down && left <= right && left <= up) {
                x--;
            } else if (right <= down && right <= left && right <= up) {
                x++;
            }
            matrix[y][x] = ' ';
        }

        console.log("");
        for (let y = 0; y < matrix.length; y++) {
            let str = "";
            for (let x = 0; x < matrix[y].length; x++) {
                str += matrix[y][x];
            }
            console.log(str);
        }


    }


};
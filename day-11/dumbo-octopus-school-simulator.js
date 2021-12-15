'use strict';

module.exports = class DumboOctopusSchoolSimulator {

    constructor() {}

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);
        let octopusMatrix = [];

        for (let i = 0; i < lines.length; i++) {
            octopusMatrix.push(this.parseOctopusRow(lines[i]));
        }
        this.octopusMatrix = octopusMatrix;
        this.maxX = this.octopusMatrix[0].length-1;
        this.maxY = this.octopusMatrix.length-1;
        this.totalFlashes = 0;
    }

    parseOctopusRow(octopusRowStr) {
        let row = [];
        for (let i = 0; i < octopusRowStr.length; i++) {
            row.push(parseInt(octopusRowStr.charAt(i), 10));
        }
        return row;
    }

    runSteps(n) {
        for (let i = 0; i < n; i++) {
            this.processStep();
        }
    }

    processStep() {
        let octopiToProcess = [];
        for (let thisX = 0; thisX <= this.maxX; thisX ++) {
            for (let thisY = 0; thisY <= this.maxY; thisY ++) {
                octopiToProcess.push({x: thisX, y: thisY});
            }
        }
        while (octopiToProcess.length > 0) {
            const thisOctopus = octopiToProcess.pop();
            let newOctopiToProcess = this.processOctopus(thisOctopus.x, thisOctopus.y);
            octopiToProcess.push(...newOctopiToProcess);
        }
        for (let thisX = 0; thisX <= this.maxX; thisX ++) {
            for (let thisY = 0; thisY <= this.maxY; thisY ++) {
                if (this.octopusMatrix[thisY][thisX] > 9) {
                    this.totalFlashes++;
                    this.octopusMatrix[thisY][thisX] = 0;
                }
            }
        }
    }

    processOctopus(x, y) {
        let otherOctopiToProcess = [];
        this.octopusMatrix[y][x] = this.octopusMatrix[y][x] + 1;
        if (this.octopusMatrix[y][x] === 10) {
            otherOctopiToProcess = this.getSurroundingOctopi(x, y);
        }
        return otherOctopiToProcess;
    }

    getSurroundingOctopi(x, y) {
        let surroundingOctopi = [];
        for (let xS = x-1; xS <= x+1; xS++) {
            for (let yS = y-1; yS <= y+1; yS++) {
                if (yS === y && xS == x) {
                    // skip this one.
                } else {
                    if (yS < 0 || yS > this.maxY || xS < 0 || xS > this.maxX) {
                        // skip this one.
                    } else {
                        surroundingOctopi.push({x:xS, y:yS});
                    }
                }
            }
        }
        return surroundingOctopi;
    }

    // printOctopusMatrix() {
    //     for (let thisY = 0; thisY <= this.maxY; thisY ++) {        
    //         let str = '';
    //         for (let thisX = 0; thisX <= this.maxX; thisX ++) {
    //             str += this.octopusMatrix[thisY][thisX];
    //         }
    //         console.log(str);
    //     }
    // }

};
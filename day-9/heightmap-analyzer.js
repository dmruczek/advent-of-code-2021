'use strict';

module.exports = class HeightmapAnalyzer {

    constructor() {}

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);

        let heightmap = [];
        for (let i = 0; i < lines.length; i++) {
            heightmap.push([]);
            for (let j = 0; j < lines[i].length; j++) {
                heightmap[i].push(parseInt(lines[i].charAt(j)));
            }
        }
        this.heightmap = heightmap;
    }

    findAllLowPoints() {
        let lowPoints = [];
        for (let thisY = 0; thisY < this.heightmap.length; thisY++) {
            for (let thisX = 0; thisX < this.heightmap[thisY].length; thisX++) {
                if (this.checkLowPoint(thisX, thisY)) {
                    lowPoints.push({x: thisX, y:thisY});
                }
            }
        }
        this.lowPoints = lowPoints;
    }


    calculateRiskLevelOfPoint(x, y) {
        return this.heightmap[y][x] + 1;
    }

    calculateAggregateRiskLevelOfLowPoints() {
        this.findAllLowPoints();
        let aggregateRiskLevelOfLowPoints = 0;
        for (let i = 0; i < this.lowPoints.length; i++) {
            aggregateRiskLevelOfLowPoints += this.calculateRiskLevelOfPoint(this.lowPoints[i].x, this.lowPoints[i].y);
        }
        return aggregateRiskLevelOfLowPoints;
    }

    checkLowPoint(x, y) {
        const thisValue = this.heightmap[y][x];
        let isLowpoint = true;
        if (x > 0) {
            isLowpoint = isLowpoint && (thisValue < this.heightmap[y][x-1]);
        }
        if (x < (this.heightmap[0].length-1)) {
            isLowpoint = isLowpoint && (thisValue < this.heightmap[y][x+1]);
        }
        if (y > 0) {
            isLowpoint = isLowpoint && (thisValue < this.heightmap[y-1][x]);
        }
        if (y < (this.heightmap.length-1)) {
            isLowpoint = isLowpoint && (thisValue < this.heightmap[y+1][x]);
        }
        return isLowpoint;
    }

};
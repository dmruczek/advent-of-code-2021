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

    calculateProductOfThreeLargestBasins() {
        this.basins.sort(function(basinA, basinB) {
            return basinB.length - basinA.length;
        });
        return this.basins[0].length * this.basins[1].length * this.basins[2].length;
    }

    findAllBasins() {
        this.findAllLowPoints();
        let basins = [];
        for (let i = 0; i < this.lowPoints.length; i++) {
            basins.push(this.findBasinForLowPoint(this.lowPoints[i].x, this.lowPoints[i].y));
        }
        this.basins = basins;
    }

    findBasinForLowPoint(x,y) {
        let basinMap = this.expandBasinFromPoint(x,y);
        let basinPointList = [{x:x, y:y}];
        for (const point of basinMap.keys()) {
            basinPointList.push(JSON.parse(point));
        }
        return basinPointList;
    }


    expandBasinFromPoint(x,y, basinPointMap) {
        const thisValue = this.heightmap[y][x];
        if (!basinPointMap) {
            basinPointMap = new Map();
        }

        if (x > 0) {
            const newPoint = {x:x-1, y:y};
            const newPointKey = JSON.stringify(newPoint);
            if (!basinPointMap.has(newPointKey) && thisValue < this.heightmap[newPoint.y][newPoint.x] && this.heightmap[newPoint.y][newPoint.x] !== 9) {
                // console.log('Adding point: (x:' + newPoint.x + ', y:' + newPoint.y + ')');
                basinPointMap.set(newPointKey, true);
                basinPointMap = this.expandBasinFromPoint(newPoint.x, newPoint.y, basinPointMap);
            }
        }
        if (x < (this.heightmap[0].length-1)) {
            const newPoint = {x:x+1, y:y};
            const newPointKey = JSON.stringify(newPoint);
            if (!basinPointMap.has(newPointKey) && thisValue < this.heightmap[newPoint.y][newPoint.x] && this.heightmap[newPoint.y][newPoint.x] !== 9) {
                // console.log('Adding point: (x:' + newPoint.x + ', y:' + newPoint.y + ')');
                basinPointMap.set(newPointKey, true);
                basinPointMap = this.expandBasinFromPoint(newPoint.x, newPoint.y, basinPointMap);
            }
        }
        if (y > 0) {
            const newPoint = {x:x, y:y-1};
            const newPointKey = JSON.stringify(newPoint);
            if (!basinPointMap.has(newPointKey) && thisValue < this.heightmap[newPoint.y][newPoint.x] && this.heightmap[newPoint.y][newPoint.x] !== 9) {
                // console.log('Adding point: (x:' + newPoint.x + ', y:' + newPoint.y + ')');
                basinPointMap.set(newPointKey, true);
                basinPointMap = this.expandBasinFromPoint(newPoint.x, newPoint.y, basinPointMap);
            }
        }
        if (y < (this.heightmap.length-1)) {
            const newPoint = {x:x, y:y+1};
            const newPointKey = JSON.stringify(newPoint);
            if (!basinPointMap.has(newPointKey) && thisValue < this.heightmap[newPoint.y][newPoint.x] && this.heightmap[newPoint.y][newPoint.x] !== 9) {
                // console.log('Adding point: (x:' + newPoint.x + ', y:' + newPoint.y + ')');
                basinPointMap.set(newPointKey, true);
                basinPointMap = this.expandBasinFromPoint(newPoint.x, newPoint.y, basinPointMap);
            }
        }
        return basinPointMap;
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
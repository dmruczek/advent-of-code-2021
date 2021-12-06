'use strict';

const HydrothermalVent = require('./hydrothermal-vent');

module.exports = class HydrothermalVentMap {

    constructor() { }

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);

        let ventList = [];
        let maxX = 0;
        let maxY = 0;
        for (let i = 0; i < lines.length; i++) {
            ventList.push(new HydrothermalVent(lines[i]));
            if (ventList[i].x1 > maxX) {
                maxX = ventList[i].x1;
            }
            if (ventList[i].x2 > maxX) {
                maxX = ventList[i].x2;
            }
            if (ventList[i].y1 > maxY) {
                maxY = ventList[i].y1;
            }
            if (ventList[i].y2 > maxY) {
                maxY = ventList[i].y2;
            }
        }

        let map = Array(maxY+1);
        for (let i = 0; i < map.length; i++) {
            map[i] = Array(maxX+1).fill(0);
        }

        this.maxX = maxX;
        this.maxY = maxY;
        this.map = map;
        this.ventList = ventList;
    }

    mapAllVents() {
        for (let i = 0; i < this.ventList.length; i++) {
            this.mapVent(this.ventList[i], true);
        }
    }

    mapAllHorizontalAndVerticalVents() {
        for (let i = 0; i < this.ventList.length; i++) {
            this.mapVent(this.ventList[i], false);
        }
    }

    mapVent(vent, shouldConsiderDiagonal) {

        if (vent.isVertical()) {
            let y1 = vent.y1;
            let y2 = vent.y2;
            if (y1 > y2) {
                y1 = vent.y2;
                y2 = vent.y1;
            }
            let x = vent.x1;
            for (let y = y1; y <= y2; y++) {
                this.map[y][x] += 1;
            }
        } else if (vent.isHorizontal()) {
            let x1 = vent.x1;
            let x2 = vent.x2;
            if (x1 > x2) {
                x1 = vent.x2;
                x2 = vent.x1;
            }
            let y = vent.y1;
            for (let x = x1; x <= x2; x++) {
                this.map[y][x] += 1;
            }
        } else if (shouldConsiderDiagonal) {
            const x1 = vent.x1;
            const x2 = vent.x2;
            const y1 = vent.y1;
            const y2 = vent.y2;

            let xDirection = 1;
            let yDirection = 1;

            let maxOffset = x2-x1 + 1;
            if (x1 > x2) {
                xDirection = -1;
                maxOffset = x1-x2 + 1;
            }
            if (y1 > y2) {
                yDirection = -1;
            }

            for (let offset = 0; offset < maxOffset; offset++) {
                this.map[y1 + (offset * yDirection)][x1 + (offset * xDirection)] += 1;
            }
        }
    }

    countVentOverlapPoints() {
        let overlapPoints = 0;
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map.length; x++) {
                if (this.map[y][x] >= 2)  {
                    overlapPoints += 1;
                }
            }
        }
        return overlapPoints;
    }

    getStringRepresentationOfMap() {
        let mapStr = '';
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map.length; x++) {
                if (this.map[y][x] === 0) {
                    mapStr += '.';
                } else {
                    mapStr += this.map[y][x];
                }
            }
            mapStr += '\n';
        }
        return mapStr;
    }


};
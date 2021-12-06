'use strict';

module.exports = class HydrothermalVent {

    constructor(str) {
        const matchResults = str.match(/(\d+),(\d+)[^\d]+(\d+),(\d+)/);
        this.x1 = parseInt(matchResults[1], 10);
        this.y1 = parseInt(matchResults[2], 10);
        this.x2 = parseInt(matchResults[3], 10);
        this.y2 = parseInt(matchResults[4], 10);
    }

    isVertical() {
        return this.x1 === this.x2;
    }

    isHorizontal() {
        return this.y1 === this.y2;
    }

    isVerticalOrHorizontal() {
        return this.isVertical() || this.isHorizontal();
    }

};
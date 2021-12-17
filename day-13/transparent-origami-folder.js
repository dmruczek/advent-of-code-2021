'use strict';

module.exports = class TransparentOrigamiFolder {

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
        let dotList = [];
        let foldInstructionList = [];
        let maxX = 0;
        let maxY = 0;

        for (let i = 0; i < lines.length; i++) {
            const thisLine = lines[i];
            if (thisLine.includes(',')) {
                const split = thisLine.split(',');
                dotList.push({x: parseInt(split[0], 10), y: parseInt(split[1], 10)});
                if (dotList[dotList.length-1].x > maxX) {
                    maxX = dotList[dotList.length-1].x;
                }
                if (dotList[dotList.length-1].y > maxY) {
                    maxY = dotList[dotList.length-1].y;
                }
            } else if (thisLine.includes('fold along')) {
                const matchResults = thisLine.match(/fold along ([yx])=(\d+)/);
                foldInstructionList.push({
                    axis: matchResults[1],
                    location: parseInt(matchResults[2], 10)
                });
            }
        }
        this.dotList = dotList;
        this.foldInstructionList = foldInstructionList;
        this.maxX = maxX;
        this.maxY = maxY;
    }

    processAllFoldingInstructions() {
        for (let i = 0; i < this.foldInstructionList.length; i++) {
            this.processFoldInstruction(this.foldInstructionList[i]);
        }
    }

    processFoldInstruction(foldInstruction) {
        const foldAxis = foldInstruction.axis;
        const foldLocation = foldInstruction.location;
        if (foldAxis === 'y') {
            // fold upward
            this.maxY = foldLocation - 1;
            for (let i = 0; i < this.dotList.length; i++) {
                if (this.dotList[i].y > foldLocation) {
                    this.dotList[i].y = this.dotList[i].y - ((this.dotList[i].y - foldLocation) * 2);
                }
            }
        } else if (foldAxis === 'x') {
            // fold left
            this.maxX = foldLocation - 1;
            for (let i = 0; i < this.dotList.length; i++) {
                if (this.dotList[i].x > foldLocation) {
                    this.dotList[i].x = this.dotList[i].x - ((this.dotList[i].x - foldLocation) * 2);
                }
            }
        }
    }

    countVisibleDots() {
        const pointMap = new Map();
        for (let i = 0; i < this.dotList.length; i++) {
            pointMap.set(JSON.stringify(this.dotList[i]), true);
        }
        return pointMap.size;
    }

    getPaperAsString() {
        let paperStr = '';
        let matrix = Array(this.maxY+1);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = Array(this.maxX+1);
            matrix[i].fill('.');
        }

        for (let i = 0; i < this.dotList.length; i++) {
            matrix[this.dotList[i].y][this.dotList[i].x] = '#';
        }

        for (let y = 0; y < matrix.length; y++) {
            let str = '';
            for (let x = 0; x < matrix[0].length; x++) {
                str += matrix[y][x];
            }
            paperStr += str + '\n';
        }
        return paperStr;
    }



};
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


    findPathThroughExpansion() {
        let expansionMatrix = JSON.parse(JSON.stringify(this.chitonRiskMatrix));
        let fullyExpandedNodesMap = new Map();
        fullyExpandedNodesMap.set(JSON.stringify({x: 0, y: 0}), {x: 0, y: 0});
        for (let y = expansionMatrix.length - 1; y > -1 ; y--) {
            for (let x = expansionMatrix[y].length - 1; x > -1 ; x--) {
                expansionMatrix[y][x] = 0;
            }
        }

        let i = 0;
        while (!fullyExpandedNodesMap.has(JSON.stringify({x:this.chitonRiskMatrix[0].length-1, y:this.chitonRiskMatrix.length-1}))) {
            let nodesToExpandToMap = new Map();
            for (const coords of fullyExpandedNodesMap.values()) {
                if (!fullyExpandedNodesMap.has(JSON.stringify({x: coords.x-1, y: coords.y}))) {
                    if (coords.x > 0) {
                        nodesToExpandToMap.set(JSON.stringify({x: coords.x-1, y: coords.y}), {x: coords.x-1, y: coords.y});
                    }
                }
                if (!fullyExpandedNodesMap.has(JSON.stringify({x: coords.x+1, y: coords.y}))) {
                    if (coords.x < this.chitonRiskMatrix[0].length - 1) {
                        nodesToExpandToMap.set(JSON.stringify({x: coords.x+1, y: coords.y}), {x: coords.x+1, y: coords.y});
                    }
                }
                if (!fullyExpandedNodesMap.has(JSON.stringify({x: coords.x, y: coords.y-1}))) {
                    if (coords.y > 0) {
                        nodesToExpandToMap.set(JSON.stringify({x: coords.x, y: coords.y-1}), {x: coords.x, y: coords.y-1});
                    }
                }
                if (!fullyExpandedNodesMap.has(JSON.stringify({x: coords.x, y: coords.y+1}))) {
                    if (coords.y < this.chitonRiskMatrix.length - 1) {
                        nodesToExpandToMap.set(JSON.stringify({x: coords.x, y: coords.y+1}), {x: coords.x, y: coords.y+1});
                    }
                }
            }

            for (const coords of nodesToExpandToMap.values()) {
                expansionMatrix[coords.y][coords.x] += 1;
                if (expansionMatrix[coords.y][coords.x] === this.chitonRiskMatrix[coords.y][coords.x]) {
                    fullyExpandedNodesMap.set(JSON.stringify(coords), coords);
                }
            }
            i++;
        }
        return i;
    }

};
'use strict';

const Chunk = require('./chunk');

module.exports = class NavigationSubsystemParser {

    constructor() {}

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);
        this.lines = lines;
    }

    findLegalLinesAndComputeScore() {
        let scores = [];
        for (let i = 0; i < this.lines.length; i++) {
            const chunk = new Chunk(this.lines[i]);
            if (chunk.isValid()) {
                chunk.completePatternForValidChunk();
                scores.push(chunk.getScore());
            }
        }
        scores.sort(function(a, b) {
            return a - b;
        });
        return scores[Math.floor(scores.length / 2)];
    }

    findIllegalLinesAndComputeScore() {
        let score = 0;
        for (let i = 0; i < this.lines.length; i++) {
            const chunk = new Chunk(this.lines[i]);
            if (!chunk.isValid()) {
                if (chunk.firstIllegalCharacter === ')') {
                    score += 3;
                } else if (chunk.firstIllegalCharacter === ']') {
                    score += 57;
                } else if (chunk.firstIllegalCharacter === '}') {
                    score += 1197;
                } else if (chunk.firstIllegalCharacter === '>') {
                    score += 25137;
                }
            }
        }
        return score;
    }

};
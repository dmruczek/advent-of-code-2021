'use strict';

module.exports = class SubmarineNavigator {

    constructor() { }

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);

        let instructionsList = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const split = line.split(' ');
            instructionsList.push(
                {
                    direction: split[0],
                    magnitude: parseInt(split[1], 10)
                }
            );
        }
        this.instructionsList = instructionsList;
    }


    navigate() {
        this.horizontalPosition = 0;
        this.depth = 0;

        for (let i = 0; i < this.instructionsList.length; i++) {
            this.followInstruction(this.instructionsList[i]);
        }
    }

    navigateImproved() {
        this.horizontalPosition = 0;
        this.aim = 0;
        this.depth = 0;

        for (let i = 0; i < this.instructionsList.length; i++) {
            this.followInstructionImproved(this.instructionsList[i]);
        }
    }

    followInstructionImproved(instruction) {

        if (instruction.direction === 'forward') {
            this.horizontalPosition += instruction.magnitude;
            this.depth += (this.aim * instruction.magnitude);
        } else if (instruction.direction === 'down') {
            this.aim += instruction.magnitude;
        } else if (instruction.direction === 'up') {
            this.aim -= instruction.magnitude;
        }
    }

    followInstruction(instruction) {
        if (instruction.direction === 'forward') {
            this.horizontalPosition += instruction.magnitude;
        } else if (instruction.direction === 'down') {
            this.depth += instruction.magnitude;
        } else if (instruction.direction === 'up') {
            this.depth -= instruction.magnitude;
        }
    }

};
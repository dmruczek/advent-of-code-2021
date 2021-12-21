'use strict';

module.exports = class ProbeLauncherTrajectoryAnalyzer {

    constructor() {}

    loadInput(filename) {
        const path = require('path');
        const fs = require('fs');
        const os = require('os');

        const data = fs.readFileSync(path.resolve(__dirname, filename), 'utf-8');
        const lines = data.split(os.EOL);
        this.processInputData(lines[0]);
    }

    processInputData(line) {
        const match = line.match(/target area: x=([-\d]+)\.\.([-\d]+), y=([-\d]+)\.\.([-\d]+)/);
        this.targetX1 = parseInt(match[1], 10);
        this.targetX2 = parseInt(match[2], 10);
        this.targetY1 = parseInt(match[3], 10);
        this.targetY2 = parseInt(match[4], 10);
    }



    findHighestSuccessfulFiringSolution() {

        // to find x, we basically need to find an initial velocity where the projectile will "stop" in the x direction (over the target area) while continuing to move upward.
        let possibleXVelocities = [];
        for (let xVel = 1; xVel < (this.targetX2 / 2); xVel++) {
            let xPos = 0;

            let workingxVel = xVel;
            let iterations = 0;
            while (workingxVel > 0) {
                iterations++;
                xPos += workingxVel;
                workingxVel--; 
            }
            if (xPos >= this.targetX1 && xPos <= this.targetX2) {
                // console.log(`${xVel} is an Option.  It stops at ${xPos} after ${iterations} iterations.`);
                possibleXVelocities.push(xVel);
            } 
            // else {
            //     console.log(`${xVel} is NOT an Option.  It stops at ${xPos}`);
            // }
        }

        let bestFiringSolution = {maxHeight:0};
        for (let yVel = 0; yVel < (this.targetY1 * -1); yVel++) {
            for (let i = 0; i < possibleXVelocities.length; i++) {
                const xVel = possibleXVelocities[i];
                const firingSolution = this.simulateFiringSolution(xVel, yVel);

                if (firingSolution.hitsTarget) {
                    if (firingSolution.maxHeight > bestFiringSolution.maxHeight) {
                        bestFiringSolution = firingSolution;
                    }
                }
            }
        }
        return bestFiringSolution;
    }

    findAllSuccessfullFiringSolutions() {
        
    }

    simulateFiringSolution(velocityX, velocityY) {
        let currentPosX = 0;
        let currentPosY = 0;
        let maxHeight = 0;
        let positionTracker = [{x: 0, y:0}];
        
        while (this.doesProjectileHaveAChance(currentPosX, currentPosY, velocityX, velocityY)) {
            currentPosX += velocityX;
            currentPosY += velocityY;
            if (currentPosY > maxHeight) {
                maxHeight = currentPosY;
            }
            positionTracker.push({x: currentPosX, y: currentPosY});
            if (velocityX > 0) {
                velocityX--;
            } else if (velocityX < 0) {
                velocityX++;
            }
            velocityY--;
            if (this.isProjectileWithinTargetArea(currentPosX, currentPosY)) {
                return {positionTracker: positionTracker, hitsTarget: true, maxHeight: maxHeight};
            }

        }
        return {positionTracker: positionTracker, hitsTarget: false, maxHeight: maxHeight};
    }

    isProjectileWithinTargetArea(currentPosX, currentPosY) {
        return currentPosX >= this.targetX1 && currentPosX <= this.targetX2 && currentPosY >= this.targetY1 && currentPosY <= this.targetY2;
    }

    doesProjectileHaveAChance(currentPosX, currentPosY, velocityX, velocityY) {
        if (currentPosX > this.targetX2 && currentPosX > this.targetX1) {
            // no chance. overshot it to the right.
            // console.log('no chance. overshot it to the right.');
            return false;
        } else if (currentPosY < this.targetY1 && currentPosY < this.targetY1 && velocityY < 0) {
            // no chance.  Target is above you and you are moving downward.
            // console.log('no chance.  Target is above you and you are moving downward.');
            return false;
        }
        return true;
    }

    printFiringSolution(firingSolution) {
        let minX = 0, minY = this.targetY1, maxX = this.targetX2, maxY = 0;

        for (let i = 0; i < firingSolution.positionTracker.length; i++) {
            const thisPos = firingSolution.positionTracker[i];
            if (thisPos.x < minX) {
                minX = thisPos.x;
            } else if (thisPos.x > maxX) {
                maxX = thisPos.x;
            }
            if (thisPos.y < minY) {
                minY = thisPos.y;
            } else if (thisPos.y > maxY) {
                maxY = thisPos.y;
            }
            
        }

        const height = (maxY - minY) + 1;
        const width = (maxX - minX) + 1;

        let matrix = [];
        for (let i = 0; i < height; i++) {
            matrix.push(Array(width));
            matrix[i].fill('.');
        }

        // console.log(`height:${height}, width:${width}`);
        // console.log(`minX:${minX}, maxX:${maxX}, minY:${minY}, maxY:${maxY}`);


        for (let y = this.targetY1; y <= this.targetY2; y++) {
            for (let x = this.targetX1; x <= this.targetX2; x++) {
                const yToUse = this.adjustYForMapping(y, maxY);
                // console.log(`translating point x:${x}, y:${y}...  setting target at x:${x}, y:${yToUse}`);
                matrix[yToUse][x] = 'T';
            }
        }

        for (let i = 0; i < firingSolution.positionTracker.length; i++) {
            const yToUse = this.adjustYForMapping(firingSolution.positionTracker[i].y, maxY);
            matrix[yToUse][firingSolution.positionTracker[i].x] = '#';
        }

        for (let y = 0; y < matrix.length; y++) {
            let str = '';
            for (let x = 0; x < matrix[y].length; x++) {
                str += matrix[y][x];
            }
            console.log(str);
        }
    }

    adjustYForMapping(y, maxY) {
        return ((y * -1) + maxY);
    }


};
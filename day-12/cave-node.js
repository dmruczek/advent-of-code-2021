'use strict';

module.exports = class CaveNode {

    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    addConnection(otherNode) {
        this.connections.push(otherNode);
    }

    navigateTowardsEnd(pathSoFar, shouldAllowTwoSmallCaveVisits) {
        if (!pathSoFar) {
            pathSoFar = [];
        }

        pathSoFar.push(this.name);
        // console.log(pathSoFar);

        if (this.name === 'end') {
            return [pathSoFar];
        }

        if (shouldAllowTwoSmallCaveVisits) {
            if (!this.isValidBasedOnAllowingOneSmallCaveToBeVisitedTwice(pathSoFar)) {
                return [];
            }
        } else {
            if (pathSoFar.slice(0,-1).includes(this.name) && this.isSmallCave()) {
                // console.log('cant navigate to ' + this.name + ' from path: ' + pathSoFar);
                return [];
            } 
        }

        let allNewPaths = [];
        for (let i = 0; i < this.connections.length; i++) {
            // console.log('checking path from ' + this.name + ' to ' + this.connections[i].name);
            let additionalPaths = this.connections[i].navigateTowardsEnd(JSON.parse(JSON.stringify(pathSoFar)), shouldAllowTwoSmallCaveVisits);
            for (let j = 0; j < additionalPaths.length; j++) {
                allNewPaths.push(additionalPaths[j]);
            }
        }
        return allNewPaths;

    }

    isValidBasedOnAllowingOneSmallCaveToBeVisitedTwice(path) {
        let countMap = [];
        for (let i = 0; i < path.length; i++) {
            const name = path[i];
            if (!(name.charAt(0) >= 'A' && name.charAt(0) <= 'Z')) {
                if (countMap[name]) {
                    countMap[name]++;
                } else {
                    countMap[name] = 1;
                }
            }
        }
        if (countMap.start > 1) {
            return false;
        }

        let doubleVisits = 0;
        let isValid = true;

        for (const name in countMap) {
            const value = countMap[name];
            if (value > 2) {
                isValid = false;
            }
            if (value === 2) {
                doubleVisits++;
            }
        }        

        return isValid && doubleVisits < 2;
    }

    isSmallCave() {
        return !(this.name.charAt(0) >= 'A' && this.name.charAt(0) <= 'Z');
    }

};
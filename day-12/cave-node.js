'use strict';

module.exports = class CaveNode {

    constructor(name) {
        this.name = name;
        this.connections = [];
    }

    addConnection(otherNode) {
        this.connections.push(otherNode);
    }

    navigateTowardsEnd(pathSoFar) {
        if (!pathSoFar) {
            pathSoFar = [];
        }

        if (this.name === 'end') {
            pathSoFar.push(this.name);
            return [pathSoFar];
        }

        if (pathSoFar.includes(this.name) && this.isSmallCave()) {
            // console.log('cant navigate to ' + this.name + ' from path: ' + pathSoFar);
            return [];
        } 

        pathSoFar.push(this.name);
        // console.log(pathSoFar);

        let allNewPaths = [];
        for (let i = 0; i < this.connections.length; i++) {
            // console.log('checking path from ' + this.name + ' to ' + this.connections[i].name);
            let additionalPaths = this.connections[i].navigateTowardsEnd(JSON.parse(JSON.stringify(pathSoFar)));
            for (let j = 0; j < additionalPaths.length; j++) {
                allNewPaths.push(additionalPaths[j]);
            }
        }
        return allNewPaths;

    }

    isSmallCave() {
        return !(this.name.charAt(0) >= 'A' && this.name.charAt(0) <= 'Z');
    }

};
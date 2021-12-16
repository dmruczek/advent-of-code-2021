'use strict';

const CaveNode = require('./cave-node');

module.exports = class CaveNavigationSystem {

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
        let caveNodes = [];
        for (let i = 0; i < lines.length; i++) {
            const split = lines[i].split('-');
            const startConnectionName = split[0];
            const endConnectionName = split[1];
            const sI = this.getIndexOfCaveNodeInList(caveNodes, startConnectionName);
            const eI = this.getIndexOfCaveNodeInList(caveNodes, endConnectionName);
            let startNode;
            let endNode;
            if (sI > -1) {
                startNode = caveNodes[sI];
            } else {
                startNode = new CaveNode(startConnectionName);
                caveNodes.push(startNode);
            }
            if (eI > -1) {
                endNode = caveNodes[eI];
            } else {
                endNode = new CaveNode(endConnectionName);
                caveNodes.push(endNode);
            }
            startNode.addConnection(endNode);
            endNode.addConnection(startNode);
        }
        // console.log(caveNodes);
        this.startNode = caveNodes[this.getIndexOfCaveNodeInList(caveNodes, 'start')];
        // console.log(this.startNode);

    }

    getIndexOfCaveNodeInList(caveNodes, name) {
        for (let i = 0; i < caveNodes.length; i++) {
            if (caveNodes[i].name === name) {
                return i;
            }
        }
        return -1;
    }

    findPathsFromStartToEnd() {
        let paths = this.startNode.navigateTowardsEnd();
        return paths;
    }

};
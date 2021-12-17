'use strict';

module.exports = class PolymerizationSimulator {

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
        this.polymer = [...lines[0]];
        this.polymerTemplate = [...lines[0]];
        let pairInsertionRuleMap = new Map();
        let possibleElementsMap = new Map();
        let allPossibleElements = [];
        for (let i = 2; i < lines.length; i++) {
            const split = lines[i].split(' -> ');
            pairInsertionRuleMap.set(split[0], split[1]);
            possibleElementsMap.set(split[0].charAt(0), true);
            possibleElementsMap.set(split[0].charAt(1), true);
            possibleElementsMap.set(split[1], true);
        }

        for (const element of possibleElementsMap.keys()) {
            allPossibleElements.push(element);
        }
        this.allPossibleElements = allPossibleElements;
        this.pairInsertionRuleMap = pairInsertionRuleMap;
    }

    simulatePairInsertionProcessANumberOfTimes(n) {
        for (let i = 0; i < n; i++) {
            this.simulatePairInsertionProcess();
        }
    }

    simulatePairInsertionProcess() {
        let newPolymer = [];
        for (let i = 0; i < this.polymer.length; i++) {
            newPolymer.push(this.polymer[i]);
            if (i < this.polymer.length-1) {
                const pair = this.polymer[i] + this.polymer[i+1];
                const newElement = this.pairInsertionRuleMap.get(pair);
                newPolymer.push(newElement);
            }
        }
        this.polymer = newPolymer;
    }

    createElementOccurranceMap() {
        let elementOccuranceMap = new Map();
        for (let i = 0; i < this.allPossibleElements.length; i++) {
            const thisElement = this.allPossibleElements[i];
            let occuranceList = this.polymer.filter(element => element === thisElement);
            elementOccuranceMap.set(thisElement, occuranceList.length);
        }
        this.elementOccuranceMap = elementOccuranceMap;
    }

    calculateMostCommonElementMinusLeastCommonElement() {
        this.createElementOccurranceMap();
        let occuranceCounts = [];
        for (let i = 0; i < this.allPossibleElements.length; i++) {
            occuranceCounts.push(this.elementOccuranceMap.get(this.allPossibleElements[i]));
        }
        occuranceCounts.sort(function (a, b) { return a - b; });
        return occuranceCounts.pop() - occuranceCounts[0];
    }

};
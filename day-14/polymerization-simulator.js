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

        let pairMap = this.getInitializedPairMap();
        for (let i = 0; i < this.polymer.length; i++) {
            if (i < this.polymer.length-1) {
                const pair = this.polymer[i] + this.polymer[i+1];
                pairMap.set(pair, pairMap.get(pair) + 1);
            }
        }
        this.pairMap = pairMap;

    }

    getInitializedPairMap() {
        let pairMap = new Map();
        for (const pair of this.pairInsertionRuleMap.keys()) {
            pairMap.set(pair, 0);
        }
        return pairMap;
    }

    simulatePairInsertionProcessANumberOfTimes(n) {
        // create a map of the occurrances of all possible pairs.
        // loop through that map.  For each pair:  Create the two new pairs based on the rules in a new map.
        for (let i = 0; i < n; i++) {
            this.simulatePairInsertionProcess();
        }
    }

    simulatePairInsertionProcess() {

        let newPairMap = this.getInitializedPairMap();

        for (const pair of this.pairMap.keys()) {
            const newElement = this.pairInsertionRuleMap.get(pair);
            const pairCount = this.pairMap.get(pair);
            const newPairA = pair.charAt(0) + newElement;
            const newPairB = newElement + pair.charAt(1);
            newPairMap.set(newPairA, newPairMap.get(newPairA) + pairCount);
            newPairMap.set(newPairB, newPairMap.get(newPairB) + pairCount);
        }

        this.pairMap = newPairMap;
    }

    createElementOccurranceMap() {
        let elementOccuranceMap = new Map();

        // polymer always starts / ends with the same characters...  each character is counted twice in the pairmap, but the end characters have 1 less than double.
        for (const pair of this.pairMap.keys()) {
            const pairCount = this.pairMap.get(pair);
            const elementA = pair.charAt(0);
            const elementB = pair.charAt(1);
            if (!elementOccuranceMap.has(elementA)) {
                elementOccuranceMap.set(elementA, 0);
            }
            if (!elementOccuranceMap.has(elementB)) {
                elementOccuranceMap.set(elementB, 0);
            }
            elementOccuranceMap.set(elementA, elementOccuranceMap.get(elementA) + pairCount);
            elementOccuranceMap.set(elementB, elementOccuranceMap.get(elementB) + pairCount);
        }

        for (const element of elementOccuranceMap.keys()) {
            if (element === this.polymer[0] || element === this.polymer[(this.polymer.length-1)]) {
                elementOccuranceMap.set(element, ((elementOccuranceMap.get(element) - 1) / 2) + 1);
            } else {
                elementOccuranceMap.set(element, elementOccuranceMap.get(element) / 2);
            }
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
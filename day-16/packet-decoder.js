'use strict';

const Packet = require('./packet');

module.exports = class PacketDecoder {

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

        this.packet = new Packet(line);
    }


};
const PacketDecoder = require('./packet-decoder.js');
const packetDecoder = new PacketDecoder();
packetDecoder.loadInput('input.txt');

console.log(packetDecoder.packet.calculateVersionSum());

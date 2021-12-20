const Packet = require('./packet');

describe('PacketDecoder', function () {

    const PacketDecoder = require('./packet-decoder');

    describe('loadInput', function() {
        it('should properly load packet data.', function () {
            const packetDecoder = new PacketDecoder();
            packetDecoder.loadInput('test-input.txt');
            expect(packetDecoder.packet.calculateVersionSum()).toBe(31);
        });
    });

});
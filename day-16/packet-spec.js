describe('Packet', function () {

    const Packet = require('./packet');

    describe('constructor', function() {

        it('should decode the various parts of the incoming binary stream.', function () {
            const packet = new Packet('EE00D40C823060');
            expect(packet.packetVersion).toEqual(['1', '1', '1']);
            expect(packet.packetVersionDec).toEqual(7);
            expect(packet.packetTypeId).toEqual(['0', '1', '1']);
            expect(packet.packetTypeIdDec).toEqual(3);
        });

        it('should decode a packet that represents a decimal literal value.', function () {
            const packet = new Packet('D2FE28');
            expect(packet.literalPayloadDec).toBe(2021);
            expect(packet.packetSize).toBe(21);
        });

        it('should decode a packet that represents an operator that uses the "0" method of sub-packet identification.', function () {
            const packet = new Packet('38006F45291200');
            expect(packet.subPackets.length).toBe(2);
            expect(packet.subPackets[0].literalPayloadDec).toBe(10);
            expect(packet.subPackets[1].literalPayloadDec).toBe(20);
        });
        
        it('should decode a packet that represents an operator that uses the "1" method of sub-packet identification.', function () {
            const packet = new Packet('EE00D40C823060');
            expect(packet.subPackets.length).toBe(3);
            expect(packet.subPackets[0].literalPayloadDec).toBe(1);
            expect(packet.subPackets[1].literalPayloadDec).toBe(2);
            expect(packet.subPackets[2].literalPayloadDec).toBe(3);
        });

        it('should decode a packet that has a more complex hierarchy of multiple operator sub-packets.', function () {
            const packet = new Packet('620080001611562C8802118E34');
            expect(packet.subPackets.length).toBe(2);
            expect(packet.subPackets[0].subPackets.length).toBe(2);
            expect(packet.subPackets[1].subPackets.length).toBe(2);
        });


    });

    


    describe('decodeHexadecimalStringIntoBinaryStream', function() {
        it('should decode a hexadecimal string into an array of binary characters.', function () {
            const packet = new Packet();
            expect(packet.decodeHexadecimalStringIntoBinaryStream('EE00D40C823060')).toEqual(
                ['1','1','1','0','1','1','1','0','0','0','0','0','0','0','0','0','1','1','0','1','0','1','0','0','0','0','0','0','1','1','0','0','1','0','0','0','0','0','1','0','0','0','1','1','0','0','0','0','0','1','1','0','0','0','0','0']
            );
        });
    });

    describe('convertDecimalToBinaryString', function() {
        it('should properly convert a decimal integer to a binary string.', function () {
            const packet = new Packet();
            
            expect(packet.convertDecimalToBinaryString(0)).toEqual('0000');
            expect(packet.convertDecimalToBinaryString(1)).toEqual('0001');
            expect(packet.convertDecimalToBinaryString(4)).toEqual('0100');
            expect(packet.convertDecimalToBinaryString(8)).toEqual('1000');
            expect(packet.convertDecimalToBinaryString(9)).toEqual('1001');
            expect(packet.convertDecimalToBinaryString(15)).toEqual('1111');
        });
    });

    describe('calculateVersionSum', function() {
        it('should properly calculate the sum of the packet version of this packet and all sub-packets.', function () {
            expect(new Packet('8A004A801A8002F478').calculateVersionSum()).toBe(16);
            expect(new Packet('620080001611562C8802118E34').calculateVersionSum()).toBe(12);
            expect(new Packet('C0015000016115A2E0802F182340').calculateVersionSum()).toBe(23);
            expect(new Packet('A0016C880162017C3686B18A3D4780').calculateVersionSum()).toBe(31);
        });
    });

    


});
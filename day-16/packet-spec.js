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

    describe('evaluate', function() {
        it('should properly evaluate a sum operation.', function () {
            expect(new Packet('C200B40A82').evaluate()).toBe(3);
        });
        it('should properly evaluate a product operation.', function () {
            expect(new Packet('04005AC33890').evaluate()).toBe(54);
        });
        it('should properly evaluate a minimum operation.', function () {
            expect(new Packet('880086C3E88112').evaluate()).toBe(7);
        });
        it('should properly evaluate a maximum operation.', function () {
            expect(new Packet('CE00C43D881120').evaluate()).toBe(9);
        });
        it('should properly evaluate a less-than operation.', function () {
            expect(new Packet('D8005AC2A8F0').evaluate()).toBe(1);
        });
        it('should properly evaluate a greater-than operation.', function () {
            expect(new Packet('F600BC2D8F').evaluate()).toBe(0);
        });
        it('should properly evaluate an equality operation.', function () {
            expect(new Packet('9C005AC2F8F0').evaluate()).toBe(0);
        });
        it('should properly evaluate a more complicated multi-layer sub-packet (1 + 3 === 2 * 2).', function () {
            expect(new Packet('9C0141080250320F1802104A08').evaluate()).toBe(1);
        });
        it('REGRESSION - should continue to get the correct answer for day 16 part 2.', function () {
            const hexStr = 'E20D7880532D4E551A5791BD7B8C964C1548CB3EC1FCA41CC00C6D50024400C202A65C00C20257C008AF70024C00810039C00C3002D400A300258040F200D6040093002CC0084003FA52DB8134DE620EC01DECC4C8A5B55E204B6610189F87BDD3B30052C01493E2DC9F1724B3C1F8DC801E249E8D66C564715589BCCF08B23CA1A00039D35FD6AC5727801500260B8801F253D467BFF99C40182004223B4458D2600E42C82D07CC01D83F0521C180273D5C8EE802B29F7C9DA1DCACD1D802469FF57558D6A65372113005E4DB25CF8C0209B329D0D996C92605009A637D299AEF06622CE4F1D7560141A52BC6D91C73CD732153BF862F39BA49E6BA8C438C010E009AA6B75EF7EE53BBAC244933A48600B025AD7C074FEB901599A49808008398142013426BD06FA00D540010C87F0CA29880370E21D42294A6E3BCF0A080324A006824E3FCBE4A782E7F356A5006A587A56D3699CF2F4FD6DF60862600BF802F25B4E96BDD26049802333EB7DDB401795FC36BD26A860094E176006A0200FC4B8790B4001098A50A61748D2DEDDF4C6200F4B6FE1F1665BED44015ACC055802B23BD87C8EF61E600B4D6BAD5800AA4E5C8672E4E401D0CC89F802D298F6A317894C7B518BE4772013C2803710004261EC318B800084C7288509E56FD6430052482340128FB37286F9194EE3D31FA43BACAF2802B12A7B83E4017E4E755E801A2942A9FCE757093005A6D1F803561007A17C3B8EE0008442085D1E8C0109E3BC00CDE4BFED737A90DC97FDAE6F521B97B4619BE17CC01D94489E1C9623000F924A7C8C77EA61E6679F7398159DE7D84C015A0040670765D5A52D060200C92801CA8A531194E98DA3CCF8C8C017C00416703665A2141008CF34EF8019A080390962841C1007217C5587E60164F81C9A5CE0E4AA549223002E32BDCEA36B2E100A160008747D8B705C001098DB13A388803F1AE304600';
            expect(new Packet(hexStr).evaluate()).toBe(277110354175);
        });

    });

    


});
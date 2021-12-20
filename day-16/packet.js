'use strict';

module.exports = class Packet {



    constructor(input) {
        if (typeof input === 'string') {
            this.hexString = input;
            this.binaryStream = this.decodeHexadecimalStringIntoBinaryStream(input);
        } else if (typeof input === 'object') {
            this.binaryStream = input;
        }
        if (this.binaryStream) {
            this.subPackets = [];
            this.decodePacketVersionAndTypeId();
            this.decodePayload();
        }
    }

    decodePacketVersionAndTypeId() {
        this.packetVersion = this.binaryStream.slice(0,3);
        this.packetVersionDec = this.convertBinaryStreamToDecimal(this.packetVersion);
        this.packetTypeId = this.binaryStream.slice(3,6);
        this.packetTypeIdDec = this.convertBinaryStreamToDecimal(this.packetTypeId);
    }

    decodeHexadecimalStringIntoBinaryStream(hexString) {
        let binaryStream = [];

        for (let i = 0; i < hexString.length; i++) {
            let binaryStr = this.convertDecimalToBinaryString(parseInt(hexString.charAt(i), 16));
            binaryStream.push(...Array.from(binaryStr));
        }
        return binaryStream;
    }


    convertDecimalToBinaryString(n) {
        let str = '';

        let i = 16;

        while (i != 1) {
            i = i / 2;
            if (n >= i) {
                n-=i;
                str += "1";
            } else {
                str += "0";
            }
        }

        return str;
    }


    convertBinaryStreamToDecimal(binaryStream) {
        return parseInt(binaryStream.join(""),2);
    }

    decodePayload() {
        if (this.packetTypeIdDec === 4) {
            // this is packet is a literal.
            this.decodeLiteralPayload();
        } else {
            // this is an "operator" packet.
            this.lengthTypeId = this.binaryStream[6];
            let subPackets = [];
            let streamIndex;
            if (this.lengthTypeId === '0') {
                // the next 15 bits are a number that represents the total length in bits of the sub-packets contained by this packet.
                let totalSubPacketLength = this.convertBinaryStreamToDecimal(this.binaryStream.slice(7,22));
                streamIndex = 22;
                while (streamIndex < (22 + totalSubPacketLength)) {
                    const subPacket = new Packet(this.binaryStream.slice(streamIndex));
                    subPackets.push(subPacket);
                    streamIndex += subPacket.packetSize;
                }
            } else {
                // the next 11 bits are a number that represents the number of sub-packets immediately contained by this packet.
                let totalNumberOfSubPackets = this.convertBinaryStreamToDecimal(this.binaryStream.slice(7,18));
                streamIndex = 18;
                for (let i = 0; i < totalNumberOfSubPackets; i++) {
                    const subPacket = new Packet(this.binaryStream.slice(streamIndex));
                    subPackets.push(subPacket);
                    streamIndex += subPacket.packetSize;
                }
            }
            this.subPackets = subPackets;
            this.packetSize = streamIndex;
        }
    }

    decodeLiteralPayload() {

        let i = 6;
        let payloadBits = [];
        let shouldContinue = true;
        while (shouldContinue) {
            const nextChunk = this.binaryStream.slice(i, i+5);
            payloadBits.push(...nextChunk.slice(1));
            if (nextChunk[0] === "0") {
                shouldContinue = false;
            }
            i += 5;
        }
        this.packetSize = i;
        this.literalPayload = payloadBits;
        this.literalPayloadDec = this.convertBinaryStreamToDecimal(payloadBits);
    }

    calculateVersionSum() {
        let versionSum = 0;
        for (let i = 0; i < this.subPackets.length; i++) {
            versionSum += this.subPackets[i].calculateVersionSum();
        }
        versionSum += this.packetVersionDec;
        return versionSum;
    }


};
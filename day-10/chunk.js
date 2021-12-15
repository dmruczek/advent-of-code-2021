'use strict';

module.exports = class Chunk {

    constructor(chunkStr) {
        this.chunkStr = chunkStr;
        this.subChunks = [];
        // this.parseSubChunks();
    }

    parseSubChunks() {
        let i = 1;
        let startChar = this.chunkStr.charAt(i);
        let startIndex = i;
        let matchingEndChar = this.getEndCharForGivenStartChar(startChar);
        i++;
        while (i < (this.chunkStr.length - 1)) {
            let thisChar = this.chunkStr.charAt(i);
            if (thisChar === matchingEndChar) {

                console.log('start char: ' + startChar + ", endChar: " + matchingEndChar + " sub chunk: " + this.chunkStr.substring(startIndex, i+1));


                this.subChunks.push(new Chunk(this.chunkStr.substring(startIndex, i+1)));
                i++;
                startChar = this.chunkStr.charAt(i);
                startIndex = i;
                matchingEndChar = this.getEndCharForGivenStartChar(startChar);
                i++;
            } else {
                i++;
            }
        }
    }

    getEndCharForGivenStartChar(startChar) {
        if (startChar === '(') {
            return ')';
        } else if (startChar === '[') {
            return ']';
        } else if (startChar === '{') {
            return '}';
        } else if (startChar === '<') {
            return '>';
        } else {
            return undefined;
        }
        
    }

    isValid() {
        let openParenCount = 0;
        let openSquareCount = 0;
        let openSquiggleCount = 0;
        let openAngleCount = 0;
        let openCharStack = [];

        for (let i = 0; i < this.chunkStr.length; i++) {
            const thisChar = this.chunkStr.charAt(i);
            if (thisChar === '(') {
                openCharStack.push(thisChar);
                openParenCount++;
            } else if (thisChar === '[') {
                openCharStack.push(thisChar);
                openSquareCount++;
            } else if (thisChar === '{') {
                openCharStack.push(thisChar);
                openSquiggleCount++;
            } else if (thisChar === '<') {
                openCharStack.push(thisChar);
                openAngleCount++;
            } else if (thisChar === ')') {
                openParenCount--;
                if (thisChar != this.getEndCharForGivenStartChar(openCharStack.pop())) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
                if (openParenCount < 0) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
            } else if (thisChar === ']') {
                openSquareCount--;
                if (thisChar != this.getEndCharForGivenStartChar(openCharStack.pop())) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
                if (openSquareCount < 0) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
            } else if (thisChar === '}') {
                openSquiggleCount--;
                if (thisChar != this.getEndCharForGivenStartChar(openCharStack.pop())) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
                if (openSquiggleCount < 0) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
            } else if (thisChar === '>') {
                openAngleCount--;
                if (thisChar != this.getEndCharForGivenStartChar(openCharStack.pop())) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
              if (openAngleCount < 0) {
                    this.firstIllegalCharacter = thisChar;
                    return false;
                }
            }
        }

        return openParenCount == 0 && openSquareCount == 0 && openSquiggleCount == 0 && openAngleCount == 0;
    }

};
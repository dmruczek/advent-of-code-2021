describe('Chunk', function () {

    const Chunk = require('./chunk');

    describe('isValid', function() {
        it('should properly determine whether a chunk is valid, and if it is invalid, identify the first illegal character.', function () {
            let chunk = new Chunk('[<>({}){}[([])<>]]');
            expect(chunk.isValid()).toBe(true);
            chunk = new Chunk('{([(<{}[<>[]}>{[]{[(<()>');
            expect(chunk.isValid()).toBe(false);
            expect(chunk.firstIllegalCharacter).toBe('}');
            chunk = new Chunk('[[<[([]))<([[{}[[()]]]');
            expect(chunk.isValid()).toBe(false);
            expect(chunk.firstIllegalCharacter).toBe(')');
            chunk = new Chunk('[{[{({}]{}}([{[{{{}}([]');
            expect(chunk.isValid()).toBe(false);
            expect(chunk.firstIllegalCharacter).toBe(']');
            chunk = new Chunk('[<(<(<(<{}))><([]([]()');
            expect(chunk.isValid()).toBe(false);
            expect(chunk.firstIllegalCharacter).toBe(')');
            chunk = new Chunk('<{([([[(<>()){}]>(<<{{');
            expect(chunk.isValid()).toBe(false);
            expect(chunk.firstIllegalCharacter).toBe('>');
        });
    });

    describe('completePatternForValidChunk', function() {
        it('should determine the pattern that should remain to complete the chunk.', function () {
            let chunk = new Chunk('[({(<(())[]>[[{[]{<()<>>');
            chunk.completePatternForValidChunk();
            expect(chunk.remainingPattern).toEqual(['}', '}', ']', ']', ')', '}', ')', ']']);
            chunk = new Chunk('[(()[<>])]({[<{<<[]>>(');
            chunk.completePatternForValidChunk();
            expect(chunk.remainingPattern).toEqual([')', '}', '>', ']', '}', ')']);            
        });
    });

    describe('getScore', function() {
        it('should calculate the score based on the remaining pattern', function () {
            let chunk = new Chunk('<{([{{}}[<[[[<>{}]]]>[]]');
            chunk.completePatternForValidChunk();
            expect(chunk.getScore()).toBe(294);
        });
    });

    

});
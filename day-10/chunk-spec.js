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

});
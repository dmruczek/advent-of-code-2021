describe('BingoCard', function () {

    const BingoCard = require('./bingo-card');

    describe('constructor', function() {
        it('should properly load the Bingo Card from the string array passed in', function () {
            const bingoCard = new BingoCard(['22 13 17 11  0', ' 8  2 23  4 24', '21  9 14 16  7', ' 6 10  3 18  5', ' 1 12 20 15 19']);

            expect(bingoCard.bingoRows).toEqual([
                [22, 13, 17, 11, 0],
                [8, 2, 23, 4, 24],
                [21, 9, 14, 16, 7],
                [6, 10, 3, 18, 5],
                [1, 12, 20, 15, 19]
            ]);
            expect(bingoCard.markedRows).toEqual([
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]);
    
        });
        
    });

    describe('markNumber', function() {
        it('should properly return true or false based on whether the number exists on the card, as well as update the marked rows array appropriately.', function () {
            const bingoCard = new BingoCard(['22 13 17 11  0', ' 8  2 23  4 24', '21  9 14 16  7', ' 6 10  3 18  5', ' 1 12 20 15 19']);
            expect(bingoCard.markNumber(7)).toBe(true);
            expect(bingoCard.markNumber(32)).toBe(false);
            expect(bingoCard.markedRows).toEqual([
                [false, false, false, false, false],
                [false, false, false, false, false],
                [false, false, false, false, true],
                [false, false, false, false, false],
                [false, false, false, false, false],
            ]);
        });
    });

    describe('checkRowsForWin', function() {
        it('should properly detect wins within a row.', function () {
            const bingoCard = new BingoCard(['22 13 17 11  0', ' 8  2 23  4 24', '21  9 14 16  7', ' 6 10  3 18  5', ' 1 12 20 15 19']);

            expect(bingoCard.checkRowsForWin([[false, false, false, false, true],
                [false, false, false, false, true],
                [false, false, false, false, true],
                [false, false, false, false, true],
                [false, false, false, false, true]])).toBe(false);

            expect(bingoCard.checkRowsForWin([[false, false, false, false, false],
                [false, false, false, false, false],
                [true, true, true, true, true],
                [false, false, false, false, false],
                [false, false, false, false, false]])).toBe(true);
        });
    });
 
    describe('checkColumnsForWin', function() {
        it('should properly detect wins within a row.', function () {
            const bingoCard = new BingoCard(['22 13 17 11  0', ' 8  2 23  4 24', '21  9 14 16  7', ' 6 10  3 18  5', ' 1 12 20 15 19']);

            expect(bingoCard.checkColumnsForWin([[false, false, false, false, true],
                [false, false, false, false, true],
                [false, false, false, false, true],
                [false, false, false, false, true],
                [false, false, false, false, true]])).toBe(true);

            expect(bingoCard.checkColumnsForWin([[false, false, false, false, false],
                [false, false, false, false, false],
                [true, true, true, true, true],
                [false, false, false, false, false],
                [false, false, false, false, false]])).toBe(false);
        });
    });

});
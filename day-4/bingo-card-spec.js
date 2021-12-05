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
 
});
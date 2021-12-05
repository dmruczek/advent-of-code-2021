describe('BingoGame', function () {

    const BingoGame = require('./bingo-game');

    describe('loadInput', function() {
        it('should load the numbers to call, as well as all bingo cards.', function () {
            const bingoGame = new BingoGame();
            bingoGame.loadInput('test-input.txt');
            expect(bingoGame.numbersToCall).toEqual([7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1]);
            expect(bingoGame.bingoCards.length).toBe(3);
            expect(bingoGame.bingoCards[0].bingoRows).toEqual([
                [22, 13, 17, 11, 0],
                [8, 2, 23, 4, 24],
                [21, 9, 14, 16, 7],
                [6, 10, 3, 18, 5],
                [1, 12, 20, 15, 19]
            ]);
        });
    });

    describe('runGameSimulation', function() {
        it('should find a winning board, whose score can be calculated.', function () {
            const bingoGame = new BingoGame();
            bingoGame.loadInput('test-input.txt');
            bingoGame.runGameSimulation();
            expect(bingoGame.firstWinningCardIndex).toBe(2);
            expect(bingoGame.getScoreOfWinningCard()).toBe(4512);
        });
        it('should run the simulation until all boards have won, and then the score of the last place board can be calculated.', function () {
            const bingoGame = new BingoGame();
            bingoGame.loadInput('test-input.txt');
            bingoGame.runGameSimulation();
            expect(bingoGame.lastPlaceCardIndex).toBe(1);
            expect(bingoGame.getScoreOfLastPlaceCard()).toBe(1924);
        });

    });

 
});
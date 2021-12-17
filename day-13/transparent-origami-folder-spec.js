describe('TransparentOrigamiFolder', function () {

    const TransparentOrigamiFolder = require('./transparent-origami-folder');

    describe('loadInput', function() {
        it('should properly load the transparent origami data.', function () {
            const transparentOrigamiFolder = new TransparentOrigamiFolder();
            transparentOrigamiFolder.loadInput('test-input.txt');
            expect(transparentOrigamiFolder.foldInstructionList).toEqual([
                {axis: 'y', location: 7},
                {axis: 'x', location: 5},
            ]);
            expect(transparentOrigamiFolder.dotList).toEqual([
                {x:6,y:10},
                {x:0,y:14},
                {x:9,y:10},
                {x:0,y:3},
                {x:10,y:4},
                {x:4,y:11},
                {x:6,y:0},
                {x:6,y:12},
                {x:4,y:1},
                {x:0,y:13},
                {x:10,y:12},
                {x:3,y:4},
                {x:3,y:0},
                {x:8,y:4},
                {x:1,y:10},
                {x:2,y:14},
                {x:8,y:10},
                {x:9,y:0}
            ]);
            expect(transparentOrigamiFolder.maxX).toBe(10);
            expect(transparentOrigamiFolder.maxY).toBe(14);
            // console.log('\n' + transparentOrigamiFolder.getPaperAsString() + '\n');
        });
    });

    describe('processFoldInstruction', function() {
        it('should properly handle a fold instruction.', function () {
            const transparentOrigamiFolder = new TransparentOrigamiFolder();
            transparentOrigamiFolder.loadInput('test-input.txt');
            transparentOrigamiFolder.processFoldInstruction(transparentOrigamiFolder.foldInstructionList[0]);
            expect(transparentOrigamiFolder.countVisibleDots()).toBe(17);

        });
    });
    
});
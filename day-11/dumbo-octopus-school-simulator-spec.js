describe('DumboOctopusSchoolSimulator', function () {

    const DumboOctopusSchoolSimulator = require('./dumbo-octopus-school-simulator');

    describe('loadInput', function() {
        it('should properly load the octopus matrix.', function () {
            const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
            dumboOctopusSchoolSimulator.loadInput('test-input.txt');
            expect(dumboOctopusSchoolSimulator.octopusMatrix).toEqual([
                [5,4,8,3,1,4,3,2,2,3],
                [2,7,4,5,8,5,4,7,1,1],
                [5,2,6,4,5,5,6,1,7,3],
                [6,1,4,1,3,3,6,1,4,6],
                [6,3,5,7,3,8,5,4,7,8],
                [4,1,6,7,5,2,4,6,4,5],
                [2,1,7,6,8,4,1,7,2,1],
                [6,8,8,2,8,8,1,1,3,4],
                [4,8,4,6,8,4,8,5,5,4],
                [5,2,8,3,7,5,1,5,2,6]
            ]);
        });
    });

    describe('getSurroundingOctopi', function() {
        it('should find all surrounding octopi for a given location.', function () {
            const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
            dumboOctopusSchoolSimulator.loadInput('test-input.txt');
            expect(dumboOctopusSchoolSimulator.getSurroundingOctopi(0,0)).toEqual(
                [ { x: 0, y: 1 }, { x: 1, y: 0 }, { x: 1, y: 1 } ]                
            );
            expect(dumboOctopusSchoolSimulator.getSurroundingOctopi(1,1)).toEqual([
                { x: 0, y: 0 },
                { x: 0, y: 1 },
                { x: 0, y: 2 },
                { x: 1, y: 0 },
                { x: 1, y: 2 },
                { x: 2, y: 0 },
                { x: 2, y: 1 },
                { x: 2, y: 2 }
            ]);
            expect(dumboOctopusSchoolSimulator.getSurroundingOctopi(9,9)).toEqual(
                [ { x: 8, y: 8 }, { x: 8, y: 9 }, { x: 9, y: 8 } ]
            );
        });
    });


    describe('processStep', function() {
        it('should process all Octopi for a full step.', function () {
            const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
            dumboOctopusSchoolSimulator.loadInput('test-input.txt');
            dumboOctopusSchoolSimulator.processStep();
            expect(dumboOctopusSchoolSimulator.octopusMatrix).toEqual([
                [6,5,9,4,2,5,4,3,3,4],
                [3,8,5,6,9,6,5,8,2,2],
                [6,3,7,5,6,6,7,2,8,4],
                [7,2,5,2,4,4,7,2,5,7],
                [7,4,6,8,4,9,6,5,8,9],
                [5,2,7,8,6,3,5,7,5,6],
                [3,2,8,7,9,5,2,8,3,2],
                [7,9,9,3,9,9,2,2,4,5],
                [5,9,5,7,9,5,9,6,6,5],
                [6,3,9,4,8,6,2,6,3,7]
           ]);
           dumboOctopusSchoolSimulator.processStep();
           expect(dumboOctopusSchoolSimulator.octopusMatrix).toEqual([
                [8,8,0,7,4,7,6,5,5,5],
                [5,0,8,9,0,8,7,0,5,4],
                [8,5,9,7,8,8,9,6,0,8],
                [8,4,8,5,7,6,9,6,0,0],
                [8,7,0,0,9,0,8,8,0,0],
                [6,6,0,0,0,8,8,9,8,9],
                [6,8,0,0,0,0,5,9,4,3],
                [0,0,0,0,0,0,7,4,5,6],
                [9,0,0,0,0,0,0,8,7,6],
                [8,7,0,0,0,0,6,8,4,8]
            ]);
        });
    });

    describe('runSteps', function() {
        it('should run the number of steps provided and keep track of total number of flashes.', function () {
            const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
            dumboOctopusSchoolSimulator.loadInput('test-input.txt');
            dumboOctopusSchoolSimulator.runSteps(10);
            expect(dumboOctopusSchoolSimulator.totalFlashes).toBe(204);
            dumboOctopusSchoolSimulator.runSteps(90);
            expect(dumboOctopusSchoolSimulator.totalFlashes).toBe(1656);
            expect(dumboOctopusSchoolSimulator.iteration).toBe(100);
        });
    });

    describe('runUntilFirstSynchronization', function() {
        it('should run until all octopi flash at the same time.', function () {
            const dumboOctopusSchoolSimulator = new DumboOctopusSchoolSimulator();
            dumboOctopusSchoolSimulator.loadInput('test-input.txt');
            dumboOctopusSchoolSimulator.runUntilFirstSynchronization();
            expect(dumboOctopusSchoolSimulator.iteration).toBe(195);
        });
    });

});
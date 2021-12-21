describe('ProbeLauncherTrajectoryAnalyzer', function () {

    const ProbeLauncherTrajectoryAnalyzer = require('./probe-launcher-trajectory-analyzer');

    describe('loadInput', function() {
        it('should properly load target area.', function () {
            const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
            probeLauncherTrajectoryAnalyzer.loadInput('test-input.txt');
            expect(probeLauncherTrajectoryAnalyzer.targetX1).toBe(20);
            expect(probeLauncherTrajectoryAnalyzer.targetX2).toBe(30);
            expect(probeLauncherTrajectoryAnalyzer.targetY1).toBe(-10);
            expect(probeLauncherTrajectoryAnalyzer.targetY2).toBe(-5);
        });
    });

    describe('simulateFiringSolution', function() {
        it('should accurately simulate a given firing solution, returning a list of positions and a determination of whether the projectile will hit the target.', function () {
            const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
            probeLauncherTrajectoryAnalyzer.loadInput('test-input.txt');
            expect(probeLauncherTrajectoryAnalyzer.simulateFiringSolution(7,2)).toEqual( { positionTracker: [
                { x: 0, y: 0 },
                { x: 7, y: 2 },
                { x: 13, y: 3 },
                { x: 18, y: 3 },
                { x: 22, y: 2 },
                { x: 25, y: 0 },
                { x: 27, y: -3 },
                { x: 28, y: -7 }
              ],
              hitsTarget: true,
              maxHeight: 3
            });

            expect(probeLauncherTrajectoryAnalyzer.simulateFiringSolution(6,3)).toEqual( { positionTracker: [
                  { x: 0, y: 0 },
                  { x: 6, y: 3 },
                  { x: 11, y: 5 },
                  { x: 15, y: 6 },
                  { x: 18, y: 6 },
                  { x: 20, y: 5 },
                  { x: 21, y: 3 },
                  { x: 21, y: 0 },
                  { x: 21, y: -4 },
                  { x: 21, y: -9 }
                ],
                hitsTarget: true,
                maxHeight: 6
            });

            expect(probeLauncherTrajectoryAnalyzer.simulateFiringSolution(17,-4)).toEqual({
                positionTracker: [ { x: 0, y: 0 }, { x: 17, y: -4 }, { x: 33, y: -9 } ],
                hitsTarget: false,
                maxHeight: 0
            });

            // console.log('\n');
            // probeLauncherTrajectoryAnalyzer.printFiringSolution(probeLauncherTrajectoryAnalyzer.simulateFiringSolution(9,0));
            // console.log('\n');
            // probeLauncherTrajectoryAnalyzer.printFiringSolution(probeLauncherTrajectoryAnalyzer.simulateFiringSolution(17,-4));
            // console.log('\n');

            // console.log('\n');
            // probeLauncherTrajectoryAnalyzer.printFiringSolution(probeLauncherTrajectoryAnalyzer.simulateFiringSolution(6,9));
            // console.log('\n');
            
            
        });
    });


    describe('findHighestSuccessfulFiringSolution', function() {
        it('should find the firing solution that achieves the highest height.', function () {
            const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
            probeLauncherTrajectoryAnalyzer.loadInput('test-input.txt');
            expect(probeLauncherTrajectoryAnalyzer.findHighestSuccessfulFiringSolution().maxHeight).toBe(45);
        });
    });

    


    
});
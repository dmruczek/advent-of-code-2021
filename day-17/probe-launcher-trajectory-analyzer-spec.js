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
            
        });
    });


    describe('findHighestSuccessfulFiringSolution', function() {
        it('should find the firing solution that achieves the highest height.', function () {
            const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
            probeLauncherTrajectoryAnalyzer.loadInput('test-input.txt');
            expect(probeLauncherTrajectoryAnalyzer.findHighestSuccessfulFiringSolution().maxHeight).toBe(45);
        });
    });

    describe('findAllSuccessfullFiringSolutions', function() {
        it('should find all possible firing solutions.', function () {
            const probeLauncherTrajectoryAnalyzer = new ProbeLauncherTrajectoryAnalyzer();
            probeLauncherTrajectoryAnalyzer.loadInput('test-input.txt');

            const expectedPossibleVelocities = [
                {x:23, y:-10},
                {x:25, y:-9},
                {x:27, y:-5},
                {x:29, y:-6},
                {x:22, y:-6},
                {x:21, y:-7},
                {x:9, y:0},
                {x:27, y:-7},
                {x:24, y:-5},
                {x:25, y:-7},
                {x:26, y:-6},
                {x:25, y:-5},
                {x:6, y:8},
                {x:11, y:-2},
                {x:20, y:-5},
                {x:29, y:-10},
                {x:6, y:3},
                {x:28, y:-7},
                {x:8, y:0},
                {x:30, y:-6},
                {x:29, y:-8},
                {x:20, y:-10},
                {x:6, y:7},
                {x:6, y:4},
                {x:6, y:1},
                {x:14, y:-4},
                {x:21, y:-6},
                {x:26, y:-10},
                {x:7, y:-1},
                {x:7, y:7},
                {x:8, y:-1},
                {x:21, y:-9},
                {x:6, y:2},
                {x:20, y:-7},
                {x:30, y:-10},
                {x:14, y:-3},
                {x:20, y:-8},
                {x:13, y:-2},
                {x:7, y:3},
                {x:28, y:-8},
                {x:29, y:-9},
                {x:15, y:-3},
                {x:22, y:-5},
                {x:26, y:-8},
                {x:25, y:-8},
                {x:25, y:-6},
                {x:15, y:-4},
                {x:9, y:-2},
                {x:15, y:-2},
                {x:12, y:-2},
                {x:28, y:-9},
                {x:12, y:-3},
                {x:24, y:-6},
                {x:23, y:-7},
                {x:25, y:-10},
                {x:7, y:8},
                {x:11, y:-3},
                {x:26, y:-7},
                {x:7, y:1},
                {x:23, y:-9},
                {x:6, y:0},
                {x:22, y:-10},
                {x:27, y:-6},
                {x:8, y:1},
                {x:22, y:-8},
                {x:13, y:-4},
                {x:7, y:6},
                {x:28, y:-6},
                {x:11, y:-4},
                {x:12, y:-4},
                {x:26, y:-9},
                {x:7, y:4},
                {x:24, y:-10},
                {x:23, y:-8},
                {x:30, y:-8},
                {x:7, y:0},
                {x:9, y:-1},
                {x:10, y:-1},
                {x:26, y:-5},
                {x:22, y:-9},
                {x:6, y:5},
                {x:7, y:5},
                {x:23, y:-6},
                {x:28, y:-10},
                {x:10, y:-2},
                {x:11, y:-1},
                {x:20, y:-9},
                {x:14, y:-2},
                {x:29, y:-7},
                {x:13, y:-3},
                {x:23, y:-5},
                {x:24, y:-8},
                {x:27, y:-9},
                {x:30, y:-7},
                {x:28, y:-5},
                {x:21, y:-10},
                {x:7, y:9},
                {x:6, y:6},
                {x:21, y:-5},
                {x:27, y:-10},
                {x:7, y:2},
                {x:30, y:-9},
                {x:21, y:-8},
                {x:22, y:-7},
                {x:24, y:-9},
                {x:20, y:-6},
                {x:6, y:9},
                {x:29, y:-5},
                {x:8, y:-2},
                {x:27, y:-8},
                {x:30, y:-5},
                {x:24, y:-7}
            ];

            let expectedPossibleVelocitiesMap = new Map();
            for (let i = 0; i < expectedPossibleVelocities.length; i++) {
                expectedPossibleVelocitiesMap.set(JSON.stringify(expectedPossibleVelocities[i]), expectedPossibleVelocities[i]);
            }

            const discoveredVelocities = probeLauncherTrajectoryAnalyzer.findAllSuccessfullFiringSolutions();
            let discoveredVelocitiesMap = new Map();

            // console.log(`found ${discoveredVelocities.length} possible velocities out of a possible ${expectedPossibleVelocities.length}.`);
            expect(discoveredVelocities.length).toBe(expectedPossibleVelocities.length);
            for (let i = 0; i < discoveredVelocities.length; i++) {
                discoveredVelocitiesMap.set(JSON.stringify(discoveredVelocities[i], discoveredVelocities[i]));
                if (!expectedPossibleVelocitiesMap.has(JSON.stringify(discoveredVelocities[i]))) {
                    console.log(`invalid velocity found: ${JSON.stringify(discoveredVelocities[i])}`);
                    expect(true).toBe(false);
                }
            }

            let missingVelocities = [];
            for (let i = 0; i < expectedPossibleVelocities.length; i++) {
                if (!discoveredVelocitiesMap.has(JSON.stringify(expectedPossibleVelocities[i]))) {
                    missingVelocities.push(expectedPossibleVelocities[i]);
                }
            }
            if (missingVelocities.length > 0) {
                console.log('missing velocities:');
                console.log(missingVelocities);
                }
            expect(missingVelocities.length).toBe(0);
            

        });
    });
    
});
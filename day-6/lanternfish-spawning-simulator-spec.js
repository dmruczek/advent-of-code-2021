describe('LanternfishSpawningSimulator', function () {

    const LanternfishSpawningSimulator = require('./lanternfish-spawning-simulator');

    describe('loadInput', function() {
        it('should load the fish list based on the input', function () {
            const lanternfishSpawningSimulator = new LanternfishSpawningSimulator();
            lanternfishSpawningSimulator.loadInput('test-input.txt');
            expect(lanternfishSpawningSimulator.fishMaturityLevelCountArray).toEqual([0,1,1,2,1,0,0,0,0]);
        });
    });

    describe('simulateOneCycle', function() {
        it('should accurately simulate one cycle.', function () {
            const lanternfishSpawningSimulator = new LanternfishSpawningSimulator();
            lanternfishSpawningSimulator.loadInput('test-input.txt');
            lanternfishSpawningSimulator.simulateOneCycle();
            expect(lanternfishSpawningSimulator.fishMaturityLevelCountArray).toEqual([1,1,2,1,0,0,0,0,0]);
            lanternfishSpawningSimulator.simulateOneCycle();
            expect(lanternfishSpawningSimulator.fishMaturityLevelCountArray).toEqual([1,2,1,0,0,0,1,0,1]);
        });
    });

    describe('simulateXCycles', function() {
        it('should accurately simulate X cycles.', function () {
            const lanternfishSpawningSimulator = new LanternfishSpawningSimulator();
            lanternfishSpawningSimulator.loadInput('test-input.txt');
            lanternfishSpawningSimulator.simulateXCycles(18);
            expect(lanternfishSpawningSimulator.getNumberOfFish()).toBe(26);

            lanternfishSpawningSimulator.loadInput('test-input.txt');
            lanternfishSpawningSimulator.simulateXCycles(80);
            expect(lanternfishSpawningSimulator.getNumberOfFish()).toBe(5934);

            lanternfishSpawningSimulator.loadInput('test-input.txt');
            lanternfishSpawningSimulator.simulateXCycles(256);
            expect(lanternfishSpawningSimulator.getNumberOfFish()).toBe(26984457539);

        });
    });

});
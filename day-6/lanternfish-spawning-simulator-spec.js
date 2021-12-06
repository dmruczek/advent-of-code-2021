describe('LanternfishSpawningSimulator', function () {

    const LanternfishSpawningSimulator = require('./lanternfish-spawning-simulator');

    describe('loadInput', function() {
        it('should load the fish list based on the input', function () {
            const lanternfishSpawningSimulator = new LanternfishSpawningSimulator();
            lanternfishSpawningSimulator.loadInput('test-input.txt');
            expect(lanternfishSpawningSimulator.fishList).toEqual([3,4,3,1,2]);
        });
    });

    describe('simulateOneCycle', function() {
        it('should accurately simulate one cycle.', function () {
            const lanternfishSpawningSimulator = new LanternfishSpawningSimulator();
            lanternfishSpawningSimulator.loadInput('test-input.txt');
            lanternfishSpawningSimulator.simulateOneCycle();
            expect(lanternfishSpawningSimulator.fishList).toEqual([2,3,2,0,1]);
            lanternfishSpawningSimulator.simulateOneCycle();
            expect(lanternfishSpawningSimulator.fishList).toEqual([1,2,1,6,0,8]);
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
        });
    });

});
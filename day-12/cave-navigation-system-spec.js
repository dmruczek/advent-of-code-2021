describe('CaveNavigationSystem', function () {

    const CaveNavigationSystem = require('./cave-navigation-system');

    describe('loadInput', function() {
        it('should properly load the cave data.', function () {
            const caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.loadInput('test-input.txt');
        });
    });

    describe('processInputData', function() {
        it('should properly track all the connections between cave nodes.', function () {
            const caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.processInputData([
                'start-A',
                'start-b',
                'A-c',
                'A-b',
                'b-d',
                'A-end',
                'b-end'
            ]);
            expect(caveNavigationSystem.startNode.connections.length).toBe(2);
            expect(caveNavigationSystem.startNode.connections[0].name).toEqual('A');
            expect(caveNavigationSystem.startNode.connections[0].connections.length).toBe(4);
            expect(caveNavigationSystem.startNode.connections[1].name).toEqual('b');
            expect(caveNavigationSystem.startNode.connections[1].connections.length).toBe(4);
            expect(caveNavigationSystem.startNode.connections[1].connections[0].name).toEqual('start');
            expect(caveNavigationSystem.startNode.connections[1].connections[0]).toBe(caveNavigationSystem.startNode);
            expect(caveNavigationSystem.startNode.connections[1].connections[1].name).toEqual('A');
            expect(caveNavigationSystem.startNode.connections[1].connections[2].name).toEqual('d');
            expect(caveNavigationSystem.startNode.connections[1].connections[3].name).toEqual('end');

        });
    });

    describe('findPathsFromStartToEnd', function() {
        it('should find all valid paths from start to end.', function () {
            let caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.processInputData([
                'start-A',
                'start-b',
                'A-c',
                'A-b',
                'b-d',
                'A-end',
                'b-end'
            ]);
            let paths = caveNavigationSystem.findPathsFromStartToEnd();
            expect(paths.length).toBe(10);

            caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.processInputData([
                'dc-end',
                'HN-start',
                'start-kj',
                'dc-start',
                'dc-HN',
                'LN-dc',
                'HN-end',
                'kj-sa',
                'kj-HN',
                'kj-dc'
            ]);
            paths = caveNavigationSystem.findPathsFromStartToEnd();
            expect(paths.length).toBe(19);

            caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.loadInput('test-input.txt');
            paths = caveNavigationSystem.findPathsFromStartToEnd();
            expect(paths.length).toBe(226);
        });
    });

    describe('findPathsFromStartToEndAllowingOneDoubleSmallCaveVisit', function() {
        it('should find all valid paths from start to end which allow you to visit one small cave twice.', function () {
            let caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.processInputData([
                'start-A',
                'start-b',
                'A-c',
                'A-b',
                'b-d',
                'A-end',
                'b-end'
            ]);
            let paths = caveNavigationSystem.findPathsFromStartToEndAllowingOneDoubleSmallCaveVisit();
            expect(paths.length).toBe(36);

            caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.processInputData([
                'dc-end',
                'HN-start',
                'start-kj',
                'dc-start',
                'dc-HN',
                'LN-dc',
                'HN-end',
                'kj-sa',
                'kj-HN',
                'kj-dc'
            ]);
            paths = caveNavigationSystem.findPathsFromStartToEndAllowingOneDoubleSmallCaveVisit();
            expect(paths.length).toBe(103);

            caveNavigationSystem = new CaveNavigationSystem();
            caveNavigationSystem.loadInput('test-input.txt');
            paths = caveNavigationSystem.findPathsFromStartToEndAllowingOneDoubleSmallCaveVisit();
            expect(paths.length).toBe(3509);
        });
    });

});
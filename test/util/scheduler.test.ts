import Scheduler from '../../util/scheduler';

describe('scheduler', function() {
    it('should run without err', function(done) {
        const scheduler = new Scheduler();
        scheduler.testCron();
        done();
    });
});
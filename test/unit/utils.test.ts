import { snakeUpper } from '../../src/utils';
import * as assert from 'assert';

describe('Snake_Upper', () => {
    it('Converts testThis properly', () => {
        assert.equal(snakeUpper('testThis'), 'Test_This');
    });
    it('Converts TestThis properly', () => {
        assert.equal(snakeUpper('TestThis'), 'Test_This');
    });
    it('Converts Test_This properly', () => {
        assert.equal(snakeUpper('Test_This'), 'Test_This');
    });
    it('Converts Test-This properly', () => {
        assert.equal(snakeUpper('Test-This'), 'Test_This');
    });
    it("can't convert TESTTHIS properly", () => {
        assert.notEqual(snakeUpper('TESTTHIS'), 'Test_This');
    });
});

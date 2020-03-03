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
    it('Converts test.this properly', () => {
        assert.equal(snakeUpper('test.this'), 'Test_This');
    });
    it('Converts TEST_THIS properly', () => {
        assert.equal(snakeUpper('TEST_THIS'), 'Test_This');
    });
    it('Converts Test this properly', () => {
        assert.equal(snakeUpper('Test this'), 'Test_This');
    });
    it('Converts test_this properly', () => {
        assert.equal(snakeUpper('test_this'), 'Test_This');
    });
    it("can't convert TESTTHIS properly", () => {
        assert.notEqual(snakeUpper('TESTTHIS'), 'Test_This');
    });
    it("can't convert testthis properly", () => {
        assert.notEqual(snakeUpper('testthis'), 'Test_This');
    });
});

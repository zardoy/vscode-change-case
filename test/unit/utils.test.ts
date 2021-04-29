import { snakeUpper } from '../../src/utils';
import * as assert from 'assert';

describe('Snake_Upper', () => {
    it('Converts testThis properly', () => {
        assert.strictEqual(snakeUpper('testThis'), 'Test_This');
    });
    it('Converts TestThis properly', () => {
        assert.strictEqual(snakeUpper('TestThis'), 'Test_This');
    });
    it('Converts Test_This properly', () => {
        assert.strictEqual(snakeUpper('Test_This'), 'Test_This');
    });
    it('Converts Test-This properly', () => {
        assert.strictEqual(snakeUpper('Test-This'), 'Test_This');
    });
    it('Converts test.this properly', () => {
        assert.strictEqual(snakeUpper('test.this'), 'Test_This');
    });
    it('Converts TEST_THIS properly', () => {
        assert.strictEqual(snakeUpper('TEST_THIS'), 'Test_This');
    });
    it('Converts Test this properly', () => {
        assert.strictEqual(snakeUpper('Test this'), 'Test_This');
    });
    it('Converts test_this properly', () => {
        assert.strictEqual(snakeUpper('test_this'), 'Test_This');
    });
    it("can't convert TESTTHIS properly", () => {
        assert.notStrictEqual(snakeUpper('TESTTHIS'), 'Test_This');
    });
    it("can't convert testthis properly", () => {
        assert.notStrictEqual(snakeUpper('testthis'), 'Test_This');
    });
});

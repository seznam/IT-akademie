import { avg, sum, sort } from '../index';
import fc from 'fast-check';

function isNumber(number) {
  return typeof number === 'number' && !isNaN(number);
}

function isBetweenNumbers(number, numbers) {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return isBetweenMinMax(number, min, max);
}

function isBetweenMinMax(number, min, max) {
  return number >= min && number <= max;
}

describe('Property based testing', () => {
  it('should always return valid number for avg method', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), numbers => {
        let result = avg(...numbers);
        let expectation = isNumber(result);

        if (numbers.length) {
          expectation = expectation && isBetweenNumbers(result, numbers);
        }

        expect(expectation).toBeTruthy();
      })
    );
  });

  it('should always return valid number for sum method', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), numbers => {
        let result = sum(...numbers);

        expect(isNumber(result)).toBeTruthy();
      })
    );
  });

  it('should always return sorted array for sort method', () => {
    fc.assert(
      fc.property(fc.array(fc.integer()), numbers => {
        const sorted = sort(...numbers);

        for (let index = 1; index < sorted.length; ++index) {
          expect(sorted[index - 1]).toBeLessThanOrEqual(sorted[index]);
        }
      })
    );
  });
});

import { getPercentOfVisibility } from '../index';
import fc from 'fast-check';

function isNumber(number) {
  return typeof number === 'number' && !isNaN(number);
}

function isBetweenMinMax(number, min, max) {
  return number >= min && number <= max;
}

describe('Property based testing', () => {
  const windowViewportRect = { top: 0, left: 0, width: 1024, height: 768 };

  it('should always return valid number for getPercentOfVisibility method', () => {
    fc.assert(
      fc.property(
        fc.integer(),
        fc.integer(),
        fc.integer(),
        fc.integer(),
        (top, left, width, height) => {
          let elementRect = { top, left, width, height };
          let result = getPercentOfVisibility(elementRect, windowViewportRect);

          expect(
            isNumber(result) && isBetweenMinMax(result, 0, 100)
          ).toBeTruthy();
        }
      )
    );
  });
});

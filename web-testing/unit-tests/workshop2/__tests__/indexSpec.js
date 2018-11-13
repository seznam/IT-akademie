import {
  getPercentOfVisibility,
  getRectsIntersection,
  getNumberFromRange,
  getArea
} from '../index';

describe('Workshop2', () => {
  const elemmentRect = { top: -70, left: 462, width: 100, height: 100 };
  const windowViewportRect = { top: 0, left: 0, width: 1024, height: 768 };

  describe('method getNumberFromRange', () => {
    it('should return number from range', () => {
      expect(getNumberFromRange(1, 2, 3)).toEqual(2);
    });
  });

  describe('method getRectsIntersection', () => {
    it('should return intersected rect', () => {
      expect(getRectsIntersection(elemmentRect, windowViewportRect)).toEqual({
        top: 0,
        left: 462,
        width: 100,
        height: 30
      });
    });
  });

  describe('method getPercentOfVisibility', () => {
    it('should return percent of visibility for defined rect', () => {
      expect(getPercentOfVisibility(elemmentRect, windowViewportRect)).toEqual(
        30
      );
    });
  });

  describe('method getArea', () => {
    it('should return 10000', () => {
      expect(getArea(elemmentRect)).toEqual(10000);
    });
  });
});

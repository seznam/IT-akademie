import { avg, sum, sort, isEven, median } from '../index';

describe('Math operation', () => {
  describe('method avg', () => {
    it('should return 2', () => {
      expect(avg(1, 2, 3)).toEqual(2);
    });
  });

  describe('method sum', () => {
    it('should return 6', () => {
      expect(sum(1, 2, 3)).toEqual(6);
    });
  });

  describe('method sort', () => {
    it('should return sorted numbers', () => {
      expect(sort(5, 3, 7)).toEqual([3, 5, 7]);
    });
  });

  describe('method isEven', () => {
    it('should return true for even number', () => {
      expect(isEven(4)).toBeTruthy();
    });

    it('should return false for odd number', () => {
      expect(isEven(5)).toBeFalsy();
    });
  });

  describe('method median', () => {
    it('should return true for even number', () => {
      expect(median(1, 2, 3, 4)).toEqual(2.5);
    });

    it('should return false for odd number', () => {
      expect(median(1, 2, 3, 4, 5)).toEqual(3);
    });
  });
});

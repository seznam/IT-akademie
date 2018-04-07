import * as helpers from '~/util/componentHelpers';

describe('component helpers', () => {
  describe('getBoundingClientRect', () => {
    it('should throw an error if the first argument does not have the getBoundingClientRect method', () => {
      expect(() => helpers.getBoundingClientRect()).toThrow();
      expect(() => helpers.getBoundingClientRect({})).toThrow();
      expect(() => helpers.getBoundingClientRect({getBoundingClientRect: {}})).toThrow();
    });

    it('should call the getBoundingClientRect method of the provided element', () => {
      const mock = jest.fn(() => ({left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0}));
      helpers.getBoundingClientRect({getBoundingClientRect: mock});
      expect(mock).toHaveBeenCalled();
    });

    it('should extend the bounds of the rectange returned by element\'s getBoundingClientRect method', () => {
      const extension = Math.random() * 1000;
      const baseBounds = {
        left: Math.random(),
        right: 10 + Math.random(),
        top: Math.random(),
        bottom: 20 + Math.random(),
        get width() {
          return this.right - this.left;
        },
        get height() {
          return this.bottom - this.top;
        },
      };
      const expectedResult = {
        left: baseBounds.left - extension,
        top: baseBounds.top - extension,
        width: baseBounds.width + extension * 2,
        height: baseBounds.height + extension * 2,
      };
      const mockElement = {
        getBoundingClientRect() {
          return baseBounds;
        },
      };
      expect(helpers.getBoundingClientRect(mockElement, undefined, extension)).toEqual(expectedResult);
    });

    it('should use the provided fallback dimensions for returned height if the element\'s height is 0', () => {
      const baseBounds = {
        left: Math.random(),
        right: 10 + Math.random(),
        top: Math.random(),
        get bottom() {
          return this.top;
        },
        get width() {
          return this.right - this.left;
        },
        get height() {
          return this.bottom - this.top;
        },
      };
      const fallbackDimensions = {
        width: Math.random(),
        height: 1 + Math.random(),
      };
      const mockElement = {
        getBoundingClientRect() {
          return baseBounds;
        },
      };
      expect(helpers.getBoundingClientRect(mockElement, fallbackDimensions)).toEqual({
        left: baseBounds.left,
        top: baseBounds.top,
        width: baseBounds.width,
        height: fallbackDimensions.height,
      });
    });
  });

  describe('getVisibilityRatio', () => {
    it('should return 0 for rectangles off the screen', () => {
      expect(helpers.getVisibilityRatio({
        left: -100,
        top: 10,
        width: 10,
        height: 10,
      })).toBe(0);
      expect(helpers.getVisibilityRatio({
        left: 10,
        top: -100,
        width: 10,
        height: 10,
      })).toBe(0);
      expect(helpers.getVisibilityRatio({
        left: 2000,
        top: 10,
        width: 10,
        height: 10,
      })).toBe(0);
      expect(helpers.getVisibilityRatio({
        left: 10,
        top: 2000,
        width: 10,
        height: 10,
      })).toBe(0);
    });

    it('should return the ratio of the visible area to the whole area', () => {
      expect(helpers.getVisibilityRatio({
        left: -50,
        top: 10,
        width: 100,
        height: 10,
      })).toBe(0.5);
      expect(helpers.getVisibilityRatio({
        left: 10,
        top: -50,
        width: 10,
        height: 100,
      })).toBe(0.5);
    });
  });
});

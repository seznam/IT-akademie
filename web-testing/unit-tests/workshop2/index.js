/**
 * @method getPercentOfVisibility
 * @param {{top: number, left: number, width: number, height: number}} elmRect
 * @param {{top: number, left: number, width: number, height: number}} windowViewportRect
 * @return {number}
 */
export function getPercentOfVisibility(elmRect, windowViewportRect) {
  let intersectionRects = getRectsIntersection(elmRect, windowViewportRect);
  let percent = (getArea(intersectionRects) / getArea(elmRect)) * 100;

  return isNaN(percent) ? 0 : percent;
}

/**
 * @method getRectsIntersection
 * @param {{top: number, left: number, width: number, height: number}} rect1
 * @param {{top: number, left: number, width: number, height: number}} rect2
 * @return {{top: number, left: number, width: number, height: number}} The intersecion of rects.
 */
export function getRectsIntersection(rect1, rect2) {
  let top = getNumberFromRange(rect1.top, rect2.top, rect2.height);
  let left = getNumberFromRange(rect1.left, rect2.left, rect2.width);
  let bottom = getNumberFromRange(
    rect1.top + rect1.height,
    rect2.top,
    rect2.height
  );
  let right = getNumberFromRange(
    rect1.left + rect1.width,
    rect2.left,
    rect2.width
  );
  let width = right - left;
  let height = bottom - top;

  return { top, left, width, height };
}

/**
 * @method getNumberFromRange
 * @param {number} number
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function getNumberFromRange(number, min, max) {
  return Math.min(Math.max(number, min), max);
}

/**
 * @method getArea
 * @param {{top: number, left: number, width: number, height: number}} rect
 * @return {number}
 */
export function getArea(rect) {
  return rect.width * rect.height;
}

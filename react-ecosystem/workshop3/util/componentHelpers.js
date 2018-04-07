import clamp from 'lodash.clamp';

export function getBoundingClientRect(element, {width, height} = {width: 0, height: 0}, extended = 0) {
  if (!element || typeof element.getBoundingClientRect !== 'function') {
    throw new Error(
      'Element rect is required with callable getBoundingClientRect() method on element.',
    );
  }

  const clientRect = element.getBoundingClientRect();
  const extendedElmRect = {
    top: clientRect.top - extended,
    left: clientRect.left - extended,
    width: clientRect.width + extended * 2,
    height: (clientRect.height || height || 0 / width || 0) + extended * 2,
  };

  return extendedElmRect;
}

export function getVisibilityRatio(elmRect) {
  if (!elmRect) {
    throw new Error(
      'Element rect is required. Call getBoundingClientRect() method on element or give object with properties ' +
      '{ top: number,  left: number, width: number, height: number }.',
    );
  }

  const windowViewportRect = getWindowViewportRect();
  const penetrationRects = getRectsIntersection(windowViewportRect, elmRect);
  const ratio = (penetrationRects.width * penetrationRects.height) / (elmRect.width * elmRect.height);

  return isNaN(ratio) ? 0 : ratio;
}

function getWindowViewportRect() {
  const top = 0;
  const left = 0;
  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    top,
    left,
    width,
    height,
  };
}

function getRectsIntersection(rect1, rect2) {
  const top = clamp(rect2.top, rect1.top, rect1.height);
  const left = clamp(rect2.left, rect1.left, rect1.width);
  const bottom = clamp(rect2.top + rect2.height, rect1.top, rect1.height);
  const right = clamp(rect2.left + rect2.width, rect1.left, rect1.width);
  const width = right - left;
  const height = bottom - top;

  return {
    top,
    left,
    width,
    height,
  };
}

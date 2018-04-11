import React from 'react';
import Renderer from 'react-test-renderer';
import Rating from '~/ui/atom/Rating';

describe('Rating', () => {
  it('should render correctly for each rating value', () => {
    const testsCount = 21; // [0, 5, 10, ..., 95, 100]
    for (const rating of Array.from({length: testsCount - 1}).map((_, index) => 100 / testsCount * index)) {
      expect(Renderer.create(<Rating rating={rating}/>).toJSON()).toMatchSnapshot();
    }
  });
});

import React from 'react';
import Renderer from 'react-test-renderer';
import SmartImage from '~/ui/atom/SmartImage';

describe('SmartImage', () => {
  it('should render correctly', () => {
    const smartImage = <SmartImage src="//some/image.png" alt="image" width={320} height={200} layout="responsive"/>;
    const domTree = Renderer.create(smartImage).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});

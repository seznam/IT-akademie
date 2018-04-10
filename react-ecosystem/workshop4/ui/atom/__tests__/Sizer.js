import React from 'react';
import Renderer from 'react-test-renderer';
import Sizer from '~/ui/atom/Sizer';

describe('Sizer', () => {
  it('should render correctly', () => {
    for (let width = 1; width < 100; width++) {
      const domTree = Renderer.create(<Sizer width={width} height={100 - width} placeholder={!!(width % 2)}/>).toJSON();
      expect(domTree).toMatchSnapshot();
    }
  });
});

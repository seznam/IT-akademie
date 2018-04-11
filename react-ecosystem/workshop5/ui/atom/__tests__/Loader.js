import React from 'react';
import Renderer from 'react-test-renderer';
import Loader from '~/ui/atom/Loader';

describe('Loader', () => {
  it('should render correctly with no props', () => {
    const domTree = Renderer.create(<Loader/>).toJSON();
    expect(domTree).toMatchSnapshot();
  });

  it('should render correctly with mode and layout passed in props', () => {
    const domTree = Renderer.create(<Loader mode="small" layout="center"/>).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
